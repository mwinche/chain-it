var ALPHANUM = /^\w+$/;

function Source(desc){
	this.sourceDescription = desc;
	this.transforms = [];
}

Source.prototype.pipe = function(transform){
	this.transforms.push(transform);

	return this;
};

Source.prototype.resolve = function(mappings){
	var keys = Object.keys(mappings),
		string = this.sourceDescription;

	for(var i = 0; i < keys.length; i++){
		var key = keys[i],
			regexp = new RegExp('\\{' + key + '\\}');

		if(!ALPHANUM.test(key)){
			continue;
		}


		while(string.match(regexp)){
			string = string.replace(regexp, mappings[key]);
		}
	}

	return string;
};

module.exports = Source;
