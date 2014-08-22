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
			source = new Source('{dir}/{1}.less');

			expect(source.resolve({
				dir: 'styles',
				1: 'widgets'
			})).toBe('styles/widgets.less');
		});

		it('should allow for arrays of sources', function(){
			source = new Source(['file1.js', 'file2.js', 'file3.js']);

			expect(source.resolve({})).toEqual(['file1.js', 'file2.js', 'file3.js']);
		});

		it('should transform contents of arrays', function(){
			source = new Source(['{dir}/{file}.js', '{dir}/{file}.css']);

			expect(source.resolve({
				dir: 'src',
				file: 'widget'
			})).toEqual(['src/widget.js', 'src/widget.css']);
		});
	});

	describe('pipe method', function(){
		it('should exist', function(){
			expect(typeof source.pipe).toBe('function');
		});

		it('should return this (enable chaining)', function(){
			expect(source.pipe()).toBe(source);
		});

		it('should add the transform to a list of transforms', function(){
			var spy1 = jasmine.createSpy('one'),
				spy2 = jasmine.createSpy('two');

			spy1.andReturn(1);
			spy2.andReturn(2);

			source
				.pipe(spy1)
				.pipe(spy2);

			expect(source.transforms[0]()).toEqual(1);
			expect(source.transforms[1]()).toEqual(2);
		});
	});

	describe('compile method', function(){
		var transforms, spy;

		beforeEach(function(){
			spy = jasmine.createSpyObj('gulp-src', ['pipe']);
			spy.pipe.andReturn(spy);

			transforms = [
				jasmine.createSpy('first'),
				jasmine.createSpy('second'),
				jasmine.createSpy('third')
			];

			source = (new Source('test.less'))
				.pipe(transforms[0], {'config-option': 'value'})
				.pipe(transforms[1], {'key': '{token}'})
				.pipe(transforms[2], '{token}Dir', 'value', 3);
		});

		it('should pass plugins through to the src\'s pipe method in order', function(){
			transforms[0].andReturn(0);
			transforms[1].andReturn(1);
			transforms[2].andReturn(2);

			source.compile(spy);

			expect(spy.pipe.calls.length).toBe(3);
			expect(spy.pipe.calls[0].args).toEqual([0]);
			expect(spy.pipe.calls[1].args).toEqual([1]);
			expect(spy.pipe.calls[2].args).toEqual([2]);
		});

		it('should pass arguments in to transforms', function(){
			source.compile(spy);

			expect(transforms[0].calls[0].args).toEqual([{'config-option':'value'}]);
		});

		it('should pass arguments in to transforms', function(){
			source.compile(spy, {token: 'thing'}, ['token']);

			expect(transforms[1].calls[0].args).toEqual([{'key':'thing'}]);
		});

		it('should pass arguments in to transforms', function(){
			source.compile(spy, {token: 'that'}, ['token']);

			expect(transforms[2].calls[0].args).toEqual(['thatDir', 'value', 3]);
		});
	});
});
