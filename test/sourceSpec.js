var Source = require('../lib/source');

describe('Source "class"', function(){
	var source;

	beforeEach(function(){
		source = new Source('{1}.js');
	});

	it('should exist', function(){
		expect(Source).toBeDefined();
	});

	it('should be a constructor', function(){
		expect(source.constructor).toBe(Source);
	});

	it('should have a pipe method', function(){
		expect(typeof source.pipe).toBe('function');
	});

	describe('resolve method', function(){
		it('should exist', function(){
			expect(typeof source.resolve).toBe('function');
		});

		it('should return the same string if it has no grouping in it', function(){
			source = new Source('test.less');

			expect(source.resolve({})).toBe('test.less');
		});

		it('should ignore non alphanum keys', function(){
			source = new Source('{1 2}.ts');

			expect(source.resolve({'1 2': 'foo'})).toBe('{1 2}.ts');
		});

		it('should replace {x} expressions with their respective values', function(){
			source = new Source('{2}/{1}.less');

			expect(source.resolve({
				2: 'styles',
				1: 'widgets'
			})).toBe('styles/widgets.less');
		});
	});
});
