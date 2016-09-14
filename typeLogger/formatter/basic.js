var modules = {
  "simpleFormatter" : {
    init : function(){
      console.log('new simple formatter : ');
      return {"eol":require('os').EOL};
    },
    format : function(conf, intro, toLog){
      var txtToLog = "";
      for(var obj of toLog){
        if(Object.prototype.toString.call(obj ) === "[object String]" ){
          txtToLog = txtToLog + obj + " ";
        }else{
          txtToLog = txtToLog + JSON.stringify(obj, null, 4) + " ";
        }
      }
      return (intro+' :: '+txtToLog+conf.eol);
    }
  }
}
module.exports = modules;
