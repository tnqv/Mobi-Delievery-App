
import { createStore, applyMiddleware,combineReducers} from 'redux';
import * as reducers from '../reducers';

import saga from 'redux-saga';


export default function configureStore(){

    // The middlewares which will be used in this App
    const middlewares = [];
    //Combine reducers
    const reducer = combineReducers(reducers);
    //Saga
    const sagaMiddleware = saga();

    middlewares.push(sagaMiddleware);

    // if (process.env.NODE_ENV === 'development') {
    //   const logger = createLogger();
    //   middlewares.push(logger);
    // }

    const store = createStore(
      reducer,
      applyMiddleware(...middlewares)
    );
    store.runSaga = sagaMiddleware.run

    return store;
}
