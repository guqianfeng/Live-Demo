# 音频文字同步

## 实现原理

* 需要知道每句话对应的起始时间和结束时间，后端接口返回
* audio有监听进度条的事件ontimeupdate
  - audio.currentTime可以取到当前的播放器的时间
* audio.currentTime也可以设置当前播放器的时间，所以可以通过点击文字，通过赋值的方式调到对应的时间

## 具体实现
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>音频文字同步</title>
    <style>
      .active {
        color: red;
      }
    </style>
  </head>
  <body>
    <audio id="audio" src="./demo.mp3" controls preload="auto"></audio>
    <ul id="box"></ul>
    <script>
      let audio = document.getElementById("audio"); // 播放器
      let oUl = document.getElementById("box"); // 列表
      let aLi = oUl.children;
      let data = [
        {
          text: "1".repeat(10),
          begin_time: 0,
          end_time: 60000,
        },
        {
          text: "2".repeat(10),
          begin_time: 60000,
          end_time: 120000,
        },
        {
          text: "3".repeat(10),
          begin_time: 120000,
          end_time: 180000,
        },
      ];
      render();

      function render() {
        data.forEach((item, index) => {
          let oLi = document.createElement("li");
          oLi.innerHTML = `${item.text} - start: ${
            item.begin_time / 1000
          }s -> end: ${item.end_time / 1000}s`;
          oLi.setAttribute('data-index', index)
          oUl.appendChild(oLi);
        });
      }
      oUl.addEventListener('click', function(e){
        // console.log(e.target, e.target.nodeName)
        if (e.target.nodeName === "LI") {
          // console.log(e.target.dataset['index'])
          let jumpTime = data[e.target.dataset['index']].begin_time;
          audio.currentTime = jumpTime / 1000;
        }
      })
      audio.ontimeupdate = function () {
        let curTime = audio.currentTime * 1000; //播放器时间
        // console.log(curTime)
        for (let i = 0; i < aLi.length; i++) {
          // console.log(aLi[i])
          aLi[i].classList.remove("active");
        }
        data.forEach((item, index) => {
          if (curTime >= item.begin_time && curTime <= item.end_time) {
            // console.log(index, aLi[index])
            aLi[index].classList.add("active");
          }
        });
      };
    </script>
  </body>
</html>
```
