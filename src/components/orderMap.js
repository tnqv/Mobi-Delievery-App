import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  ListView,
  NativeModules
} from "react-native";
import firebase from 'react-native-firebase';
import * as appActions from '../actions';
import {Text,Button, CardItem} from 'native-base';
import colors from '../config/colors';
import MapView, { Marker } from "react-native-maps";
import Timeline from 'react-native-timeline-listview';
import { connect } from 'react-redux';
import Dialog, { DialogContent,DialogButton,DialogTitle } from 'react-native-popup-dialog';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = CARD_HEIGHT + 50;
const DATA = [];

class OrderMap extends Component {


  constructor(props) {
    super(props);
    this.rootRef = firebase.database().ref("delivery/");
    // console.log(this.rootRef);
    // this.rootRef.on('value',(snap)=>{
    //   console.log(snap);
    // });

    // let dataSource = new ListView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // });
    this.state = {
        selectedOrder: 0,
        dialogVisible: false,
        dialogContent: "",
        dataSource: DATA,
        region: {
          latitude: 10.762622,
          longitude: 106.660172,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        },
    }

  }
  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  listenForOrders(itemsRef) {
    console.log("listen");
    itemsRef.on('value', (snap) => {

      // get children as an array

      var items = [];
      snap.forEach((child) => {
        items.push({
          ID: child.val().ID,
          orderInfo: child.val(),
          capacity: child.val().capacity,
          store: child.val().store,
          delivery_address: child.val().delivery_address,
          order_code: child.val().order_code,
          coordinate: {
            latitude: child.val().delivery_latitude,
            longitude: child.val().delivery_longitude,
          },
          _key: child.key
        });
      });

      this.setState({
        dataSource: [...this.state.dataSource,...items.slice()],
      });

    });
  }
  componentDidMount() {

    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.listenForOrders(this.rootRef);
    // this.deliveryListen = rootRef.child("delivery").on("child_added",snap => {
    //   alert(snap);
    //   this.setState({
    //     orders : this.state.orders.push(snap),
    //   })
    // });

    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.dataSource.length) {
        index = this.state.dataSource.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.dataSource[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  _openDialog = (marker) => {

    this.setState({
      dialogVisible: true,
      selectedOrder: marker,
      dialogContent: marker.order_code
    });
  }

  scrollToMarker = (index) => {
    this.scroller.getNode().scrollTo({x: CARD_WIDTH * index, y: 0,
      animated: true,});
  };

  render() {

    const interpolations = this.state.dataSource.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
      <Dialog
            onTouchOutside={() => {
              this.setState({ dialogVisible: false, });
            }}
            width={0.8}
            visible={this.state.dialogVisible}
            dialogTitle={
              <DialogTitle
                key={"title"}
                title="Xác nhận"
                style={{
                  backgroundColor: colors.white,
                  height:50,
                }}
                hasTitleBar={true}
                align="center"
              />
            }
            actions={[
              <DialogButton
                key={"cancel"}
                text="Huỷ bỏ"
                onPress={() => {
                    this.setState({
                      dialogVisible: false,
                    })
                }}
              />,
              <DialogButton
                key={"OK"}
                text="Đồng ý"
                onPress={() => {
                  this.props.onUpdatedPressed(this.props.account.token,this.props.account.user.ID,this.state.selectedOrder.ID,3);
                  this.setState({
                    dialogVisible: false,
                  })
                }}
              />,
            ]}
          >
            <DialogContent style={{padding:0}}>
                  <Text  style={{color: colors.black,fontStyle:"normal"}}>Bạn có chắc muốn lấy đơn hàng #{this.state.dialogContent}</Text>
            </DialogContent>
        </Dialog>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          showsUserLocation={true}
          style={styles.container}
        >
          {this.state.dataSource.length > 0 ? this.state.dataSource.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            const display = {
                title: marker.title
            }
            return (
              <Marker tracksViewChanges={false}
                      key={index}
                      coordinate={marker.coordinate}
                      title={"Mã đơn " + marker.id}
                      onPress={() => this.scrollToMarker(index)}
                      {...display}>
                      {/* <View>
                      <Image
                          source={require("../assets/")}
                          onLayout={() => this.setState({ initialRender: false })}
                          key={`${this.state.initialRender}`}
                        />
                      </View> */}

                      {/* <View style={styles.markerWrap}> */}
                        {/* <View style={styles.marker} /> */}
                        {/* <Animated.View style={[styles.ring, scaleStyle]} /> */}


                      {/* </View> */}

              </Marker>
            );
          }) : null}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          ref={(scroller) => {this.scroller = scroller}}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          { this.state.dataSource.map((marker, index) => (
            <View style={styles.card} key={index}>
              {/* <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              /> */}
              {/* <View
              style={styles.cardImage}> */}
              <Text style={{fontSize: 14}}>Mã đơn hàng : #{marker.order_code}</Text>
              <Timeline
                showTime={false}
                style={styles.cardImage}
                circleSize={10}
                titleStyle={{fontSize: 11, marginTop: -10}}
                descriptionStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', fontSize:10}}
                data={[
                    {title: 'Địa chỉ giao/nhận đồ', description: marker.delivery_address,circleColor: colors.red,lineColor: colors.gray},
                    {title: 'Địa chỉ giặt', description: marker.store.address, circleColor: colors.lightGreen},
                ]}
                />
              {/* </View> */}
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>Số kg : {marker.capacity}kg</Text>
                <Button
                  // containerViewStyle={{width: '100%', marginLeft: 0}}
                  buttonStyle={{width:"100%"}}
                  style={{alignItems:'center',justifyContent: 'center',width: '100%'}}
                  success
                  onPress={()=>{
                    this._openDialog(marker)
                  }}>
                  <Text style={{fontSize: 12}}> Lấy đơn này </Text>
                </Button>
                {/* <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text> */}
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    marginTop: 10,
    flex: 2,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  //  alignSelf: "stretch",
    textAlign: 'center',
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    justifyContent: 'center',
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    overflow: 'visible',
    width: 15,
    height: 15,
    borderRadius: 50,
    opacity: 0.4,
    backgroundColor: colors.black,
    borderRadius: 4,
    borderWidth: 20,
    borderColor: colors.colorBlueOnLeftTopLogo,
  },
  marker: {
    width: 12,
    height: 12,
    // position:'absolute',
    borderRadius: 4,
    backgroundColor: colors.colorLogo,
  },
  ring: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    // backgroundColor: colors.black,
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

function mapStateToProps(state) {
  return {
    state: state,
    account: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch),
    onUpdatedPressed: (token,userId,orderId,statusId,servicesOrder)=>{
      dispatch(appActions.actions.updateOrderRequest({token: token,userId: userId,orderId: orderId,statusId:statusId,servicesOrder: servicesOrder}));
    }
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(OrderMap);