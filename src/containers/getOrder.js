import React, { Component } from 'react';
import {View, Image, FlatList,SectionList,StyleSheet, Dimensions,TouchableOpacity,
  ScrollView,
  Animated,} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import colors from '../config/colors';
import { Container, Header, Left, Body, Right, Grid, Card, CardItem, Title,Content, List, ListItem,Text,Button,Col,Row } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {IndicatorViewPager,PagerDotIndicator,PagerTitleIndicator} from 'rn-viewpager';
import NavigatorService from '../services/navigator';
import MapView from "react-native-maps";
import OrderMap from "../components/orderMap";
import * as appActions from '../actions';


const windowWidth = Dimensions.get('window').width;
class GetOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : [
        "1",
        "2",
        "2",
        "2",
        "2",
      ],
    }
  }

  componentDidMount () {
    let tokenFromState = this.props.account.token;
    let userIdFromState = this.props.account.user.ID;
    this.props.onLoadActiveOrders({deliveryId : userIdFromState, token : tokenFromState});
  }

  componentWillMount(){
  }

  _renderTitleIndicator() {
    return  <PagerTitleIndicator
                titles={["Đơn đang chờ","Đơn đã lấy"]}
                style={styles.indicatorContainer}
                trackScroll={true}
                itemTextStyle={styles.indicatorText}
                itemStyle={{width:windowWidth/2}}
                selectedItemStyle={{width:windowWidth/2}}
                selectedItemTextStyle={styles.indicatorSelectedText}
                selectedBorderStyle={styles.selectedBorderStyle}
            />;
  }

  _renderItem = ({item,index,section}) => {
    const date = new Date(item.time_placed);

    return (
      <TouchableOpacity onPress={() =>{
        console.log("test");
        this.props.navigation.navigate('OrderDetail',{
          orderId: item.ID,
        });
        }}>
      <Card style={{ marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20 }}>
        <View style={{marginTop:15,
                          marginBottom:0,
                          flexDirection: 'row',
                          alignContent:'flex-start',
                          marginLeft: 20,
                          marginRight: 20}}>
              <Left style={{flexDirection: 'row', textAlign: 'left', textAlignVertical: 'center',flex:2}}>
                  <Text style={{color: colors.gray, fontWeight: 'bold',fontSize:18}}>Mã hoá đơn</Text>
                  <Text> - </Text>
                  <Text style={{color: colors.gray}}>#{item.order_code}</Text>
              </Left>
              <Right style={{flex:1}}>
                  <Button info>
                    <Text style={{fontSize: 12,}}>Đang chờ</Text>
                  </Button>
              </Right>
        </View>
        <CardItem>
          <Body>
            <Grid>
              <Row>
                    <Text>
                      Thời gian đặt hàng:{"     "}
                      <Text style={{color: colors.gray,fontSize:14,}}>{`${date.getDate()}-${date.getMonth() +1 }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</Text>
                    </Text>

              </Row>
              <Row style={{marginTop:10}}>
                <Col>
                  <Text>
                    Địa chỉ
                  </Text>
                  <Text style={{color: colors.gray,fontSize:14}}>{item.delivery_address}</Text>
                </Col>
                <Col>
                <Text>
                  Địa điểm giặt
                </Text>
                <Text style={{color: colors.gray,fontSize:14}}>{item.store.address}</Text>
                </Col>
              </Row>
            </Grid>
          </Body>
        </CardItem>
      </Card>
      </TouchableOpacity>
    )
  }
  render() {
    const { state, actions,navigation } = this.props;

    return (

      <Container>
          {
            //Header
          }
          <Header style={{backgroundColor: colors.colorBlueOnLeftTopLogo}}>
            <Left style={{flex: 1}}></Left>

            <Body style={{flex:1,alignItems:'center'}}>
              <Title>Danh sách</Title>
            </Body>

            <Right style={{flex: 1}}>

            </Right>
          </Header>
          {
            //Body
          }
          {
            //Body
          }
          <View style={{ flex: 1 }}>
          <IndicatorViewPager
                    style={{flex: 1, flexDirection: 'column-reverse'}}
                    indicator={this._renderTitleIndicator()}
                >
                    <View style={{backgroundColor: colors.lightgray}}>
                        <OrderMap></OrderMap>
                    </View>
                    <View style={{backgroundColor: colors.lightgray}}>
                         <FlatList
                            style={{backgroundColor:'transparent'}}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderItem}
                            data={this.props.activePlacedOrders.activeOrders}
                            navigation={navigation}
                          />
                    </View>
          </IndicatorViewPager>


          </View>
      </Container>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#e91e63',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  indicatorContainer: {
    backgroundColor: colors.colorBlueAccentOnLeftTopLogo,
    height: 48
  },
  indicatorText: {
      fontSize: 14,
      color: 0xFFFFFF99
  },
  indicatorSelectedText: {
      fontSize: 14,
      color: 0xFFFFFFFF
  },
  selectedBorderStyle: {
      height: 3,
      backgroundColor: 'white'
  },
  statusBar: {
      height: 24,
      backgroundColor: 0x00000044
  },
  toolbarContainer: {
      height: 56,
      backgroundColor: 0x00000020,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
  },
  backImg: {
      width: 16,
      height: 17
  },
  titleTxt: {
      marginLeft: 36,
      color: 'white',
      fontSize: 20
  },
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  // endPadding: {
  //   paddingRight: width - CARD_WIDTH,
  // },
  // card: {
  //   padding: 10,
  //   elevation: 2,
  //   backgroundColor: "#FFF",
  //   marginHorizontal: 10,
  //   shadowColor: "#000",
  //   shadowRadius: 5,
  //   shadowOpacity: 0.3,
  //   shadowOffset: { x: 2, y: -2 },
  //   height: CARD_HEIGHT,
  //   width: CARD_WIDTH,
  //   overflow: "hidden",
  // },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    // backgroundColor: "rgba(130,4,150, 0.3)",
    backgroundColor: colors.newAccentBlue,
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

function mapStateToProps(state) {
  return {
    state: state,
    account: state.login,
    activePlacedOrders : state.activePlacedOrders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoadActiveOrders: (params) => {
      dispatch(appActions.actions.fetchActiveOrdersRequest(params));
    },
    // actions: bindActionCreators(appActions.actions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(GetOrder);
