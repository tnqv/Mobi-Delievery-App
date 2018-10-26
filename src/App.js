/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import AppStack from './navigators/AppNavigator';
import NavigatorService from './services/navigator';
import sagaRoot from './sagas';
import configureStore from './store/configureStore';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const store = configureStore()
store.runSaga(sagaRoot);

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <AppStack
          ref={navigatorRef => {
            NavigatorService.setTopLevelNavigator(navigatorRef);
          }}
          ></AppStack>
      </Provider>
    );
  }
}

export default App;