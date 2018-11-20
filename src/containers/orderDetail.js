import React, { Component } from 'react';
import {View, Image, FlatList,SectionList,StyleSheet,Modal,Alert, Platform,TouchableOpacity,NativeModules} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors';
import { Container, Header, Left, Body,Footer, Right,Grid,Row,Col, Card, CardItem, Title,Content, Spinner, ListItem,Badge,Text ,Icon, Accordion, Button,FooterTab} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dialog,{ SlideAnimation,DialogButton } from 'react-native-popup-dialog';
import Timeline from 'react-native-timeline-listview';
import NavigatorService from '../services/navigator';
import _ from 'lodash';

const SweetAlertNative = NativeModules.RNSweetAlert;

class OrderDetail extends Component {

  constructor(props) {
    super(props);
    //this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this._onModalConfirmedPress = this._onModalConfirmedPress.bind(this);
    this.state = {
      visible: false,
      order: this.props.navigation.state.params.orderParam,
      changedItems: this.props.navigation.state.params.orderParam.order_service_list.map(service => Object.assign({},service,{name : service.service.name})),
      orderConfirmedItems: [],
      orderTotal: this.props.navigation.state.params.orderParam.total,
      mergeList: [],
      refresh: true,
    }
  }


   componentDidMount () {

    let categories = this.props.service.data;
    let orderServices = this.state.order.order_service_list;
    for(let category of categories){
        let newCategory = {
            ID : category.ID,
            name: category.name,
            description: category.description,
            services: []
        }
        for(let item of category.services){
            let isAssigned = false;
            for( let itemOrderService of orderServices){
                if(item.name === itemOrderService.service.name){
                    newCategory.services.push(Object.assign({},item,{price: item.price},itemOrderService));
                    isAssigned = true;
                }
            }
            if(!isAssigned){
                newCategory.services.push(Object.assign({},item,{service_id: item.ID, name: item.name, quantity: 0 , price: item.price,category_id: category.ID}));
            }
        }
        this.state.mergeList.push(newCategory);
    }
  }

  _renderItem = ({item,index,section}) => {
    return (
        <ListItem style={{borderBottomWidth: 0}}>
          <Left>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >{ item.quantity }</Text>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} > x </Text>
            {/* { item.service.name ? */}
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >{ item.name }</Text>
          </Left>
          <Right>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >{item.price}đ</Text>
          </Right>
        </ListItem>
    )

  }

  findIndexByAttribute = (array,attr,value) => {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
  }

  _renderHeader = ({name,expanded}) => {
    return (
      <View
      style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center",}}
        >
          <Text>
            {" "}{name}
          </Text>
          {expanded
            ? <Icon style={{ fontSize: 18 }} type="FontAwesome" name="arrow-up" />
            : <Icon style={{ fontSize: 18 }} type="FontAwesome" name="arrow-down" />}
        </View>
    );
  }

//   refreshFlatlistItem = () => {
//       this.setState((prevState)=>{
//           return {
//                 numberOfRefresh: prevState.numberOfRefresh + 1,
//           };
//       });
//   }
  _renderContent = ({services}) => {
    return (
        <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        extraData={this.state}
        renderItem={this._renderItemInDialog}
        >

        </FlatList>
        // services.map((item,index)=>{
        //     return (
        //         <ListItem key={index}>
        //         <Left>
        //             <Text style={{fontSize:12}}>
        //                 {item.name}
        //             </Text>
        //             </Left>
        //         <Right>

        //             <Text>
        //               <Icon style={{fontSize: 12, color: colors.colorBlueOnLeftTopLogo}}
        //                     type="FontAwesome"
        //                     name="minus"
        //                     onPress={()=>{
        //                         // ++item.quantity;
        //                         // console.log(item.quantity);
        //                         this._updateQuantityPress(item,services);
        //                     }}></Icon>
        //                 {"   "}{item.quantity}{"   "}
        //               <Icon style={{fontSize: 12, color: colors.colorBlueOnLeftTopLogo}}
        //                     type="FontAwesome"
        //                     name="plus"></Icon>
        //             </Text>

        //         </Right>


        //       </ListItem>

        //     )
        // })
    );
  }

