
const grid = document.getElementById("grid")

let cellSize = 30
let cols = 0
let rows = 0

let playerX = 0
let playerY = 0

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "es-ES";
recognition.continuous = true;

const player = document.createElement("img")
player.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
player.className = "player"

function generarGrid(){

    grid.innerHTML = ""

    cols = Math.floor(window.innerWidth / cellSize)
    rows = Math.floor(window.innerHeight / cellSize)

    grid.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`
    grid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`

    for(let y=0; y<rows; y++){
        for(let x=0; x<cols; x++){

            const cell = document.createElement("div")
            cell.className = "cell"

            cell.style.width = cellSize+"px"
            cell.style.height = cellSize+"px"

            cell.dataset.x = x
            cell.dataset.y = y

            grid.appendChild(cell)
        }
    }

    moverPlayer()

}

function moverPlayer(){

    const celda = document.querySelector(`[data-x="${playerX}"][data-y="${playerY}"]`)
    if(celda){
        celda.appendChild(player)
    }

}

function mover(dx,dy){

    const newX = playerX + dx
    const newY = playerY + dy

    if(newX >=0 && newX < cols && newY >=0 && newY < rows){

        playerX = newX
        playerY = newY

        moverPlayer()
    }

}

document.addEventListener("keydown",(e)=>{

    if(e.key === "ArrowUp") mover(0,-1)
    if(e.key === "ArrowDown") mover(0,1)
    if(e.key === "ArrowLeft") mover(-1,0)
    if(e.key === "ArrowRight") mover(1,0)

})

recognition.onresult = function(event){

    const texto = event.results[event.results.length-1][0].transcript.toLowerCase();
    
    console.log("Escuchado:", texto);

    if(texto.includes("arriba")) mover(0,-1)
    if(texto.includes("abajo")) mover(0,1)
    if(texto.includes("izquierda")) mover(-1,0)
    if(texto.includes("derecha")) mover(1,0)

}

document.getElementById("toggleBorders").onclick = ()=>{
    grid.classList.toggle("show-borders")
}

document.getElementById("increaseSize").onclick = ()=>{
    cellSize += 5
    generarGrid()
}

document.getElementById("decreaseSize").onclick = ()=>{
    if(cellSize > 10){
        cellSize -= 5
        generarGrid()
    }
}

window.addEventListener("resize", generarGrid)

generarGrid()

recognition.start()