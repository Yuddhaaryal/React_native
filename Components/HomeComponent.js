import React,{Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Easing,Animated} from 'react-native';
import {Card} from 'react-native-elements';
import {baseUrl} from '../shared/baseUrl';
import {Loading } from './LoadingComponent';

const mapStateToProps =(state) => (
    {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
)

class Home extends Component {
    constructor(props){
        super(props)
        this.animatedValue= new Animated.Value(0)
    }
    componentDidMount(){
        this.animate()
    }
    animate(){
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,{
                toValue: 8,
                duration: 8000,
                easing: Easing.linear
            }
        ).start(()=>this.animate())
    }
    render(){
        const XPOS1= this.animatedValue.interpolate({
            inputRange: [0,1,3,5,8],
            outputRange: [1200,600,0,-600,-1200]
        })
        const XPOS2= this.animatedValue.interpolate({
            inputRange: [0,2,4,6,8],
            outputRange: [1200,600,0,-600,-1200]
        })
        const XPOS3= this.animatedValue.interpolate({
            inputRange: [0,3,5,7,8],
            outputRange: [1200,600,0,-600,-1200]
        })
        const RenderItems = ({item,isLoading,errMess}) => {
        if(isLoading){
            return(
                <Loading/>
            )
        }
        else if (errMess){
            return(
                <View>
                    <Text>
                        {errMess}
                    </Text>
                </View>
            )
        }
        else
        return (
            <Card 
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{uri:baseUrl+item.image}}
            >
                <Text>{item.description}</Text>
            </Card>
        )
        }
        return(
            <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
                <Animated.View style={{transform: [{translateX: XPOS1}], width:'100%'}}>
                <RenderItems
                    item={this.props.dishes.dishes.filter(dish=> dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
                </Animated.View>
                <Animated.View style={{transform: [{translateX: XPOS2}], width:'100%'}}>
                <RenderItems
                    item={this.props.leaders.leaders.filter(dish=> dish.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                />
                </Animated.View>
                <Animated.View style={{transform: [{translateX: XPOS3}], width:'100%'}}>
                <RenderItems
                    item={this.props.promotions.promotions.filter(dish=> dish.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                </Animated.View>
                
            </View>
        )
    }
}
export default connect(mapStateToProps)(Home)