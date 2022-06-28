window.addEventListener('DOMContentLoaded', () => {
  let notAfk = true //makes sure the game is active
  let currentPlayer = 'X' //player X will always start first
  let board = ['', '', '', '', '', '', '', '', ''] //empty board

  const boxes = Array.from(document.querySelectorAll('.box'))
  const announcer = document.querySelector('.announcer')
  const resetButton = document.querySelector('#reset')
  const playerDis = document.querySelector('.display-player')

  const winCon = [
    //patterns of how wins will be made
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const PLAYERX_WIN = 'PLAYERX_WIN'
  const PLAYERO_WIN = 'PLAYERO_WIN'
  const TIE = 'TIE'

  function getResults() {
    //this is how a win will be given, when 3 in a row has been made
    let roundWon = false
    for (let i = 0; i <= 7; i++) {
      const winWin = winCon[i]
      const a = board[winWin[0]]
      const b = board[winWin[1]]
      const c = board[winWin[2]]
      if (a === '' || b === '' || c === '') {
        continue
      }
      if (a === b && b === c) {
        roundWon = true
        break
      }
    }

    if (roundWon) {
      //shows which player has won the round
      announce(currentPlayer === 'X' ? PLAYERX_WIN : PLAYERO_WIN)
      notAfk = false
      return
    }

    if (!board.includes('')) announce(TIE)
  }

  const playerMove = (box, index) => {
    //when a box is clicked by a player, their index is inputted into the correct box
    if (aMove(box) && notAfk) {
      box.innerText = currentPlayer
      box.classList.add(`player${currentPlayer}`)
      updateBoard(index)
      getResults()
      changePlayer()
    }
  }

  const announce = (type) => {
    //shows which player wins or if a tie was created
    switch (type) {
      case PLAYERO_WIN:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won'
        break
      case PLAYERX_WIN:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won'
        break
      case TIE:
        announcer.innerText = 'TIE'
    }
    announcer.classList.remove('hide')
  }

  const aMove = (box) => {
    //same box cannot be selected
    if (box.innerText === 'X' || box.innerText === 'O') {
      return false
    }
    return true
  }

  const updateBoard = (index) => {
    //shows what the player has picked
    board[index] = currentPlayer
  }

  const changePlayer = () => {
    //alternates the players every time their move is done
    playerDis.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    playerDis.innerText = currentPlayer
    playerDis.classList.add(`player${currentPlayer}`)
  }

  const resetBoard = () => {
    //wipes the board of X and O, also resets the player announcer
    board = ['', '', '', '', '', '', '', '', '']
    if (currentPlayer === 'O') {
      changePlayer()
    }

    boxes.forEach((box) => {
      box.innerText = ''
      box.classList.remove('playerX')
      box.classList.remove('playerO')
    })
    notAfk = true
    announcer.classList.add('hide')
    announcer.innerHTML = '' //hides the announcer
  }

  boxes.forEach((box, index) => {
    //inputes players index into box
    box.addEventListener('click', () => playerMove(box, index))
  })

  resetButton.addEventListener('click', resetBoard)
})
