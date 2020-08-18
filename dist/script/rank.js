import './jquery-3.5.1.js';
$(function(){
    // 排行榜轮播图
    var rank = new Swiper ('.rank', {
        direction: 'horizontal', // 横向切换选项
        loop: true, // 循环模式选项
        slidesPerView : 'auto',
        spaceBetween : 20,
        loopAdditionalSlides:1,
        loopedSlides:5,
    });
    // 初始化导航栏
    $(".rank_nav li").eq(rank.realIndex).addClass("show").siblings().removeClass("show");
    // 点击导肮切换
    $(".rank_nav li").on("click", function(){
        $(this).addClass("show").siblings().removeClass("show");
        rank.slideToLoop($(this).index());
    });
    var toNext = throttle(500,function(){
        var nowIndex = rank.realIndex;
        rank.slideToLoop(nowIndex + 3);
        $(".rank_nav li").eq(rank.realIndex).addClass("show").siblings().removeClass("show");
    });
    var toPrev = throttle(500,function(){
        var nowIndex = rank.realIndex;
        rank.slideToLoop(nowIndex - 3);
        $(".rank_nav li").eq(rank.realIndex).addClass("show").siblings().removeClass("show");
    });
    $(".rankWrap .next").on("click",function(){
        toNext();
    });
    $(".rankWrap .prev").on("click",function(){
        toPrev();
    });
    // 动态插入detail详情缩略图
    















    // 函数节流
    function throttle(delay,callback){
        var lastTime, timer;
        return function (){
            var nowTime = Date.now();//当前时间戳
            if (lastTime && (nowTime < (lastTime + delay))) {
                clearTimeout(timer)
                timer = setTimeout(function () {
                    lastTime = nowTime;//记录当前时间
                    callback();
                }, delay);
            }else {//立即执行
                lastTime = nowTime;//记录当前时间
                callback();
            };
        };
    };
});