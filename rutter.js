// fake import, blurgh
var qs = qs || {
  parse: parse,
  stringify: stringify
};

var onRouteChange = function(event) {
  console.log('Route change', event);
};

var transitionTo = function(state, params) {
  var url = '/' + state.replace(/\./g, '/') + paramsToSearch(params);
  window.history.pushState({state: state, params: params || {}}, state, url);
};

var paramsToSearch = function(params) {
  return params ? '?' + qs.stringify(params) : '';
};

var getCurrentState = function() {
  return window.history.state;
};

var reverseEngineerStateFromUrl = function() {
  return {
    state: window.location.pathname.replace(/\//g, '.'),
    params: qs.parse(window.location.search)
  }
}

window.onload = function() {
  onRouteChange(getCurrentState() || reverseEngineerStateFromUrl());
}

window.onpopstate = onRouteChange;
