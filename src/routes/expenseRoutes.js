const express = require("express");

const router = express.Router();

const {
    addExpense,
    getExpenses,
    getTotalExpenses,
    deleteExpense
} = require("../controllers/expenseController");

router.post("/expenses", addExpense);

router.get("/expenses", getExpenses);

router.get("/expenses/total", getTotalExpenses);

router.delete("/expenses/:id", deleteExpense);

module.exports = router;