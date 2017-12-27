import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    level: "info",
    collapsed: true,
  });

export default createStore(reducer, applyMiddleware(logger));