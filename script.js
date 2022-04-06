const canvas = document.querySelector('#canvasSection')

const draw = SVG().addTo('#canvasSection').size(1000, 700).attr({id: 'svg'})

const instrumentsEl = document.querySelector('#shapesSection')
const clearBtnEl = document.querySelector('#clearBtn')
const svg = document.querySelector('#svg')

let r = 0;
let x = 0;
let y = 0;
let x2 = 0;
let y2 = 0;
let w = 0;
let h = 0;
let isDrowing = false;
let curentInstrument = 'select';
let id = 1;
const coords = []

svg.addEventListener('mousedown', onMouseDown)
svg.addEventListener('mouseup', onMouseUp)
svg.addEventListener('mousemove', onMouseMove)
instrumentsEl.addEventListener('click', onInstrumentClick)
clearBtnEl.addEventListener('click', onClearBtnClick)

function onInstrumentClick(e) {
    if (e.target.className === 'instruments') {
        curentInstrument = e.target.id
    }
}

function onMouseDown(e) {
    x = e.offsetX
    y = e.offsetY
    x2 = e.offsetX
    y2 = e.offsetY
    isDrowing = true;
    coords.push(x)
    coords.push(y)

    switch(curentInstrument) {
        case 'line':
            createLine(x, y, x2, y2)
            break
        case 'circle':
            createCircle(r)
            break
        case 'ellipse':
            createEllipse(x, y)
            break
        case 'rectangle':
            createRectangle(x, y, w, h)
            break
        case 'pencil':
            pencil(coords, x, y)
            break
        case 'select':
            selectTool()
            break
    }
}

function onMouseMove(e) {
    if (isDrowing) {
        r = e.offsetX - x;
        x2 = e.offsetX
        y2 = e.offsetY
        w = e.offsetX - x;
        h = e.offsetY - y;

        r < 0 ? r *= -1 : r
        w < 0 ? w *= -1 : w
        h < 0 ? h *= -1 : h

        switch(curentInstrument) {
            case 'line':
                line.attr({x2: x2, y2: y2})
                break
            case 'circle':
                circle.attr({r: r})
                break
            case 'ellipse':
                ellipse.attr({rx: w, ry: h})
                break
            case 'rectangle':
                rectangle.attr({width: `${w}`, height: `${h}`})
                break
            case 'pencil':
                coords.push(x2, y2)
                polyline.plot(coords)
                break
            case 'select':
                selectTool()
                break
        }
    }
}

function onMouseUp(e) {
    if (isDrowing) {
        x = 0;
        y = 0;
        r = 0;
        w = 0;
        h = 0;
        x2 = 0;
        y2 = 0;
        coords.length = 0
        ++id
        isDrowing = false;
    }
}

function onClearBtnClick(e) {
    svg.textContent = ''
}

function createLine(x1, y1, x2, y2) {
    return line = draw.line(x1, y1, x2, y2)
    .stroke({width: 4, color: "blue"})
    .attr({id: `${id}l`})
}

function createCircle(radius) {
    return circle = draw.circle(radius)
    .attr({id: `${id}c`, fill: '#098', stroke: "#000", strokeWindt: 5})
    .move(x, y);
}

function createEllipse(x, y, w, h) {
    return ellipse = draw.ellipse(w, h)
    .attr({id: `${id}e`, fill: 'red', strokeWidth: 1, stroke: 'black'})
    .move(x, y)
}

function createRectangle(x, y, w, h) {
    return rectangle = draw.rect(w, h)
    .attr({id: `${id}r`, fill: "#f06", stroke: "#000", strokeWidth: 5})
    .move(x, y);
}

function pencil(arr, x, y) {
    return polyline = draw.polyline(arr).fill('none')
    .stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })
    .attr({id: `${id}p`})
    .move(x, y)
}

function selectTool() {}
