import React, { Component } from 'react';
import {View,Text, Image, FlatList,SectionList,StyleSheet,AsyncStorage} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors';
import { Container, Header, Left, Body, Right, Thumbnail, Card, CardItem, Title,Content, List, ListItem } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

class DeliverOrder extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount () {

  }

  render() {
    // const { state, actions } = this.props;
    return (

      <Container style={{ justifyContent:'center',
                          alignItems:'center'}}>

          <Text>dELIVERY </Text>
      </Container>

    );
  }
}

const styles = StyleSheet.create({

})

function mapStateToProps(state) {
  return {
    state: state,
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DeliverOrder);
