export {detailSmall};
function DetailSmall(){
    this.init();
};
DetailSmall.prototype = {
    constructor : DetailSmall,
    getEle:function(self){
        // 获取元素
        this.$touchEle = $(self);//触发元素
    },
    // 初始化
    init:function(){
        // 获取元素
        this.$detailSmall = $(".detailSmall");
        // 声明变量
        this.timer;
        this.timer2;
    },
    // 设置触发事件（延迟1秒触发，渐进效果)
    typeIn:function(){
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.boxPosition();
            this.$detailSmall.fadeIn(()=>{
                this.detailRun(this.$detailSmall);
                this.loadImg(this.$detailSmall);
            });
        },1000);
    },
    typeOut:function(){
        clearTimeout(this.timer);
        clearInterval(this.timer2);
        this.$detailSmall.fadeOut();
    },
    // 动态设置位置
    boxPosition:function(){
        var top = this.$touchEle.offset().top;
        var left = this.$touchEle.offset().left + this.$touchEle.width() + 5;
        this.$touchEle.css("position","relative");
        this.$detailSmall.css({"top":top,"left":left});
    },
    // 懒加载图片
    loadImg:function(self){
        $(self).find(".detail_banner img").each((index, item)=>{
            item.src = item.getAttribute('data-src');
        })
    },
    // detailSmall内轮播图
    detailRun:function (self){
        var index = 0;
        $(self).find(".detail_banner img").eq(index).css("display","block");
        clearInterval(self.timer2);
        self.timer2 = setInterval(() => {
            index++;
            if(index>$(self).find(".detail_banner img").length-1){
                index = 0;
            }
            $(self).find(".detail_banner img").eq(index).css("display","block");
            $(self).find(".detail_banner img").eq(index).siblings().css("display","none");
        }, 2000);
    },
}
// 设定接口
// function detailSmall(type,self){
//     var d = new DetailSmall(self);
//     if(type === "in"){
//         return d.typeIn();
//     }
//     else{
//         return d.typeOut();
//     }
// };

var fn = new DetailSmall();
function detailSmall(type,self){
    fn.getEle(self);
    if(type === "in"){
        fn.typeIn();
    }
    else if(type === "out"){
        fn.typeOut();
    };
};