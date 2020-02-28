class MyPromise {
    constructor(handler){
        this.status = "PENDING";
        this.resolvedQueues = [];
        handler(this._resolve.bind(this));
    }

    _resolve(){
        let config = { attributes: true};

        let observer = new MutationObserver(() => {
            if(this.status !== "PENDING") return;
            this.status = "RESOLVED";
    
            let handler;
            while(handler = this.resolvedQueues.shift()){
                handler();
            }
        });
  
        observer.observe(document.body, config);

        document.body.setAttribute("gqf", "gqf");
  
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