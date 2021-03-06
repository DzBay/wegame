import {detailSmall} from './detailSmall.js';
export {rank};
function rank(){
    loadData(rankAct);
};
// 渲染数据
async function loadData(cb){
    var json;
    await $.ajax({
        url:('../data/game.json'),
        dataType:"json",
        success:function(data){
            // 渲染到页面
            $(".rank_list>li").each(function(i,it){
                $(data).each(function(index,item){
                    $(it).find(".item").eq(index).attr("gameId",item.id);
                    $(it).find(".item").eq(index).attr("href",`./detail.html?name=${item.id}`);
                    $(it).find(".item img").eq(index).attr("src",item["142"]);
                    $(it).find(".item p").eq(index).text(item.name);
                    $(it).find(".item span").eq(index).text(item.price);
                    $(it).find(".item i").eq(index).css("background",`url(../images/ranktag_02.jpg) 0 ${-84*index}px`);
                });
            });
        },
    });
    cb();//./detail.html?name=onway
};
function rankAct(){
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
    //函数节流
    var toNext = throttleG(500,function(){
        var nowIndex = rank.realIndex;
        rank.slideToLoop(nowIndex + 3);
        $(".rank_nav li").eq(rank.realIndex).addClass("show").siblings().removeClass("show");
    });
    var toPrev = throttle(500,function(){
        var nowIndex = rank.realIndex;
        rank.slideToLoop(nowIndex - 3);
        $(".rank_nav li").eq(rank.realIndex).addClass("show").siblings().removeClass("show");
    });
    $(".rankWrap .next").on("click",toNext);
    $(".rankWrap .prev").on("click",toPrev);
    $(".gameList .item").hover(function(){
        // 移入触发
        detailSmall().typeIn(this);
    },function(){
        // 移出触发
        detailSmall().typeOut(this);
    });
};