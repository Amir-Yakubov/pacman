'use strict'

var PACMAN = '<img src="img/PACMAN.png">'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: ''
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN


}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            updateScore(1)
            console.log(nextLocation)
            // console.log(gGhosts)
            // console.log(gDeadGhosts)
            gDeadGhosts.push(gGhosts.splice(nextLocation, 1))
            // console.log(gDeadGhosts)
            // console.log(gGhosts)
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === CHERRY) updateScore(10)
    else if (nextCell === FOOD) updateScore(1)
    else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        PACMAN = '<img src="img/PACMANE.png">'
        updateScore(1)
        gPacman.isSuper = true
        setTimeout(backToNormal, 5000)
    }

    if (gGame.score >= 60) {
        victory()
        return
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    renderCell(nextLocation, getPacmanHTML())
}

function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.deg = '-90'
            // PACMAN = (gPacman.isSuper) ? '<img src="img/SpacmanUp.jpg">' : '<img src="img/pacmanUp.jpg">'
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.deg = '0'
            // PACMAN = (gPacman.isSuper) ? '<img src="img/SpacmanRight.jpg">' : '<img src="img/pacmanRight.jpg">'
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.deg = '90'
            // PACMAN = (gPacman.isSuper) ? '<img src="img/SpacmanDown.jpg">' : '<img src="img/pacmanDown.jpg">'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.deg = '180'
            // PACMAN = (gPacman.isSuper) ? '<img src="img/SpacmanLeft.jpg">' : '<img src="img/pacmanLeft.jpg">'
            break;
    }
    return nextLocation
}

function backToNormal() {
    gPacman.isSuper = false
    // console.log(gGhosts)
    // console.log(gDeadGhosts)
    gGhosts.push(gDeadGhosts.splice(0))
    // console.log(gDeadGhosts)
    // console.log(gGhosts)
    PACMAN = '<img src="img/PACMAN.png">'
}

function getPacmanHTML() {
    return `<div class="pacman" style="transform: rotate(${gPacman.deg}deg)">${PACMAN}</span>`
}