//   shouldComponentUpdate(nextProps,prevState){
//       console.log(nextProps);
//       console.log(prevState);
//       return true;
//   }
//   _updateQuantityPress = (item) => {
//     let items = this.state.mergeList;
//     let indexOfCategory = this.findIndexByAttribute(items,'ID',1);
//     let indexOfItem = this.findIndexByAttribute(items[indexOfCategory].services,'name',item.name);
//     let value = items[indexOfCategory].services[indexOfItem].quantity;
//     items[indexOfCategory].services[indexOfItem].quantity = ++value;


//     this.setState({
//         mergeList: items,
//         refresh: !this.state.refresh,

//         // numberOfRefresh: this.state.numberOfRefresh + 1,
//     })
// }



    _showUpdateConfirmDialog(message,statusId,servicesOrder){
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
            contentText: message,
            cancellable: true,
            },
            successCallback =>{
                if(statusId === 4){
                    servicesOrder = servicesOrder.map((service) => { return Object.assign({},service,{placed_order_id: this.state.order.ID}) });
                }
                this.props.onUpdatedPressed(this.props.account.token,this.props.account.user.ID,this.state.order.ID,statusId,servicesOrder);
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
                this.props.removeDialog();
                this.props.navigation.pop(1);

            },
            errorCallback => {
                // alert(errorCallback);
                this.props.removeDialog();
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
                this.props.removeDialog();
                // alert(successCallback);
            },
            errorCallback => {
                this.props.removeDialog();
                // alert(errorCallback);
            }
        )
      }

  _updateQuantityPress = (item,operator) => {
      let items = this.state.mergeList;
      let changedItems = this.state.changedItems;
      console.log("debug item");
      console.log(item);
      let indexOfCategory = this.findIndexByAttribute(items,'ID',item.category_id);
    //   console.log(items[indexOfCategory].services);
      let indexOfItem = this.findIndexByAttribute(items[indexOfCategory].services,'name',item.name);
      let value = items[indexOfCategory].services[indexOfItem].quantity;
      if(operator === '+'){
        items[indexOfCategory].services[indexOfItem].quantity = ++value;
      }else {
        if(items[indexOfCategory].services[indexOfItem].quantity === 0){
            items[indexOfCategory].services[indexOfItem].quantity = 0;
        }else{
            items[indexOfCategory].services[indexOfItem].quantity = --value;
        }
      }

      let temp = items[indexOfCategory].services[indexOfItem]
      let newChangedItems = this._setNewQuantity(temp)

    //   let newTotal = newChangedItems.reduce((accumulator,item) => {
    //         return accumulator + item.price
    //   },0);

      this.setState({
          mergeList: items,
          changedItems: newChangedItems,
        //   refresh: !this.state.refresh,
        //   orderTotal: newTotal,
      });

  }

  _setNewQuantity(item){
      let listChangedItem = this.state.changedItems;
      let isContained = false;

    //   if(item.quantity === 0) return;

      if(listChangedItem.length === 0){
          listChangedItem.push(item);
      }else{
        for(let index in listChangedItem){
            if(listChangedItem[index].service_id === item.service_id){
                listChangedItem[index].quantity = item.quantity;
                listChangedItem[index].price = item.quantity * item.price;
                isContained = true;
            }
         }
         if(!isContained){
            listChangedItem.push(item);
         }
      }

      listChangedItem = listChangedItem.filter((item) => { return item.quantity !== 0 });

      return listChangedItem
  }

  _onModalConfirmedPress(){
    let newChangedItems = this.state.changedItems;
    let newTotal = newChangedItems.reduce((accumulator,item) => {
        return accumulator + item.price
    },0);

    this.setState({
        orderConfirmedItems: newChangedItems,
        orderTotal: newTotal,
        refresh: !this.state.refresh,
    });
  }

  _renderItemInDialog = ({item,index,key}) => {
    return (
      <ListItem>
        <Left>
            <Text style={{fontSize:12}}>
                {item.name}
            </Text>
            </Left>
        <Right style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{
                        console.log(item);
                        this._updateQuantityPress(item,'-');
                    }}>
                    <Icon style={{fontSize: 15, color: colors.colorBlueOnLeftTopLogo}}
                    type="FontAwesome"
                    name="minus"
                    ></Icon>
                </TouchableOpacity>

                <Text>{"   "}{item.quantity}{"   "}</Text>
                <TouchableOpacity
                 onPress={()=>{
                    this._updateQuantityPress(item,'+');
                }}>
                <Icon style={{fontSize: 15, color: colors.colorBlueOnLeftTopLogo}}
                    type="FontAwesome"
                    name="plus"></Icon>
              </TouchableOpacity>

        </Right>


      </ListItem>
    )
  }
