'use strict'

console.log('ancienne console');

var test = require('./index.js');

console.log(test);
var logger = test.getNewLogger('name');
var logger2 = test.getNewLogger('name2');
console.log(logger);

logger2.log('something something');
logger.warn('something else');
logger.log('something something');
logger2.log('something something');
