class Vue extends EventTarget {
    constructor(options) {
        super();
        this.$options = options;
        this.compile();
        this.observe(this.$options.data);
    }

    observe(data) {
        let _this = this;
        let keys = Object.keys(data);
        keys.forEach(key => {
            let val = data[key];
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return val;
                },
                set(newVal) {
                    if (newVal != val) {
                        //渲染视图
                        let event = new CustomEvent(key, {detail: newVal});
                        _this.dispatchEvent(event);
                        val = newVal;
                    }
                }
            })
        })
    }

    compile() {
        let el = document.querySelector(this.$options.el);
        this.compileNode(el);
    }

    compileNode(el) {
        let childNodes = el.childNodes;
        childNodes.forEach(childNode => {
            let nodeType = childNode.nodeType;
            switch (nodeType) {
                case 1:
                    this.compileNode(childNode);
                    break;
                case 3:
                    let reg = /\{\{\s*(\S+?)\s*\}\}/g;
                    if (reg.test(childNode.textContent)) {
                        childNode.textContent = childNode.textContent.replace(reg, (a, b) => {
                            return this.$options.data[b];
                        });
                        let keys = Object.keys(this.$options.data);
                        keys.forEach(key => {
                            this.addEventListener(key, ({detail: newVal}) => {
                                let oldVal = this.$options.data[key];
                                childNode.textContent = childNode.textContent.replace(new RegExp(oldVal, "g"), newVal);
                            })
                        });
                    }
                    break;
            }
        })
    }
}

