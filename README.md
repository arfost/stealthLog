# stealthLog

[![NPM](https://nodei.co/npm/stealthlog.png?downloads=true&downloadRank=true)](https://nodei.co/npm/stealthlog/)

## Motivation

`stealthlog` is designed to be a simple and universal logging library with easy integration and configuration.
I'm often beginning litle test programs, or small projects in which I assume there will be no need for advanced logging
and, after some weeks, and a bigger size than expected first, the console is a mess, and I'm commenting/decommenting console log lines before each run.

This module is designed to be added easily and to replace console.log with minimal in app config (but it's not the only way to use it) and all the call to the loggers are and always will be totally compatible with standard logs call.

## Usage

To use `stealthlog` in your application, you must first add it to your project

```
npm install --save stealthlog
```

### In app usage

Then, the simplest way to use it will be to require the module, and after that create some logger instance from it.

```javascript
var getNewLogger = require('stealthLog')();

//console.log(test);
var logger = getNewLogger('T1L1');
var logger2 = getNewLogger('T1L2');


logger2.info('something something');
logger.log('something else, with an object', {'name':'i\'m an object', 'prop':34});
logger.warn('something something');
logger2.error('something else, with an object', {'name':'i\'m an object', 'prop':34}, 'and a phrase');

```

this example is using the default config file, which adds the logger name, datetime, and log level and sends logs to console, and in a log file called "logFile.log"

You can use a custom config file by adding its path in the first call (more on configFile format after the examples)

```javascript
var getNewCustomLogger = require('stealthLog')('customConfigFile.json');

//console.log(test);
var logger = getNewCustomLogger('T1L1');
var logger2 = getNewCustomLogger('T1L2');

...

```

All loggers coming from the first call will share the same custom config automatically

One conf file can also have multiple config inside if you want, so all the different logging configs can be in one file and easier to manage.

```javascript
var getNewCustomLogger = require('stealthLog')('customConfigFile.json');

//console.log(test);
var logger = getNewCustomLogger('T1L1', 'conf1');
var logger2 = getNewCustomLogger('T1L2', 'conf2');

...

```

If a config name is not found, it will default to the first in the file.

### Config file description

The goal of this project is to let you manage logging with a minimal code footprint so most of the logger config is done via a config file.

It comes in this format

```json
{
    "defaultLogger":{
      "writers":[
        "fileLog",
        "consoleLog"
      ],
      "level":[
          "INFO",
          "LOG",
          "ERROR",
          "WARN"
      ],
      "blackListName":[],
      "logTime":true,
      "logLvl":true
    }
}
```

This is the default config file. It declare a single configuration called "defaultLogger"

It then declares two "writers" this means this config will write in the console, and in a file called logFile.log.
These writers are parts of the default one, for this release there only be these ones, but fully configurable more complex writers is a feature to be released.

Then there is the lvl for wich the log will be written. In this example all available logs are activated. If you remove one, all logs with this level will be swallowed.

The next property "blackListName" allows you to exclude logs on logger name.

Last, logTime and logLvl controls if time and log levels should be added to the logged content.

You just have to tweak these properties to adapt your logger.

### Full usage example

Here is an example on how to use it to replace default console in a progressive and simple fashion.

App entry point : 
```javascript
getNewLogger = require('stealthLog')();

//console.log(test);
var console = getNewLogger('entryLogger');


console.log('something something');
console.warn('something else, with an object', {'name':'i\'m an object', 'prop':34});
...
```

Any other files : 

```javascript
var console = getNewLogger('otherFileLogger');

console.log('something something');
...
```

This way, you can always see where your log comes, easily hide or show logs by updating the config file blacklist.

Doing the logger instanciation, and replacing the console with it in top of your file make it easily manageable. And easy to add in already existing code.

I'm sure there are many more ways to use it, especially with some futur custom writers :)

## Planned features

    - more writers first, then custom writers creation (either by combining an output and a formatter, or even by creating new ones with code) 
    - perf improvements
    - don't hesitate to submit your suggestions.

