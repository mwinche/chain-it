var from = require('../lib/from'),
	Source = require('../lib/source');

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

		describe('return value', function(){
			it('should be a Source instance', function(){
				expect(from.src('{1}.js').constructor).toBe(Source);
			});
		});
	});
});
