# 💰 Smart Expense Tracker API

A **RESTful API for managing personal expenses**, built using **Python and Flask**.

The API provides CRUD operations to **add, view, update, delete, and filter expenses**, along with input validation, error handling, and automated testing using `pytest`.

## 🚀 Features

* ➕ Add an expense
* 👀 View all expenses
* ✏️ Update an expense
* 🗑️ Delete an expense
* 🔍 Filter expenses by category
* 💰 Calculate total expenses
* 🆔 Automatic expense ID generation
* ✅ Input validation
* ⚠️ Error handling
* 🧪 Automated API testing with pytest
* 📮 API testing with Postman

## 🛠️ Tech Stack

* Python
* Flask
* REST API
* pytest
* Postman
* Git
* GitHub

## 📁 Project Structure

```text
smart-expense-tracker/
│
├── app.py
├── README.md
├── pytest.ini
├── .gitignore
│
└── tests/
    └── test_expenses.py
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-expense-tracker.git
```

### 2. Navigate to the Project

```bash
cd smart-expense-tracker
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install Dependencies

```bash
pip install flask pytest
```

Or, if `requirements.txt` is available:

```bash
pip install -r requirements.txt
```

## ▶️ Run the Application

Start the Flask server:

```bash
python app.py
```

The application will run at:

```text
http://127.0.0.1:5000
```

Open this URL in your browser to check the application.

---

# 📡 API Endpoints

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | `/`                       | Check API status   |
| GET    | `/expenses`               | Get all expenses   |
| GET    | `/expenses?category=Food` | Filter by category |
| POST   | `/expenses`               | Add a new expense  |
| PUT    | `/expenses/<id>`          | Update an expense  |
| DELETE | `/expenses/<id>`          | Delete an expense  |

---

## 1️⃣ GET — View All Expenses

**Request:**

```http
GET /expenses
```

**URL:**

```text
http://127.0.0.1:5000/expenses
```

Returns all available expenses.

---

## 2️⃣ GET — Filter Expenses

You can filter expenses using the `category` query parameter.

**Request:**

```http
GET /expenses?category=Food
```

**Example URL:**

```text
http://127.0.0.1:5000/expenses?category=Food
```

Returns only expenses belonging to the `Food` category.

---

## 3️⃣ POST — Add an Expense

**Request:**

```http
POST /expenses
```

**URL:**

```text
http://127.0.0.1:5000/expenses
```

### Request Body

Select **Body → raw → JSON** in Postman.

```json
{
    "title": "Lunch",
    "amount": 200,
    "category": "Food",
    "date": "2026-08-27"
}
```

The API automatically generates an expense ID.

### Example Response

```json
{
    "id": 3,
    "title": "Lunch",
    "amount": 200,
    "category": "Food",
    "date": "2026-08-27"
}
```

---

## 4️⃣ PUT — Update an Expense

**Request:**

```http
PUT /expenses/<id>
```

**Example:**

```text
http://127.0.0.1:5000/expenses/1
```

### Request Body

```json
{
    "title": "Dinner",
    "amount": 350,
    "category": "Food",
    "date": "2026-08-27"
}
```

This updates the expense with ID `1`.

---

## 5️⃣ DELETE — Delete an Expense

**Request:**

```http
DELETE /expenses/<id>
```

**Example:**

```text
http://127.0.0.1:5000/expenses/1
```

Deletes the expense with ID `1`.

No request body is required.

---

# 🧮 Calculate Total Expenses

The API can calculate the total amount of all expenses.

For example, if the expenses are:

```text
Food        ₹200
Travel      ₹100
Shopping    ₹500
```

The total expense is:

```text
₹800
```

---

# 🧪 Automated Testing

This project uses **pytest** for automated API testing.

Run the tests using:

```bash
pytest
```

Or:

```bash
python -m pytest
```

Example:

```text
tests/test_expenses.py .......

7 passed
```

The tests cover API functionality such as:

* GET expenses
* POST expense
* PUT expense
* DELETE expense
* Category filtering
* Validation
* Error handling

---

# 📮 Postman Testing

You can test all API endpoints using **Postman**.

### CRUD Operations

```text
CREATE  → POST
READ    → GET
UPDATE  → PUT
DELETE  → DELETE
```

For `POST` and `PUT` requests:

```text
Body → raw → JSON
```

Example:

```json
{
    "title": "Coffee",
    "amount": 100,
    "category": "Food",
    "date": "2026-08-27"
}
```

---

# 🔐 Input Validation

The API validates expense data before processing requests.

Required fields:

```text
title
amount
category
date
```

Invalid or incomplete data results in an appropriate error response.

---

# ⚠️ Error Handling

The API handles common errors including:

* Missing required fields
* Invalid expense ID
* Expense not found
* Invalid input
* Invalid category

---

# 📚 What I Learned

Through this project, I practiced:

* Python
* Flask
* REST API development
* CRUD operations
* HTTP methods
* JSON
* API validation
* Error handling
* pytest
* Postman
* Git & GitHub

---

# 🔮 Future Improvements

* 🗄️ Add SQLite/MySQL/PostgreSQL database
* 🔐 Add user authentication
* 👤 Support multiple users
* 📊 Add expense analytics
* 📈 Create a web dashboard
* 📚 Add Swagger/OpenAPI documentation
* ☁️ Deploy the API online

---

# 👩‍💻 Author

**N. Supraja**

Python | Flask | REST API | SQL | Web Development

---

⭐ **If you like this project, consider giving the repository a star!**
