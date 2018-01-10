module.exports = function server(fractal, options) {
  var server = fractal.web.server(options);

  return {
    start: function() {
      return server.start().then(function() {
        console.log(`Fractal server is now running at ${server.url}`);
      });
    },
    stop: function() {
      return server.stop();
    }
  };
};
