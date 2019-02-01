document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('#new-pic-modal');
    var instances = M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.chips');
    var instances = M.Chips.init(elems);
});

// var instance = M.Tabs.init(el);
M.AutoInit();