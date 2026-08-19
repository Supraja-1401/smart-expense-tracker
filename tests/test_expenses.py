import pytest
import app


@pytest.fixture
def client():
    app.app.config["TESTING"] = True

    app.expenses.clear()
    app.next_id = 1

    with app.app.test_client() as client:
        yield client


def test_home(client):
    response = client.get("/")

    assert response.status_code == 200

    data = response.get_json()

    assert data["message"] == "Smart Expense Tracker API is running"


def test_add_expense(client):
    response = client.post(
        "/expenses",
        json={
            "title": "Lunch",
            "amount": 200,
            "category": "Food",
            "date": "2026-08-18"
        }
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["message"] == "Expense added successfully"
    assert data["expense"]["id"] == 1
    assert data["expense"]["title"] == "Lunch"
    assert data["expense"]["amount"] == 200


def test_get_expenses(client):
    client.post(
        "/expenses",
        json={
            "title": "Lunch",
            "amount": 200,
            "category": "Food",
            "date": "2026-08-18"
        }
    )

    response = client.get("/expenses")

    assert response.status_code == 200

    data = response.get_json()

    assert len(data["expenses"]) == 1
    assert data["expenses"][0]["title"] == "Lunch"


def test_add_multiple_expenses(client):
    client.post(
        "/expenses",
        json={
            "title": "Lunch",
            "amount": 200,
            "category": "Food",
            "date": "2026-08-18"
        }
    )

    client.post(
        "/expenses",
        json={
            "title": "Bus",
            "amount": 50,
            "category": "Travel",
            "date": "2026-08-18"
        }
    )

    response = client.get("/expenses")

    data = response.get_json()

    assert len(data["expenses"]) == 2
    assert data["expenses"][0]["id"] == 1
    assert data["expenses"][1]["id"] == 2

def test_update_expense(client):
    # First add an expense
    client.post(
        "/expenses",
        json={
            "title": "Lunch",
            "amount": 200,
            "category": "Food",
            "date": "2026-08-18"
        }
    )

    # Update expense with ID 1
    response = client.put(
        "/expenses/1",
        json={
            "title": "Dinner",
            "amount": 300,
            "category": "Food",
            "date": "2026-08-19"
        }
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["expense"]["title"] == "Dinner"
    assert data["expense"]["amount"] == 300

def test_delete_expense(client):
    # Add an expense first
    client.post(
        "/expenses",
        json={
            "title": "Lunch",
            "amount": 200,
            "category": "Food",
            "date": "2026-08-18"
        }
    )

    # Delete expense with ID 1
    response = client.delete("/expenses/1")

    assert response.status_code == 200

    data = response.get_json()

    assert data["message"] == "Expense deleted successfully"

    # Check that the expense was actually deleted
    response = client.get("/expenses")

    data = response.get_json()

    assert len(data["expenses"]) == 0

def test_invalid_input(client):
    response = client.post(
        "/expenses",
        json={
            "title": "Lunch"
        }
    )

    assert response.status_code == 400

    data = response.get_json()

    assert "message" in data

def test_category_filtering(client):
    # Add Food expense
    client.post(
        "/expenses",
        json={
            "title": "Lunch",
            "amount": 200,
            "category": "Food",
            "date": "2026-08-19"
        }
    )

    # Add Travel expense
    client.post(
        "/expenses",
        json={
            "title": "Bus",
            "amount": 50,
            "category": "Travel",
            "date": "2026-08-19"
        }
    )

    # Add another Food expense
    client.post(
        "/expenses",
        json={
            "title": "Dinner",
            "amount": 300,
            "category": "Food",
            "date": "2026-08-19"
        }
    )

    # Filter by Food
    response = client.get("/expenses?category=Food")

    assert response.status_code == 200

    data = response.get_json()

    assert len(data["expenses"]) == 2
    assert data["expenses"][0]["title"] == "Lunch"
    assert data["expenses"][1]["title"] == "Dinner"

def test_total_calculation(client):
    # Add first expense
    client.post(
        "/expenses",
        json={
            "title": "Lunch",
            "amount": 200,
            "category": "Food",
            "date": "2026-08-19"
        }
    )

    # Add second expense
    client.post(
        "/expenses",
        json={
            "title": "Bus",
            "amount": 50,
            "category": "Travel",
            "date": "2026-08-19"
        }
    )

    # Add third expense
    client.post(
        "/expenses",
        json={
            "title": "Dinner",
            "amount": 300,
            "category": "Food",
            "date": "2026-08-19"
        }
    )

    # Get total
    response = client.get("/expenses/total")

    assert response.status_code == 200

    data = response.get_json()

    assert data["total"] == 550