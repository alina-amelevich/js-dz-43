'use strict'

const field = document.querySelector('#field');
const ball = document.querySelector('#ball');
const paddleL = document.querySelector('#paddle-left');
const paddleR = document.querySelector('#paddle-right');

const fieldHeight = 400;
const fieldWidth = 800;
field.style.height = fieldHeight + 'px';
field.style.width = fieldWidth + 'px';

const paddleHeight = fieldHeight / 3;
const paddleWidth = 10;
paddleL.style.height = paddleR.style.height = paddleHeight + 'px';
paddleL.style.width = paddleR.style.width = paddleWidth + 'px';

const paddleSpeed = 3;

//Левую и Правую ракетки позиционируем вдоль левой и правой границ
const paddleLPosX = 0; 
const paddleRPosX = fieldWidth - paddleWidth;
paddleL.style.left = paddleLPosX + 'px';
paddleR.style.left = paddleRPosX + 'px';

let paddleLPosY;
let paddleRPosY;

const ballDiameter = 25;
const ballRadius = ballDiameter / 2;
ball.style.height = ball.style.width = ballDiameter + 'px';
let ballX;
let ballY;
let speedX = 4;
let speedY = 4;

//Счётчик результатов
let lWins = document.querySelector('#left-wins');
let rWins = document.querySelector('#right-wins');
let lWinsNum = parseInt(lWins.textContent);
let rWinsNum = parseInt(rWins.textContent);

let isGameActive = false;
const button1 = document.querySelector('#button1');

//Задаем булевые переменные для записывания состояния клавиш
//(по дефолту не нажаты)
let pressedKeyW = false;
let pressedKeyS = false;
let pressedArrowUp = false;
let pressedArrowDown = false;

let key;

positioning();

function start() {
    //Чтобы функция start не срабатывала пока игра активна
    if (isGameActive) { return; }
    isGameActive = true;
    //Чтобы кнопка start на время игры была запрещенной
    button1.setAttribute('disabled', '');

    positioning();
    requestAnimationFrame(ballMove);
}

function positioning() {
    ballX = (fieldWidth / 2) - (ballDiameter / 2);
    ballY = (fieldHeight / 2) - (ballDiameter / 2);
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    paddleLPosY = (fieldHeight / 2) - (paddleHeight / 2);
    paddleRPosY = (fieldHeight / 2) - (paddleHeight / 2);
    paddleL.style.top = paddleLPosY + 'px';
    paddleR.style.top = paddleRPosY + 'px';

    //Вычисляем псевдослучайное направление мяча
    if (Math.round(Math.random())) {
        speedX *= -1;
    }
    if (Math.round(Math.random())) {
        speedY *= -1;
    }
}


function ballMove() {
    ballX += speedX;
    ballY += speedY;

    if ((ballX + ballDiameter) >= (fieldWidth - paddleWidth - 1)
        && (ballY - ballRadius) > paddleRPosY
        && (ballY + ballRadius) < (paddleRPosY + paddleHeight))
    {
        speedX = speedX * -1; //скорость меняет знак, чтобы мяч полетел в противоположном направлении
    } else if (ballX <= (paddleWidth + 1) 
    && (ballY - ballRadius) > paddleLPosY 
    && (ballY + ballRadius) < (paddleLPosY + paddleHeight)) 
    {
        //Мяч коснулся левой ракетки
        speedX = speedX * -1; //скорость меняет знак, чтобы мяч полетел в противоположном направлении
    } else if (ballX >= (fieldWidth - ballDiameter)) {
        //Мяч коснулся правой границы
        ballX = fieldWidth - ballDiameter;
        ball.style.left = ballX + 'px';
        lWinsNum +=1;
        lWins.textContent = lWinsNum;
        isGameActive = false;
        button1.removeAttribute('disabled');
        return;
    }

    if (ballX <= 0) {
        //Мяч коснулся левой границы
        ballX = 0;
        ball.style.left = ballX + 'px';
        rWinsNum += 1;
        rWins.textContent = rWinsNum;
        isGameActive = false;
        button1.removeAttribute('disabled');
        return;
    } else if (ballY >= (fieldHeight - ballDiameter)) {
        //Мяч коснулся нижней границы
        speedY = speedY * -1; //скорость меняет знак, чтобы мяч полетел в противоположном направлении
        ballY = fieldHeight - ballDiameter;
    } else if (ballY <= 0) {
        //Мяч коснулся верхней границы
        speedY = speedY * -1; //скорость меняет знак, чтобы мяч полетел в противоположном направлении
        ballY = 0;
    }

    //Применяем позиционирование
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    requestAnimationFrame(ballMove);
}

