import './jquery-3.5.1.js';
$(function(){
    $(".headerBox").load("./header.html");
    $(".footerBox").load("./footer.html");
    loadData(detail);
});


// 渲染数据
async function loadData(cb){
    var name;
    var json;
    name = location.href.split("?")[1].split("=")[1];
    await $.ajax({
        url:('../data/game.json'),
        dataType:"json",
        success:function(data){
            data.forEach(function(item){
                if(name === item.id){
                    json = item;
                }
            });
            // 渲染到页面
            $(".gameName").text(json.name);
            $(".gameHead").attr("src",json.head);
            $(json["1000"]).each(function(index,item){
                $(".gameImg ul").append(`<li><img src="${item}" alt=""></li>`);
                $(".gameImgPaging ul").append(`<li><img src="${item}" alt=""></li>`);
            });
            $(".issuingDate dd").text(json.issuingDate);
            $(".recomRate dd").text(json.recomRate);
            $(".publisher dd").text(json.publisher);
            $(".operator dd").text(json.operator);
            $(".platform dd").text(json.platform);
            $(json.gameTag).each(function(index,item){
                $(".gameTag").append(`<a href="#">${item}</a>`);
            });
            $(".discounts span").text(json.discounts);
            $(".gamePrice").text(json.price);
            $(".bgImg").css("background",`url(${json["1920b"]}) 50% 0 no-repeat`);
            $(".detailBannerWrap").css("background",`url(${json["1920s"]})no-repeat center center`);
        },
    });
    cb();
};

// 交互
function Detail (){
    // 初始化
    this.init();
};
Detail.prototype = {
    // 指正构造器
    constructor: Detail,
    // 初始化
    init:function(){
        // 获取元素
        this.$gameImg = $(".gameImg");
        this.$paging = $(".gameImgPaging");
        this.$imgLists = $(".gameImg ul>li");
        this.$pagingLists = $(".gameImgPaging ul>li");
        this.$prev = $(".gameImgWrap .prev");
        this.$next = $(".gameImgWrap .next");
        this.$bigImg = $(".gameImgWrap .bigImg");
        this.$textWrap = $(".gameDetail .textWrap");
        // 声明变量
        this.$imgWidth = this.$imgLists[0].offsetWidth;
        this.$pagingWidth = this.$pagingLists[0].offsetWidth;
        this.index = 0;//起始/当前下标
        this.prevIndex = 0;//上次的下标
        this.num = 1;//每次切换数量和方向(左负右正)
        // 绑定事件
        this.imgMove();
        this.onClick();
    },
    // 运动函数
    imgMove:function(){
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
            this.prevIndex = this.index;
            this.index+=this.num;
            this.indexCor(this.imgCut);
        },3000);
    },
    // 纠正下标index
    indexCor:function(cb){
        if(this.index > this.$imgLists.length-1){
            this.index = 0;
        }else if(this.index < 0){
            this.index = this.$imgLists.length-1;
        }
        cb(this);
    },
    // 切换函数
    imgCut:function(self){
        var _this = self || this;
        if(_this.index < _this.$imgLists.length-6){
            _this.$paging.stop().animate({"scrollLeft":_this.index * _this.$pagingWidth});
        }else{
            _this.$paging.stop().animate({"scrollLeft":(_this.$imgLists.length-6) * _this.$pagingWidth});
        }
        // 切换图片
        _this.$gameImg.stop().animate({"scrollLeft":_this.index * _this.$imgWidth});
        // 分页器切换类名show
        _this.$pagingLists.eq(_this.prevIndex).find("img").removeClass("show");
        _this.$pagingLists.eq(_this.index).find("img").addClass("show");
    },
    // 点击事件
    onClick:function(){
        var _this = this;
        // 点击图片放大事件
        this.$imgLists.on("click",function(){
            var imgSrc = $(this).find("img").prop("src");
            _this.$bigImg.find(".bigBox").prop("src",imgSrc);
            _this.$bigImg.fadeIn();
            clearInterval(_this.timer);
        });
        // 放大图关闭按钮
        this.$bigImg.find("button").on("click",function(){
            _this.$bigImg.fadeOut();
            _this.imgMove();
        });
        // 点击分页器图片切换事件
        this.$pagingLists.on("click",function(){
            clearInterval(_this.timer);
            _this.prevIndex = _this.index;
            _this.index = $(this).index();
            _this.imgCut(_this);
            _this.imgMove();
        });
        // 点击前后切换按钮事件
        this.$prev.on("click",()=>{
            clearInterval(_this.timer);
            _this.prevIndex = _this.index;
            _this.index -= _this.num;
            _this.indexCor(_this.imgCut);
            _this.imgMove();
        });
        // 点击前后切换按钮事件
        this.$next.on("click",()=>{
            clearInterval(_this.timer);
            _this.prevIndex = _this.index;
            _this.index += _this.num;
            _this.indexCor(_this.imgCut);
            _this.imgMove();
        });
        // 点击展开全文
        this.$textWrap.find(".allText").on("click",()=>{
            this.$textWrap.toggleClass("show");
            if(this.$textWrap.hasClass("show")){
                this.$textWrap.find(".allText").text("收起").css("box-shadow","none");
            }else{
                this.$textWrap.find(".allText").text("展开全部").css("box-shadow","0px -20px 30px #fff");;
            }
        });
    },
};
function detail(){
    return new Detail();
}