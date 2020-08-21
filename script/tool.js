//函数节流，规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效，停止触发后，一个单位时候后触发最后一次
function throttle(delay,cb){
    let lastTime;
    let timer;
    return function(){
        let nowTime = Date.now();
        if(lastTime && nowTime - lastTime < delay){
            clearTimeout(timer);
            timer = setTimeout(function(){
                cb();
            },delay)
        }else{
            clearTimeout(timer);
            lastTime = nowTime;
            cb();
        };
    };
};

//节流改，规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效，停止触发后将不再触发。
function throttleG(delay,cb){
    let lastTime;
    let timer;
    return function(){
        let nowTime = Date.now();
        if(!lastTime || nowTime - lastTime >= delay){
            lastTime = nowTime;
            cb();
        };
    };
};




















// itemCut({
//     "itemWrap":".foreshow",
//     "list":".foreshow_list",
//     "item":".foreshow_list li",
//     "cutNum":2,
//     "loop":false,
// });


// 项目切换
function ItemCut(options){//暂时只支持滚动切换
    this.catchElement(options);
}
ItemCut.prototype = {
    constructor: ItemCut,
    // 获取数据
    catchElement:function(options){
        this.itemWrap = document.querySelector(options.itemWrap);//包裹项目的盒子
        this.list = document.querySelector(options.list);//项目列表
        this.item = document.querySelectorAll(options.item);//项目
        this.index = options.index || 0;//起始下标，默认0
        this.cutNum = options.cutNum || 1;//每次切换的项目数
        this.loop = options.loop || false;//是否触底循环，默认false关闭
        this.direction = options.direction || false;//设置横向切换或是纵向切换，默认为false横向切换
        this.init();
    },
    // 初始化
    init:function(){
        // 获取每次切换的数值
        if(this.direction){
            this.cutHeight = (this.item[0].offsetHeight + parseInt(getComputedStyle(this.item[0]).marginTop + getComputedStyle(this.item[0]).marginBottom)) * this.cutNum;//每次切换的高度
        }else{
            this.cutWidth = (this.item[0].offsetWidth + parseInt(getComputedStyle(this.item[0]).marginRight + getComputedStyle(this.item[0]).marginLeft)) * this.cutNum;//每次切换的宽度
        };
        this.moveStar();
    },
    // 自动播放
    moveStar:function(){
        this.timer = setInterval(()=>{
            this.cutNext();
        },3000)
    },
    // 切换下一组
    cutNext:function(){
        this.index += this.cutNum;
        if(!this.loop){
            console.log(this.cutNum);
            console.log(this.index);
            if(this.index > this.item.length){
                this.index = this.item.length;
            }else if(this.index < 0){
                this.index = 0;
            }
            if(this.direction){
                this.itemWrap.scrollTop = this.cutHeight * this.index;
            }else{
                this.itemWrap.scrollLeft = this.cutWidth * this.index;
            };
        }
        else{//触底循环，待完善
            if(this.index > this.item.length){
                this.index = 0;
            }else if(this.index < 0){
                this.index = this.item.length;
            };
        };
    },
};
// // 公开接口
function itemCut(options){
    return new ItemCut(options);
};