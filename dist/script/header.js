import {login} from './login.js';
export {header};
function header(){
    // 登录事件
    login();
    // 搜索栏点击事件
    $(".top_search input").focus(function(){
        console.log(1111);
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
    //右侧边栏事件
    // 函数防抖
    let scroll = throttle(500,function(){
        console.log($(window).scrollTop());
        if($(window).scrollTop()>540){
            $(".aside-right .toTop").stop().slideDown();
        }else{
            $(".aside-right .toTop").stop().slideUp();
        };
    });
    $(window).scroll(scroll);
        // 点击事件
    $(".aside-right .toTop").on("click",function(){
        $('body,html').animate({scrollTop:0}); 
    });
        // 移入文字显示
    $(".aside-right .cart").hover(function(){
        $(".aside-right .cart .text").stop(true).fadeIn("fast");
    },function(){
        $(".aside-right .cart .text").stop(true).fadeOut("fast");
    });
    $(".aside-right .toTop").hover(function(){
        $(".aside-right .toTop .text").stop(true).fadeIn("fast");
    },function(){
        $(".aside-right .toTop .text").stop(true).fadeOut("fast");
    });
};