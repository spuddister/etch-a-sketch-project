
const gridContainer = document.getElementById('grid-container');
let rainbow = false;
let eraser = false;
let shader = false;
let colour = false;
let colourHex = document.getElementById('colour-wheel').value;
let gridSize = 8;
gridDraw();

//----------------------------------------------------------------------------------------------------

//BUTTONS AND SLIDERS

const colourSelector = document.getElementById('colour-wheel').addEventListener('change', colourSelect);
const colourBtn = document.getElementById('colour-mode').addEventListener('click', colourToggle);
const rainbowBtn = document.getElementById('rainbow-mode').addEventListener('click', rainbowToggle);
const shaderBtn = document.getElementById('shader-mode').addEventListener('click', shaderToggle);
const eraserBtn = document.getElementById('eraser').addEventListener('click', eraserToggle);
const gridSizeSlider = document.getElementById('grid-size-slider');

gridSizeSlider.addEventListener('input', function(){
    document.getElementById('grid-size-value').textContent = this.value + ' x ' + this.value;
})

gridSizeSlider.addEventListener('mouseup', function(e){
    gridSize = this.value;
    gridDraw();
})

//Clear all grid squares via clear button 
const clearBtn = document.getElementById('clear').addEventListener('click', function(){
    gridElements.forEach(element => {
        element.style.backgroundColor = 'rgb(255, 255, 255)';
    });
});

//----------------------------------------------------------------------------------------------------

//Functions

function addSquare() {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridSquare.style.flexBasis = 100/gridSize + '%';
    gridContainer.appendChild(gridSquare);
}

//Painter function alters the background colour of the grid squares depending on which modes are selected
function painter(e) {
    if (eraser) {
        e.target.style.backgroundColor = 'rgb(255, 255, 255)';
    } else if (rainbow) {
        e.target.style.backgroundColor = 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')';
    } else if (shader) {
        let rgb = e.target.style.backgroundColor;
        rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
        rgb[0] = (rgb[0]-30) < 0 ? 0 : (rgb[0]-30);
        rgb[1] = (rgb[1]-30) < 0 ? 0 : (rgb[1]-30);
        rgb[2] = (rgb[2]-30) < 0 ? 0 : (rgb[2]-30);
        e.target.style.backgroundColor = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] +')';
    } else if (colour && typeof colourHex != 'undefined') {
        let red = parseInt(colourHex[1]+colourHex[2],16);
        let green = parseInt(colourHex[3]+colourHex[4],16);
        let blue = parseInt(colourHex[5]+colourHex[6],16);
        e.target.style.backgroundColor = 'rgb(' + red + ', ' + green + ', ' + blue +')';
    } else {
        e.target.style.backgroundColor = 'rgb(0,0,0)';
    }
}

//This function redraws the grid using the addSquare function when the size is changed by the user
function gridDraw(){
    if (typeof gridElements != 'undefined') {
        gridElements.forEach(element => {
            element.remove();
        })
    }
    for (i = 0; i < gridSize*gridSize; i++) addSquare();
    gridElements = Array.from(document.getElementsByClassName('grid-square'));
    gridElements.forEach(element => {
        element.addEventListener('mouseover', painter);
        element.style.backgroundColor = 'rgb(255,255,255)';
    });
}

function colourSelect(e) {
    colourHex = e.target.value;
}

function colourToggle(e) {
    if (colour) {
        colour = false;
        document.getElementById('colour-mode').classList.remove('pressed');
    } else {
        colour = true;
        document.getElementById('colour-mode').classList.add('pressed');
        if (eraser) eraserToggle();
        if (shader) shaderToggle();
        if (rainbow) rainbowToggle();
    }
}

function rainbowToggle() {
    if (rainbow) {
        rainbow = false;
        document.getElementById('rainbow-mode').classList.remove('pressed');
    } else {
        rainbow = true;
        document.getElementById('rainbow-mode').classList.add('pressed');
        if (eraser) eraserToggle();
        if (shader) shaderToggle();
        if (colour) colourToggle();
    }
}

function shaderToggle() {
    if (shader) {
        shader = false;
        document.getElementById('shader-mode').classList.remove('pressed');
    } else {
        shader = true;
        document.getElementById('shader-mode').classList.add('pressed');
        if (rainbow) rainbowToggle();
        if (eraser) eraserToggle();
        if (colour) colourToggle();
    }
}

function eraserToggle() {
    if (eraser) {
        eraser = false;
        document.getElementById('eraser').classList.remove('pressed');
    } else {
        eraser = true;
        document.getElementById('eraser').classList.add('pressed');
        if (rainbow) rainbowToggle();
        if (shader) shaderToggle();
        if (colour) colourToggle();
    }
}
