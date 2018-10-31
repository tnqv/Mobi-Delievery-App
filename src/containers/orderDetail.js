import React, { Component } from 'react';
import {View, Image, FlatList,SectionList,StyleSheet,Modal,Alert, Platform,TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions';
import colors from '../config/colors';
import { Container, Header, Left, Body,Footer, Right, FooterTab,Col, Card, CardItem, Title,Content, List, ListItem,Badge,Text ,Icon, Accordion, Button} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dialog,{ SlideAnimation,DialogButton } from 'react-native-popup-dialog';
import Timeline from 'react-native-timeline-listview';
import _ from 'lodash';



class OrderDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data : [
        {
          "test":"test"
        },{
          "test":"test"
        },
        {
          "test":"test"
        },
      ],
      category: [
        { title: "First Element", content: "Lorem ipsum dolor sit amet" },
        { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
        { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
      ],
      test: [

      ],
      mergeList: [],
      orderServices : [
        {
            "placed_order_id": 16,
            "service_id": 1,
            "service": {
                "name": "Từ 1kg - 3kg/Máy/Lượt",
                "price": 40000,
                "description": "",
                "category_id" : 1,
            },
            "description": "",
            "quantity": 2,
            "price": 60000
        },
        {
            "placed_order_id": 16,
            "service_id": 2,
            "service": {
                "name": "Từ 3kg - 5kg/Máy/Lượt",
                "price": 20000,
                "description": "",
                "category_id" : 1,
            },
            "description": "",
            "quantity": 1,
            "price": 80000
        },
      ],
      apiData : [
        {
            "ID" : 1,
            "name": "Combo Giặt + Sấy + Xả Quần áo",
            "description": "Giặt quần áo theo combo",
            "services": [
                {
                    "name": "Từ 3kg - 5kg/Máy/Lượt",
                    "price": 65000,
                    "description": "Gói combo giặt quần áo từ 3kg - 5kg/Máy/Lượt không giặt chung",
                    "image_url": "123"
                },
                {
                    "name": "Từ 1kg - 3kg/Máy/Lượt",
                    "price": 49000,
                    "description": "Gói combo giặt quần áo từ 1kg - 3kg/Máy/Lượt không giặt chung"
                },
                {
                    "name": "Từ 5kg - 7kg/Máy/Lượt",
                    "price": 75000,
                    "description": "Gói combo giặt quần áo từ 5kg - 7kg/Máy/Lượt không fgiặt chung với khách khác"
                },
                {
                    "name": "Combo Chống Dị Ứng/7kg/Máy/Lượt",
                    "price": 80000,
                    "description": "Gói combo giặt chống dị ứng với da nhạy cảm/7kg/Máy/Lượt"
                },
                {
                    "name": "Combo Em Bé/7kg/Máy/Lượt",
                    "price": 80000,
                    "description": "Gói combo giặt cho em Bé/7kg/Máy/Lượt"
                },
                {
                    "name": "Vệ sinh giày/Đôi (Lấy giày sau 1 ngày)",
                    "price": 163000,
                    "description": "Vệ sinh giày/Đôi (Lấy giày sau 1 ngày)"
                }
            ]
        },
        {
            "ID" : 2,
            "name": "Combo chăn màn",
            "description": "Giặt chăn màn theo combo",
            "services": [
                {
                    "name": "Trọn bộ",
                    "price": 80000,
                    "description": "Giặt trọn bộ chăn màn"
                },
                {
                    "name": "2 Chăn Bông",
                    "price": 80000,
                    "description": "Với gói 2 Chăn Bông"
                },
                {
                    "name": "1 Chăn Bông Lớn",
                    "price": 80000,
                    "description": "Với gói 1 Chăn Bông Lớn"
                }
            ]
        },
        {
            "ID" : 3,
            "name": "Combo Thú bông",
            "description": "Giặt thú bông theo combo",
            "services": [
                {
                    "name": "Kích cỡ (5 - 30)x(5 - 30)cm/Máy/Lượt",
                    "price": 80000,
                    "description": ""
                },
                {
                    "name": "Kích cỡ (50 - 70)x (30x40)cm/Máy/Lượt",
                    "price": 80000,
                    "description": ""
                },
                {
                    "name": "Kích Cỡ 100x60 (cm)/Máy/Lượt",
                    "price": 80000,
                    "description": ""
                }
            ]
        },
        {
            "ID" : 4,
            "name": "Dịch vụ giặt hấp (không bao gồm ủi)",
            "description": "Giặt hấp quần áo nhưng không bao gồm ủi",
            "services": [
                {
                    "name": "Áo/cái",
                    "price": 25000,
                    "description": ""
                },
                {
                    "name": "Bộ mền + Drap",
                    "price": 120000,
                    "description": ""
                },
                {
                    "name": "Mền/ Drap (1,6m x 2m)",
                    "price": 65000,
                    "description": ""
                },
                {
                    "name": "Màn cửa - cái",
                    "price": 50000,
                    "description": ""
                },
                {
                    "name": "Túi xách - cái",
                    "price": 120000,
                    "description": ""
                },
                {
                    "name": "Thú bông - cái",
                    "price": 70000,
                    "description": ""
                },
                {
                    "name": "Bộ mền - cái",
                    "price": 90000,
                    "description": ""
                },
                {
                    "name": "Soire - cái",
                    "price": 250000,
                    "description": ""
                },
                {
                    "name": "Áo da - cái",
                    "price": 120000,
                    "description": ""
                },
                {
                    "name": "Đầm dạ hội - cái",
                    "price": 120000,
                    "description": ""
                },
                {
                    "name": "Áo khoác dài/ Đầm dài - cái",
                    "price": 90000,
                    "description": ""
                },
                {
                    "name": "Áo Khoác/ Đầm Ngắn - cái",
                    "price": 65000,
                    "description": ""
                },
                {
                    "name": "Bộ Vest",
                    "price": 90000,
                    "description": ""
                },
                {
                    "name": "Áo dài nhung, lụa, gấm - cái",
                    "price": 90000,
                    "description": ""
                },
                {
                    "name": "Áo Vest - cái",
                    "price": 65000,
                    "description": ""
                },
                {
                    "name": "Quần/Cái",
                    "price": 25000,
                    "description": ""
                }
            ]
        },
        {
            "ID" : 5,
            "name": "Combo Rèm Cửa",
            "description": "Giặt rèm cửa theo combo",
            "services": [
                {
                    "name": "Bộ Rèm Nhỏ/Máy/Lượt",
                    "price": 80000,
                    "description": ""
                },
                {
                    "name": "Bộ Rèm Chuẩn/ Máy/ Lượt",
                    "price": 80000,
                    "description": ""
                }
            ]
        }
      ],
      refresh: true,
    }
  }


  async componentDidMount () {
    //   this.state.mergeList = Object.assign({},this.state.serviceOfUser,this.state.apiData);
    // this.state.mergeList = _.mergeWith({}, this.state.apiData, this.state.services, function(a, b) {
    //     if (_.isArray(a)) {
    //       return b.concat(a);
    //     }
    //   });
    let categories = this.state.apiData;
    let orderServices = this.state.orderServices;
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
                    newCategory.services.push(Object.assign({},item,itemOrderService));
                    isAssigned = true;
                }
            }
            if(!isAssigned){
                newCategory.services.push(Object.assign({},item,{quantity: 0 , price: 0,category_id: category.ID}));
            }
        }
        this.state.mergeList.push(newCategory);
    }

    // this.state.mergeList = this.state.apiData.map(object => {
    //         for(let serviceFromCate of object.services){

    //         }
    // });
      console.log(this.state.mergeList);

    // this.state.mergeList = this.states.service.apiData.map(object =>{
    //     return Object.assign(
    //       {},
    //       this.state.serviceOfUser,

    //     )
    // });

  }
  _renderItem = ({item,index,section}) => {
    return (
        <ListItem style={{borderBottomWidth: 0}}>
          <Left>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >3 </Text>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} > x </Text>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} > Từ 3kg - 5kg/Máy/Lượt</Text>
          </Left>
          <Right>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >30.000 </Text>
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

  _updateQuantityPress = (item,operator) => {

      let items = this.state.mergeList;
      let indexOfCategory = this.findIndexByAttribute(items,'ID',item.service.category_id);

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

      this.setState({
          mergeList: items,
          refresh: !this.state.refresh,
      })
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
                    console.log(item);
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
  _renderServicesItem = ({item,index,section}) => {
    return (
        <ListItem style={{borderBottomWidth: 0}}>
          <Left>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >3 </Text>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} > x </Text>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} > Từ 3kg - 5kg/Máy/Lượt</Text>
          </Left>
          <Right>
            <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >30.000 </Text>
          </Right>
        </ListItem>
    )
  }


  render() {
    // const { state, actions } = this.props;
    return (
      <Container style={{backgroundColor: colors.lightgray}}>
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
                                    <Button primary
                                            style={{flex:1,justifyContent: 'center'}}
                                            onPress={()=>{
                                                this.setState({
                                                    visible: false,
                                            })
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
                      <Text style={{color: colors.gray, fontWeight: 'bold',fontSize:18}}>Mã hoá đơn</Text>
                      <Text> - </Text>
                      <Text style={{color: colors.gray}}>#123456</Text>
                  </Left>
                  <Right style={{flex:1}}>
                    <Text>420000đ</Text>
                  </Right>
                </View>
                <CardItem style={{marginBottom:0}}>
                    <Text style={{color: colors.colorBlueOnLeftTopLogo}}>Status</Text>
                </CardItem>


                <View style={{ marginLeft: 20,
                              marginRight: 20,
                              marginBottom: 15}}>
                      <Text style={{color: colors.gray, fontWeight: 'normal',fontSize:14}} >Thời gian đặt hàng : 22:30:22 23/10/2018 </Text>
                </View>
            </Card>
            <Card style={{ marginTop: 15, marginBottom: 15 }}>

                {/* <CardItem style={{marginBottom:0}}>
                        <Text style={{color: colors.gray,fontWeight: 'bold',fontSize:16}}>Thông tin vận chuyển : </Text>
                </CardItem> */}

                <Timeline
                style={{ marginTop: 10}}
                showTime={false}
                data={[
                    {title: 'Địa chỉ giao/nhận đồ', description: '399 Lý thái tổ'},
                    {title: 'Địa chỉ giặt', description: 'Số 1 Nguyễn Văn Quá'},
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
                        <Text style={{color: colors.colorBlueOnLeftTopLogo}} onPress={() => {
                            this.setState({ visible: true });
                        }}>Chỉnh sửa</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    { this.state.data.length !== 0 ?
                        <FlatList
                            style={{backgroundColor:'transparent'}}
                            data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderItem}
                            /> :
                        null
                    }
                </CardItem>
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
                      <Text style={{color: colors.gray}}>90.000</Text>
                  </Right>

              </CardItem>

            </Card>
          </Content>
          <Button onPress={() => { }}
          style={{ alignSelf: 'center', position: 'absolute', elevation: 4, height: 70, width: 70, bottom: 0, borderWidth: 1, borderColor: colors.white, borderRadius: 35, backgroundColor: colors.lightGreen, justifyContent: 'center' }} active>
          <Icon active name="check" type="FontAwesome" style={{ color: colors.white }} />
          </Button>
          <Footer>
                <FooterTab style={{backgroundColor:colors.colorBlueOnLeftTopLogo}}>
                    <Button>
                        <Text style={{color:colors.white}}>Từ chối</Text>
                    </Button>
                    <Button style={{ flex: 0, width: 70 }}>
                    <Icon active />
                    </Button>
                    <Button>
                        <Text style={{color:colors.white}}>Không thể lấy đồ</Text>
                    </Button>
                </FooterTab>
            </Footer>

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
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(appActions.actions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
