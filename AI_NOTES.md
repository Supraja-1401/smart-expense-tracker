# AI Notes

I used ChatGPT as an AI-assisted development tool while building this assignment.

## 1. How AI was used

I used ChatGPT for:

- Planning the Express.js project structure.
- Understanding how to separate routes, controllers, and data storage.
- Getting guidance on implementing REST API endpoints.
- Getting suggestions for input validation and HTTP status codes.
- Creating initial Jest and Supertest test cases.
- Troubleshooting PowerShell API testing commands.
- Reviewing the project structure against the assignment requirements.
- Improving documentation and the submission checklist.

## 2. What was written or validated by me

I created and worked through the project locally in VS Code and ran the application myself.

I manually validated the API using PowerShell and `Invoke-RestMethod`, including:

- Adding expenses.
- Testing duplicate expense IDs.
- Retrieving expenses.
- Filtering expenses by category.
- Calculating totals.
- Deleting expenses.
- Testing not-found behavior.

I also ran the automated test suite locally.

The final test result was:

```text
Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total