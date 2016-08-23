'use strict'

var writerPool = new Map();

var getNewLogger = function(name, confFile){
  return new Logger(name, confFile, writerPool);
}



module.exports.getNewLogger = getNewLogger;

var defaultConfFile = './default.json';

class Logger{

  constructor(name, confFile, writerPool){

    this.name = name;
    this.writerPool = writerPool;

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
    if(this.conf.level.includes('LOG') && !this.conf.blackListName.includes(this.name))
        this.logToWriters(arguments);
  }

  warn(){
    if(this.conf.level.includes('WARN') && !this.conf.blackListName.includes(this.name))
        this.logToWriters(arguments);
  }

  error(){
    if(this.conf.level.includes('ERROR') && !this.conf.blackListName.includes(this.name))
      this.logToWriters(arguments);
  }

  info(){
      if(this.conf.level.includes('INFO') && !this.conf.blackListName.includes(this.name))
        this.logToWriters(arguments);
  }

  logToWriters(toLog){
    for(var writer of this.conf.writers){
        var realWriter = this.writerPool.get(writer.name);
        //console.log(realWriter);
        if(realWriter === undefined){
            realWriter = getNewWriter(writer.conf);
            this.writerPool.set(writer.name, realWriter);
        }
        realWriter.write(this.name, toLog);
    }
  }
}

var getNewWriter = function(conf){
    return new Writer(conf);
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
