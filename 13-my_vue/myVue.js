class Vue extends EventTarget{
    constructor(options){
        super();
        this.$options = options;
        this.observe(this.$options.data);
        this.compile();
    }

    observe(data){
        // console.log(data);
        let keys = Object.keys(data);
        let _this = this;
        let dep = new Dep();
        keys.forEach(key => {
            let value = data[key];
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get(){
                    // console.log("get");
                    if(Dep.target){
                        dep.addSub(Dep.target);
                    }
                    return value;
                },
                set(newValue){
                    // console.log("set");
                    //重新渲染 通过自定义事件(类似观察者模式--订阅发布模式) mdn搜索eventTarget
                    /*let event = new CustomEvent(key, {detail: newValue});
                    _this.dispatchEvent(event);*/
                    dep.notify(newValue);
                    if(newValue !== value){
                        value = newValue;
                    }
                }
            })
        })
    }

    compile(){
        let ele = document.querySelector(this.$options.el);
        this.compileNode(ele);
    }

    compileNode(ele){
        let childNodes = ele.childNodes;
        childNodes.forEach(node => {
            switch(node.nodeType){
                case 1:
                    this.compileNode(node);
                    break;
                case 3:
                    let reg = /\{\{\s*(\S+?)\s*\}\}/g;
                    if(reg.test(node.textContent)){
                        let $1 = RegExp.$1;
                        node.textContent = node.textContent.replace(reg, this.$options.data[$1]);
                        // this.addEventListener($1, function({detail}){
                        //     // console.log("update", detail);
                        //     let oldValue = this.$options.data[$1];
                        //     node.textContent = node.textContent.replace(new RegExp(oldValue, "g"), detail);
                        // })
                        new Watcher((newVal) => {
                            let oldValue = this.$options.data[$1];
                            node.textContent = node.textContent.replace(new RegExp(oldValue, "g"), newVal);
                        });
                    }
                    break;
            }
        })
    }
}

class Dep{
    constructor() {
        this.subs = [];
    }
    addSub(sub){
        this.subs.push(sub);
    }
    notify(val){
        this.subs.forEach(sub => sub.update(val));
    }
}

class Watcher{
    constructor(cb){
        Dep.target = this;
        this.cb = cb;
    }
    update(val){
        this.cb(val);
    }
}
