var Source = require('./source');

module.exports = {
	src: function src(desciptor){
		if(arguments.length !== 1){
			throw "Expected one argument to from";
		}

		return new Source(desciptor);
	},
	resource: function resource(descriptor){
		if(arguments.length !== 1){
			throw "Expected one argument to from";
		}

		return new Source(descriptor);
	}
};
