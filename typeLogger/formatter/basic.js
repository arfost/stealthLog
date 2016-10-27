var modules = {
  "simpleFormatter" : {
    init : function(initConf, writeType){
      var conf = {};
      conf.eol = require('os').EOL;
      conf.writeType = writeType;
      //console.log('new simple formatter : ');
      return conf;
    },
    format : function(conf, intro, toLog){
      var txtToLog = "";
      var introStr = ""
      for(var key in intro){
        introStr += intro[key] + "; "
      }
      for(var obj of toLog){
        if(Object.prototype.toString.call(obj ) === "[object String]" ){
          txtToLog = txtToLog + obj + " ";
        }else{
          txtToLog = txtToLog + conf.eol + JSON.stringify(obj, null, 4) + conf.eol;
        }
      }
      if(~conf.writeType.indexOf('console')){
        if(txtToLog.endsWith(conf.eol)){
          txtToLog = txtToLog.substring(0, txtToLog.length - conf.eol.length);
        }
      }else{
        txtToLog += txtToLog.endsWith(conf.eol) ? "":conf.eol;
      }
      return (introStr+' :: '+txtToLog);
    }
  }
}
module.exports = modules;
