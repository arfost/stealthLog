var modules = {
  "fileWriter" : {
    init : function(){
      var conf = {};
      console.log('new file writer : ');
      var fs = require('fs');
      conf.ready = false;
      conf.stream = fs.createWriteStream('defaultLogFile'+'.txt');
      conf.stream.once('open',function(fd){
        console.log('file ready');
        conf.ready = true;
      });
      return conf;
    },
    write : function(conf, txt){
      if(true)
          conf.stream.write(txt);
      else
          console.log('file not ready');
    }
  },
  "consoleWriter" : {
    init : function(){
      console.log('new console writer : ');
      return {};
    },
    write : function(conf, txt){
      console.log(txt);
    }
  }
}

module.exports = modules;
