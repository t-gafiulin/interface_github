import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const logger = createLogger({
    level: "info",
    collapsed: true,
  });

export default createStore(
  reducer, 
  applyMiddleware(
    logger,
    thunkMiddleware
  )
);