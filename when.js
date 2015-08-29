(function(global) {

  // utils
  var invokeThunk = function(f) {
    return f();
  }

  var invokeAllThunks = function(fs) {
    return fs.map(invokeThunk);
  };

  // when API
  var when = function(f, g) {
    when.all([f], g);
  };

  var DEFAULT_INTERVAL = 10;
  var MAX_QUERIES = Infinity;

  when.setQueryInterval = function(x) {
    DEFAULT_INTERVAL = x;
  };

  when.setMaxQueries = function(x) {
    MAX_QUERIES = x;
  };

  when.all = function(fs, g) {
    (function test(i) {
      global.setTimeout(function() {
        if (fs.every(invokeThunk)) {
          return g();
        } else if (i < MAX_QUERIES) {
          return test(i++);
        }
      }, DEFAULT_INTERVAL)
    })(0);
  };

  when.allDefined = function(ps, o, f) {
    var fs = ps.map(function(p) {
      return function() {
        return o[p];
      };
    });

    return when.all(fs, function() {
      return f.apply(null, invokeAllThunks(fs));
    });
  };

  when.defined = function(p, o, f) {
    return when.allDefined([p], o, f);
  };

  when.allDefinedGlobal = function(ps, f) {
    return when.allDefined(ps, global, f);
  };

  when.definedGlobal = function(p, f) {
    return when.allDefinedGlobal([p], global, f);
  };

  global.when = when;
})(window);
