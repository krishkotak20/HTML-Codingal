function getHistory() {
    return document.getElementById("history-value").innerText;
}
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}
function getOutput() {
    return document.getElementById("output-value").innerText;
}
function printOutput(num) {
    if (num == "") {
        document.getElementById("output-value").innerText = num;
    }
    else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reversedNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == 'clear') {
            printHistory(""); 
            printOutput("");
        }
        else if (this.id == "backspace") {
            var output = reversedNumberFormat(getOutput().toString());
            if (output) {
                output = output.toString().substr(0, output.toString().length - 1);
                printOutput(output);
            }
        }
        else {
            var output = getOutput();
            var history = getHistory();

            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history + output;
                }
                if(output != "" || history != ""){
                    output= output==""?output:reversedNumberFormat(output);
                    history=history+output;
                }
            }

            if (this.id == "=") {
                var result = eval(history);
                printOutput(result);
                printHistory("");
            }
            else {
                history = history + this.id;
                printHistory(history);
                printOutput("");
            }
        }
    });
}


