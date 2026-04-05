function valdiate(e){
    e.preventDefault();
}
const email = document.getElementById('email').value;
const pass = document.getElementById('password').value;
const age = document.getElementById('age').value;
const msgBox = document.getElementById('message').value;
let message = '';
if (email === ''){message ='please enter an email'

}
else if (password === '') {
    message = 'please enter a password'

}
else if (age === '') {
    message = 'please enter your age'

}
else {
    message= 'login succesful';
    msgBox.innerHTML = message;
}
document.getElementById("loginForm").onsubmit = valdiate;
document.getElementById("email").oninput = () => valdiate({
    preventDefault () => { }});

document.getElementById("password").oninput = () => valdiate({
    preventDefault() => {}});

document.getElementById("age").oninput = () => valdiate({
    preventDefault() => {}});