let list = [
    {
        id: 0,
        name: "兽族英雄技能",
        pid: -1
    },
    {
        id: 1,
        name: "剑圣",
        pid: 0
    },
    {
        id: 2,
        name: "牛头人酋长",
        pid: 0
    },
    {
        id: 3,
        name: "先知",
        pid: 0
    },
    {
        id: 4,
        name: "巫医",
        pid: 0
    },
    {
        id: 5,
        name: "疾风步",
        pid: 1
    },
    {
        id: 6,
        name: "分身",
        pid: 1
    },
    {
        id: 7,
        name: "致命一击",
        pid: 1
    },
    {
        id: 8,
        name: "剑刃风暴",
        pid: 1
    },
    {
        id: 9,
        name: "治疗波",
        pid: 4
    },
    {
        id: 10,
        name: "妖术",
        pid: 4
    },
    {
        id: 11,
        name: "毒蛇守卫",
        pid: 4
    },
    {
        id: 12,
        name: "无敌",
        pid: 4
    },
    {
        id: 13,
        name: "1级疾风步",
        pid: 5
    },
    {
        id: 14,
        name: "2级疾风步",
        pid: 5
    },
    {
        id: 15,
        name: "3级疾风步",
        pid: 5
    }
];

function getSelf(list, id){
    return list.filter(item => item.id === id)[0];
}

// console.log(getSelf(list, 15));

function getParent(list, id){
    let self = getSelf(list, id);
    return getSelf(list, self.pid);
}

// console.log(getParent(list, 15));

function getChildren(list, id){
    return list.filter(item => item.pid === id);
}

// console.log(getChildren(list, 5));

function getAllParent(list, id){
    let parent = getParent(list, id);
    let result = [];
    while(parent){
        result.unshift(parent);
        parent = getParent(list, parent.id);
    }
    return result;
}

// console.log(getAllParent(list, 14))

function getAllChildren(list, id){
    let children = getChildren(list, id);
    let result = [].concat(children);
    children.forEach(child => {
        result = result.concat(getChildren(list, child.id));
    })
    return result;
}

// console.log(getAllChildren(list, 1));

function list2Tree(list, pid){
    let len = list.length;
    function loop(pid){
        let res = [];
        for(let i = 0; i < len; i++){
            let item = list[i];
            if(item.pid === pid){
                item.children = loop(item.id);
                res.push(item);
            }
        }
        return res;
    }
    return loop(pid);
}

console.log(list2Tree(list, 0));