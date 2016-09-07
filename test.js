'use strict'

var test = require('./index.js');
var test2 = require('./index.js');

//console.log(test);
var logger = test.getNewLogger('T1L1');
var logger2 = test.getNewLogger('T1L2');

var logger3 = test2.getNewLogger('T2L1');
var logger4 = test2.getNewLogger('T2L2');

logger2.log('something something');
logger.warn('something else');
logger.log('something something');
logger2.log('something else');
