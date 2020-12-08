
// button click
document.getElementById('ok').onclick = () => {
    const textbox = document.getElementById('count');
    const count = parseInt(textbox.value, 10);
    if (count <= 0) {
        textbox.style.borderColor = "#f24822"; // red from figma-plugin-ds css
        //set message
        document.getElementById('notification').innerHTML = '<div class="icon icon--warning icon--red"></div><div class="type">Value must be higher than 0.</div>';
        // clear
        setTimeout(function () {
            document.getElementById("notification").innerHTML = "&nbsp;";
            textbox.style.borderColor = "white";
        }, 3500);
    }
    else {
        parent.postMessage({ pluginMessage: { type: 'subdivide-path', count } }, '*')
    }
}

// UI message
onmessage = (event) => {
    if (event.data.pluginMessage = 1001) { // custom
        // set message
        document.getElementById('notification').innerHTML = '<div class="icon icon--warning icon--red"></div><div class="type">No valid path(s) selected.</div>';
        // clear
        setTimeout(function () {
            document.getElementById("notification").innerHTML = "&nbsp;";
        }, 3500);
    }
}