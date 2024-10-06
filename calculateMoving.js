window.addEventListener('error', (e) => {
    e.preventDefault()
    console.log(`Custom error handler: Error in ${e.filename} at line ${e.lineno}: ${e.message}`);
    return true
})

const formElement = document.querySelector('#form')
// console.log(formElement);
const COST_PER_LB = 0.50;
const COST_PER_MILE = 0.75;
const SETUP_COST = 500;




const calculateMove = function () {
    // console.log("done");
    document.querySelector('#msgBox').innerHTML = "";
    try {
        const inputs = Array.from(formElement.querySelectorAll('input')).filter(input => input.id !== 'totalBox');
        let total = 0;
        // console.log(inputs);
        inputs.forEach(input => {
            if(input.id !== "setupBox"){
                const value = input.value.trim()
                if(value === "") throw "Please enter a value for all required fields."
                const parsedValue = parseFloat(value)
                if(parsedValue <= 0) throw "pls enter positive value"
                if(input.id === 'wgtBox') total += parsedValue * 0.5
                else if(input.id === 'distBox') total += parsedValue * 0.75
            }else{
                const check = document.querySelector('#setupBox').checked 
                if(check) total += 500
            }
        })
        // console.log(total);
        document.querySelector('#totalBox').value = total.toFixed(2)
        
    } catch (error) {
        document.querySelector('#msgBox').innerHTML = error
        document.querySelector('#totalBox').value = "";
    }
}








formElement.addEventListener('input', calculateMove)
