import React,{Component} from 'react';
import{View,Text} from 'react-native';
import {Card,Button, Icon} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

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
    sendMail(){
        MailComposer.composeAsync({
            recipients: ['arlyuddha@gmail.com'],
            subject: "Test Email",
            body: 'To whom it may concern'
        })
    }
    render(){
        return(
            <Animatable.View animation='fadeInDown' duration={2000}>
    
            <Card title="Contact us">
                <View>
                    <Text style={{margin: 10}}>121, Clear Water Bay Road</Text>
                    <Text style={{margin: 10}}>Clear Water Bay, Kowloon</Text>
                    <Text style={{margin: 10}}>HONG KONG</Text>
                    <Text style={{margin: 10}}>Tel: +852 1234 5678</Text>
                    <Text style={{margin: 10}}>Fax: +852 8765 4321</Text>
                    <Text style={{margin: 10}}>Email:confusion@food.net</Text>
                    <Button
                        title='    Send Email'
                        buttonStyle={{backgroundColor:'#512DA8'}}
                        icon={<Icon type="font-awesome" name="envelope" color="white"/>}
                        onPress={()=>this.sendMail()}
                    />
                </View>
            </Card>
        </Animatable.View>
        )
    }
}
export default Contact;