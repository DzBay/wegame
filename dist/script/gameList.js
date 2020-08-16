import './jquery-3.5.1.js';
import {update} from './update.js';
+function(){
    $(".headerBox").load("./header.html");
    $(".footerBox").load("./footer.html");
    update();
}();