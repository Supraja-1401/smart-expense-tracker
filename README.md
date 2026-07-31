# Smart Expense Tracker API

A REST API for managing personal expenses, built using Node.js and Express.js.

## Features

- Add an expense
- View all expenses
- Filter expenses by category
- Calculate total expenses
- Calculate total expenses by category
- Delete an expense
- Input validation and error handling
- Automated API tests using Jest and Supertest

## Tech Stack

- Node.js
- Express.js
- JavaScript
- Jest
- Supertest

## Project Structure

```text
smart-expense-tracker/
├── README.md
├── AI_NOTES.md
├── .gitignore
├── package.json
├── package-lock.json
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   │   └── expenseController.js
│   ├── data/
│   │   └── expenses.js
│   └── routes/
│       └── expenseRoutes.js
└── tests/
    └── expense.test.js

```

Installation:
Install the project dependencies:
command:npm install

Run the Server
Start the server using:
npm start

The server will run at:
http://localhost:3000

Run Tests
Run the automated test suite using:

npm test
API Endpoints
1. Add an Expense
POST /expenses
Example request:
{
  "id": 1,
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-07-31"
}

2. View All Expenses
GET /expenses

3. Filter Expenses by Category
GET /expenses?category=Food
Category filtering is case-insensitive.

4. Calculate Overall Total
GET /expenses/total
Example response:
{
  "total": 250
}

5. Filter Expenses by Category
GET /expenses?category=Food
Category filtering is case-insensitive.

6. Calculate Overall Total
GET /expenses/total
Example response:
{
  "total": 250
}

5. Calculate Total by Category
GET /expenses/total?category=Food
Example response:
{
  "total": 250
}

6. Delete an Expense
DELETE /expenses/:id
Example:
DELETE /expenses/1
Validation and Error Handling

The API validates:
Required fields
Positive integer expense IDs
Duplicate expense IDs
Non-empty titles
Positive numeric amounts
Non-empty categories
Valid dates

The API uses appropriate HTTP status codes such as:
200 OK
201 Created
400 Bad Request
404 Not Found
409 Conflict
Data Storage
The application uses in-memory storage as permitted by the assignment. No external database is required.

Testing
The project includes automated tests using Jest and Supertest.
The test suite covers:
Creating expenses
Missing required fields
Duplicate expense IDs
Invalid amounts
Retrieving all expenses
Category filtering
Case-insensitive category filtering
Overall expense totals
Category expense totals
Categories with no expenses
Successful deletion
Deleting a nonexistent expense
--All 12 tests pass successfully.


### ⚠️ Important
```text
└── tests/
    └── expense.test.js
```
