var ALPHANUM = /^\w+$/;

function Source(desc){
	this.sourceDescription = desc;
	this.transforms = [];
}

Source.prototype.pipe = function pipe(transform){
	this.transforms.push(transform);

	return this;
};

Source.prototype.resolve = function resolve(mappings){
	var sourceIsArray = this.sourceDescription.constructor === Array,
		keys = Object.keys(mappings),
		sources = sourceIsArray ? this.sourceDescription.slice(0) : [this.sourceDescription];

	for(var j = 0; j < sources.length; j++){
		var string = sources[j];

		for(var i = 0; i < keys.length; i++){
			var key = keys[i],
				regexp = new RegExp('\\{' + key + '\\}');

			if(!ALPHANUM.test(key)){
				continue;
			}


			while(string.match(regexp)){
				string = string.replace(regexp, mappings[key]);
			}

			sources[j] = string;
		}
	}

	return sourceIsArray ? sources : sources[0];
};

module.exports = Source;
