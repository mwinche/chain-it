# chain-link [![Build Status](https://secure.travis-ci.org/mwinche/chain-link.png?branch=master)](http://travis-ci.org/mwinche/chain-link)

> Allows defining multiple modules with lazy asset generation and then either requesting assets via the CLI or starting up a resource server (HTTP)


## Getting Started

More to come once published to npm.

## Documentation

The goal of this project is to build a lightweight HTTP server which serves up assets generated on the fly using Gulp plugins.


## Examples

Sample `chain.js`:

	var chain = require('chain-link')(),
		less = require('gulp-less'),
		tracuer = require('gulp-tracuer'),
		uglify = require('gulp-uglify'),
		sourcemaps = require('gulp-sourcemaps'),
		concat = require('gulp-concat'),
		from = chain.from;
	
	module.exports = chain
		.resource("/{1}.css",
			from.src('{1}.less')
				.pipe(sourcemaps.init())
				.pipe(less())
				.pipe(sourcemaps.write())
		)
		.resource("/raw/{1}.js",
			from.src("{1}.js")
				.pipe(sourcemaps.init())
				.pipe(tracuer())
				.pipe(uglify())
				.pipe(sourcemaps.write())
		)
		.resource("/superMegaFile.js",
			from.resource(["/raw/test.js", "/raw/test2.js"])
				.pipe(concat())
		);


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## License

Copyright (c) 2014 Matt Winchester  
Licensed under the MIT license.
