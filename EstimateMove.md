# Moving Estimate Calculator Documentation

This document explains the JavaScript code for a moving estimate calculator.

## Global Error Handler

```javascript
window.addEventListener('error', (e) => {
    e.preventDefault()
    console.log(`Custom error handler: Error in ${e.filename} at line ${e.lineno}: ${e.message}`);
    return true
})
```

This code sets up a global error handler. It prevents the default error behavior and logs custom error messages to the console.

## Constants and Form Element

```javascript
const formElement = document.querySelector('#form')
const COST_PER_LB = 0.50;
const COST_PER_MILE = 0.75;
const SETUP_COST = 500;
```

- `formElement`: Selects the form element from the DOM.
- `COST_PER_LB`: Cost per pound for moving (50 cents).
- `COST_PER_MILE`: Cost per mile for moving (75 cents).
- `SETUP_COST`: Fixed setup cost ($500).

## Calculate Move Function

```javascript
const calculateMove = function () {
    document.querySelector('#msgBox').innerHTML = "";
    try {
        const inputs = Array.from(formElement.querySelectorAll('input')).filter(input => input.id !== 'totalBox');
        let total = 0;
        
        inputs.forEach(input => {
            if(input.id !== "setupBox"){
                const value = input.value.trim()
                if(value === "") throw "Please enter a value for all required fields."
                const parsedValue = parseInt(value)
                if(parsedValue <= 0) throw "pls enter positive value"
                if(input.id === 'wgtBox') total += parsedValue * 0.5
                else if(input.id === 'distBox') total += parsedValue * 0.75
            }else{
                const check = document.querySelector('#setupBox').checked 
                if(check) total += 500
            }
        })
        
        document.querySelector('#totalBox').value = total.toFixed(2)
        
    } catch (error) {
        document.querySelector('#msgBox').innerHTML = error
        document.querySelector('#totalBox').value = "";
    }
}
```

This function calculates the total moving cost based on user inputs:

1. Clears any previous error messages.
2. Selects all input elements except the total box.
3. Iterates through each input:
   - For weight and distance inputs:
     - Checks if the input is empty.
     - Parses the input value to a float.
     - Checks if the value is positive.
     - Adds to the total cost based on the input type (weight or distance).
   - For the setup box:
     - Adds the setup cost if checked.
4. Sets the calculated total in the total box, formatted to 2 decimal places.
5. If any error occurs (empty input or non-positive value), it displays an error message and clears the total box.

## Event Listener

```javascript
formElement.addEventListener('input', calculateMove)
```

This attaches the `calculateMove` function to the form's 'input' event, so the calculation updates as the user types.

## Potential Improvements

1. Consider using `parseFloat` instead of `parseInt` to handle decimal inputs.
2. You might want to use the `COST_PER_LB` and `COST_PER_MILE` constants in the calculation instead of hardcoded values.
3. Add more specific error messages for different types of errors.
4. Consider adding input validation for maximum values to prevent unreasonably large inputs.