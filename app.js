const width = 28
const grid = document.querySelector(".gridContainer")
const scoreDisplay = document.getElementById("score")
const button = document.getElementById('startbtn')
let squares = []
let score = 0
let pacManCurrentIndex = 489

 
// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
    1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
    4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1,
]

//create board
function createBoard() {
    //for loop
    for (let i = 0; i < layout.length; i++) {
        //create a square
        const square = document.createElement("div")
            //put square in grid
        grid.appendChild(square)
            //put square in squares array
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add("pac-dots")
        } else if (layout[i] === 1) {
            squares[i].classList.add("wall")
        } else if (layout[i] === 2) {
            squares[i].classList.add("ghost-lair")
        } else if (layout[i] === 3) {
            squares[i].classList.add("power-pellets")
        }
    }
    squares[pacManCurrentIndex].classList.add("pac-man")
    
}
createBoard()

// ghosts

class Ghost {
    constructor(name, startIndex, speed) {
        this.name = name
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}
 
const ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500),
]
    ghosts.forEach((ghost) => {
        squares[ghost.startIndex].classList.add(ghost.name)
        squares[ghost.startIndex].classList.add("ghost")
        squares[ghost.startIndex].classList.remove("scared-ghost")
          
    })
 
   

button.innerText ='Start Game'


const constantsForWinAndLose = () =>{
    ghosts.forEach((ghost) => {
        squares[ghost.currentIndex].classList.remove(ghost.name)
        squares[ghost.currentIndex].classList.remove("ghost")
        squares[ghost.currentIndex].classList.remove("scared-ghost")
    })
    squares[pacManCurrentIndex].classList.remove("pac-man")

    button.classList.remove('disabled')
    button.classList.add('startbtn')
    button.innerHTML = 'Restart'
    document.querySelector('.startbtn').disabled  = false
    console.log(button)
    console.log('Game ended')
}

console.log('Game waiting to be started')
console.log(button)

 const startGame = () => {
     score = 0;
     scoreDisplay.innerHTML = " "
    createBoard()
     console.log('started')
     squares[pacManCurrentIndex].classList.remove("pac-man")
     pacManCurrentIndex = 489
     console.log(button)
     squares[pacManCurrentIndex].classList.add("pac-man")
    ghosts.forEach((ghost) => {
        ghost.currentIndex = ghost.startIndex
        squares[ghost.startIndex].classList.add(ghost.name)
        squares[ghost.startIndex].classList.add("ghost")
        squares[ghost.startIndex].classList.remove("scared-ghost")
    })
    addEventListener()
 document.querySelector('.startbtn').disabled  = true
 ghosts.forEach((ghost) => moveGhost(ghost))
 button.classList.remove('startbtn')
 button.classList.add('disabled')
 }


 button.addEventListener('click', startGame )

// move ghosts

function moveGhost(ghost) {
    const ghostDirectionArr = [1, -1, width, -width]
    let ghostDirections =
        ghostDirectionArr[Math.floor(Math.random() * ghostDirectionArr.length)]


    ghost.timerId = setInterval(() => {
        if (!squares[ghost.currentIndex + ghostDirections].classList.contains(
                "wall"
            ) &&
            !squares[ghost.currentIndex + ghostDirections].classList.contains("ghost")
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.name)
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
            ghost.currentIndex += ghostDirections

            squares[ghost.currentIndex].classList.add(ghost.name)
            squares[ghost.currentIndex].classList.add("ghost")
        } else {
            ghostDirections =
                ghostDirectionArr[Math.floor(Math.random() * ghostDirectionArr.length)]
        }

        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        if (squares[pacManCurrentIndex].classList.contains("scared-ghost")) {
            score += 100
        }
        checkForLose()
    }, ghost.speed)
}

// when packMan eats pacdots

function eatPacdots() {
    if (squares[pacManCurrentIndex].classList.contains("pac-dots")) {
        squares[pacManCurrentIndex].classList.remove("pac-dots")
        score++
        scoreDisplay.innerHTML = score
    }
}

function eatPowerpellets() {
    if (squares[pacManCurrentIndex].classList.contains("power-pellets")) {
        squares[pacManCurrentIndex].classList.remove("power-pellets")
        score += 100
        ghosts.forEach((ghost) => (ghost.isScared = true))

        setInterval(unScareGhost, 10000)
    }
}

const unScareGhost =() => ghosts.forEach((ghost) => (ghost.isScared = false))


// contoles
function controle(e) {
    squares[pacManCurrentIndex].classList.remove("pac-man")

    switch (e.keyCode) {
        case 37:
            if (!squares[pacManCurrentIndex - 1].classList.contains("wall") &&
                !squares[pacManCurrentIndex - 1].classList.contains("ghost-lair") &&
                pacManCurrentIndex % width != 0
            ) {
                pacManCurrentIndex -= 1

                if (pacManCurrentIndex === 364) {
                    pacManCurrentIndex = 391
                }
            }

            break
        case 38:
            {
                if (!squares[pacManCurrentIndex - width].classList.contains("wall") &&
                    !squares[pacManCurrentIndex - width].classList.contains(
                        "ghost-lair"
                    ) &&
                    pacManCurrentIndex - width >= 0
                ) {
                    pacManCurrentIndex -= width
                }
            }
            break
        case 39:
            {
                if (!squares[pacManCurrentIndex + 1].classList.contains("wall") &&
                    !squares[pacManCurrentIndex + 1].classList.contains("ghost-lair") &&
                    pacManCurrentIndex % width < width - 1
                ) {
                    pacManCurrentIndex += 1
                    if (pacManCurrentIndex === 391) {
                        pacManCurrentIndex = 364
                    }
                }
            }
            break

        case 40:
            {
                if (!squares[pacManCurrentIndex + width].classList.contains("wall") &&
                    !squares[pacManCurrentIndex + width].classList.contains(
                        "ghost-lair"
                    ) &&
                    pacManCurrentIndex + width < width * width
                ) {
                    pacManCurrentIndex += width
                }
            }
            break
    }

    squares[pacManCurrentIndex].classList.add("pac-man")
    eatPacdots()
    eatPowerpellets()
    checkForLose()
    checkForwin()
}

document.addEventListener("keydown", controle)

function checkForLose() {
    if (
        squares[pacManCurrentIndex].classList.contains("ghost") &&
        !squares[pacManCurrentIndex].classList.contains("scared-ghost")
    ) {
        clearGhostTimer()
        removeEventListener()
        scoreDisplay.innerHTML = " you've been busted!"
        constantsForWinAndLose()
      
         
    } 
}

function checkForwin() {
    if (score >= 634) {
        clearGhostTimer()
        removeEventListener()
        scoreDisplay.innerHTML = "You won!"
        constantsForWinAndLose()

    }
}

function clearGhostTimer() {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId))
}

function removeEventListener() {
    document.removeEventListener("keydown", controle)
}

const addEventListener=()=>  document.addEventListener("keydown", controle)
