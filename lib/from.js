var Source = require('./source');

var From = module.exports = function From(){
	this.isResource = false;
};

From.prototype.src = function src(desciptor){
	if(arguments.length !== 1){
		throw "Expected one argument to from";
	}

	return new Source(desciptor);
};

From.prototype.resource = function resource(descriptor){
	if(arguments.length !== 1){
		throw "Expected one argument to from";
	}

	var source = new Source(descriptor);

	source.isResource = true;

	return source;
};
