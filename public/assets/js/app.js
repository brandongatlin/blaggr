console.log('app.js loaded');

document.addEventListener('DOMContentLoaded', function() {
    var Modalelem = document.querySelector('#sign-up-modal');
    var instance = M.Modal.init(Modalelem);
    instance.open();
});

M.AutoInit();

document.querySelector('#login-switch').addEventListener('change', function() {
    var isChecked = document.getElementById('login-switch').checked;

    if (isChecked) {
        alert('checked')
    } else {
        alert('not checked!')
    }
});