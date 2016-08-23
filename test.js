'use strict'

var test = require('./index.js');

//console.log(test);
var logger = test.getNewLogger('name');
var logger2 = test.getNewLogger('NAME22');

logger2.log('something something');
logger.warn('something else');
logger.log('something something');
logger2.log('something else');
