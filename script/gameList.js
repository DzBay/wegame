import './jquery-3.5.1.js';
import {header} from './header.js';
import {update} from './update.js';
import {list} from './list.js';

$(function(){
    $(".headerBox").load("./header.html",header);
    $(".footerBox").load("./footer.html");
    update();
    list();
});