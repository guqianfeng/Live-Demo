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
    constructor({x, y, r, speedX, speedY, speedR}) {
        this.x = x;
        this.y = y;
        this.r = r;
        if(!Array.isArray(speedX)){
            this.vx = randomRange(speedX, -speedX);
        }else{
            this.vx = randomRange(speedX[0], speedX[1]);
        }
        if(!Array.isArray(speedY)){
            this.vy = randomRange(speedY, -speedY);
        }else{
            this.vy = randomRange(speedY[0], speedY[1]);
        }
        this.vr = this.targetR = speedR;
        this.color = randomColor();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.r -= this.vr;
    }
}

class ParticleCanvas {
    constructor(options) {
        let defaultOpts = {
            cW: 300,
            cH: 150,
            r: 8,
            speedX: 4,//速度x,y可设置区间如[1, 3]，如果设置单个数字，则区间为[-数字, +数字]
            speedY: 4,
            speedR: 0.02,
            type: 0, //0中心点 1随机 2中心底部
        };
        this.opts = {...defaultOpts, ...options};
        this.particles = [];
        this.timer = 0;
    }

    init() {
        let oCvs = document.createElement("canvas");
        this.cW = oCvs.width = this.opts.cW;
        this.cH = oCvs.height = this.opts.cH;
        this.ctx = oCvs.getContext("2d");
        document.body.appendChild(oCvs);
        this.drawBg();

    }

    drawBg() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.cW, this.cH);
    }

    spawnParticles() {
        let types = [{x: this.opts.cW / 2, y: this.opts.cH / 2}, {x: randomRange(this.cW), y: randomRange(this.cH)}, {x: this.cW / 2, y: this.cH}];
        this.particles.push(new Particle({
            x: types[this.opts.type].x,
            y: types[this.opts.type].y,
            r: this.opts.r,
            speedX: this.opts.speedX,
            speedY: this.opts.speedY,
            speedR: this.opts.speedR,
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
        this.particles = this.particles.filter(item => item.r > item.targetR);
    }

    loop() {
        this.ctx.fillStyle = "rgba(0, 0, 0, .2)";
        this.ctx.fillRect(0, 0, this.cW, this.cH);
        this.drawBg();
        this.spawnParticles();
        this.drawParticles();
        this.timer = requestAnimationFrame(this.loop.bind(this));
    }

    run() {
        this.init();
        this.loop();
    }
}