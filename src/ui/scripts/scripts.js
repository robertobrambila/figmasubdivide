
// set focus on divisions input field
const textbox = document.getElementById('divisionCount');
textbox.focus();
textbox.select();

// simulate button click when you hit Enter in the input field
textbox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById('ok').click();
    }
  });

// button click
document.getElementById('ok').onclick = () => {
    const divisionCount = parseInt(textbox.value, 10);
    if (divisionCount <= 0 || textbox.value.length == 0) {
        textbox.style.borderColor = '#f24822'; // red from figma-plugin-ds css
        //set message
        document.getElementById('notification').innerHTML = '<div class="icon icon--warning icon--red"></div><div class="type">Value must be higher than 0.</div>';
        // clear
        setTimeout(function () {
            document.getElementById('notification').innerHTML = '&nbsp;';
            textbox.style.borderColor = 'white';
        }, 3500);
    }
    else {
        parent.postMessage({ pluginMessage: { type: 'subdivide-path', divisionCount } }, '*')
    }
}

// UI message
onmessage = (event) => {
    if (event.data.pluginMessage['divisionCount']) { // incoming message from plugin: load stored divisionCount
        document.getElementById('divisionCount').value = event.data.pluginMessage['divisionCount'];
    }
    else if (event.data.pluginMessage = 1001) { // incoming message from plugin: nothing selected
        // set message
        document.getElementById('notification').innerHTML = '<div class="icon icon--warning icon--red"></div><div class="type">No valid path(s) selected.</div>';
        // clear
        setTimeout(function () {
            document.getElementById('notification').innerHTML = '&nbsp;';
        }, 3500);
    }
}