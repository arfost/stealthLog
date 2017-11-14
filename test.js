'use strict'

var test = require('./index.js')();

//console.log(test);
var logger = test('T1L1');
var logger2 = test('T1L2');


logger2.log('something something');
logger.warn('something else, with an object', {'name':'i\'m an object', 'prop':34});
logger.log('something something');
logger2.log('something else, with an object', {'name':'i\'m an object', 'prop':34}, 'and a phrase');

