var modules = {
  "fileWriter" : {
    init : function(initConf){
      var conf = initConf;
      //console.log('new file writer : ');
      var fs = require('fs');
      if(conf.file === undefined){
        //console.log('/////////////////////////////////////////////////////////////////////////////////////////')
        conf.file = 'defaultLogFile.log'
      }
      conf.fs = fs;
      return conf;
    },
    write : function(conf, txt){
      conf.fs.appendFile(conf.file, txt, function (err) {
        if(err != null){
          console.log(err);
        }
      });
    }
  },
  "consoleWriter" : {
    init : function(initConf){
      //console.log('new console writer : ');
      return initConf;
    },
    write : function(conf, txt){
      console.log(txt);
    }
  }
}

module.exports = modules;
