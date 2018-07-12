import createHistory from 'history/createHashHistory';
import queryString from 'query-string';
import { Bootstrapper } from 'react-habitat';
import { ReduxDomFactory } from 'react-habitat-redux';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { connectRoutes } from 'redux-first-router';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import appMiddleware from 'middleware';
import appReducer from 'reducers';
import getRouteMap from 'routes';

import CustomContainerBuilder from './CustomContainerBuilder';
import registrations from './registrations';

class MyApp extends Bootstrapper {
  constructor() {
    super();

    // Create container builder instance.
    const containerBuilder = new CustomContainerBuilder();

    // Set a new 'Redux' factory for the store.
    const store = this.createStore();
    containerBuilder.factory = new ReduxDomFactory(store);

    // Register components - async allows for code splitting.
    registrations.forEach((registration) => {
      containerBuilder.registerIfPresent(
        registration.component,
        registration.name,
      );
    });

    // Finally, set the container.
    this.setContainer(containerBuilder.build());
  }

  /** Create redux store. */
  createStore() {
    // Get action:route map for current page.
    const routesMap = getRouteMap();

    // Create appropriate store.
    return routesMap
      ? this.createRouteStore(routesMap)
      : this.createNonRouteStore();
  }

  /** Create redux store without redux-first-router. */
  createNonRouteStore() {
    // Create root reducer.
    const rootReducer = combineReducers({ app: appReducer });

    // Add router middleware.
    const middlewares = applyMiddleware(
      ...appMiddleware,
      thunk,
      createLogger({ collapsed: true }),
      promise,
    );

    // Create store.
    return createStore(rootReducer, middlewares);
  }

  /** Create redux store with redux-first-router. */
  createRouteStore(routesMap) {
    // Create hash history instance - using hash to avoid conflicts with Kentico URL rewriter.
    const history = createHistory({
      basename: '',
      hashType: 'hashbang',
    });

    // Initialies redux first router.
    const {
      reducer: locationReducer,
      middleware: routerMiddleware,
      enhancer: routerEnhancer,
    } = connectRoutes(history, routesMap, { querySerializer: queryString });

    // Create root reducer.
    const rootReducer = combineReducers({ app: appReducer, location: locationReducer });

    // Add router middleware.
    const middlewares = applyMiddleware(
      ...appMiddleware,
      thunk,
      createLogger({ collapsed: true }),
      promise,
      routerMiddleware,
    );

    // Create a store.
    return createStore(rootReducer, compose(routerEnhancer, middlewares));
  }
}

// Always export a 'new' instance so it immediately evokes
export default new MyApp();
