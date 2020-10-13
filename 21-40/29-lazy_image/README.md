# 图片懒加载 - 一个全新API
* IntersectionObserver
* 具体代码如下
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>图片懒加载</title>
  <style>
    #box {
      min-height: 100vh;
    }
    #box > div {
      height: 500px;
    }
  </style>
</head>
<body>
  <div id="box">
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
    <div>
      <img data-src="./images/test.jpg" alt="占位">
    </div>
  </div>
  <script>
    {
      const lazyLoad = imgs => {
        const io = new IntersectionObserver(ioes => {
          ioes.forEach(ioe => {
            const img = ioe.target;
            const intersectionRatio = ioe.intersectionRatio;
            if (intersectionRatio > 0 && intersectionRatio <= 1) {
              if (!img.src) {
                img.src = img.dataset.src;
                img.onload = img.onerror = () => io.unobserve(img)
              }
            }

          })
        })
        imgs.forEach(img => io.observe(img))
      }
      const imgs = document.querySelectorAll('img');
      lazyLoad(imgs);
    }
  </script>
</body>
</html>
```
