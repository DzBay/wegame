import './jquery-3.5.1.js';
import './swiper-bundle.js';
import {header} from './header.js';
import {banner} from './banner.js';
import {foreshow} from './foreshow.js';
import {rank} from './rank.js';
import {update} from './update.js';
$(function(){
    $(".headerBox").load("./header.html",header);
    $(".footerBox").load("./footer.html");
    banner();
    foreshow();
    rank();
    update();
});