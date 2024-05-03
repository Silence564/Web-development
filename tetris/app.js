let animation; //анимация
let gameOver = false; //конец игры флаг
var audio = new Audio('08-game-over.mp3');
var audio1 = new Audio('klac.mp3');

var arr = JSON.parse(localStorage.getItem(String(localStorage.length -1)));
document.getElementById('name').textContent = arr.id;

button  = document.getElementById('button');
button.addEventListener('click', function(event) {
    button.disabled = true;
    audio1.play();
    start();
    playgame();
});

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 32;
const BLOCK_NEXT = 20;
const ALL = 7;

const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
const nextF = document.getElementById('figura-next');
const contextnext = nextF.getContext('2d');
const table = document.getElementById('record');
const tablectx = table.getContext('2d');

const COLORS = [
    'null',
    'aquamarine',
    'blue',
    'gold',
    'tomato',
    'fireBrick',
    'seaGreen',
    'darkOrchid'
];
Object.freeze(COLORS);

const TABLE = [
    100,
    300,
    600,
    1000
];
Object.freeze(TABLE);

const FIGURE = [
    [],
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
    [[3,3], [3, 3]],
    [[0, 0, 4], [4, 4, 4], [0, 0, 0]],
    [[5, 5, 0], [0, 5, 5], [0, 0, 0]],
    [[0, 6, 6], [6, 6, 0], [0, 0, 0]],
    [[0, 7, 0], [7, 7, 7], [0, 0, 0]]
];
Object.freeze(FIGURE);

var tetrominos = []; 
var playboard = [];

let tetromino;//текущая фигура в игре
let tetromino_next;

let count = 0;
let speed = 30;

let score = 0;
let lines = 0;
let level = 1; 

//случайное число для фигуры
function RandomFigure(min, max) {
    return Math.floor(Math.random() * max) + min;
}

//генерация цупочки фигур
function generate() {
    tetrominos.length = 0;
    for (let i = 0; i<ALL*ALL*ALL;i++){
        let rand = RandomFigure(1, ALL); //номер фигуры
        tetrominos.push(rand)
    }
}

//получаем фигуру для окошка
function copynext(){
    const temp = tetrominos[tetrominos.length - 1];
    const temp_matrix = FIGURE[temp];
    const col = (temp == 1) || (temp == 3) ? COLS / 4 - Math.round((temp_matrix[0].length) / 2) : Math.round(COLS / 3) - Math.round((temp_matrix[0].length) / 2);
    const row = temp == 1 ? 1 : 1.5;
    return {
        temp: temp,
        temp_matrix: temp_matrix,
        row: row,
        col: col
    };
}

//получаем фигуру
function nextTetramino() {
    if(tetrominos.length == 1 || tetrominos.length == 0)  {
        generate();
    }
    const temp = tetrominos.pop();
    const temp_matrix = FIGURE[temp];

    const col = COLS / 2 - Math.round((temp_matrix[0].length) / 2);
    const row = temp == 1 ? -1 : -2;
    return {
        temp: temp,
        temp_matrix: temp_matrix,
        row: row,
        col: col
    };
}

//отрисовка поля - массив
function start(){
    for (let row= -2; row < ROWS; row++) {
        playboard[row] = [];
        for (let col = 0; col < COLS; col++) {
            playboard[row][col] = 0;
        }
    } 
    tetromino = nextTetramino(); //текущая фигура в игре
    tetromino_next = copynext();
}

//начисление очков
function accrual(number) {
    if (number > 5) {number = 5;}
    score = score + TABLE[number-1];
    lines = lines + number;
    document.getElementById('score').textContent = score;
    document.getElementById('lines').textContent = lines;
    if (score > 400 && score < 601 && level != 2) {
        level = 2;
        document.getElementById('level').textContent = level;
        speed = speed - 5;
    }
    if (score > 600 && score < 801 && level != 3) {
        level = 3;
        document.getElementById('level').textContent = level;
        speed = speed - 5;
    }
    if (score > 800 && score < 1101 && level != 4) {
        level = 4;
        document.getElementById('level').textContent = level;
        speed = speed - 5;
    }
    if (score > 1100 && score < 1201 && level != 5) {
        level = 5;
        document.getElementById('level').textContent = level;
        speed = speed - 5;
    }
    if (score > 1200 && score < 1500) {
        level = 6;
        document.getElementById('level').textContent = level;
        speed = speed - 5;
    }
}

//проверка после вращения
function checking_after_rotation(matrix, cellrow, cellcoll){
    for ( let row = 0; row < matrix.length; row++){
        for (let coll = 0; coll < matrix[row].length; coll++){
            if (matrix[row][coll] && (cellcoll + coll < 0 || cellcoll + coll >= playboard[0].length ||
                cellrow + row >= playboard.length || playboard[cellrow + row][cellcoll + coll]))
                { return false;}
        }
    }
    return true;
}

//повороты фигуры
function figure_rotation(matrix){
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i])
    );
    return result;
}

