import React, { Component } from 'react';
import { View, Image, FlatList, SectionList, StyleSheet, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors';
import { Container, Header, Left, Body, Right, Thumbnail, Card, CardItem, Title, Content, List, Icon,Button,Text } from 'native-base';
import StepIndicator from 'react-native-step-indicator';



const labels = ["Đã nhận hàng", "Đang giặt", "Đã giặt xong"];
const customStyles = {
  stepIndicatorSize: 50,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: colors.colorBlueOnLeftTopLogo,
  stepStrokeWidth: 0,
  // stepStrokeFinishedColor: colors.colorLogo,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.colorBlueOnLeftTopLogo,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.white,
  stepIndicatorUnFinishedColor: colors.white,
  stepIndicatorCurrentColor: colors.colorBlueOnLeftTopLogo,
  stepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  currentStepIndicatorLabelFontSize: 13,
  labelColor: colors.gray,
  labelSize: 12,
  currentStepLabelColor: colors.colorBlueOnLeftTopLogo,

}

function colorIconDefine(stepStatus) {
  if (stepStatus === 'finished') {
    return colors.colorBlueOnLeftTopLogo
  } else if (stepStatus === 'unfinished') {
    return colors.gray
  } else {
    return colors.white
  }
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    style: {
      color: colorIconDefine(stepStatus)
      // color: colors.colorBlueOnLeftTopLogo,
    },
    size: 20,
  };
  switch (position) {
    case 0: {
      iconConfig.name = 'truck';
      iconConfig.type = 'FontAwesome';
    }

      break;
    //
    case 1: {
      iconConfig.name = 'local-laundry-service';
      iconConfig.type = 'MaterialIcons';
      iconConfig.active = true;
      break;
    }
    case 2: {
      iconConfig.name = 'check';
      iconConfig.type = 'FontAwesome';
      iconConfig.active = true;
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};



function defineStepIndicatorByStatusId(statusId) {
  if (statusId === 1 || statusId === 2) {
    return 0;
  } else if (statusId === 3 || statusId === 4) {
    return 1;
  } else if (statusId === 5 || statusId === 6 || statusId === 7) {
    return 2;
  }

}


class DeliverOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          "store_id": 0,
          "time_placed": "2018-10-16T00:00:00+07:00",
          "detail": "",
          "current_status_id": 1,
          "order_status_list": [
            {
              "status_id": 1,
              "user_id": 15,
              "status_changed_time": "0001-01-01T00:00:00Z",
              "description": "User xx vừa mới tạo order"
            }
          ],
          "user_id": 15,
          "capacity": 0,
          "estimated_capacity": 5,
          "delivery_address": "",
          "delivery_latitude": 0,
          "delivery_longitude": 0,
          "total": 30000,
          "priority": 0,
          "order_code": "ABC123",
          "review_id": 0
        },
        {
          "store_id": 0,
          "time_placed": "2018-10-16T00:00:00+07:00",
          "detail": "",
          "current_status_id": 1,
          "order_status_list": [
            {
              "status_id": 5,
              "user_id": 15,
              "status_changed_time": "0001-01-01T00:00:00Z",
              "description": "User xx vừa mới tạo order"
            }
          ],
          "user_id": 15,
          "capacity": 0,
          "estimated_capacity": 5,
          "delivery_address": "",
          "delivery_latitude": 0,
          "delivery_longitude": 0,
          "total": 30000,
          "priority": 0,
          "order_code": "ABC123",
          "review_id": 0
        }
      ]
    }
  }

  async componentDidMount() {

  }


  _renderItem = ({ item, index, section }) => {
    return (

      <Card style={{ marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20 }}>

        <View style={{
          marginTop: 15,
          marginBottom: 0,
          flexDirection: 'row',
          alignContent: 'flex-start',
          marginLeft: 20,
          marginRight: 20
        }}>
          <Left style={{ flexDirection: 'row', textAlign: 'left', textAlignVertical: 'center', flex: 2 }}>
            <Text style={{ color: colors.gray, fontWeight: 'bold', fontSize: 18 }}>Mã hoá đơn</Text>
            <Text> - </Text>
            <Text style={{ color: colors.gray }}>#{item.order_code}</Text>
          </Left>
          <Right style={{ flex: 1 }}>
            <Text>{item.total}đ</Text>
          </Right>
        </View>

        {item.order_status_list.length > 0 ?
          <CardItem bordered style={{ marginLeft: 10 }}>
            <Text style={{ color: colors.colorBlueOnLeftTopLogo }}>{(item.order_status_list[0].description === '' || item.order_status_list[0].description === undefined) ? '' : item.order_status_list[0].description}</Text>
          </CardItem>
          : null}

        {item.order_status_list.length > 0 ?
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <StepIndicator
              renderStepIndicator={this._renderStepIndicator}
              customStyles={customStyles}
              currentPosition={defineStepIndicatorByStatusId(item.order_status_list[0].status_id)}
              labels={labels}
              stepCount={3}
            />
          </View> : null
        }

        <CardItem footer bordered style={{ justifyContent: "flex-end" }}>
          <Right>
            <Button style={{
              borderColor: colors.colorBlueOnLeftTopLogo,
              borderWidth: 1,
              borderRadius: 4,
              backgroundColor: colors.white
            }}
              onPress={() => {
                this.props.navigation.navigate('OrderDetail');
              }}>
              <Text style={{ color: colors.colorBlueOnLeftTopLogo }}>Chi tiết</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    )

  }


  _renderStepIndicator = params => (

    // <MaterialIcon {...getStepIndicatorIconConfig(params)} />
    <Icon  {...getStepIndicatorIconConfig(params)} />
    //  type="FontAwesome" name="home" />getStepIndicatorIconConfig(params)
  );

  render() {
    // const { state, actions } = this.props;
    return (

      <Container >
        {
          //Header
        }
        <Header style={{ backgroundColor: colors.colorBlueOnLeftTopLogo }}>
          <Left style={{ flex: 1 }}></Left>

          <Body style={{ flex: 1, alignItems: 'center' }}>
            <Title>Đơn hàng</Title>
          </Body>

          <Right style={{ flex: 1 }}>

          </Right>
        </Header>
        {
          //Body
        }
        <Content style={{ flex: 1 }}>


          <FlatList
            style={{ flex: 1 }}
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
          />
        </Content>
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
