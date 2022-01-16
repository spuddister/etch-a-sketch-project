
const gridContainer = document.getElementById('grid-container');
let gridSize = 12;

for (i = 0; i < gridSize*gridSize; i++) {
    addSquare();
}


function addSquare() {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridSquare.style.flexBasis = 100/gridSize + '%';
    gridContainer.appendChild(gridSquare);
}

// let squares = document.getElementsByClassName('grid-square');
// squares.forEach(square => {
//     console.log(square);
// });
// console.log(squares[0]);