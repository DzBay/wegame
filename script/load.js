self.onmessage = function (e){//e.data
    var xhr = new this.XMLHttpRequest();
    xhr.open('get','../data/game.json');
    xhr.send(null);
    xhr.onreadystatechange = function (){
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          var json = JSON.parse(xhr.responseText);
            json.forEach(function(item){
                if(e.data === item.id){
                    self.postMessage({err: 1,msg:item});
                }
            });
        } else {
          self.postMessage({err: 0,msg: '获取失败'});
        }
      }
    }
}