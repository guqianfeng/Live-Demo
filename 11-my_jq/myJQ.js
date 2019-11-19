class Jq {
    constructor(arg, root) {
        if (typeof root === "undefined") {
            this.prevObject = new Jq(document, null);
        }
        if (root) {
            this.prevObject = root;
        }
        if (typeof arg === "string") {
            // console.log("选择器");
            let eleArr = document.querySelectorAll(arg);
            this.addProperty(eleArr);
        } else if (typeof arg === "function") {
            // console.log("方法");
            window.addEventListener("DOMContentLoaded", arg);
        } else {
            // console.log("原生节点");
            if (typeof arg.length === "undefined") {
                //只有一个原生节点
                this.length = 1;
                this[0] = arg;
            } else {
                //多个原生节点
                this.addProperty(arg);
            }
        }
    }

    addProperty(obj) {
        this.length = obj.length;
        for (let i = 0; i < this.length; i++) {
            this[i] = obj[i];
        }
    }

    click(fn) {
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener("click", fn);
        }
        return this;
    }

    on(eventType, fn) {
        let eventTypeArr = eventType.split(" ");
        for (let i = 0; i < eventTypeArr.length; i++) {
            for (let j = 0; j < this.length; j++) {
                this[j].addEventListener(eventTypeArr[i], fn);
            }
        }
        return this;
    }

    eq(index) {
        return new JQ(this[index], this);
    }

    end() {
        return this.prevObject;
    }

    css(...args) {
        if (args.length === 1) {
            if (typeof args[0] === "string") {
                // console.log("获取属性")
                return this.getStyle(this[0], args[0]);
            } else if (typeof args[0] === "object") {
                // console.log("对象设置属性")
                for (let i = 0; i < this.length; i++) {
                    for (let key in args[0]) {
                        this.setStyle(this[i], key, args[0][key]);
                    }
                }
            }
        } else if (args.length === 2) {
            // console.log("设置属性")
            for (let i = 0; i < this.length; i++) {
                this.setStyle(this[i], args[0], args[1]);
            }
        }
        return this;
    }

    getStyle(el, attr) {
        return getComputedStyle(el)[attr];
    }

    setStyle(el, attr, val) {
        if(typeof val === "number" && !(attr in $.cssNumber)){
            el.style[attr] = val + "px";
        }else{
            el.style[attr] = val;
        }
    }
}

function $(arg) {
    return new Jq(arg);
}

$.cssNumber = {
    "animationIterationCount": true,
    "columnCount": true,
    "fillOpacity": true,
    "flexGrow": true,
    "flexShrink": true,
    "fontWeight": true,
    "gridArea": true,
    "gridColumn": true,
    "gridColumnEnd": true,
    "gridColumnStart": true,
    "gridRow": true,
    "gridRowEnd": true,
    "gridRowStart": true,
    "lineHeight": true,
    "opacity": true,
    "order": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true
};

