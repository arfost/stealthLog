var fs = require('fs');
var path = require('path');

var allModules = {};

var getModuleFonctionByType = function(type, name){
  if (allModules[type] == undefined){
    getAllModule(type);
  }
  var module = allModules[type][name];
  if(module != undefined){
    return module;
  }else{
    console.log("Warning module " +type+":" +name+ " not found in \n", allModules);
  }
}

module.exports = getModuleFonctionByType;

function getAllModule(type){
  allModules[type] = {};
  var files = fs.readdirSync(__dirname+'/'+type+'/');
  for (var file of files) {
    //console.log(path.extname(file) );
    if(path.extname(file) == '.js'){
      var pack = require(__dirname+'/'+type+'/'+file);
      var packID = file.split('.')[0];
      for(var key in pack){
        if(key != 'id'){
          allModules[type][packID+':'+key] = pack[key];
        }
      }
    }else{
      console.log("fichier de type non reconnu : "+file+" Ne mettez que des fichiers JS dans le dossier module.");
    }
  }
  //console.log(allModules);
  return allModules;
}
