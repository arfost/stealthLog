'use strict'

var writerPool = new Map();

var getNewLogger = function(name, confFile){
    console.log('general writerPoll',writerPool);
  return new Logger(name, confFile, writerPool);
}



module.exports.getNewLogger = getNewLogger;

var defaultConfFile = './default.json';

class Logger{

  constructor(name, confFile, writerPool){
      
    this.name = name;
    this.writerPool = writerPool;
    console.log('TESTTESTTEST',this.writerPool, writerPool);
    
    if (confFile === undefined || confFile === null){
      confFile = defaultConfFile;
    }
    var conf;
    try{
      this.conf = require(confFile);
    }catch(err){
      console.log("Unable to open conf file, using default one", err);
      this.conf = require(defaultConfFile);
    }
    
  }

  log(){
    console.log(this.name, this.writerPool);
  }
  
  warn(val){
      this.writerPool.test = val;
  }
  
  error(){
      
  }
  
  info(){
      if(this.conf.level.contains('INFO') && this.conf.blackListName.contains(this.name)){
          for(var writer of this.conf.writers){
              var realWriter = this.writerPool.get(writer.name);
              if(realWriter === undefined){
                  realWriter = getNewWriter(writer.type, writer.name);
                  this.writerPool.set(this.name, realWriter);
              }
          
              realWriter.write(this.name, arguments);
          }
          
      }
  }
}

var getNewWriter = function(type){
    var writer;
    if('txtFile' == type){
        
    }
    
    return writer;
}

class fileWriter{
    
    constructor(name){
        var fs = require('fs');
        this.ready = false;
        this.stream = fs.createWriteSteam(name+'.txt');
        this.stream.once('open',this.setReady(true));
    }
    
    setReady(state){
        this.ready = state;
    }
    
    write(intro, toLog){
        if(readyState)
            this.stream.write(intro+' :: '+JSON.stringify(toLog, null, 4)+'\n');
        else
            console.log('file not ready');
    }
}

class consoleWriter{
    
    constructor(name){

    }
    
    setReady(state){
        this.ready = state;
    }
    
    write(intro, toLog){
        console.log(intro+' :: '+JSON.stringify(toLog, null, 4)+'\n');
    }
}