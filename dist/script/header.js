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
};