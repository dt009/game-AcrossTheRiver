// 这是我们的玩家要躲避的敌人 
var Enemy = function (index) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.position = [80, 160, 240];
    this.x = -100;

    this.index = index;

    this.speed = Math.floor(Math.random() * 400) + 100;
    this.y = this.position[Math.floor(Math.random() * 3)];

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x >= 500) {
        allEnemies.splice(this.index, 1, new Enemy(this.index))
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 碰撞函数
Enemy.prototype.checkCollisions = function (player) {
    if (this.x - player.x < 20 && this.x - player.x > -80 && this.y === player.y) {
        player.x = 200;
        player.y = 400;
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

var Player = function () {
    this.x = 200;
    this.y = 400;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case 'left':
            if (this.x <= 0) {
                this.x = 0;
            }
            else {
                this.x -= 100;
            }
            break;
        case 'right':
            if (this.x >= 400) {
                this.x = 400;
            }
            else {
                this.x += 100;
            }
            break;
        case 'up':
            if (this.y <= 0) {
                this.y = 0;
            }
            else {
                this.y -= 80;
            }
            break;
        case 'down':
            if (this.y >= 400) {
                this.y = 400;
            }
            else {
                this.y += 80;
            }
            break;
    }

    if (this.y <= 0) {
        alert('完成');
        this.y = 400;
    }
};


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [new Enemy(0), new Enemy(1), new Enemy(2)];
var player = new Player();


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
