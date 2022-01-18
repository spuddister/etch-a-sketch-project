
const gridContainer = document.getElementById('grid-container');
let rainbow = false;
let eraser = false;
let gridSize = 8;
for (i = 0; i < gridSize*gridSize; i++) addSquare();
let gridElements = Array.from(document.getElementsByClassName('grid-square'));



//Adding event listeners to all grid squares for changing background color
gridElements.forEach(element => {
    element.addEventListener('mouseover', painter);
});

//----------------------------------------------------------------------------------------------------

function addSquare() {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridSquare.style.flexBasis = 100/gridSize + '%';
    gridContainer.appendChild(gridSquare);
}

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

//This function redraws the grid using the addSquare function when the size is changed by the user
function gridRedraw(){
    gridElements.forEach(element => {
        element.remove();
    })
    for (i = 0; i < gridSize*gridSize; i++) addSquare();
    gridElements = Array.from(document.getElementsByClassName('grid-square'));
    gridElements.forEach(element => {
        element.addEventListener('mouseover', painter);
    });
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

const gridSizeSlider = document.getElementById('grid-size-slider');
gridSizeSlider.addEventListener('input', function(){
    document.getElementById('grid-size-value').textContent = this.value;
})
gridSizeSlider.addEventListener('mouseup', function(e){
    gridSize = this.value;
    gridRedraw();
})