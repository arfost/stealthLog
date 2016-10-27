'use strict'

var test = require('./index.js');
var test2 = require('./index.js');

//console.log(test);
var logger = test.getNewLogger('T1L1');
var logger2 = test.getNewLogger('T1L2');

var logger3 = test2.getNewLogger('T2L1');
var logger4 = test2.getNewLogger('T2L2');

logger2.log('something something');
logger.warn('something else, with an object', {'name':'i\'m an object', 'prop':34});
logger.log('something something');
logger2.log('something else, with an object', {'name':'i\'m an object', 'prop':34}, 'and a phrase');

logger3.log('something else, with an object', logger2);
logger4.error('something else, with an object', {'name':'i\'m an object', 'prop':34});
