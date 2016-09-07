'use strict'

var writerPool = new Map();
var jsonWriter = new Map();

var tmpJsonWrite = require('./defaultWriter.json');

var addToJsonWriterPool = function(json){
  for(var writer in json){
    this.jsonWriter.set(writer.name, writer);
  }
}

var getNewLogger = function(name, confFile){
  return new Logger(name, confFile, confName, writerPool);
}

module.exports.getNewLogger = getNewLogger;

var defaultConfFile = './default.json';

class Logger{

  constructor(name, confFile, confName, writerPool){

    this.name = name;
    this.writerPool = writerPool;

    if (confFile === undefined || confFile === null){
      confFile = defaultConfFile;
    }
    var confFile;
    try{
      conf = require(confFile);
    }catch(err){
      console.log("Unable to open conf file, using default one", err);
      conf = require(defaultConfFile);
    }
    if(confFile.customWriters != undefined){
      addToJsonWriterPool(confFile.customWriters);
    }
    if(confName != undefined){
      this.conf = conf[confName];
      if(this.conf == undefined)
        this.conf = conf[0];
    }else{
      this.conf = conf[0];
    }

  }

  log(){
    if(this.conf.level.indexOf('LOG') != -1 && !this.conf.blackListName.indexOf(this.name) != -1)
        this.logToWriters(arguments);
  }

  warn(){
    if(this.conf.level.indexOf('WARN')  != -1 && !this.conf.blackListName.indexOf(this.name) != -1)
        this.logToWriters(arguments);
  }

  error(){
    if(this.conf.level.indexOf('ERROR')  != -1 && !this.conf.blackListName.indexOf(this.name) != -1)
      this.logToWriters(arguments);
  }

  info(){
      if(this.conf.level.indexOf('INFO')  != -1 && !this.conf.blackListName.indexOf(this.name) != -1)
        this.logToWriters(arguments);
  }

  logToWriters(toLog){
    for(var writer in this.conf.writers){
        var realWriter = this.writerPool.get(writer);
        //console.log(realWriter);
        if(realWriter === undefined){
            realWriter = getNewWriter(writer);
            this.writerPool.set(writer.name, realWriter);
        }
        realWriter.write(this.name, toLog);
    }
  }
}

var getNewWriter = function(name){
    return new Writer(jsonWriter.get(name));
}

var typeLoggerLoader = require('./typeLogger/typeLoggerLoader.js');

class Writer{
  constructor(conf){

    this.writeMethod = typeLoggerLoader('writeType', conf.writeMethod.type);
    this.formatter = typeLoggerLoader('formatter', conf.formatter.type);

    this.writeConf = this.writeMethod.init(conf.writeMethod);
    this.formatterConf = this.formatter.init(conf.formatter);

  }

  write(intro, toLog){
    //console.log('writer args send : \n', intro, toLog)
    this.writeMethod.write(this.writeConf, this.format(intro, toLog));
  }

  format(intro, toFormat){
    //console.log('formatter args send : \n', this.formatterConf);
    return this.formatter.format(this.formatterConf, intro, toFormat);
  }
}
