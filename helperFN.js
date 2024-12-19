// Utility function to parse numbers from query string
function parseNumbers(req) {
    const { numbers } = req.query;

    if (!numbers) {
        throw new ExpressError('You must provide a "number query in the parameter.', 400)
    }
    const numArray = numbers.split(",").map((num) => {
        const parsed = parseFloat(num);
        if (isNaN(parsed)) {
            throw new ExpressError(`Invalid ${num} in the input,`, 400)
        }
        return parsed;
    });

    return numArray;
}