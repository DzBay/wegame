export {banner};
function banner(){
    loadData(bannerAct);
};
// 渲染数据
async function loadData(cb){
    var json;
    await $.ajax({
        url:('../data/game.json'),
        dataType:"json",
        success:function(data){
            // 渲染到页面
            $(data).each(function(index,item){
                $(".banner_img a").eq(index).attr("href",`./detail.html?name=${item.id}`);
                $(".banner_img img").eq(index).attr("src",item["1400"]);
                $(".banner_text_li").eq(index).attr("href",`./detail.html?name=${item.id}`);
                $(".banner_text_li").eq(index).find(".tit").text(item.name);
            });
        },
    });
    cb();
};
// 轮播图交互
function bannerAct(){
    // 轮播图
    var bannerImg = new Swiper ('.banner_img', {
        direction: 'vertical', // 垂直切换选项
        loop: false, // 循环模式选项
        effect : 'fade',
        autoplay:false,
    });
    // 轮播图自动播放
    +function(){
        var timer;
        var imgIndex = 0;
        if($(".banner_text_li").attr("tag")==="game"){
            $(".banner_text_li").eq(imgIndex).addClass("active active_game");
        }else{
            $(".banner_text_li").eq(imgIndex).addClass("active active_act");
        }
        bannerImg.slideTo(imgIndex);
        autoMove()
        function autoMove(){
            clearInterval(timer);
            timer = setInterval(function(){
                imgIndex++;
                if(imgIndex>$(".banner_text_li").length-1){
                    imgIndex = 0
                };
                if($(".banner_text_li").eq(imgIndex).attr("tag")==="game"){
                    $(".banner_text_li").eq(imgIndex).addClass("active active_game");
                }else{
                    $(".banner_text_li").eq(imgIndex).addClass("active active_act");
                }
                $(".banner_text_li").eq(imgIndex).siblings().removeClass("active active_game active_act");
                bannerImg.slideTo(imgIndex);
            },2000)
        };
        //鼠标覆盖停止自动切换
        $(".bannerWrap").on("mouseover",function(){
            clearInterval(timer);
        });
        //鼠标离开开始自动切换
        $(".bannerWrap").on("mouseout",function(){
            autoMove();
        });
        // 移入切换
        // mySwiper.activeIndex
        $(".banner_text_li").hover(
            function () {
                if($(this).attr("tag")==="game"){
                    $(this).addClass("active active_game");
                }else{
                    $(this).addClass("active active_act");
                }
                $(this).siblings().removeClass("active active_game active_act");
                bannerImg.slideTo($(this).index());
                imgIndex = $(this).index();
            },
            function () {
                autoMove();
            }
        );
    }();
};