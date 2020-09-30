# canvas-ball
* 实现个简单的小球运动
* 代码如下
```js
      const { PI, random, sqrt } = Math;
      const randomColor = (_) =>
        "#" + ((random() * 0xffffff) | 0).toString(16).padStart(6, 0);
      const randomRange = (min, max) => {
        if (!max) {
          max = min;
          min = 0;
        }
        if (min > max) {
          [min, max] = [max, min];
        }
        return random() * (max - min) + min;
      };
      class Canvas {
        constructor(width = 400, height = 400, parent = document.body) {
          this.oCvs = document.createElement("canvas");
          this.oCvs.width = width;
          this.oCvs.height = height;
          this.ctx = this.oCvs.getContext("2d");
          parent.appendChild(this.oCvs);
        }
        drawBalls(balls) {
          for (const ball of balls) {
            ball.draw(ball, this);
          }
        }
      }

      class Ball {
        constructor(config) {
          Object.assign(
            this,
            {
              position: new Vector(20, 20),
              speed: new Vector(5, 3),
              color: "red",
              radius: 10,
            },
            config
          );
        }
        draw(ball, canvas) {
          canvas.ctx.beginPath();
          canvas.ctx.fillStyle = ball.color;
          canvas.ctx.arc(
            ball.position.x,
            ball.position.y,
            ball.radius,
            0,
            2 * PI
          );
          canvas.ctx.fill();
          canvas.ctx.closePath();
          this.update(canvas);
        }
        update(canvas) {
          if (this.position.x <= 0 || this.position.x >= canvas.oCvs.width) {
            this.speed = new Vector(-this.speed.x, this.speed.y);
          }
          if (this.position.y <= 0 || this.position.y >= canvas.oCvs.height) {
            this.speed = new Vector(this.speed.x, -this.speed.y);
          }
          // if (canvas.mousePosition) {
          //   const distance = canvas.mousePosition.subtract(this.position)
          //     .distance;
          //   if (distance < canvas.ruleDis) {
          //     if (!this.change) {
          //       this.change = true;
          //       this.radius *= 2;
          //     }
          //   } else {
          //     if (this.change) {
          //       this.radius /= 2;
          //       this.change = false;
          //     }
          //   }
          // }
          this.position = this.position.add(this.speed);
        }
      }

      class Vector {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
        add(vector) {
          return new Vector(this.x + vector.x, this.y + vector.y);
        }
        subtract(vector) {
          return new Vector(this.x - vector.x, this.y - vector.y);
        }
        get distance() {
          return sqrt(this.x ** 2 + this.y ** 2);
        }
      }

      class Game {
        constructor(canvas, num = 10, ruleDis = 100) {
          this.canvas = canvas;
          this.num = num;
          this.balls = [];
          this.canvas.mousePosition = null;
          this.canvas.ruleDis = ruleDis;
          this.init();
        }

        init() {
          for (let i = 0; i < this.num; i++) {
            const ball = new Ball({
              position: new Vector(
                random() * canvas.oCvs.width,
                random() * canvas.oCvs.height
              ),
              speed: new Vector(randomRange(-5, 5), randomRange(-5, 5)),
              color: randomColor(),
              radius: randomRange(10, 15)
            });
            this.balls.push(ball);
          }
          this.addEvent();
        }
        run() {
          this.canvas.ctx.fillStyle = "rgba(255, 255, 255, .4)";
          this.canvas.ctx.fillRect(
            0,
            0,
            this.canvas.oCvs.width,
            this.canvas.oCvs.height
          );
          this.canvas.drawBalls(this.balls);
          requestAnimationFrame(() => {
            this.run();
          });
        }

        addEvent() {
          // console.log(this.canvas.oCvs.getBoundingClientRect());
          const { left, top } = this.canvas.oCvs.getBoundingClientRect();
          this.canvas.oCvs.addEventListener(
            "mousemove",
            ({ clientX: x, clientY: y }) => {
              this.canvas.mousePosition = new Vector(x - left, y - top);
            }
          );
        }
      }

      const canvas = new Canvas(500, 500);
      const game = new Game(canvas, 10, 500);
      game.run();
```
