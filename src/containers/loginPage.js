import React, { Component } from 'react';
import {View,Text, StyleSheet, ImageBackground,Image,NativeModules} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors'
import { Container, Button, Body, Spinner,Content, Card, Form,Item,Input, Label, CardItem } from 'native-base';
// import { loginRequest } from '../actions';

const SweetAlertNative = NativeModules.RNSweetAlert;

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = { usernameInput: '', passwordInput: '' };

  }

  showNormalDialog(placedOrder){
    SweetAlertNative.showSweetAlert(
      {
          title: 'Xác nhận',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'Huỷ bỏ',
          otherButtonColor: '#dedede',
          type: 'normal',
          cancelText: "Huỷ bỏ",
          contentText: 'Bạn có xác nhận muốn tạo đơn hàng ?',
          cancellable: true,
        },
        successCallback =>{
          this.props.onCreatedPressed(this.props.login.token,placedOrder);

        },
        errorCallback => {

        }
    )

  }

  showSuccessDialog(message){
    SweetAlertNative.showSweetAlert(
      {
          title: 'Xác nhận',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          type: 'success',
          cancelText: "",
          contentText: message,
          cancellable: false,
        },
        successCallback =>{
            // alert(successCallback);
            NavigatorService.goBackToMainTabBar('OrderInfo')
        },
        errorCallback => {
            // alert(errorCallback);
        }
    )
  }

  showErrorDialog(message){
    SweetAlertNative.showSweetAlert(
      {
          title: 'Lỗi xảy ra',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          type: 'error',
          cancelText: "",
          contentText: message,
          cancellable: false,
        },
        successCallback =>{
            // alert(successCallback);
            this.props.removeErrorAfterConfirmDialog();
        },
        errorCallback => {
            this.props.removeErrorAfterConfirmDialog();
            // alert(errorCallback);
        }
    )
  }

  render() {
    // const { state, actions } = this.props;
    const { navigation } = this.props;
    const fromScreen = navigation.getParam('from', 'loginButton');

    return (
      <Container>
          {
          //Header
          }

          <ImageBackground
           source={require('../assets/opacity-login.png')}
           style={[styles.fullScreen, this.props.account.loading ? styles.setOpacity : null]}
          >
            <Image
            style={{
                      borderColor: '#d6d7da',
                      width: 250, height: 250,
                      justifyContent:'center',
                      alignSelf: 'center'}}
            source={require('../assets/Delivery.png')}>
            </Image>


            {
              //Body
            }
            <Content style={{backgroundColor: "transparent"}} contentContainerStyle={{flex:1}}>
              <Card style={styles.loginForm}>
                  <CardItem>
                    <Form style={styles.formItem}>
                        <Item style={styles.inputItem} floatingLabel>
                          <Label>Tài khoản</Label>
                          <Input
                          onChangeText={(text) => this.setState({ usernameInput: text })}
                          // keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default' }
                          // onChangeText={(value) => this.onChange(value) }
                          value={this.state.usernameInput}
                          />
                        </Item>
                        <Item style={styles.inputItem} floatingLabel>
                          <Label>Mật khẩu</Label>
                          <Input secureTextEntry={true}
                          onChangeText={(text) => this.setState({ passwordInput: text })}
                          // keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default' }
                          // onChangeText={(value) => this.onChange(value) }
                          value={this.state.passwordInput}/>
                        </Item>
                      </Form>
                  </CardItem>

                    <CardItem style={{flex:1,marginTop: 10}}>
                      <Body>
                          <Button style={{alignSelf: 'stretch', backgroundColor: colors.appleDefaultColor}}
                                  block
                                  primary
                                  onPress={()=>{
                                    const {usernameInput, passwordInput} = this.state;
                                    if (!usernameInput.length || !passwordInput.length) {
                                        alert('Hãy nhập tài khoản hoặc mật khẩu');
                                        return;
                                    }
                                    this.props.onLogin({username: usernameInput, password: passwordInput,from : fromScreen});
                                  }

                                  }>
                              <Text style={{color:colors.white}}>Đăng nhập</Text>
                          </Button>

                      </Body>

                    </CardItem>
                </Card>
            </Content>

          </ImageBackground>

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
            this.showErrorDialog("Sai tài khoản hoặc mật khẩu") : null
          }

    </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginForm: {
      height: 260,
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
    onLogin: (accountLogin) => {
      dispatch(appActions.actions.loginRequest(accountLogin));
    },
    removeErrorAfterConfirmDialog: () => {
      dispatch(appActions.actions.okFromDialog());
    }
    //Not necessary !
    // onSuccessFetch: () => {
    //     dispatch(fetchSuccessAction());
    // },
    // onAddMovie: (newMovie) => {
    //     dispatch(addMovieAction(newMovie));
    // },
    // actions: bindActionCreators(appActions.actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
