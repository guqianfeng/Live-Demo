const {random, PI} = Math;
const randomRange = (min, max) => {
    if (!max) {
        max = min;
        min = 0;
    }
    if (max < min) {
        [min, max] = [max, min];
    }
    return (random() * (max - min + 1) | 0) + min;
};
const randomColor = () => "#" + (random() * 0xffffff | 0).toString(16).padStart(6, 0);

const deg2Rad = deg => deg * PI / 180;

class Particle {
    constructor({x, y, r, speedX, speedY, speedR, targetR}) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = randomColor();
        this.vx = randomRange(speedX[0], speedX[1]);
        this.vy = randomRange(speedY[0], speedY[1]);
        this.vr = speedR;
        this.targetR = targetR;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        this.r += this.vr;
    }
}

class ParticleCanvas {
    constructor(options) {
        let defaultOpts = {
            cW: 300,  //canvas宽度
            cH: 150, //canvas高度
            bornX: "center", //x轴出生位置 left 左 center 中间 right 右 random 随机
            bornY: "middle", //y轴出生位置 top 上 middle 中间 bottom 下 random 随机
            r: 3, //粒子初始半径
            speedX: [-4, 4], //粒子x方向速度范围，数组2个元素，速度可以随意换，也可以写成[4, -4]，但必须写2个值且传入的是数组
            speedY: [-4, 4], //粒子y方向速度范围，数组2个元素，速度可以随意换，也可以写成[4, -4]，但必须写2个值且传入的是数组
            speedR: -0.02, //半径速度，负数为半径变小， 正数为半径变大
            targetR: 0.02 //目标半径，当半径一直减小，有个目标点，不能减到负数吧。从数组中删除，当半径增大，也能设置目标点，不能一直变大吧
        };
        this.opts = Object.assign(defaultOpts, options);
        this.particles = [];
        this.timer = 0;
    }

    init() {
        let oCvs = document.createElement("canvas");
        this.ctx = oCvs.getContext("2d");
        this.cW = oCvs.width = this.opts.cW;
        this.cH = oCvs.height = this.opts.cH;
        document.body.appendChild(oCvs);
        this.drawBg();
    }

    drawBg() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.cW, this.cH);
    }

    spawnParticle() {
        let posX = {
            left: 0,
            center: this.cW / 2,
            right: this.cW,
        };
        let posY = {
            top: 0,
            middle: this.cH / 2,
            bottom: this.cH
        };
        this.particles.push(new Particle({
            x: posX[this.opts.bornX] ? posX[this.opts.bornX] : randomRange(this.cW),
            y: posY[this.opts.bornY] ? posY[this.opts.bornY] : randomRange(this.cH),
            r: this.opts.r,
            speedX: this.opts.speedX,
            speedY: this.opts.speedY,
            speedR: this.opts.speedR,
            targetR: this.opts.targetR,
        }));
    }

    drawParticles() {
        this.particles.forEach(item => {
            this.ctx.beginPath();
            this.ctx.fillStyle = item.color;
            this.ctx.arc(item.x, item.y, item.r, 0, deg2Rad(360));
            this.ctx.fill();
            item.update();
        });
        this.deleteParticles();
    }

    deleteParticles(){
        this.particles = this.particles.filter(item => {
            if(item.vr < 0){
                //半径减小，粒子越来越小，比目标半径小了就删除
                return item.r > item.targetR;
            }else{
                //半径增大，粒子越来越大，比目标半径大了就删除
                return item.r < item.targetR;
            }
        })
    }

    loop() {
        this.ctx.fillStyle = "rgba(0,0,0,.2)";
        this.ctx.fillRect(0, 0, this.cW, this.cH);
        this.spawnParticle();
        this.drawParticles();
        this.timer = requestAnimationFrame(this.loop.bind(this));
    }

    run() {
        this.init();
        this.loop();
    }
}