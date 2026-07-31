const request = require("supertest");
const app = require("../src/app");

const expenses = require("../src/data/expenses");

beforeEach(() => {
    expenses.length = 0;
});

describe("Expense API", () => {
    describe("POST /expenses", () => {
        test("should create a new expense", async () => {
            const response = await request(app)
                .post("/expenses")
                .send({
                    id: 1,
                    title: "Lunch",
                    amount: 250,
                    category: "Food",
                    date: "2026-07-31"
                });

            expect(response.statusCode).toBe(201);

            expect(response.body).toEqual({
                id: 1,
                title: "Lunch",
                amount: 250,
                category: "Food",
                date: "2026-07-31"
            });
        });

        test("should reject an expense with missing fields", async () => {
            const response = await request(app)
                .post("/expenses")
                .send({
                    id: 1,
                    title: "Lunch"
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe(
                "id, title, amount, category and date are required"
            );
        });

        test("should reject duplicate expense IDs", async () => {
            await request(app)
                .post("/expenses")
                .send({
                    id: 1,
                    title: "Lunch",
                    amount: 250,
                    category: "Food",
                    date: "2026-07-31"
                });

            const response = await request(app)
                .post("/expenses")
                .send({
                    id: 1,
                    title: "Dinner",
                    amount: 300,
                    category: "Food",
                    date: "2026-07-31"
                });

            expect(response.statusCode).toBe(409);
            expect(response.body.error).toBe(
                "Expense with this id already exists"
            );
        });

        test("should reject a negative amount", async () => {
            const response = await request(app)
                .post("/expenses")
                .send({
                    id: 2,
                    title: "Shoes",
                    amount: -500,
                    category: "Shopping",
                    date: "2026-07-31"
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe(
                "amount must be a positive number"
            );
        });
    });

    describe("GET /expenses", () => {
        beforeEach(() => {
            expenses.push(
                {
                    id: 1,
                    title: "Lunch",
                    amount: 250,
                    category: "Food",
                    date: "2026-07-31"
                },
                {
                    id: 2,
                    title: "Bus Ticket",
                    amount: 50,
                    category: "Transport",
                    date: "2026-07-31"
                },
                {
                    id: 3,
                    title: "Coffee",
                    amount: 120,
                    category: "Food",
                    date: "2026-07-30"
                }
            );
        });

        test("should return all expenses", async () => {
            const response = await request(app)
                .get("/expenses");

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveLength(3);
        });

        test("should filter expenses by category", async () => {
            const response = await request(app)
                .get("/expenses?category=Food");

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveLength(2);

            expect(
                response.body.every(
                    (expense) => expense.category === "Food"
                )
            ).toBe(true);
        });

        test("should filter category case-insensitively", async () => {
            const response = await request(app)
                .get("/expenses?category=food");

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveLength(2);
        });
    });

    describe("GET /expenses/total", () => {
        beforeEach(() => {
            expenses.push(
                {
                    id: 1,
                    title: "Lunch",
                    amount: 250,
                    category: "Food",
                    date: "2026-07-31"
                },
                {
                    id: 2,
                    title: "Bus Ticket",
                    amount: 50,
                    category: "Transport",
                    date: "2026-07-31"
                },
                {
                    id: 3,
                    title: "Coffee",
                    amount: 120,
                    category: "Food",
                    date: "2026-07-30"
                }
            );
        });

        test("should calculate the overall total", async () => {
            const response = await request(app)
                .get("/expenses/total");

            expect(response.statusCode).toBe(200);
            expect(response.body.total).toBe(420);
        });

        test("should calculate total by category", async () => {
            const response = await request(app)
                .get("/expenses/total?category=Food");

            expect(response.statusCode).toBe(200);
            expect(response.body.total).toBe(370);
        });

        test("should return zero for a category with no expenses", async () => {
            const response = await request(app)
                .get("/expenses/total?category=Shopping");

            expect(response.statusCode).toBe(200);
            expect(response.body.total).toBe(0);
        });
    });

    describe("DELETE /expenses/:id", () => {
        beforeEach(() => {
            expenses.push(
                {
                    id: 1,
                    title: "Lunch",
                    amount: 250,
                    category: "Food",
                    date: "2026-07-31"
                },
                {
                    id: 2,
                    title: "Bus Ticket",
                    amount: 50,
                    category: "Transport",
                    date: "2026-07-31"
                }
            );
        });

        test("should delete an existing expense", async () => {
            const response = await request(app)
                .delete("/expenses/2");

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe(
                "Expense deleted successfully"
            );

            expect(expenses).toHaveLength(1);
            expect(expenses[0].id).toBe(1);
        });

        test("should return 404 when expense does not exist", async () => {
            const response = await request(app)
                .delete("/expenses/999");

            expect(response.statusCode).toBe(404);
            expect(response.body.error).toBe(
                "Expense not found"
            );
        });
    });
});