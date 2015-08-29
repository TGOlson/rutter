when.allDefinedGlobal(['rutter'], function(rutter) {
  rutter.handlePageLoad();
});

when.allDefinedGlobal(['expose', 'qs'], function(expose, qs) {
  var onRouteChange = function(event) {
    console.log('Route change', event);
  };

  var transitionTo = function(state, params) {
    var url = '/' + state.replace(/\./g, '/') + paramsToSearch(params);
    var currentStateData = {state: state, params: params || {}};

    window.history.pushState(currentStateData, state, url);
    onRouteChange(currentStateData);
  };

  var paramsToSearch = function(params) {
    return params ? '?' + qs.stringify(params) : '';
  };

  var getCurrentState = function() {
    return window.history.state;
  };

  var reverseEngineerStateFromUrl = function() {
    return {
      state: window.location.pathname.replace(/\//g, '.').slice(1),
      params: qs.parse(window.location.search)
    };
  }

  var handlePageLoad = function() {
    onRouteChange(getCurrentState() || reverseEngineerStateFromUrl());
  };

  window.onpopstate = function(e) {
    onRouteChange(e.state);
  };

  expose('rutter', {
    transitionTo: transitionTo,
    handlePageLoad: handlePageLoad,
    onRouteChange: onRouteChange
  });
});
