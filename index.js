var getNewLogger = function(confFile){
  return new Logger(confFile);
}

module.exports = getNewLogger;

var defaultConfFile = './default.json';

class Logger{

  constructeur(confFile){
    if (confFile === undefined || confFile === null){
      confFile = defaultConfFile;
    }
    var conf;
    try{
      this.conf = require(confFile);
    }catch(err){
      console.log("Unable to open conf file, using default one", err);
      this.conf = require(defaultConfFile)
    }
  }

  log(){
    console.log();
  }
}
