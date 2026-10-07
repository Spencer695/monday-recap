// Checks the report math against values computed independently (pandas) for the sample shop.
// Run: npm install && npm test
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Papa = require('papaparse');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const core = html.split('// ==CORE START==')[1].split('// ==CORE END==')[0];
const C = new Function(core + '; return { buildOrders, analyze, defaultWeek, metrics, makeSampleCSV, missingColumns, addDays };')();

const csv = C.makeSampleCSV('2026-10-07');
const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
assert.deepStrictEqual(C.missingColumns(parsed.meta.fields), []);

const { orders, skipped } = C.buildOrders(parsed.data);
const info = C.analyze(orders);
const week = C.defaultWeek(info.weeks);
const cur = C.metrics(orders, info.first, week);
const prev = C.metrics(orders, info.first, C.addDays(week, -7));
const r2 = v => Math.round(v * 100) / 100;

assert.strictEqual(orders.length, 536);
assert.strictEqual(skipped, 6);
assert.strictEqual(week, '2026-09-28');
assert.strictEqual(cur.orders, 77);
assert.strictEqual(r2(cur.revenue), 4640.77);
assert.strictEqual(r2(cur.aov), 60.27);
assert.strictEqual(cur.units, 134);
assert.strictEqual(r2(cur.refunds), 129.79);
assert.strictEqual(cur.newCustomers, 49);
assert.strictEqual(cur.returningCustomers, 19);
assert.deepStrictEqual(cur.days.map(d => r2(d.revenue)), [466.03, 633.49, 278.43, 727.53, 688.96, 865.62, 980.71]);
assert.deepStrictEqual(cur.products.slice(0, 3).map(p => [p.name, p.units, r2(p.sales)]), [['Heavyweight Hoodie', 24, 1536], ['Classic Logo Tee', 42, 1176], ['Crewneck Sweatshirt', 12, 624]]);
assert.deepStrictEqual(cur.codes.map(c => [c.code, c.orders, r2(c.revenue), r2(c.discount)]), [['FALL15', 25, 1362.99, 201.6], ['FREESHIP', 3, 181.03, 20.85], ['WELCOME10', 1, 96.98, 10]]);
assert.strictEqual(r2(prev.revenue), 3699.04);
assert.strictEqual(prev.orders, 69);

// Multi item orders: extra rows with blank order fields must not double count.
const multi = C.buildOrders([
  { Name: '#1', 'Created at': '2026-09-29 10:00:00 -0700', Total: '50.00', 'Lineitem quantity': '1', 'Lineitem name': 'A', 'Lineitem price': '20' },
  { Name: '#1', 'Created at': '', Total: '', 'Lineitem quantity': '2', 'Lineitem name': 'B', 'Lineitem price': '15' }
]);
assert.strictEqual(multi.orders.length, 1);
assert.strictEqual(multi.orders[0].total, 50);
assert.strictEqual(multi.orders[0].items.length, 2);

console.log('All report checks passed.');
