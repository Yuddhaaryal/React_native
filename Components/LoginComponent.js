import React,{ Component} from 'react';
import {ScrollView, Text,View,StyleSheet,Image, LogBox} from 'react-native';
import {Icon,Input, CheckBox, Button} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {baseUrl} from '../shared/baseUrl';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

class LoginTab extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: '',
            remember: false
        }
    }
    componentDidMount(){
        SecureStore.getItemAsync('userinfo')
        .then((userdata)=>{
            let userinfo= JSON.parse(userdata)
            if(userinfo){
                this.setState({username: userinfo.username})
                this.setState({password: userinfo.password})
            }
        })
    }
    handleLogin(){
        console.log(JSON.stringify(this.state))
        if(this.state.remember){
            SecureStore.setItemAsync('userinfo',JSON.stringify(
                {
                    username: this.state.username,
                    password: this.state.password
                }
            ))
            .catch(error=>  console.log('could not save userinfo',error))
        }
        else
        SecureStore.deleteItemAsync('userinfo')
        .catch(error=> console.log('Could not delete user info', error))

    }
    static navigationOptions ={
        title: 'Login',
        tabBarIcon: ({tintColor}) =>(
            <Icon 
                name= 'sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{color:tintColor}}
            />
        )
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    onChangeText={username=>this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIcon={{type:'font-awesome', name: 'user-o'}}
                />
                <Input
                    placeholder="Password"
                    onChangeText={password=>this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIcon={{type:'font-awesome', name: 'key'}}
                    
                />
                <CheckBox
                    title='Remember me'
                    center
                    checked={this.state.remember}
                    onPress={()=>this.setState({remember:!this.state.remember})}
                    containerStyle={styles.formCheckBox}
                   
                />
                <TouchableOpacity 
                    style ={{
                      height:40,
                      backgroundColor : '#512DA8',
                      flexDirection:'row',
                      justifyContent: 'center',
                      alignItems:'center',
                      width: '50%',
                      alignSelf:'center',
                      borderRadius: 10


                    }}
                    onPress={()=>this.handleLogin()}            
                    title="Login"
                    accessibilityLabel="Learn more about this button"
                >
                   <Text style={{color:"white"}}>Login</Text> 
                </TouchableOpacity>
                <TouchableOpacity 
                    style ={{
                      marginTop: 20,
                      height:40,
                      backgroundColor : '#512DA8',
                      flexDirection:'row',
                      justifyContent: 'center',
                      alignItems:'center',
                      width: '50%',
                      alignSelf:'center',
                      borderRadius: 10


                    }}
                    onPress={()=>this.props.navigation.navigate('Register')}            
                    title="Register"
                    accessibilityLabel="Learn more about this button"
                >
                   <Text style={{color:"white"}}>Register</Text> 
                </TouchableOpacity>  

            </View>
        )
    }
}
class RegisterTab extends Component {
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl+'images/logo.png'
        }
    }
    static navigationOptions ={
        title: 'Register',
        tabBarIcon: ({tintColor}) =>(
            <Icon 
                name= 'user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{color:tintColor}}
            />
        )
    }
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let capturedImage = await ImagePicker.launchCameraAsync({
                aspect: [4,3],
                allowsEditing: true
            })
            if(!capturedImage.cancelled){
                console.log(capturedImage)
                this.setState({ imageUrl: capturedImage.uri})
            }
        }
    }

handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }
    render(){
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                        />
                </View>
                <Input
                    placeholder="Username"
                    onChangeText={username=>this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIcon={{type:'font-awesome', name: 'user-o'}}
                />
                <Input
                    placeholder="Password"
                    onChangeText={password=>this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIcon={{type:'font-awesome', name: 'key'}}
                    
                />
                 <Input
                    placeholder="First Name"
                    onChangeText={firstname=>this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    leftIcon={{type:'font-awesome', name: 'user-o'}}
                />
                 <Input
                    placeholder="Last Name"
                    onChangeText={lastname=>this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    leftIcon={{type:'font-awesome', name: 'user-o'}}
                />
                 <Input
                    placeholder="Email"
                    onChangeText={email=>this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    leftIcon={{type:'font-awesome', name: 'envelope-o'}}
                />
                <CheckBox
                    title='Remember me'
                    center
                    checked={this.state.remember}
                    onPress={()=>this.setState({remember:!this.state.remember})}
                    containerStyle={styles.formCheckBox}
                   
                />
                <View style={styles.formButton}>
                    <Button
                        title="  Register"
                        onPress={()=>this.handleRegister()}
                        buttonStyle={{backgroundColor: '#512DA8'}}
                        icon ={
                            <Icon
                                name="user-plus"
                                type='font-awesome'
                                size={24}
                                color='white'
                            />
                        }
                        />

                </View>
            </View>
            </ScrollView>
        )
    }
}


const Tab = createBottomTabNavigator();

function Login() {
  return (
    <Tab.Navigator 
        initialRouteName="Login"
        tabBarOptions={{
            inactiveTintColor: 'gray',
            activeTintColor: '#ffffff',
            activeBackgroundColor: '#9575CD',
            inactiveBackgroundColor: '#D1C4E9',
            labelStyle:{fontSize:20,padding:10}

        }}
    >
            <Tab.Screen name="Login" component={LoginTab} />
            <Tab.Screen name="Register" component={RegisterTab} />
            </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 40,
        
    },
    formCheckBox: {
        margin: 40,
        backgroundColor: null
    },
    formButton:{
        margin: 60,
       color:'red'
    }
})
export default Login;