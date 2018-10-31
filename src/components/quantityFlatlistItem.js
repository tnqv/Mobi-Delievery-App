class QuantityFlatlistItem extends Component {

    render(){
      return (
        <ListItem>
          <Left>
              <Text style={{fontSize:12}}>
                  {this.props.name}
              </Text>
              </Left>
          <Right>

              <Text>
                <Icon style={{fontSize: 12, color: colors.colorBlueOnLeftTopLogo}}
                      type="FontAwesome"
                      name="minus"
                      onPress={()=>{
                          console.log(item);
                          this._updateQuantityPress(item);
                      }}></Icon>
                  {"   "}{this.props.quantity}{"   "}
                <Icon style={{fontSize: 12, color: colors.colorBlueOnLeftTopLogo}}
                      type="FontAwesome"
                      name="plus"></Icon>
              </Text>

          </Right>


        </ListItem>
      )
    }
}