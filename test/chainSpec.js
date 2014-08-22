var createChain = require('../lib/chain'),
	From = require('../lib/from');

describe('Resource chain', function(){
	it('should be a function', function(){
		expect(typeof createChain).toBe('function');
	});

	it('should return a new chain instance', function(){
		var one = createChain(), two = createChain();

		expect(one).not.toBe(two);
	});

	it('should have a from object tied to the chain instance', function(){
		var chain = createChain();

		expect(chain.from.constructor).toBe(From);
	});

	describe('resource method', function(){
		var chain;

		beforeEach(function(){
			chain = createChain();
		});

		it('should be a function', function(){
			expect(typeof chain.resource).toBe('function');
		});

		it('should allow chaining', function(){
			expect(chain.resource('/path')).toBe(chain);
		});

		it('should register a new path', function(){
			var source = chain.from.src('path.png');
			chain.resource('/path', source);

			expect(chain.paths['/path']).toBe(source);
		});

		it('should setup match keys', function(){
			var path = '/{1}/{2}/{file}.js';
			chain.resource(path, chain.from.src('{file}.js'));

			expect(chain.pathKeys[path]).toEqual(['1', '2', 'file']);
		});
	});

	describe('get method', function(){
		var chain;

		beforeEach(function(){
			chain = createChain();
		});

		it('should exist', function(){
			expect(typeof chain.get).toBe('function');
		});

		it('should propagate to other resources if the source is from a resource', function(){
			var rootSource = chain.from.src('image.png');

			chain.resource('/foo', chain.from.resource('/bar'));
			chain.resource('/bar', rootSource);

			expect(chain.get('/foo').source()).toBe(rootSource);
		});

		describe('return value', function(){
			var retVal, source;

			beforeEach(function(){
				chain = createChain();
				source = chain.from.src('test.js');

				chain.resource('/test.js', source);
				retVal = chain.get('/test.js');
			});

			it('should have a resolve method that resolves', function(){
				chain.resource('/{dir}/{file}.css', chain.from.src('{dir}/styles/{file}.less'));

				retVal = chain.get('/theme/dark.css');

				expect(retVal.resolve()).toBe('theme/styles/dark.less');
			});

			it('should have a resolve method that resolves an array of sources', function(){
				chain.resource('/{dir}.js', chain.from.src(['{dir}/file1.js', '{dir}/file2.js']));

				retVal = chain.get('/typeahead.js');

				expect(retVal.resolve()).toEqual(['typeahead/file1.js', 'typeahead/file2.js']);
			});

			it('should have a keys method', function(){
				expect(typeof retVal.keys).toBe('function');
			});

			it('should have a keys method which returns matched keys', function(){
				chain
					.resource('/{dir}/{file}.{extension}', chain.from.src('src/{dir}/{file}.{extension}'));

				retVal = chain.get('/app/app.js');

				expect(retVal.keys()).toEqual(['dir', 'file', 'extension']);
			});

			it('should have a source method', function(){
				expect(typeof retVal.source).toBe('function');
			});

			it('should be null if there is no match', function(){
				retVal = chain.get('/404');

				expect(retVal).toBe(null);
			});

			it('should have the source method return the same source object', function(){
				expect(retVal.source()).toBe(source);
			});

			it('should return the originally request path on the path variable', function(){
				expect(retVal.path()).toBe('/test.js');
			});

			it('should return match data', function(){
				expect(retVal.match()).toEqual({});
			});

			it('should return the source based on patterns', function(){
				source = chain.from.src('{1}.less');

				chain.resource('/{1}.css', source);
				retVal = chain.get('/foo.css');

				expect(retVal.source()).toBe(source);
			});

			it('should match patterns', function(){
				chain.resource('/{1}/{2}.css', chain.from.src('{1}/{2}.less'));
				retVal = chain.get('/path/thing/foo.css');

				expect(retVal.match()).toEqual({
					1:'path/thing',
					2:'foo'
				});
			});
		});
	});
});
