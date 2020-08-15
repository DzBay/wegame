$(function(){
    // 初始化detail详情缩略图left
    var prevTranslate = 0;
    var beginIndex = 0;
    $(".foreshowWrap .detail").each(function(index, item){
        $(item).css("left",(index-beginIndex+1)*188 + (index-beginIndex)*16 + "px");
    });
    // detail内轮播图
    function detailRun (self){
        var index = 0;
        $(self).find(".detail_banner img").eq(index).css("display","block");
        clearInterval(timer);
        var timer = setInterval(() => {
            index++;
            if(index>$(self).find(".detail_banner img").length-1){
                index = 0;
            }
            $(self).find(".detail_banner img").eq(index).css("display","block");
            $(self).find(".detail_banner img").eq(index).siblings().css("display","none");
        }, 2000);
    }
    // foreshow热点预告轮播图
    var foreshow = new Swiper ('.foreshow', {
        direction: 'horizontal', // 横向切换选项
        loop: false, // 循环模式选项
        slidesPerView : 'auto',
        spaceBetween : 20,
        slidesPerGroup : 2,
        // initialSlide :$(".foreshow_list li:last-child").index()-4,
        on:{
            transitionEnd:function(){
                if(prevTranslate - foreshow.translate > 0 && prevTranslate - foreshow.translate < 400){
                    beginIndex = foreshow.activeIndex + 1;
                    console.log(111);
                }else{
                    beginIndex = foreshow.activeIndex;
                    prevTranslate = foreshow.translate;
                }
                $(".foreshowWrap .detail").each(function(index, item){
                    $(item).css("left",(index-beginIndex+1)*188 + (index-beginIndex)*16 + "px");
                });
            }
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.foreshowWrap .swiper-button-next',
          prevEl: '.foreshowWrap .swiper-button-prev',
        },
    });
    // foreshow移入出现详情缩略图
    var detail_timer;
    $(".foreshow_list a").hover(function(){
        clearTimeout(detail_timer);
        detail_timer = setTimeout(()=>{
            $(".foreshowWrap .detail").eq($(this).closest("li").index()).stop().fadeIn(function(){
                loadImg(this);
                detailRun(this);
            });
        },500)
    },function(){
        clearTimeout(detail_timer);
        $(".foreshowWrap .detail").eq($(this).closest("li").index()).stop().fadeOut();
    });
    // 图片懒加载
    function loadImg(self){
        $(self).find(".detail_banner img").each((index, item)=>{
            item.src = item.getAttribute('data-src');
        })
    };
})