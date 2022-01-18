
const gridContainer = document.getElementById('grid-container');
let rainbow = false;
let eraser = false;
let gridSize = 8;
for (i = 0; i < gridSize*gridSize; i++) addSquare();
let gridElements = Array.from(document.getElementsByClassName('grid-square'));

function addSquare() {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridSquare.style.flexBasis = 100/gridSize + '%';
    gridContainer.appendChild(gridSquare);
}

//Adding event listeners to all grid squares for changing background color
gridElements.forEach(element => {
    element.addEventListener('mouseover', painter);
});

//Painter function alters the background colour of the grid squares depending on which modes are selected
function painter(e) {
    if (eraser) {
        e.target.style.backgroundColor = 'white';
    } else if (rainbow) {
        e.target.style.backgroundColor = 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')';
    } else {
        e.target.style.backgroundColor = 'black';
    }
}


//BUTTONS AND SLIDERS
//Clear all grid squares via clear button functionality
const clearBtn = document.getElementById('clear').addEventListener('click', function(){
    gridElements.forEach(element => {
        element.style.backgroundColor = 'white';
    });
});

const rainbowBtn = document.getElementById('rainbow-mode').addEventListener('click', function(){
    if (rainbow) {
        rainbow = false;
    } else {
        rainbow = true;
    }
});

const eraserBtn = document.getElementById('eraser').addEventListener('click', function(){
    if (eraser) {
        eraser = false;
    } else {
        eraser = true;
    }
});

const gridSizeSlider = document.getElementById('grid-size-slider').addEventListener('input', function(){
    gridSize = this.value;
    document.getElementById('grid-size-value').textContent = gridSize;
})