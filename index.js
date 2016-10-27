'use strict'

var writerPool = new Map();
var jsonWriter = new Map();

var tmpJsonWrite = require('./defaultWriter.json');

var addToJsonWriterPool = function(json){
  for(var writer of json){
    jsonWriter.set(writer.name, writer.conf);
  }
}

addToJsonWriterPool(tmpJsonWrite);

var getNewLogger = function(name, confFile, confName){
  return new Logger(name, confFile, confName, writerPool);
}

module.exports.getNewLogger = getNewLogger;

var defaultConfFile = './default.json';

class Logger{

  constructor(name, confFile, confName, writerPool){

    this.name = name;
    this.writerPool = writerPool;

    if (confFile === undefined || confFile === null || confFile == ''){
      confFile = defaultConfFile;
    }
    var confFile;
    try{
      confFile = require(confFile);
    }catch(err){
      console.log("Unable to open conf file, using default one", err);
      confFile = require(defaultConfFile);
    }
    if(confFile.customWriters != undefined){
      addToJsonWriterPool(confFile.customWriters);
    }
    if(confName != undefined){
      this.conf = confFile[confName];
      if(this.conf == undefined)
        this.conf = confFile[Object.keys(confFile)[0]];
    }else{
      this.conf = confFile[Object.keys(confFile)[0]];
    }
  }

  log(){
    if(this.conf.level.indexOf('LOG') != -1 && !this.conf.blackListName.indexOf(this.name) != -1){
      this.logToWriters(arguments, 'LOG');
    }
  }

  warn(){
    if(this.conf.level.indexOf('WARN')  != -1 && !this.conf.blackListName.indexOf(this.name) != -1){
      this.logToWriters(arguments, 'WARN');
    }
  }

  error(){
    if(this.conf.level.indexOf('ERROR')  != -1 && !this.conf.blackListName.indexOf(this.name) != -1){
      this.logToWriters(arguments, 'ERROR');
    }
  }

  info(){
      if(this.conf.level.indexOf('INFO')  != -1 && !this.conf.blackListName.indexOf(this.name) != -1){
        this.logToWriters(arguments, 'INFO');
      }
  }

  logToWriters(toLog, lvl){
    var intro = {};
    intro.name = this.name;
    if(this.conf.logTime == true){
      intro.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
    if(this.conf.logLvl == true){
      intro.level =  "[" + lvl + "]";
    }
    for(var writer of this.conf.writers){
        var realWriter = this.writerPool.get(writer);
        //console.log(writer, realWriter, writerPool);
        if(realWriter === undefined){
            realWriter = getNewWriter(writer);
            this.writerPool.set(writer, realWriter);
        }
        realWriter.write(intro, toLog);
    }
  }
}

var getNewWriter = function(name){
  //console.log(jsonWriter, name, jsonWriter.get(name));
    return new Writer(jsonWriter.get(name));
}

var typeLoggerLoader = require('./typeLogger/typeLoggerLoader.js');

class Writer{
  constructor(conf){

    this.writeMethod = typeLoggerLoader('writeType', conf.writeMethod.type);
    this.formatter = typeLoggerLoader('formatter', conf.formatter.type);

    this.writeConf = this.writeMethod.init(conf.writeMethod);
    this.formatterConf = this.formatter.init(conf.formatter, conf.writeMethod.type);

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
