# Monday Recap: Product Requirements

**Owner:** Spencer Robbins  
**Status:** Version 1 built; pilot with client next  
**Last updated:** October 2026

## Problem

Every week I send my client, a small business that sells on Shopify, a sales report. Today that means exporting orders from Shopify, summarizing them by hand in a spreadsheet, and writing up what changed. It takes **1 to 2 hours a week**, it is easy to make a mistake when the export has orders with several items, and the owner gets a table of numbers instead of a clear answer to "how did last week go?"

## Users

| User | What they need |
|---|---|
| **Business owner** (primary) | Understand last week in under two minutes: how much we sold, whether it was better or worse, what sold, and whether our offers worked. |
| **Analyst** (me) | Produce that report quickly and accurately from the export I already download. |

## Goals and success metrics

| Goal | Metric | Target |
|---|---|---|
| Save time | Time to produce the weekly report | From 1 to 2 hours to **under 10 minutes** |
| Be trustworthy | Revenue and order totals compared with Shopify's own reports | Within **1%** |
| Be useful | Owner reads and replies to the report | **4 weeks in a row** during the pilot |

## Requirements

Prioritized for version 1. **Must** items define the minimum useful product; **Should** items ship in version 1 if time allows; **Later** items wait for feedback.

| Priority | Requirement | Why |
|---|---|---|
| Must | Load a Shopify orders CSV export by dragging it in | Uses the file I already download; no setup |
| Must | Choose a week (Monday to Sunday); default to the latest complete week | Matches how the owner thinks about the business |
| Must | Show revenue, orders, average order value, units sold, and new customers, each compared with the previous week | Answers "better or worse?" at a glance |
| Must | Show top products by sales | Tells the owner what to restock and promote |
| Must | Keep all data on the user's device | Customer names and emails should never be uploaded anywhere |
| Should | Write a plain English summary the owner can read in one paragraph, with a copy button | The owner wants the story, not a spreadsheet |
| Should | Show results for each discount code | Shows whether this week's offers worked |
| Should | Daily sales chart, this week against last week | Spots slow days and spikes from campaigns |
| Should | Clean layout when printed or saved as PDF from the browser | The owner likes a file to keep |
| Later | Connect to Shopify directly so no export is needed | Removes the last manual step, but needs an app and stored credentials |
| Later | Add email (Mailchimp, HubSpot) and social media results | One report for all channels |
| Later | Send the report automatically every Monday | Removes me from the loop entirely |

## Key decisions and tradeoffs

1. **CSV upload instead of a Shopify connection.** A direct connection needs a Shopify app, access approval, and somewhere safe to store credentials. Uploading the export works today with zero setup. Tradeoff: one manual export step each week.
2. **Runs entirely in the browser.** No server means no customer data leaves the device and nothing to maintain or pay for.
3. **Revenue definition.** Revenue is the order total (including shipping and tax) minus refunds. Refunds count in the week the order was placed, so a past week can change slightly if an order is refunded later. This is shown on the page so nobody is surprised.
4. **New customer definition.** A customer (matched by email) is new if their first order in the uploaded file falls in the chosen week. The tool tells the user to upload a few months of history so this number is accurate.
5. **Canceled and voided orders are excluded** from every number.

## Risks and open questions

- Shopify may change its export columns. The tool checks for the columns it needs and explains clearly if any are missing.
- In-person (POS) orders often have no email, so they count toward sales but not new customers.
- Does the owner want profit, not just revenue? This needs product cost data and is a question for the pilot.

## Pilot plan

1. Use the tool alongside my current Excel process for two weeks and compare the numbers.
2. Time both processes.
3. Ask the owner after each report: what did you use, and what was missing?
4. Decide the next feature from that feedback.
