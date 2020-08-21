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
        this.$detailList = $(".detail_banner");
        this.$detailName = $(".detail_text .gameTit");
        this.$detailTime = $(".detail_text .upTime");
        this.$detailTags = $(".detail_text .gameTags");
        // 声明变量
        this.timer;
        this.timer2;
        this.data;
    },
    // 设置触发事件（延迟1秒触发，渐进效果)
    typeIn:function(){
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.boxPosition();
            this.loadData();
            this.$detailSmall.fadeIn(()=>{
                this.detailRun();
            });
        },1000);
    },
    typeOut:function(){
        clearTimeout(this.timer);
        clearInterval(this.timer2);
        this.$detailList.html("");
        this.$detailSmall.fadeOut();
    },
    // 请求数据
    getData:function(){
        $.ajax({
            url:"../data/game.json",
            type:"get",
            dataType:"json",
            async:false,
            success:(json)=>{
                this.data = json;
            },
        });
    },
    // 渲染数据
    loadData:function(){
        this.getData();
        $(this.data).each((index,item)=>{
            var tagStr = "";
            var imgStr = "";
            if(item.id === this.$touchEle.attr("gameId")){
                for(var j=0;j<item["1000"].length;j++){
                    imgStr += `<img src="${item["1000"][j]}" alt=""></img>`;
                };
                this.$detailList.append(imgStr);

                this.$detailName.text(item.name);
                this.$detailTime.text(`${item.issuingDate}上线`);
                for(var i=0;i<item.gameTag.length;i++){
                    tagStr += `${item.gameTag[i]} / `
                };
                this.$detailTags.text(tagStr);
            };
        });
    },
    // 动态设置位置
    boxPosition:function(){
        var top = this.$touchEle.offset().top;
        var left = this.$touchEle.offset().left + this.$touchEle.width() + 5;
        this.$touchEle.css("position","relative");
        this.$detailSmall.css({"top":top,"left":left});
    },
    // 懒加载图片
    loadImg:function(){
        $(this.$detailSmall).find(".detail_banner img").each((index, item)=>{
            item.src = item.getAttribute('data-src');
        });
    },
    // detailSmall内轮播图
    detailRun:function (){
        var index = 0;
        $(this.$detailSmall).find(".detail_banner img").eq(index).css("display","block");
        clearInterval(this.$detailSmall.timer2);
        this.$detailSmall.timer2 = setInterval(() => {
            index++;
            if(index>$(this.$detailSmall).find(".detail_banner img").length-1){
                index = 0;
            };
            $(this.$detailSmall).find(".detail_banner img").eq(index).css("display","block");
            $(this.$detailSmall).find(".detail_banner img").eq(index).siblings().css("display","none");
        }, 2000);
    },
};
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