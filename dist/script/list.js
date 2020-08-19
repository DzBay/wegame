export {list};

function List(){
    this.init();
};
List.prototype = {
    constructor:List,
    // 初始化
    init:function(){
        // 获取元素
        this.$Navlists = $(".listTop_nav>li");
        this.$games = $(".listMain .games");
        this.$hotTags = $(".hotTag .list li");
        // 声明变量
        this.status = 1;
        this.num=0;
        this.total=0;//数据总数
        this.page=1;//当前页数
        this.tagArr=[];
        // 绑定事件
        this.click();
        this.loadData();
    },
    //点击事件
    click:function(){
        var self = this;
        // 内容导航栏点击事件
        this.$Navlists.on("click",function(){
            // 修改类名
            $(this).addClass("act");
            $(this).siblings().removeClass("act");
            // 重置页码
            self.page=1;
            // 加载数据
            self.status = $(this).attr("status");
            self.loadData(self);
        });
        // 侧边栏点击事件
        this.$hotTags.on("click",()=>{
            this.tagArr=[];
            this.$hotTags.each((index,item)=>{
                if($(item).find("input").prop("checked")){
                    $(item).find("span").text();
                    this.tagArr.push($(item).find("span").text());
                }
            });
            if(this.tagArr == false){
                this.loadData(this);
            }else{
                this.loadData(this,1);
            }
        })
    },
    // 修改页码样式
    pageCss:function(){
        $(".pageSel .num").eq(this.page-1).css("backgroundColor","#FFCA28");
    },
    // 页码点击事件
    pageClick:function(){
        var self = this;
        $(".pageSel .num").on("click",function(){
            self.page = parseInt($(this).text());
            self.loadData(self);
        });
        $(".pageSel .pagesPrev").on("click",function(){
            self.page--;
            if(self.page>=1){
                self.loadData(self);
            }else{
                self.page++;
            }
        });
        $(".pageSel .pagesNext").on("click",function(){
            self.page++;
            if(self.page<=Math.ceil(self.total/8)){
               self.loadData(self);
            }else{
                self.page--;
            }
        });
    },
    //设置页码和数据和
    dataNum:async function(_this){
        var self = _this || this;
        $(".listTop .all").text(self.total);
        $(".pageSel").html(
            `
                <li class="pagesPrev glyphicon glyphicon-chevron-left" aria-hidden="true"></li>
                <li class="pagesNext glyphicon glyphicon-chevron-right" aria-hidden="true"></li>
            `
        );
        for(var j=0; j< Math.ceil(self.total / 8);j++){
            $(".pageSel .pagesNext").before(`<li class="num">${j+1}</li>`);
        }
        self.pageClick();
        self.pageCss();
    },
    // 渲染数据
    loadData:async function(_this,gameTag){//tag=1过滤tag
        var json;
        var self = _this || this;
        var tag = gameTag || 0;
        self.$games.html("");
        await $.ajax({
            url:('../data/game.json'),
            dataType:"json",
            success:function(data){
                var newBox=[];
                if(tag){
                    $(data).each(function(index,item){
                        for(var k=0;k<item.gameTag.length;k++){
                            if(self.tagArr.includes(item.gameTag[k])){
                                newBox.push(item);
                                break;
                            }
                        }
                    });
                    data = newBox;
                };
                // 渲染到页面
                self.total=0;
                $(data).each(function(index,item){
                    if(item.status.indexOf(parseInt(self.status)) === -1){
                        
                    }else{
                        self.total++;
                        if(Math.ceil(self.total / 8) == self.page){
                            self.$games.append(
                                `
                                <li><a href="./detail.html?name=${item.id}">
                                    <img src="${item["142"]}" alt="">
                                    <div class="intro">
                                        <h4 class="gameTit">${item.name}</h4>
                                        <div class="gameMes">
                                            <p><span>${item.issuingDate}</span>上线</p>
                                            <p>推荐率<span>${item.recomRate}</span></p>
                                        </div>
                                        <div class="gameTag">
                                            <i>${item.gameTag[0]}</i>
                                            <i>${item.gameTag[1]}</i>
                                            <i>${item.gameTag[2]}</i>
                                            <i>${item.gameTag[3]}</i>
                                            <i>${item.gameTag[4]}</i>
                                        </div>
                                        <p class="price">${item.price}</p>
                                    </div>
                                </a></li>
                                `
                            )
                        };
                    };
                });
            },
        });
        self.dataNum(self);
    },
};

// 公开接口
function list(){
    return new List();
}
