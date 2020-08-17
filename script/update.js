export {update};
import './jquery-3.5.1.js';
function Update(){
    // 初始化
    this.init();
};
Update.prototype = {
    constructor : Update,
    // 初始化
    init:function(){
        // 获取元素
        this.update = $(".update");
        this.list = $(".updateList");
        this.lists = $(".updateList>li");
        this.prev = $(".updateWrap .prev");
        this.next = $(".updateWrap .next");
        // 声明变量
        this.index = 0;//轮播图起始item下标
        this.num = 3;//每次切换的数量
        this.itemWidth = this.lists[0].offsetWidth;
        // 绑定事件
        this.addItem();
        this.onClick();
    },
    // 末尾添加一组item
    addItem:function(){
        var newItem = "";
        for(var i=0; i<3; i++){
            newItem += `<li>${this.lists.eq(i).html()}</li>`;
        }
        this.lists.parent().append(newItem);
    },
    // 前进后退按钮点击事件
    onClick:function(){
        this.prev.on("click", ()=>{
            this.index-=this.num;
            this.indexAmend(this.itemCut);
        });
        this.next.on("click", ()=>{
            this.index+=this.num;
            this.indexAmend(this.itemCut);
        });
    },
    // 修正下标
    indexAmend:function(cb){
        if(this.index > this.lists.length-1){
            this.index = this.lists.length-1;
        }else if(this.index < 0){
            this.index = 0;
        };
        cb(this);
    },
    // 根据下标切换项目
    itemCut:function(self){
        self.update.stop().animate({"scrollLeft":self.index * self.itemWidth});
    },
};
// 接口
function update(){
    return new Update();
};




