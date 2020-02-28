class MyPromise {
    constructor(handler){
        this.status = "PENDING";
        this.resolvedQueues = [];
        this.value;
        handler(this._resolve.bind(this));
    }

    _resolve(val){
        let config = { attributes: true};

        let observer = new MutationObserver(() => {
            if(this.status !== "PENDING") return;
            this.status = "RESOLVED";
    
            let handler;
            this.value = val;
            while(handler = this.resolvedQueues.shift()){
                handler(this.value);
            }
        });
  
        observer.observe(document.body, config);

        document.body.setAttribute("gqf", "gqf");
  
    }

    then(resolvedHandler){
        return new MyPromise((resolve, reject) => {

            function newResolvedHandler(value){
                let result = resolvedHandler(value);
                if(result instanceof MyPromise){
                    result.then(resolve);
                }else if(typeof result === "object"){
                    resolve(result.then());
                }else{
                    resolve(result);
                }
                
            }

            switch(this.status){
                case "PENDING":
                    this.resolvedQueues.push(newResolvedHandler);
                    break;
                case "RESOLVED":
                    resolvedHandler();
                    break;
                case "REJECTED":
                    break;
            }
        })
        
    }

    static resolve(val){
        return new MyPromise(resolve => {
            resolve(val);
        })
    }

    static all(iterator){
        let len = iterator.length;
        let values = [];
        let i = 0;
        return new MyPromise(resolve => {
            iterator.forEach((item,index) => {
                item.then(val => {
                    i++;
                    // values.push(val);
                    values[index] = val;
                    if(i === len){
                        resolve(values);
                    }
                })
            })
        })
    }
}