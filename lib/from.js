var Source = require('./source');

var From = module.exports = function From(){

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

	return new Source(descriptor);
};
