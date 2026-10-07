# Monday Recap

Monday Recap turns a Shopify orders export into a weekly sales report in seconds: revenue, orders, average order value, units, and new customers compared with the week before, a daily chart, top products, discount code results, and a plain English summary the business owner can read in one minute.

**Live demo:** https://spencer695.github.io/monday-recap/ (opens with sample data from a made-up shop)

## Why I built it

I do freelance marketing work for a small business that sells on Shopify. Every week I put together their sales report by hand, which takes 1 to 2 hours and is easy to get wrong when orders have several items. Monday Recap replaces that process: export orders from Shopify, drop the file in, copy the summary.

The full problem statement, success metrics, prioritized requirements, and tradeoffs are in the [product requirements doc](PRD.md).

## How to use it

1. In Shopify admin, open **Orders**, click **Export**, and choose a date range that covers at least two weeks.
2. Pick **CSV for Excel, Numbers, or other spreadsheet programs**.
3. Open Monday Recap and load the file (or drag it onto the page).
4. Pick the week, then click **Copy summary** to paste it into an email.

Your file is processed entirely in the browser. Nothing is uploaded or stored.

## How it works

- Shopify exports one row per line item, with order fields filled only on the first row of each order. Monday Recap groups rows by order number so multi item orders are counted once.
- Revenue is the order total (including shipping and tax) minus refunds. Canceled and voided orders are excluded.
- A new customer is someone whose first order in the file falls in the selected week, matched by email.
- It is a single HTML file with no server. [Papa Parse](https://www.papaparse.com/) reads the CSV; the chart is plain SVG.

## Testing

`npm install && npm test` checks the report math against numbers I calculated independently in Python (pandas) for the sample data in `sample-orders.csv`, including the multi item order case.

## What's next

Based on the [requirements doc](PRD.md): connect to Shopify directly so no export is needed, add email and social media results, and send the report automatically every Monday. The pilot with my client decides which comes first.

## Built with

HTML, CSS, and JavaScript. I built it with Claude as an AI pair programmer, from the requirements doc through testing.
