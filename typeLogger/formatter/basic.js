var modules = {
  "simpleFormatter" : {
    init : function(){
      console.log('new simple formatter : ');
      return {};
    },
    format : function(conf, intro, toLog){
      //console.log('formatter args recu : \n', conf, intro, toLog);
      return (intro+' :: '+JSON.stringify(toLog, null, 4)+'\n');
    }
  }
}

module.exports = modules;
