var chain = require('../lib/chain');

describe('Resource chain', function(){
	it('should be a function', function(){
		expect(typeof chain).toBe('function');
	});

	it('should return a new chain instance', function(){
		var one = chain(), two = chain();

		expect(one).not.toBe(two);
	});

	describe('resouce method', function(){
		var chainObj;

		beforeEach(function(){
			chainObj = chain();
		});

		it('should be a function', function(){
			expect(typeof chainObj.resource).toBe('function');
		});
	});
});