//Если на наж.любая клавиша запускается функция paddlesControlCheck
window.addEventListener('keydown', paddlesControlCheck); 
window.addEventListener('keyup', keyUp); 

function paddlesControlCheck(EO) {
    EO = EO || window.event;
    if (!isGameActive || EO.repeat) { 
        return; 
    }
    
    //Кладем в переменную key СТРОКУ с названием нажатой клавиши
    key = EO.code;
    console.log('key Down:', key);

    //Проверяем, зажата ли нужная клавиша, 
    //если да, меняем состояние(зеачение булевой переменной) на true
    if (key === 'KeyW') { 
        pressedKeyW = true;
    } else if (key === 'KeyS') {
        pressedKeyS = true;
    } else if (key === 'ArrowUp') {
        pressedArrowUp = true;
    } else if (key === 'ArrowDown') {
        pressedArrowDown = true;
    } else {
        return;
    }

    //В зависимости от нажатой клавиши вызывается таймер
    if (pressedKeyW && (paddleLPosY > 0)) {
        EO.preventDefault();
        requestAnimationFrame(leftPaddleMoveUp);
    } else if (pressedKeyS && (paddleLPosY < (fieldHeight - paddleHeight))) {
        EO.preventDefault();
        requestAnimationFrame(leftPaddleMoveDown);
    } else if (pressedArrowUp && (paddleRPosY > 0)) {
        EO.preventDefault();
        requestAnimationFrame(rightPaddleMoveUp);
    } else if (pressedArrowDown && (paddleRPosY < (fieldHeight - paddleHeight))) { 
        EO.preventDefault();
        requestAnimationFrame(rightPaddleMoveDown);
    }
}
//Движение левой ракетки вверх
function leftPaddleMoveUp() {
    if (pressedKeyW && paddleLPosY > 0) {
        paddleLPosY -= paddleSpeed;
        paddleL.style.top = paddleLPosY + 'px';
        requestAnimationFrame(leftPaddleMoveUp);
    }
}
//Движение левой ракетки вниз
function leftPaddleMoveDown() {
    if (pressedKeyS && (paddleLPosY < (fieldHeight - paddleHeight))) {
        paddleLPosY += paddleSpeed;
        paddleL.style.top = paddleLPosY + 'px';
        requestAnimationFrame(leftPaddleMoveDown);
    }
}
//Движение правой ракетки вверх
function rightPaddleMoveUp() {
    if (pressedArrowUp && (paddleRPosY > 0)) {
        paddleRPosY -= paddleSpeed;
        paddleR.style.top = paddleRPosY + 'px';
        requestAnimationFrame(rightPaddleMoveUp);
    }
}
//Движение правой ракетки вниз
function rightPaddleMoveDown() {
    if (pressedArrowDown && (paddleRPosY < (fieldHeight - paddleHeight))) { 
        paddleRPosY += paddleSpeed;
        paddleR.style.top = paddleRPosY + 'px';
        requestAnimationFrame(rightPaddleMoveDown);
    }
}

//При отпускании клавиш в соответствующую булевую переменную записывается false
function keyUp() {
    if (key === 'KeyW') { 
        pressedKeyW = false;
    } else if (key === 'KeyS') {
        pressedKeyS = false;
    } else if (key === 'ArrowUp') {
        pressedArrowUp = false;
    } else if (key === 'ArrowDown') {
        pressedArrowDown = false;
    }
    console.log('key UP:', key)
}