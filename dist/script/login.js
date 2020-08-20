export {login};
function Login(){
    this.init();
};
Login.prototype = {
    constuctor:Login,
    init:function(){
        // 获取元素
        this.$loginBtn = $(".loginBtn");
        this.$loginWrap = $(".loginWrap");
        this.$loginClose = $(".login .close");
        this.$login = $(".login p button");
        this.$user = $(".user input");
        this.$password = $(".password input");
        // 绑定事件
        this.click();
    },
    click:function(){
        // 头部登录按钮
        this.$loginBtn.on("click",()=>{
            this.$loginWrap.css("display","block");
        });
        // 关闭按钮
        this.$loginClose.on("click",()=>{
            this.$loginWrap.css("display","none");
        });
        // 登录按钮
        this.$login.on("click",()=>{
            var user = this.$user.val();
            var password = this.$password.val();
            if(user==""){
                alert("账号不能为空");
                this.$user.focus();
                return false;
            };
            if(password==""){
                alert("密码不能为空");
                this.$password.focus();
                return false;
            };
            $.ajax({
                url:"../data/user.json",
                type:"get",
                dataType:"json",
                success:(json)=>{
                    $(json).each(function(index,item){
                        if(item.user===user){
                            if(item.password === password){
                                alert("登录成功");
                                $(".loginWrap").css("display","none");
                                $(".user input").val("");
                                $(".password input").val("");
                                $(".loginBtn").text("已登录");
                                $(".loginBtn").siblings("div").css("display","block");
                                return false;
                            }else{
                                alert("密码错误");
                                $(".password input").focus();
                                return false;
                            };
                        }else{
                            alert("该账号不存在");
                            $(".user input").focus();
                            return false;
                        };
                    });
                },
            })
        });
    },
};
function login(){
    return getSingle(Login);
};
function getSingle(fn){//管理单例逻辑  真单例？？
    var instance;
    return +function (){
        if (instance) {
        return instance;
        }
        return instance = new fn();
    }();
};
