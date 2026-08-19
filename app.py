from flask import Flask, request

app = Flask(__name__)

expenses = [
{   
    "id": 1,
    "title": "Breakfast",
    "amount": 50,
    "category": "Food",
    "date": "2026-08-19"
},
{   
    "id": 2,
    "title": "Bus",
    "amount": 50,
    "category": "Travel",
    "date": "2026-08-19"
}
]

next_id = 3


@app.route("/")
def home():
    return {
        "message": "Smart Expense Tracker API is running"
    }


# GET - view all expenses
# GET - view all expenses or filter by category
@app.route("/expenses", methods=["GET"])
def get_expenses():
    category = request.args.get("category")

    if category:
        filtered_expenses = [
            expense for expense in expenses
            if expense["category"].lower() == category.lower()
        ]

        return {
            "expenses": filtered_expenses
        }, 200

    return {
        "expenses": expenses
    }, 200


# POST - add an expense

# PUT - update an expense
@app.route("/expenses/<int:id>", methods=["PUT"])
def update_expense(id):
    data = request.get_json()

    for expense in expenses:
        if expense["id"] == id:
            expense["title"] = data["title"]
            expense["amount"] = data["amount"]
            expense["category"] = data["category"]
            expense["date"] = data["date"]

            return {
                "message": "Expense updated successfully",
                "expense": expense
            }, 200

    return {
        "message": "Expense not found"
    }, 404

# DELETE - delete an expense
@app.route("/expenses/<int:id>", methods=["DELETE"])
def delete_expense(id):
    for expense in expenses:
        if expense["id"] == id:
            expenses.remove(expense)

            return {
                "message": "Expense deleted successfully"
            }, 200

    return {
        "message": "Expense not found"
    }, 404

# POST - add an expense
@app.route("/expenses", methods=["POST"])
def add_expense():
    global next_id
    data = request.get_json()

    # Check if request body exists
    if not data:
        return {
            "message": "Request body is required"
        }, 400

    # Required fields
    required_fields = ["title", "amount", "category", "date"]

    # Check for missing fields
    for field in required_fields:
        if field not in data:
            return {
                "message": f"{field} is required"
            }, 400

    expense = {
        "id": next_id,
        "title": data["title"],
        "amount": data["amount"],
        "category": data["category"],
        "date": data["date"]
    }

    expenses.append(expense)

    next_id += 1

    return {
        "message": "Expense added successfully",
        "expense": expense
    }, 201


# GET - calculate total expenses
@app.route("/expenses/total", methods=["GET"])
def get_total():
    total = sum(expense["amount"] for expense in expenses)

    return {
        "total": total
    }, 200

if __name__ == "__main__":
    app.run(debug=True)