//отрисовка таблицы рекордов
function table_record(){
    tablectx.strokeStyle = "#4B0082";
    tablectx.fillStyle = "#FFF8DC";
    tablectx.lineWidth = 8.5;
    tablectx.fillRect(0, 0, table.width, table.height);
    tablectx.strokeRect(0, 0, table.width, table.height);

    var tables = [];
    for (let i = 0; i < localStorage.length; i++){
        tables[i] = JSON.parse(localStorage.getItem(String(i)));
    }
    tables.sort(function (a, b){
        return a.score > b.score ? -1 : b.score > a.score ? 1 : 0;
    });
    let number;
    if (localStorage.length > 10){
        number = 10;
        
    }else{
        number = localStorage.length;
    }

    let h = 60;
    tablectx.globalAlpha = 1;
    tablectx.font = '45px Black Ops One';
    tablectx.textAlign = 'center';
    tablectx.textBaselina = 'middle';
    tablectx.fillStyle = '#191970';
    tablectx.fillText('NAME' + '    ' + 'SCORE' + '    ' + 'LEVEL',table.width / 2, h);
    
    for (let i = 0; i < number; i++){
        h = h + 60;
        tablectx.globalAlpha = 1;
        tablectx.font = '30px Black Ops One';
        tablectx.textAlign = 'center';
        tablectx.textBaselina = 'middle';
        tablectx.fillStyle = '#7B68EE';
        tablectx.fillText(String(tables[i].id) + '           ' + String(tables[i].score) + '           ' + String(tables[i].level),table.width / 2, h);
    }
}

//конец игры
function gameover() {
    cancelAnimationFrame(animation);
    gameOver = true;
    if (arr.score < score){
        arr.score = score;
        arr.level = level;
        arr.lines = lines;
        localStorage.setItem(String(localStorage.length - 1), JSON.stringify(arr));
    }
    context.fillStyle = "#FFA07A";
    context.globalAlpha = 0.5;
    context.fillRect(0,0, canvas.width, canvas.height);

    context.globalAlpha = 1;
    context.font = '40px Black Ops One';
    context.textAlign = 'center';
    context.textBaselina = 'middle';
    context.fillStyle = '#191970';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
    audio.play();
    table_record();
}

//постановка фигуры
function setting_the_shape() {
    let flag = 0;
    for (let row = 0; row < tetromino.temp_matrix.length; row++){
        for (let col =0; col <  tetromino.temp_matrix[row].length; col++){
            if (tetromino.temp_matrix[row][col]){
                if (tetromino.row + row < 0) {
                    return gameover();
                }
                playboard[tetromino.row + row][tetromino.col + col] = tetromino.temp;
            }
        }
    }
    for (let row = playboard.length - 1; row >=0;) {
        if (playboard[row].every(cell => !!cell)) {
            flag++;
            for (let r = row; r >= 0; r--){
                for (let c = 0; c < playboard[r].length; c++){
                    playboard[r][c] = playboard[r-1][c];
                }
            }
        } else{
            row--;
        }
    }
    if (flag) {accrual(flag);}
    tetromino = nextTetramino();
    tetromino_next = copynext();
}

//цикл игры
function playgame() {
    animation = requestAnimationFrame(playgame);
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextnext.clearRect(0, 0, nextF.width, nextF.height);

    for (let row= 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (playboard[row][col]) {
                const name = playboard[row][col];
                context.fillStyle = COLORS[name];
                context.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE-1, BLOCK_SIZE-1);
            }
        }
    }
    if (tetromino){
        if (++count > speed){
            tetromino.row++;
            count = 0;
            
            if (!checking_after_rotation(tetromino.temp_matrix, tetromino.row, tetromino.col)){
                tetromino.row--;
                setting_the_shape();
            }
        }

        contextnext.fillStyle = COLORS[tetromino_next.temp];
        for (let row = 0; row < tetromino_next.temp_matrix.length; row++){
            for (let col = 0; col < tetromino_next.temp_matrix[row].length; col++){
                if (tetromino_next.temp_matrix[row][col]) {
                    contextnext.fillRect((tetromino_next.col + col)* BLOCK_NEXT, (tetromino_next.row + row) * BLOCK_NEXT, BLOCK_NEXT-1, BLOCK_NEXT-1);
                }
            }
        }

        context.fillStyle = COLORS[tetromino.temp];
        for (let row = 0; row < tetromino.temp_matrix.length; row++){
            for (let col = 0; col < tetromino.temp_matrix[row].length; col++){
                if (tetromino.temp_matrix[row][col]) {
                    context.fillRect((tetromino.col + col) * BLOCK_SIZE, (tetromino.row + row) * BLOCK_SIZE, BLOCK_SIZE-1, BLOCK_SIZE-1);
                }
            }
        }
    }    
}

//клавиатура
document.addEventListener('keydown', function(event) {
    if (gameOver) return;

    if (event.keyCode == 38) { 
        const matrix = figure_rotation(tetromino.temp_matrix);
        if (checking_after_rotation(matrix, tetromino.row, tetromino.col)) {
            tetromino.temp_matrix = matrix;
        }
    }

    if (event.keyCode == 37) {
        const col_temp = tetromino.col -1;
        if (checking_after_rotation(tetromino.temp_matrix, tetromino.row, col_temp)) {
            tetromino.col = col_temp;
        }
    }

    if (event.keyCode == 39) {
        const col_temp = tetromino.col +1;
        if (checking_after_rotation(tetromino.temp_matrix, tetromino.row, col_temp)) {
            tetromino.col = col_temp;
        }
    }

    if (event.keyCode == 40) {
        const row_temp = tetromino.row + 1;
        if (!checking_after_rotation(tetromino.temp_matrix, row_temp, tetromino.col)) {
            tetromino.row = row_temp - 1;
            setting_the_shape();
            return;
        }
        tetromino.row = row_temp;
    }

});   

