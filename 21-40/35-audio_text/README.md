# 音频文字同步

## 实现原理

* 需要知道每句话对应的起始时间和结束时间，后端接口返回
* audio有监听进度条的事件ontimeupdate
  - audio.currentTime可以取到当前的播放器的时间
* audio.currentTime也可以设置当前播放器的时间，所以可以通过点击文字，通过赋值的方式调到对应的时间
