const readline = require('readline');

let pos = { x: 1, y: 1 };

const cols = 20;
const rows = 10;

function dibujarGrid() {

    console.clear();

    for (let y = 0; y < rows; y++) {

        let top = "";
        for (let x = 0; x < cols; x++) {
            top += "+---";
        }
        console.log(top + "+");

        let mid = "";
        for (let x = 0; x < cols; x++) {

            if (x === pos.x && y === pos.y) {
                mid += "| 𐀪 ";
            } else {
                mid += "|   ";
            }

        }
        console.log(mid + "|");
    }

    console.log("+---".repeat(cols) + "+");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function doMove(cmd) {

    switch (cmd) {
        case 'u':
            pos.y = Math.max(0, pos.y - 1);
            break;
        case 'd':
            pos.y = Math.min(rows - 1, pos.y + 1);
            break;
        case 'l':
            pos.x = Math.max(0, pos.x - 1);
            break;
        case 'r':
            pos.x = Math.min(cols - 1, pos.x + 1);
            break;
        default:
            console.log("Comandos: u, d, l, r, exit");
            return;
    }
}

function procesarComando(c) {

    const firstCmd = c[0];

    switch (firstCmd) {

        case 'multiple':
            for (let i = 1; i < c.length; i++) {
                const cmd = c[i];
                doMove(cmd);
            }
            break;

    }

}

dibujarGrid();

rl.on('line', (input) => {

    const cmd = input.trim().toLowerCase();

    //Verificar si hay varios comandos en la misma línea
    if (cmd.split(" ").length > 1) {
        const commands = cmd.split(" ");
        procesarComando(commands);
    } else {
        doMove(cmd);
    }

    dibujarGrid();
});