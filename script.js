const svg = document.querySelector("#svg")
const clearBtnEl = document.querySelector("#clearBtn")
const intrumentEl = document.querySelector("#instruments")
const colorEl = document.querySelector("#color")
const widthEl = document.querySelector("#size")

const coordinatesArr = []
let x = 0
let y = 0

svg.addEventListener("mousemove", onMousePaint)
clearBtnEl.addEventListener("click", onBtnClear)
svg.addEventListener("mouseup", onClearCoords)
svg.addEventListener("mousedown", onClearCoords)

function onMousePaint(e) {
    if (e.buttons === 1 && intrumentEl.value === "pen") {
        coordinatesArr.push(`${e.offsetX},${e.offsetY}`)
        svg.insertAdjacentHTML("beforeend", `
            <polyline class="line" points="${coordinatesArr.join(" ")}" stroke=${colorEl.value} 
            stroke-width=${widthEl.value}px fill="none" />
        `);
    } else if (e.buttons === 1 && intrumentEl.value === "circle") {
        svg.insertAdjacentHTML("beforeend", `<circle cx=${x1} cy=${y1} r="50px" stroke="black" stroke-width="3" fill="red" />`);
    }
}

function onBtnClear(e) {
    svg.innerHTML = "";
    coordinatesArr.length = 0;
}

function onClearCoords(e) {
    coordinatesArr.length = 0;
    switch(e.type) {
        case "mousedown":
            x = e.offsetX
            y = e.offsetY
            break;
        case "mouseup":
            console.log(`${e.offsetX}, ${e.offsetY}`)
            break;
    }
}
