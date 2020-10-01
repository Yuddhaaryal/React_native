import React,{Component} from 'react';
import{View,Text} from 'react-native';
import {Card} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
function RenderAddress(){
    return(
        <Card title="Contact us">
           
 <View>
        
            <Text style={{margin: 10}}>121, Clear Water Bay Road</Text>
            <Text style={{margin: 10}}>Clear Water Bay, Kowloon</Text>
            <Text style={{margin: 10}}>HONG KONG</Text>
            <Text style={{margin: 10}}>Tel: +852 1234 5678</Text>
            <Text style={{margin: 10}}>Fax: +852 8765 4321</Text>
            <Text style={{margin: 10}}>Email:confusion@food.net</Text>
            </View>
        </Card>
    )
}
class Contact extends Component{
    constructor(props){
        super()
        this.state={
            dishes: DISHES,
            Promotions: PROMOTIONS,
            leaders: LEADERS
        }
    }
    static navigationOptions={
        title: 'Contact Us'
    }
    render(){
        return(
            <RenderAddress/>
        )
    }
}
export default Contact;