import { Text, View, ScrollView, StyleSheet, Switch, Button, TouchableOpacity,Modal, Alert } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import React,{Component} from 'react';
import {Picker} from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import * as Notifications  from 'expo-notifications';
import * as Permissions from 'expo-permissions';

class Reservation extends Component {

    constructor(props) {
        super();

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation Okey?',
            'Number of guests:'+this.state.guests+'\n Smoking?:' + this.state.smoking+'\n Date and Time:'+ this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress:()=>{this.resetForm()},
                    
                },
                {
                    text: 'OK',
                    onPress: ()=> {
                        this.presentNotification(this.state.date);
                        this.resetForm();
                }}
            ],
            {
                cancelable: false
            }
        )
    }
    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }
    resetForm(){
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date'
        })
    }
 
    async askPermission() {
        return await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        });
      }
    async  getPermission() {
        const settings = await Notifications.getPermissionsAsync();
        return (
          settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
        );
      }
      async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentNotification(date){
  //      this.obtainNotificationPermission()
       if(!this.getPermission()){
            this.askPermission()
        }
        Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

        Notifications.scheduleNotificationAsync({
        content: {
          title: 'Look at that notification',
          body: date+"requested",
        },
        trigger: null,
      });
    }

    onChange = (event, selectedDate) => {
        this.setState({date: selectedDate})
      }
    render() {
        
        return(
            <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
            <ScrollView>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <TouchableOpacity 
                        style={styles.formItem}
                        style={{
                            padding: 7,
                            borderColor: '#512DA8',
                            borderWidth: 2,
                            flexDirection: "row",
                          
                        }}
                        onPress={() => this.setState({ show: true, mode: 'date'})}
                    >
                        <Icon type='font-awesome' name='calendar' color='#512DA8' />
                      <Text>
                         {' ' + Moment(new Date()).format('DD-MMM-YYYY h:mm A') }
                      </Text>
                    </TouchableOpacity>
                    <Overlay 
                        isVisible={this.state.show}
                        onBackdropPress={()=>this.setState({show: false})}
                    >
                      
                       {this.state.show && <DateTimePicker
                            value={this.state.date}
                            mode={this.state.mode}
                            display= 'spinner'
                            minimumDate={new Date()}
                            minuteInterval={30}
                            onChange={this.onChange}
                        />
                       }
                         <View style={{marginTop: 'auto',flexDirection: 'row'}}>
                            <TouchableOpacity style={{marginRight:'auto'}}
                            onPress={()=>this.setState({show: false})}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.setState({
                                show: this.state.mode === 'time' ? false : true,
                                mode:'time'
                                })}>
                                <Text style={{ color: '#512DA8' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                                        
                    </Overlay>
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                </View>
               
               <Modal 
                    visible={this.state.showModal}
                    onDismiss={()=>{this.toggleModal()}}
                    animationType= {'slide'}
                    transparent= {false}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests:{this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking ?:{this.state.smoking? 'Yes': 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time:{Moment(this.state.date).format('DD-MMM-YYYY h:mm A')} </Text>
                        <Button
                            title={'Close'}
                            color= '#512DA8'
                            onPress= {()=>{this.toggleModal(); this.resetForm()}}
                            />
                    </View>
                    
                </Modal>
             
            </ScrollView>
            </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        color: 'white',
        marginBottom: 20,
        textAlign: 'center'
    },
    modalText:{
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;