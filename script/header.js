import './jquery-3.5.1.js';
$(function(){
    // 搜索栏点击事件
    $(".top_search input").on("click",function(){
        $(".top_hot").css("display","block");
        $(".top_hot").animate({
            "opacity":1,
            "top":35 + "px",
        },"fast");
    });
    $(".top_search input").blur(function(){
        $(".top_hot").css("display","none");
        $(".top_hot").animate({
            "opacity":0,
            "top":20 + "px",
        });
    });
    // 轮播图
    var bannerImg = new Swiper ('.banner_img', {
        direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
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
})