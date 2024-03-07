// 获取 canvas 元素和上下文
const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

// 设置画布尺寸
canvas.width = 600;
canvas.height = 400;

// 定义贪吃蛇初始位置和方向
let snake = [{x: 10, y: 10}];
let dx = 10;
let dy = 0;

// 定义食物初始位置
let food = {x: Math.floor(Math.random() * (canvas.width / 10)) * 10, y: Math.floor(Math.random() * (canvas.height / 10)) * 10};

// 绘制贪吃蛇
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// 游戏逻辑
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 移动贪吃蛇
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        food = {x: Math.floor(Math.random() * (canvas.width / 10)) * 10, y: Math.floor(Math.random() * (canvas.height / 10)) * 10};
    } else {
        snake.pop();
    }

    // 绘制贪吃蛇和食物
    drawSnake();
    drawFood();

    // 检查是否碰到边界
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        clearInterval(gameInterval);
        alert('Game Over! You hit the wall.');
    }

    // 检查是否吃到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(gameInterval);
            alert('Game Over! You ate yourself.');
        }
    }
}

// 监听键盘事件
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -10;
    }
    if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 10;
    }
    if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -10;
        dy = 0;
    }
    if (e.key === 'ArrowRight' && dx === 0) {
        dx = 10;
        dy = 0;
    }
});

// 启动游戏循环
const gameInterval = setInterval(gameLoop, 100);
