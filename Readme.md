# Express Route and Error Handling.

## Express.js Statistical Operations Application

- This is an Express.js application that performs three statistical operations on an arbitrary amount of numbers:

1.  **Mean** (average)
2. **Median** (midpoint)
3. **Mode** (most frequent value)

- Each operation is exposed via a dedicated route, and the results are returned in JSON format.

### **Routes**

#### **1. `/mean`**
- **Description:** Calculates the mean (average) of the given numbers.
- **Example Request:** 
- GET /mean?nums=1,3,5,7

- You get the vibe 