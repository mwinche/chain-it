var From = require('../lib/from'),
	Source = require('../lib/source'),
	from = new From();

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

			it('should have the same source descriptor', function(){
				expect(from.src('{1}.js').sourceDescription).toBe('{1}.js');
			});
		});
	});

	describe('resource function', function(){
		it('should be a function', function(){
			expect(typeof from.resource).toBe('function');
		});

		it('should not allow no arguments', function(){
			expect(function(){
				from.resource();
			}).toThrow();
		});

		it('should not allow two arguments', function(){
			expect(function(){
				from.resource(1,2);
			}).toThrow();
		});

		describe('return value', function(){
			it('should be a Source instance', function(){
				expect(from.resource('{1}.js').constructor).toBe(Source);
			});

			it('should have the same source descriptor', function(){
				expect(from.src('{1}.js').sourceDescription).toBe('{1}.js');
			});
		});
	});
});
