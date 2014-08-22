# chain-it [![Build Status](https://secure.travis-ci.org/mwinche/chain-link.png?branch=master)](http://travis-ci.org/mwinche/chain-link)

> Allows defining multiple modules with lazy asset generation and then either requesting assets via the CLI or starting up a resource server (HTTP)


## Getting Started

More to come once published to npm.

## Documentation

The goal of this project is to build a lightweight HTTP server which serves up assets generated on the fly using Gulp plugins.


## Examples

Sample `chain.js`:

	var chain = require('chain-it')(),
    	less = require('gulp-less'),
    	tracuer = require('gulp-traceur'),
    	uglify = require('gulp-uglify'),
    	concat = require('gulp-concat'),
    	from = chain.from;
    
    module.exports = chain
    	.resource("/{file}.css",
    		from.src('{file}.less')
    			.pipe(less)
    	)
    	.resource("/raw/{1}.js",
    		from.src("{1}.js")
    			.pipe(tracuer)
    			.pipe(uglify)
    	)
    	.resource("/superMegaFile.js",
    		from.src(["test.js", "test2.js"])
    			.pipe(uglify)
    			.pipe(concat, 'superMegaFile.js')
    	);



## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014 Matt Winchester  
Licensed under the MIT license.
