"use strict";

const clone = require("clone");

// isLonely() - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// isSupported() - Any live cell with two or three live neighbours lives on to the next generation.
// isOverpopulated() - Any live cell with more than three live neighbours dies, as if by overpopulation.
// isSpawned() - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

//challenge: remove all comments, all function size: 10 lines max, idiot-proof naming

function aliveCellsAroundMiddleCell(world, x, y) {
    return world[x - 1][y - 1] +
        world[x][y - 1] +
        world[x + 1][y - 1] +
        world[x - 1][y] +
        world[x + 1][y] +
        world[x - 1][y + 1] +
        world[x][y + 1] +
        world[x + 1][y + 1];
}
function aliveCellsAroundTopLeftCell(world, x, y) {
    return world[1][1] +
        world[0][1] +
        world[1][0];
}
function aliveCellsAroundTopRightCell(world, x, y) {
    return world[x][y - 1] +
        world[x + 1][y - 1] +
        world[x + 1][y];
}
function aliveCellsAroundTopMiddleCell(world, x, y) {
    return world[x][y - 1] +
        world[x][y + 1] +
        world[x + 1][y - 1] +
        world[x + 1][y] +
        world[x + 1][y + 1];
}
function aliveCellsAroundBottomLeftCell(world, x, y) {
    return world[x - 1][y] +
        world[x - 1][y + 1] +
        world[x][y + 1];
}
function aliveCellsAroundBottomRightCell(world, x, y) {
    return world[x - 1][y] +
        world[x - 1][y - 1] +
        world[x][y - 1];
}
function aliveCellsAroundBottomMiddleCell(world, x, y) {
    return world[x][y - 1] +
        world[x][y + 1] +
        world[x - 1][y - 1] +
        world[x - 1][y] +
        world[x - 1][y + 1];
}
function aliveCellsAroundLeftMiddleCell(world, x, y) {
    return world[x - 1][y] +
        world[x + 1][y] +
        world[x - 1][y + 1] +
        world[x][y + 1] +
        world[x + 1][y + 1];
}
function aliveCellsAroundRightMiddleCell(world, x, y) {
    return world[x - 1][y] +
        world[x + 1][y] +
        world[x - 1][y - 1] +
        world[x][y - 1] +
        world[x + 1][y - 1];
}

function cellPosition(world, x, y){
    let position = "Unknown";

    position = ((x !== 0) && (x !== world.length - 1)) && ((y !== 0) && (y !== world.length - 1)) ? "Middle" : position;
    position = (x === 0 && y === 0) ? "Top Left" : position;
    position = (x === 0 && y === world.length - 1) ? "Top Right" : position;
    position = (x === 0 && (y !== 0 && y !== world.length - 1)) ? "Top Middle" : position;
    position = (x === world.length - 1 && y === 0) ? "Bottom Left" : position;
    position = (x === world.length - 1 && y === world.length - 1) ? "Bottom Right" : position;
    position = (x === world.length - 1 && y !== 0 && y !== world.length - 1) ? "Bottom Middle" : position;
    position = (y === 0 && (x !== 0 && (x !== world.length - 1))) ? "Left Middle" : position;
    position = (y === world.length - 1 && (x !== 0 && (x !== world.length - 1))) ? "Right Middle" : position;

    return position;
}

function liveCellsAround(world, x, y) {
    let count = 0;

    switch (cellPosition(world, x, y)){
        case "Middle":
            count = aliveCellsAroundMiddleCell(world, x, y);
            break;
        case "Top Left":
            count = aliveCellsAroundTopLeftCell(world, x, y);
            break;
        case "Top Right":
            count = aliveCellsAroundTopRightCell(world, x, y);
            break;
        case "Top Middle":
            count = aliveCellsAroundTopMiddleCell(world, x, y);
            break;
        case "Bottom Left":
            count = aliveCellsAroundBottomLeftCell(world, x, y);
            break;
        case "Bottom Right":
            count = aliveCellsAroundBottomRightCell(world, x, y);
            break;
        case "Bottom Middle":
            count = aliveCellsAroundBottomMiddleCell(world, x, y);
            break;
        case "Left Middle":
            count = aliveCellsAroundLeftMiddleCell(world, x, y);
            break;
        case "Right Middle":
            count = aliveCellsAroundRightMiddleCell(world, x, y);
            break;
    }

    return count;
}


function ifCellLonely(world, x, y) {
    if (liveCellsAround(world, x, y) < 2) {
        return true;
    } else {
        return false;
    }
}
function ifCellSupported(world, x, y) {
    if (liveCellsAround(world, x, y) === 2 || liveCellsAround(world, x, y) === 3) {
        return true;
    } else {
        return false;
    }
}
function ifCellOverpopulated(world, x, y) {
    if (liveCellsAround(world, x, y) > 3) {
        return true;
    } else {
        return false;
    }
}
function ifThreeNeighbours(world, x, y) {
    if (liveCellsAround(world, x, y) === 3) {
        return true;
    } else {
        return false;
    }
}

function live(toLive, newWorld, x, y) {
    if (toLive) {
        newWorld[x][y] = 1;
    }
}
function die(toDie, newWorld, x, y) {
    if (toDie) {
        newWorld[x][y] = 0;
    }
}
function spawn(toSpawn, newWorld, x, y) {
    if (toSpawn) {
        newWorld[x][y] = 1;
    }
}


function nextTick(world) {
    let newWorld = clone(world);

    for (let x = 0; x < world.length; x++) {
        for (let y = 0; y < world.length; y++) {
            if (world[x][y] === 0) {
                spawn(ifThreeNeighbours(world, x, y), newWorld, x, y);
            } else {
                die(ifCellLonely(world, x, y), newWorld, x, y);
                die(ifCellOverpopulated(world, x, y), newWorld, x, y);
                live(ifCellSupported(world, x, y), newWorld, x, y);
            }
        }
    }
    return newWorld;
}


module.exports = {
    nextTick: nextTick,
    liveCellsAround: liveCellsAround
};