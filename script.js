
const gridContainer = document.getElementById('grid-container');
let gridSize = 70;
for (i = 0; i < gridSize*gridSize; i++) {
    addSquare();
}
let gridElements = Array.from(document.getElementsByClassName('grid-square'));

function addSquare() {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridSquare.style.flexBasis = 100/gridSize + '%';
    gridContainer.appendChild(gridSquare);
}

//Adding event listeners to all grid squares for changing background color
gridElements.forEach(element => {
    element.addEventListener("mouseover", colourChange);
});

function colourChange(e) {
    e.target.style.backgroundColor = "black";
}

//Clear all grid squares via clear button functionality
const clearBtn = document.getElementById('clear').addEventListener('click', function(){
    gridElements.forEach(element => {
        element.style.backgroundColor = "white";
    });
});