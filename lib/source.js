var ALPHANUM = /^\w+$/;

function resolveTokens(string, matches, keys){
	if(!keys || !matches){
		return string;
	}

	for(var i = 0; i < keys.length; i++){
		var key = keys[i],
			regexp = new RegExp('\\{' + key + '\\}', 'g');

		if(!ALPHANUM.test(key)){
			continue;
		}

		string = string.replace(regexp, matches[key]);
	}

	return string;
}

function resolveArg(arg, mappings, keys){
	switch(typeof arg){
		case 'string':
			return resolveTokens(arg, mappings, keys);
		case 'number':
			return arg;
		case 'object':
			Object.keys(arg).forEach(function(key){
				arg[key] = resolveArg(arg[key], mappings, keys);
			});
			return arg;
	}
}

function Source(desc){
	this.sourceDescription = desc;
	this.transforms = [];
}

Source.prototype.pipe = function pipe(transform){
	var args = [].slice.call(arguments, 1);

	this.transforms.push(function(mappings, keys){
		return transform.apply(null, args.map(function(arg){
			return resolveArg(arg, mappings, keys);
		}));
	});

	return this;
};

Source.prototype.resolve = function resolve(mappings){
	var sourceIsArray = this.sourceDescription.constructor === Array,
		keys = Object.keys(mappings),
		sources = sourceIsArray ? this.sourceDescription.slice(0) : [this.sourceDescription];

	for(var j = 0; j < sources.length; j++){
		sources[j] = resolveTokens(sources[j], mappings, keys);
	}

	return sourceIsArray ? sources : sources[0];
};

Source.prototype.compile = function compile(stream, mappings, keys){
	this.transforms.forEach(function(transform){
		stream = stream.pipe(transform(mappings, keys));
	});

	return stream;
};

module.exports = Source;
