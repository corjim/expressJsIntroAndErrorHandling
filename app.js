const express = require("express");
const app = express();
const ExpressError = require('./expressError');

const { parseNumbers } = require('./helperFN');


// Root route
app.get('/', (req, res) => {

    res.send(
        `<h3> Welcome to your fav statistic page </h3> <br>
        <h6> Type ? then either 'mean, mode or median' = 'group of numbers separated by commas to the url </h6>
        <p> EXAMPLE: http://localhost:5000/mean?nums=1,3,5,7 </p> `
    )
})

// Route to calculate mean
app.get("/mean", (req, res) => {
    try {
        debugger
        const numbers = parseNumbers(req);
        const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
        res.json({ operation: "mean", value: mean });
    } catch (error) {
        console.log(req.query)
        res.status(400).json({ error: error.message });
    }
});

// Route to calculate median
app.get("/median", (req, res) => {
    try {
        const numbers = parseNumbers(req);
        numbers.sort((a, b) => a - b);
        const middle = Math.floor(numbers.length / 2);
        const median =
            numbers.length % 2 === 0
                ? (numbers[middle - 1] + numbers[middle]) / 2
                : numbers[middle];
        res.json({ operation: "median", value: median });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to calculate mode
app.get("/mode", (req, res) => {
    try {
        const numbers = parseNumbers(req);
        const frequency = {};
        numbers.forEach((num) => (frequency[num] = (frequency[num] || 0) + 1));

        let maxFreq = 0;
        let mode = [];
        for (const key in frequency) {
            if (frequency[key] > maxFreq) {
                maxFreq = frequency[key];
                mode = [Number(key)];
            } else if (frequency[key] === maxFreq) {
                mode.push(Number(key));
            }
        }

        res.json({ operation: "mode", value: mode });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//  Further Study

app.get("/all", (req, res) => {
    try {
        const numbers = parseNumbers(req);

        // Calculate mean
        const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;

        // Calculate median
        numbers.sort((a, b) => a - b);
        const middle = Math.floor(numbers.length / 2);
        const median =
            numbers.length % 2 === 0
                ? (numbers[middle - 1] + numbers[middle]) / 2
                : numbers[middle];

        // Calculate mode
        const frequency = {};
        numbers.forEach((num) => (frequency[num] = (frequency[num] || 0) + 1));

        let maxFreq = 0;
        let mode = [];
        for (const key in frequency) {
            if (frequency[key] > maxFreq) {
                maxFreq = frequency[key];
                mode = [Number(key)];
            } else if (frequency[key] === maxFreq) {
                mode.push(Number(key));
            }
        }

        // Send JSON response
        res.json({
            mean,
            median,
            mode,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


/** general error handler */

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);

    // pass the error to the next piece of middleware
    return next(err);
});


// Global error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});
// Start server
app.listen(5000, () => {
    console.log(`Server running on http://localhost:5000`)
});
