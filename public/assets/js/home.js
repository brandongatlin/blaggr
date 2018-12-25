document.addEventListener('DOMContentLoaded', function() {
    var Modalelem = document.querySelector('#sign-up-modal');
    var instance = M.Modal.init(Modalelem);
    instance.open();
});

M.AutoInit();