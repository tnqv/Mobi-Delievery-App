import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createSwitchNavigator,createStackNavigator } from 'react-navigation';
import colors from '../config/colors';
import Menu from '../containers/menu';
import LoginPage from '../containers/loginPage';
import DeliverOrder from '../containers/deliverOrder';
import GetOrder from '../containers/getOrder';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const AppFunctionStackNavigator = createStackNavigator( {
  Menu: {
      screen: Menu,
      navigationOptions: {
          header: null,
      }
  },
  DeliverOrder: {
      screen: DeliverOrder,
      navigationOptions: {
        header: null,
      },
  },
  GetOrder: {
      screen: GetOrder,
      navigationOptions: {
        header: null,
      },
  }
},
{
  initialRouteName: 'Menu',
  mode: 'modal',
  headerMode: 'none',

});

const AppSwitchNavigatior = (signedIn = false) => {
  return createSwitchNavigator(
    {
      LoginScreen: { screen: LoginPage },
      MenuScreen: { screen: AppFunctionStackNavigator },
    },
    {
      initialRouteName: signedIn ? 'LoginScreen' : 'MenuScreen',
    });
}

class AppStack extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      isLoading: true
    }
  }
  render() {
    // if (this.state.isLoading) return null
    let loggedIn = false
    if (this.props.auth.token) {
      loggedIn = true
    }

    const AppStackNavigate = AppSwitchNavigatior(loggedIn);
    return <AppStackNavigate />;

  }
}

const mapStateToProps = state => ({
  auth: state.login
})

export default connect(mapStateToProps)(AppStack)