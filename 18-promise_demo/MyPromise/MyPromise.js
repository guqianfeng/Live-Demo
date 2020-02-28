class MyPromise {
    constructor(handler){
        this.status = "PENDING";
        this.resolvedQueues = [];
        handler(this._resolve.bind(this));
    }

    _resolve(){
        setTimeout(() => {
            if(this.status !== "PENDING") return;
            this.status = "RESOLVED";
    
            let handler;
            while(handler = this.resolvedQueues.shift()){
                handler();
            }
        }, 0)
    }

    then(resolvedHandler){
        switch(this.status){
            case "PENDING":
                this.resolvedQueues.push(resolvedHandler);
                break;
            case "RESOLVED":
                resolvedHandler();
                break;
            case "REJECTED":
                break;
        }
        return this;
        
    }
}