//   _renderServicesItem = ({item,index,section}) => {
//     return (
//         <ListItem style={{borderBottomWidth: 0}}>
//           <Left>
//             <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >{ item.quantity }</Text>
//             <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} > x </Text>
//             <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >{ item.name }</Text>
//           </Left>
//           <Right>
//             <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >30.000 </Text>
//           </Right>
//         </ListItem>
//     )
//   }


  render() {
    const orderDate = new Date(this.state.order.time_placed);
    // const { state, actions } = this.props;
    return (
      <Container style={{backgroundColor: colors.lightgray}}>
            {
                    this.props.placedorder.loading || this.state.loading ?
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

                    this.props.placedorder.success ?
                    this.showSuccessDialog(`Cập nhật đơn hàng thành công`) : null
                }

                {
                    this.props.placedorder.error ?
                    this.showErrorDialog(`${this.props.placedorder.error}`) : null
                }

                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.visible}
                onRequestClose={() => {
                   this.setState({
                       visible: false,
                   })
                }}>
                      <View style={{
                           flex:1,
                            }}>
                                {/* <View> */}
                                    <Accordion
                                            content
                                            dataArray= {this.state.mergeList}
                                            renderHeader={this._renderHeader}
                                            renderContent={this._renderContent}
                                            keyExtractor={(item, index) => index.toString()}
                                            style={{backgroundColor: colors.white,}}
                                            />

                                {/* </View> */}
                        </View>
                        <Footer style={{backgroundColor:colors.white,borderTopWidth:1,borderTopColor:colors.gray}}>
                            <FooterTab>
                                    <Button primary
                                            style={{flex:1,justifyContent: 'center'}}
                                            onPress={()=>{
                                                this.setState({
                                                    visible: false,
                                                })
                                                this._onModalConfirmedPress()
                                        }}>
                                        <Text>Xác nhận</Text>
                                    </Button>

                                    <Button primary
                                            style={{flex:1,justifyContent: 'center'}}
                                            onPress={()=>{
                                                this.setState({
                                                    visible: false,
                                                })
                                            }}
                                            >
                                        <Text>Huỷ</Text>
                                    </Button>
                            </FooterTab>
                        </Footer>


              </Modal>
          {
            //Header
          }
          <Header style={{backgroundColor: colors.colorBlueOnLeftTopLogo}}>
            <Left style={{flex: 1}}></Left>

            <Body style={{flex:1,alignItems:'center'}}>
              <Title>Chi tiết đơn</Title>
            </Body>

            <Right style={{flex: 1}}>

            </Right>
          </Header>
          {
            //Body
          }
          <Content style={{ flex: 1 }}>

            <Card style={{ marginTop: 15, marginBottom: 15 }}>

                <View style={{marginTop:15,
                              marginBottom:0,
                              flexDirection: 'row',
                              alignContent:'flex-start',
                              marginLeft: 20,
                              marginRight: 20}}>
                  <Left style={{flexDirection: 'row', textAlign: 'left', textAlignVertical: 'center',flex:2}}>
                      <Text style={{color: colors.gray, fontWeight: 'bold',fontSize:18}}>Mã hoá đơn
                      <Text> - </Text>
                      <Text style={{color: colors.gray,fontSize:16,fontWeight: 'normal'}}>#{this.state.order.order_code}</Text>
                      </Text>

                  </Left>
                  <Right style={{flex:1}}>
                    <Text>{this.state.order.total}đ</Text>
                  </Right>
                </View>
                <CardItem style={{marginBottom:0}}>
                    <Text style={{color: colors.colorBlueOnLeftTopLogo}}>{this.state.order.order_status_list[0].description}</Text>
                </CardItem>


                <View style={{ marginLeft: 20,
                              marginRight: 20,
                              marginBottom: 15}}>
                      <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >Thời gian đặt hàng : {`${orderDate.getDate()}-${orderDate.getMonth() +1 }-${orderDate.getFullYear()} ${orderDate.getHours()}:${orderDate.getMinutes()}:${orderDate.getSeconds()}`} </Text>
                </View>
            </Card>
            <Card style={{ marginTop: 15, marginBottom: 15 }}>
                <Grid>
                    <Row>
                        <Col>
                            <CardItem style={{marginBottom:0}}>
                                    <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Tên người nhận : </Text>
                            </CardItem>
                        </Col>
                        <Col>
                            <CardItem style={{marginBottom:0}}>
                                    <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:14}}>Số điện thoại người nhận : </Text>
                            </CardItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <View  style={{marginLeft: 20,
                                        marginRight: 20,
                                        marginBottom: 15,
                                        }}>
                                <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}> {this.state.order.receiver_name } </Text>
                            </View>
                        </Col>
                        <Col>
                            <View  style={{marginLeft: 20,
                                        marginRight: 20,
                                        marginBottom: 15,
                                        }}>
                                <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}>  {this.state.order.receiver_phone } </Text>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CardItem style={{marginBottom:0}}>
                                    <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Khối lượng gửi : </Text>
                            </CardItem>
                        </Col>
                        <Col>
                            <CardItem style={{marginBottom:0}}>
                                    <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Ghi chú : </Text>
                            </CardItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <View  style={{marginLeft: 20,
                                        marginRight: 20,
                                        marginBottom: 15,
                                        }}>
                                <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}> { this.state.order.capacity } </Text>
                            </View>
                        </Col>
                        <Col>
                            <View  style={{marginLeft: 20,
                                        marginRight: 20,
                                        marginBottom: 15,
                                        }}>
                                <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}> { this.state.order.note } </Text>
                            </View>
                        </Col>
                    </Row>


                </Grid>
                {/* <CardItem style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Thông tin vận chuyển : </Text>
                </CardItem> */}
            </Card>
            <Card style={{ marginTop: 15, marginBottom: 15 }}>

                {/* <CardItem style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Thông tin vận chuyển : </Text>
                </CardItem> */}

                <Timeline
                style={{ marginTop: 10}}
                showTime={false}
                titleStyle={{fontSize: 13, marginTop: -10}}
                data={[
                    {title: 'Địa chỉ giao/nhận đồ', description: this.state.order.delivery_address},
                    {title: 'Địa chỉ giặt', description: this.state.order.store.address},
                ]}
                />

                <View style={{borderBottomWidth: 0.5,borderBottomColor: colors.gray}}></View>

                 {/* <CardItem style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Thời gian lấy đồ dự kiến : </Text>
                </CardItem>
                <View  style={{marginLeft: 20,
                              marginRight: 20,
                              marginBottom: 15,
                              }}>
                      <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}}> 8:00:00 24/10/2018 </Text>
                </View> */}
            </Card>

            <Card style={{ marginTop: 15}}>

                <CardItem bordered style={{marginBottom:0}}>
                    <Left>
                            <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Các dịch vụ sử dụng : </Text>
                    </Left>
                    <Right>
                        {this.state.order.current_status_id === 3 ?
                        <Text style={{color: colors.colorBlueOnLeftTopLogo}} onPress={() => {
                            this.setState({ visible: true });
                        }}>Chỉnh sửa</Text> :
                        null }
                    </Right>
                </CardItem>
                {this.state.order.current_status_id === 3 ?
                    <CardItem>

                        { !this.state.orderConfirmedItems || this.state.orderConfirmedItems.length === 0  ?
                            <Text> Hiện tại chưa có dịch vụ </Text> :
                            <FlatList
                                style={{backgroundColor:'transparent'}}
                                data={this.state.orderConfirmedItems}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this._renderItem}
                                />
                        }
                    </CardItem>
                :
                    <CardItem>

                    { !this.state.order.order_service_list || this.state.order.order_service_list.length === 0  ?
                        <Text> Hiện tại chưa có dịch vụ </Text> :
                        <FlatList
                            style={{backgroundColor:'transparent'}}
                            data={this.state.order.order_service_list.map(service => Object.assign({},service,{name : service.service.name}))}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderItem}
                            />
                    }
                    </CardItem>
                }
            </Card>


            <Card style={{ marginTop: 15,marginBottom: 30}}>
              {/* <CardItem style={{marginBottom:0}}>
                  <Left>
                      <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Tổng cộng : </Text>
                  </Left>
                  <Right>
                      <Text>90.000</Text>
                  </Right>

              </CardItem> */}
              <CardItem>
                  <Left>
                      <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Tổng cộng : </Text>
                  </Left>
                  <Right>
                      <Text style={{color: colors.gray}}>{this.state.order.current_status_id === 3 ? this.state.orderTotal : this.state.order.total}đ</Text>
                  </Right>

              </CardItem>

            </Card>
          </Content>

        { this.state.order.current_status_id !== 3 ? null :
        <View>
          <Button
          onPress={() => {
            this._showUpdateConfirmDialog('Bạn có muốn xác nhận đơn hàng và các dịch vụ ?',4,this.state.changedItems);
          }}
          style={{ alignSelf: 'center', position: 'absolute', elevation: 4, height: 70, width: 70, bottom: 0, borderWidth: 1, borderColor: colors.white, borderRadius: 35, backgroundColor: colors.lightGreen, justifyContent: 'center' }} active>
          <Icon active name="check" type="FontAwesome" style={{ color: colors.white }} />
          </Button>

          <Footer>
                <FooterTab style={{backgroundColor:colors.colorBlueOnLeftTopLogo}}>

                    <Button
                        onPress={() => {
                            this._showUpdateConfirmDialog('Bạn có chắc muốn từ chối đơn hàng này ?',13);
                        }}>
                        <Text style={{color:colors.white}}>Từ chối</Text>
                    </Button>

                    <Button
                    onPress={() => {
                        this._showUpdateConfirmDialog('Bạn có muốn xác nhận đơn hàng và các dịch vụ ?',4,this.state.changedItems);
                      }}
                    style={{ flex: 0, width: 70 }}>

                        <Icon active />

                    </Button>

                    <Button
                        onPress={() => {
                            this._showUpdateConfirmDialog('Bạn có muốn xác nhận là đơn hàng này không thể lấy ?',11);
                        }}>
                        <Text style={{color:colors.white}}>Không thể lấy đồ</Text>
                    </Button>
                </FooterTab>
            </Footer>
            </View>
        }

        </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 100/2
  },
  submitView: {
    position: 'absolute',
    bottom:0,
    left:0,
    right:0,
  },
  containerViewInModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  }
})

function mapStateToProps(state) {
  return {
    state: state,
    account: state.login,
    service: state.service,
    placedorder: state.placedorder,
  };
}

function mapDispatchToProps(dispatch) {
  return {
       onUpdatedPressed: (token,userId,orderId,statusId,servicesOrder) => {
        dispatch(appActions.actions.updateOrderRequest({token: token,userId: userId,orderId: orderId,statusId:statusId,servicesOrder: servicesOrder}));
      },
      removeDialog: () => {
        dispatch(appActions.actions.clearDialog());
      }
    // actions: bindActionCreators(appActions.actions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
