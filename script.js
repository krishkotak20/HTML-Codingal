function clearScreen(){
    document.getElementById("result").value = "";
}
function setScreenValue(value) {
    const r = document.getElementById("result");
    if (r.value === "enter an expression" || r.value === "invalid expression") r.value= "";
    r.value += value;
}
function calculateResult() {
    const resultElement = document.getElementById("result");
    const expression = resultElement.value.trim();

    if (expression === '') {
        resultElement.value = "enter an expression";
        return;
    }
    try {
        resultElement.value =eval(expression);
    }catch (e) {
        resultElement.value = 'invalid expression';
    }
    }
