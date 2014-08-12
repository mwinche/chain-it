var from = require('../lib/from');

describe('from', function(){
	describe('src function', function(){
		it('should be a function', function(){
			expect(typeof from.src).toBe('function');
		});

		it('should not allow no arguments', function(){
			expect(function(){
				from.src();
			}).toThrow();
		});

		it('should not allow two arguments', function(){
			expect(function(){
				from.src(1,2);
			}).toThrow();
		});

		describe('');
	});
});
