const express = require("express");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/", expenseRoutes);

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "Smart Expense Tracker API is running"
    });
});

module.exports = app;