'use strict'

const WALL = '&#128307'
const FOOD = '.'
const CHERRY = '&#127826'
const EMPTY = ' '
const SUPER_FOOD = '*'

var gGame
var gGhosts
var gDeadGhosts
var gIntervalCherry


var gBoard

function onInit() {
    gGame = {
        score: 0,
        isOn: false,
        ghosts: gGhosts = [],
        'DeadGhosts': gDeadGhosts = []
    }
    gGame.isOn = true
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 1 && j === 1 || i === 1 && j === 8 || i === 8 && j === 8 || i === 8 && j === 1) board[i][j] = SUPER_FOOD
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || (j === 3 && i > 4 && i < size - 2)) board[i][j] = WALL
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    renderCell(gPacman.location, '🪦')
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    renderGameModal()
    gGame.isOn = false
}

function victory() {
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    renderGameModal('victory')
    gGame.isOn = false
}

function onRestartBtn() {
    onInit()
    renderGameModal()
    PACMAN = '<img src="img/pacmanRight.jpg">'
}

function renderGameModal(gameRes = '') {
    var elGameStatusText = document.querySelector('.game-status-text')
    var elRestartBtn = document.querySelector('.replay-btn')

    if (elRestartBtn.classList.contains('invisible')) {

        elRestartBtn.classList.remove('invisible')
        elGameStatusText.classList.remove('invisible')
    } else {
        elRestartBtn.classList.add('invisible')
        elGameStatusText.classList.add('invisible')
    }

    if (gameRes === 'victory') {
        elGameStatusText.classList.add('victory')
        elGameStatusText.innerText = 'Victory!'
    } else {
        elGameStatusText.classList.remove('victory')
        elGameStatusText.innerText = 'GAME OVER!'
    }

    clearInterval(gIntervalGhosts)
}

function renderCherry() {
    for (var i = 0; i < 5; i++) {
        var randLocation = generateIdx()
        if (gBoard[randLocation.i][randLocation.j] === PACMAN || gBoard[randLocation.i][randLocation.j] === GHOST) return
    }
    gBoard[randLocation.i][randLocation.j] = CHERRY
    renderCell(randLocation, CHERRY)
}

