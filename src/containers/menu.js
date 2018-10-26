import React, { Component } from 'react';
import {View,Text, StyleSheet, ImageBackground,Image} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors'
import { Container, Button, Body, Spinner,Content, Card,CardItem, Form,Item,Input, Label, Icon} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import NavigatorService from '../services/navigator';
// import { loginRequest } from '../actions';

class Menu extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    // const { state, actions } = this.props;
    const { navigation } = this.props;
    const fromScreen = navigation.getParam('from', 'loginButton');

    return (
      <Container style={{backgroundColor: colors.menuBackground}}>
          {
          //Header
          }
          <Image style={{ width: 200, height: 200,
                      justifyContent:'center',
                      alignSelf: 'center'}}  source={require('../assets/opacity-login.png')}>

          </Image>
              <Grid style={{flex:1,alignItems:'center',margin: 20}}>
                  <Col style={{ backgroundColor: colors.menuBackground,marginRight: 20}}>
                    <Row style={{
                          marginBottom: 20,
                          ...styles.menuStyle
                          }}
                          onPress={()=> navigation.navigate('GetOrder')}>
                      <Icon name='home' type='FontAwesome'></Icon>
                      <Text>Nhận hàng</Text>
                    </Row>
                    <Row style={styles.menuStyle}>

                    </Row>

                  </Col>
                  <Col style={{ backgroundColor: colors.menuBackground}}>
                    <Row style={{...styles.menuStyle,
                                 marginBottom: 20,}}
                         onPress={()=> navigation.navigate('DeliverOrder')}>
                                 <Icon name="truck" type='FontAwesome'></Icon>
                                 <Text>Giao hàng</Text>
                      </Row>
                      <Row style={styles.menuStyle}>
                                 <Icon name="truck" type='FontAwesome'></Icon>
                                 <Text>Đăng xuất</Text>
                      </Row>
                  </Col>

              </Grid>


          {/* <ImageBackground
           source={require('../assets/opacity-login.png')}
           style={[styles.fullScreen, this.props.account.loading ? styles.setOpacity : null]}
          >

          </ImageBackground> */}

          {
             this.props.account.loading ?
                  <Spinner
                  style={{
                    width: 100,
                    height: 100,
                    left: `50%`,
                    top: `50%`,
                    transform: [{ translateX: -50},{translateY: -50 }],
                    justifyContent:'center',
                    position: 'absolute',}}
                  color='blue'>
                </Spinner> : null

          }

          {
            this.props.account.error ?
            <Text> Error occur </Text> : null
          }

    </Container>
    );
  }
}

const styles = StyleSheet.create({
  menuStyle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems:'center',
    justifyContent: 'center',
  },
  loginForm: {
      height: 320,
      justifyContent: 'center',
      alignSelf: 'stretch',
      marginLeft: 25,
      marginRight: 25,
      backgroundColor: colors.white,
      opacity: 1,
  },
  formItem: {
      flex: 1,
  },
  inputItem: {
      marginRight: 15,
  },
  setOpacity : {
     opacity : 0.5,
  },
  fullScreen : {
     flex: 1,
  }
})

function mapStateToProps(state) {
  return {
    account: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
