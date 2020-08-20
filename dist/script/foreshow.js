import {detailSmall} from './detailSmall.js';
export {foreshow};
function foreshow(){
    loadData(foreshowAct);
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
                $(".foreshow_list>li").eq(index).find("a").attr("gameId",item.id);
                $(".foreshow_list>li").eq(index).find(".text p").text(`${index+2}月`);
                $(".foreshow_list>li").eq(index).find(".text span").text("正在热卖");
                $(".foreshow_list>li").eq(index).find("a").attr("href",`./detail.html?name=${item.id}`)
                $(".foreshow_list>li").eq(index).find("img").attr("src", item.hot);
                $(".foreshow_list>li").eq(index).find(".name").text(item.name);
                $(".foreshow_list>li").eq(index).find(".price").text(item.price);
            });
        },
    });
    cb();//./detail.html?name=onway
};


function foreshowAct (){
    // foreshow热点预告轮播图
    var foreshow = new Swiper ('.foreshow', {
        direction: 'horizontal', // 横向切换选项
        loop: false, // 循环模式选项
        slidesPerView : 'auto',
        spaceBetween : 20,
        slidesPerGroup : 2,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.foreshowWrap .swiper-button-next',
          prevEl: '.foreshowWrap .swiper-button-prev',
        },
    });
    // detailSmall详情图
    $(".foreshow_list a").hover(function(){
        // 移入触发
        detailSmall("in",this);
    },function(){
        // 移出触发
        detailSmall("out",this);
    });
};