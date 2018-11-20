import React, { Component } from 'react';
import {View,Text, StyleSheet, ImageBackground,Image,TouchableOpacity} from 'react-native';
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

  componentDidMount(){
    this.props.getServicesList();
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
          { this.props.account.user.imageurl === "" ||  !this.props.account.user.imageurl ?
            <Image style={{
                        marginTop: 20,
                        width: 150, height: 150,
                        justifyContent:'center',
                        borderRadius: 100,
                        alignSelf: 'center'}}  source={require("../assets/l60Hf.png")}></Image>
            :
            <Image style={{
                        marginTop: 20,
                        width: 150, height: 150,
                        justifyContent:'center',
                        borderRadius: 100,
                        alignSelf: 'center'}}  source={{ uri: this.props.account.user.imageurl}}></Image>
            }

              <Text
                style={{ justifyContent:'center',
                fontSize: 32,
                color:colors.gray,
                alignSelf: 'center'}}>
                {this.props.account.user.name}
              </Text>
              <Grid style={{flex:1,alignItems:'center',margin: 20}}>
                  <Col style={{backgroundColor: colors.menuBackground,marginRight: 20}}>
                    <Row style={{
                          marginBottom: 20,
                          ...styles.menuStyle
                          }}
                          // onPress={()=> navigation.navigate('GetOrder')}>
                          >
                      <TouchableOpacity
                        style={styles.touchStyle}
                        onPress={()=> navigation.navigate('GetOrder')}>
                        <Icon style={styles.iconMenu} name='truck' type='FontAwesome'></Icon>

                        <Text style={styles.textMenu}>Đơn xử lý</Text>
                      </TouchableOpacity>

                    </Row>
                    <Row style={styles.menuStyle}>
                               <TouchableOpacity
                                  style={styles.touchStyle}
                                  >
                                   <Icon style={styles.iconMenu} name="history" type='FontAwesome'></Icon>

                                    <Text style={styles.textMenu}>Lịch sử</Text>

                                </TouchableOpacity>
                    </Row>

                  </Col>
                  <Col style={{ backgroundColor: colors.menuBackground}}>
                    <Row style={{...styles.menuStyle,
                                 marginBottom: 20,}}>
                                 <TouchableOpacity
                                 style={styles.touchStyle}
                                  onPress={()=> navigation.navigate('DeliverOrder')}>
                                   <Icon style={styles.iconMenu} name="local-laundry-service" type='MaterialIcons'></Icon>

                                    <Text style={styles.textMenu}>Đơn đang giặt</Text>

                                </TouchableOpacity>
                      </Row>
                      <Row style={styles.menuStyle}>
                                <TouchableOpacity
                                  style={styles.touchStyle}
                                  >
                                   <Icon style={styles.iconMenu} name="sign-out" type='FontAwesome'></Icon>

                                    <Text style={styles.textMenu}>Đăng xuất</Text>

                                </TouchableOpacity>
                                 {/* <Icon name="sign-out" type='FontAwesome'></Icon>
                                 <Text>Đăng xuất</Text> */}
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
  touchStyle: {
    alignItems:'center',
    justifyContent: 'center',
    flexDirection:'column',
    flex: 1,

  },
  iconMenu: {
    fontSize:60,
    color: colors.colorBlueOnLeftTopLogo
  },
  textMenu : {
    fontSize: 16,
    color:colors.black,
    fontWeight: 'bold',
  },
  menuStyle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems:'center',
    justifyContent: 'center',
    flexDirection:'column',
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
    getServicesList : () => {
      dispatch(appActions.actions.serviceRequest());
    },
    // actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
