var Source = require('./source');

module.exports = {
	src: function src(){
		if(arguments.length !== 1){
			throw "Expected one argument to from";
		}

		return new Source();
	}
};