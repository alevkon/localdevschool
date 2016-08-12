var App = {
  start(data) {
    Context.Actions.updateDevice(new MobileDetect(navigator.userAgent), true);
    Context.Actions.updateDevice({
      width: window.innerWidth,
      height: window.innerHeight
    });

    var history = History.createHistory();

    function createElement(Component, props) {
      props.params.data = data;
      return <Component {...props}/>
    }

    var routes = Router.getCompiledRoutes();

    ReactDOM.render(<ReactRouter.Router
      createElement = { createElement }
      history={ history }
      routes={ routes } />, document.body);
  }
};
