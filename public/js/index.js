function addElem(numElements, elementId) {
    for (let i = 0; i < numElements; i++) {
        let elm = document.createElement("img");
        elm.src = "images/invader.gif";
        elm.setAttribute("class", "invader");
        document.getElementById(elementId).appendChild(elm);
    }
}

var lines = [2, 4, 9, 9, 7, 5, 3, 1 ]
var ids = [
    ["line_01_A", "line_01_B"],
    ["line_02_A", "line_02_B"],
    "line_03",
    "line_04",
    "line_05",
    "line_06",
    "line_07",
    "line_08"
]

function buildElem() {
    lines.forEach((value, index) => {
        if (index < 2) {
            let elemId = ids[index][0];
            addElem(value, elemId);

            elemId = ids[index][1];
            addElem(value, elemId);
        } else {
            let elemId = ids[index];
            addElem(value, elemId);
        }
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    buildElem();
});
