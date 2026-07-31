const expenses = require("../data/expenses");

const addExpense = (req, res) => {
    const { id, title, amount, category, date } = req.body;

    // Validate required fields
    if (
        id === undefined ||
        !title ||
        amount === undefined ||
        !category ||
        !date
    ) {
        return res.status(400).json({
            error: "id, title, amount, category and date are required"
        });
    }

    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "id must be a positive integer"
        });
    }

    // Check duplicate ID
    const existingExpense = expenses.find(
        (expense) => expense.id === id
    );

    if (existingExpense) {
        return res.status(409).json({
            error: "Expense with this id already exists"
        });
    }

    // Validate title
    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "title must be a non-empty string"
        });
    }

    // Validate amount
    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
            error: "amount must be a positive number"
        });
    }

    // Validate category
    if (typeof category !== "string" || category.trim() === "") {
        return res.status(400).json({
            error: "category must be a non-empty string"
        });
    }

    // Validate date
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({
            error: "date must be a valid date"
        });
    }

    const newExpense = {
        id,
        title: title.trim(),
        amount,
        category: category.trim(),
        date
    };

    expenses.push(newExpense);

    return res.status(201).json(newExpense);

};


const getExpenses = (req, res) => {
    const { category } = req.query;

    // Return all expenses if category is not provided
    if (!category) {
        return res.status(200).json(expenses);
    }

    // Filter expenses by category
    const filteredExpenses = expenses.filter(
        (expense) =>
            expense.category.toLowerCase() === category.toLowerCase()
    );

    return res.status(200).json(filteredExpenses);
};

const getTotalExpenses = (req, res) => {
    const { category } = req.query;

    let filteredExpenses = expenses;

    // Filter by category if provided
    if (category) {
        filteredExpenses = expenses.filter(
            (expense) =>
                expense.category.toLowerCase() === category.toLowerCase()
        );
    }

    const total = filteredExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    return res.status(200).json({
        total
    });
};

const deleteExpense = (req, res) => {
    const id = Number(req.params.id);

    // Find the expense
    const expenseIndex = expenses.findIndex(
        (expense) => expense.id === id
    );

    // Expense not found
    if (expenseIndex === -1) {
        return res.status(404).json({
            error: "Expense not found"
        });
    }

    // Remove the expense
    const deletedExpense = expenses.splice(expenseIndex, 1)[0];

    return res.status(200).json({
        message: "Expense deleted successfully",
        expense: deletedExpense
    });
};

module.exports = {
    addExpense,
    getExpenses,
    getTotalExpenses,
    deleteExpense
};