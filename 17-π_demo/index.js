let count = 0;
let total = 100000;

for(var i = 0;i< total; i++){
    let x = Math.random();
    let y = Math.random();
    if((x ** 2 + y ** 2 <= 1)){
        count++;
    }
}

console.log(count / total * 4);