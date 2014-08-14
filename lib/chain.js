function Chain(){
	this.paths = {};
}

Chain.prototype.resource = function(path, source){
	this.paths[path] = source;

	return this;
};

module.exports = function(){
	return new Chain();
};
