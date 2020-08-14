"use strict";

$(function () {
  $(".headerBox").load("./header.html"); // await new Promise(function(resolve, reject){
  //     $(".headerBox").load("./header.html",function(){
  //         resolve();
  //     });
  // });
  // 搜索栏点击事件

  $(".top_search input").on("click", function () {
    $(".top_hot").css("display", "block");
    $(".top_hot").animate({
      "opacity": 1,
      "top": 35 + "px"
    }, "fast");
  });
  $(".top_search input").blur(function () {
    $(".top_hot").css("display", "none");
    $(".top_hot").animate({
      "opacity": 0,
      "top": 20 + "px"
    });
  }); // 轮播图

  var bannerImg = new Swiper('.banner_img', {
    direction: 'vertical',
    // 垂直切换选项
    loop: true,
    // 循环模式选项
    effect: 'fade',
    autoplay: false
  }); // 轮播图自动播放

  +function () {
    var timer;
    var imgIndex = 0;

    if ($(".banner_text_li").attr("tag") === "game") {
      $(".banner_text_li").eq(imgIndex).addClass("active active_game");
    } else {
      $(".banner_text_li").eq(imgIndex).addClass("active active_act");
    }

    bannerImg.slideTo(imgIndex);
    autoMove();

    function autoMove() {
      clearInterval(timer);
      timer = setInterval(function () {
        imgIndex++;

        if (imgIndex > $(".banner_text_li").length - 1) {
          imgIndex = 0;
        }

        ;

        if ($(".banner_text_li").eq(imgIndex).attr("tag") === "game") {
          $(".banner_text_li").eq(imgIndex).addClass("active active_game");
        } else {
          $(".banner_text_li").eq(imgIndex).addClass("active active_act");
        }

        $(".banner_text_li").eq(imgIndex).siblings().removeClass("active active_game active_act");
        bannerImg.slideTo(imgIndex);
      }, 2000);
    }

    ; //鼠标覆盖停止自动切换

    $(".bannerWrap").on("mouseover", function () {
      clearInterval(timer);
    }); //鼠标离开开始自动切换

    $(".bannerWrap").on("mouseout", function () {
      autoMove();
    }); // 移入切换
    // mySwiper.activeIndex

    $(".banner_text_li").hover(function () {
      if ($(this).attr("tag") === "game") {
        $(this).addClass("active active_game");
      } else {
        $(this).addClass("active active_act");
      }

      $(this).siblings().removeClass("active active_game active_act");
      bannerImg.slideTo($(this).index());
      imgIndex = $(this).index();
    }, function () {
      autoMove();
    });
  }(); // 初始化detail详情缩略图left

  var prevTranslate = 0;
  var beginIndex = 0;
  $(".foreshowWrap .detail").each(function (index, item) {
    $(item).css("left", (index - beginIndex + 1) * 188 + (index - beginIndex) * 16 + "px");
  }); // detail内轮播图

  function detailRun(self) {
    var index = 0;
    $(self).find(".detail_banner img").eq(index).css("display", "block");
    clearInterval(timer);
    var timer = setInterval(function () {
      index++;

      if (index > $(self).find(".detail_banner img").length - 1) {
        index = 0;
      }

      $(self).find(".detail_banner img").eq(index).css("display", "block");
      $(self).find(".detail_banner img").eq(index).siblings().css("display", "none");
    }, 2000);
  } // foreshow热点预告轮播图


  var foreshow = new Swiper('.foreshow', {
    direction: 'horizontal',
    // 横向切换选项
    loop: false,
    // 循环模式选项
    slidesPerView: 'auto',
    spaceBetween: 20,
    slidesPerGroup: 2,
    // initialSlide :$(".foreshow_list li:last-child").index()-4,
    on: {
      transitionEnd: function transitionEnd() {
        if (prevTranslate - foreshow.translate > 0 && prevTranslate - foreshow.translate < 400) {
          beginIndex = foreshow.activeIndex + 1;
          console.log(111);
        } else {
          beginIndex = foreshow.activeIndex;
          prevTranslate = foreshow.translate;
        }

        $(".foreshowWrap .detail").each(function (index, item) {
          $(item).css("left", (index - beginIndex + 1) * 188 + (index - beginIndex) * 16 + "px");
        });
      }
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.foreshowWrap .swiper-button-next',
      prevEl: '.foreshowWrap .swiper-button-prev'
    }
  }); // foreshow移入出现详情缩略图

  var detail_timer;
  $(".foreshow_list a").hover(function () {
    var _this = this;

    clearTimeout(detail_timer);
    detail_timer = setTimeout(function () {
      $(".foreshowWrap .detail").eq($(_this).closest("li").index()).stop().fadeIn(function () {
        loadImg(this);
        detailRun(this);
      });
    }, 500);
  }, function () {
    clearTimeout(detail_timer);
    $(".foreshowWrap .detail").eq($(this).closest("li").index()).stop().fadeOut();
  }); // 图片懒加载

  function loadImg(self) {
    $(self).find(".detail_banner img").each(function (index, item) {
      item.src = item.getAttribute('data-src');
    });
  }

  ; // 排行榜轮播图

  var rank = new Swiper('.rank', {
    direction: 'horizontal',
    // 横向切换选项
    loop: true,
    // 循环模式选项
    slidesPerView: 'auto',
    spaceBetween: 20,
    loopAdditionalSlides: 1,
    loopedSlides: 5 // 如果需要前进后退按钮
    // navigation: {
    //   nextEl: '.rankWrap .swiper-button-next',
    //   prevEl: '.rankWrap .swiper-button-prev',
    // },

  }); // 初始化导航栏

  $(".rank_nav li").eq(rank.realIndex).addClass("show").siblings().removeClass("show"); // 点击导肮切换

  $(".rank_nav li").on("click", function () {
    $(this).addClass("show").siblings().removeClass("show");
    rank.slideToLoop($(this).index());
  });
  var toNext = throttle(500, function () {
    var nowIndex = rank.realIndex;
    rank.slideToLoop(nowIndex + 3);
    $(".rank_nav li").eq(rank.realIndex).addClass("show").siblings().removeClass("show");
  });
  var toPrev = throttle(500, function () {
    var nowIndex = rank.realIndex;
    rank.slideToLoop(nowIndex - 3);
    $(".rank_nav li").eq(rank.realIndex).addClass("show").siblings().removeClass("show");
  });
  $(".rankWrap .next").on("click", function () {
    toNext();
  });
  $(".rankWrap .prev").on("click", function () {
    toPrev();
  }); // 函数节流

  function throttle(delay, callback) {
    var lastTime, timer;
    return function () {
      var nowTime = Date.now(); //当前时间戳

      if (lastTime && nowTime < lastTime + delay) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          lastTime = nowTime; //记录当前时间

          callback();
        }, delay);
      } else {
        //立即执行
        lastTime = nowTime; //记录当前时间

        callback();
      }
    };
  }
});