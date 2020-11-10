import React, { Component } from 'react';
import { View,ScrollView,Text, Platform,Image, StyleSheet, TouchableNativeFeedbackBase } from 'react-native';
import {Icon} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {fetchDishes, fetchPromos,fetchLeaders,fetchComments}from '../Redux/ActionCreator';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';



const mapDispatchToProps = dispatch => {
    return {
        fetchDishes: () => dispatch(fetchDishes()),
        fetchLeaders: () => dispatch(fetchLeaders()),
        fetchPromos: () => dispatch(fetchPromos()),
        fetchComments: () => dispatch(fetchComments())
    }
}

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({navigation}) {
 
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            
            screenOptions= {{
               
            
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={{
                    headerLeft:() => 
                    <Icon 
                        name='menu' 
                        size={24} 
                        color='white' 
                        onPress={()=> navigation.toggleDrawer()}
                    />
                }}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    )
}
const HomeNavigator= createStackNavigator()

function HomeNavigatorScreen({navigation}){
    return(
        <HomeNavigator.Navigator
            initialRouteName= 'Home'
            screenOptions= {{
                headerLeft: () => 
                <Icon name='menu' size={24} color='white' 
                    onPress={()=> navigation.toggleDrawer()}
                />,
                headerStyle: {
                    backgroundColor:'#512DA8'
                },
                headerTintColor: '#fff',
                headerTintStyle: {
                    color:'#fff'
                }
            }}
        >
            <HomeNavigator.Screen 
                name= 'Home'
                component= {Home}
            />
        </HomeNavigator.Navigator>
    )
}
const ContactNavigator= createStackNavigator()
function ContactNavigatorScreen({navigation}){
    return(
        <ContactNavigator.Navigator
            initialRouteName= 'Contact'
            screenOptions= {{
                headerLeft: () => 
                <Icon name='menu' size={24} color='white' 
                    onPress={()=> navigation.toggleDrawer()}
                />,
                headerStyle: {
                    backgroundColor:'#512DA8'
                },
                headerTintColor: '#fff',
                headerTintStyle: {
                    color:'#fff'
                }
            }}
        >
            <ContactNavigator.Screen 
                name= 'Contact'
                component= {Contact}
            />
        </ContactNavigator.Navigator>
    )
}
const AboutNavigator= createStackNavigator()
function AboutNavigatorScreen({navigation}){
    return(
        <AboutNavigator.Navigator
            initialRouteName='About'
            screenOptions={{
                headerLeft: () => 
                <Icon name='menu' size={24} color='white' 
                    onPress={()=> navigation.toggleDrawer()}
                />,
                headerStyle:{
                    backgroundColor:'#512DA8' 
                },
                headerTintColor:'#fff',
                headerTintStyle:{
                    color: '#fff'
                }
            }}
        >
            <AboutNavigator.Screen
                name='About'
                component={About}
            />

        </AboutNavigator.Navigator>
    )
    
}
const FavoritesNavigator = createStackNavigator()
function FavoritesNavigatorScreen({navigation}) {
    return (
        <FavoritesNavigator.Navigator
         //  initialRouteName= 'ResFavoervation'
            screenOptions={{
                headerLeft: () =><Icon name= 'menu' size='24' color = 'white' 
                    onPress = {() => navigation.toggleDrawer()}
                />,
                headerStyle: {
                    backgroundColor: '#512DA8' 
                },
                headerTintStyle:{
                    color: '#fff'
                },
                headerTintColor: '#fff'
            }}
            >
            <FavoritesNavigator.Screen
                name="Favorites"
                component= {Favorites}
            />

        </FavoritesNavigator.Navigator>
    )
}
function ReserveNavigatorScreen({navigation}) {
    return (
        <ReserveNavigator.Navigator
            initialRouteName= 'Reservation'
            screenOptions={{
                headerLeft: () =><Icon name= 'menu' size='24' color = 'white' 
                    onPress = {() => navigation.toggleDrawer()}
                />,
                headerStyle: {
                    backgroundColor: '#512DA8' 
                },
                headerTintStyle:{
                    color: '#fff'
                },
                headerTintColor: '#fff'
            }}
            >
            <ReserveNavigator.Screen
                name="Reservation"
                component= {Reservation}
            />

        </ReserveNavigator.Navigator>
    )
}
const LoginNavigator=createStackNavigator()
function LoginNavigatorScreen({navigation}) {
    return (
        <LoginNavigator.Navigator
            initialRouteName= 'Home'
            screenOptions={{
                headerLeft: () =><Icon name= 'menu' size='24' color = 'white' 
                    onPress = {() => navigation.toggleDrawer()}
                />,
                headerStyle: {
                    backgroundColor: '#512DA8' 
                },
                headerTintStyle:{
                    color: '#fff'
                },
                headerTintColor: '#fff'
            }}
            >
            <LoginNavigator.Screen
                name="Login"
                component= {Login}
            />

        </LoginNavigator.Navigator>
    )
}

function CustomDrawerContent(props){
    return(
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container} forceInset={{top:'always', horizontal:'never'}}>
                <View style={styles.drawerHeader}>
                    <View style={{flex:1}}>
                        <Image source={require('./images/logo.png')} style={styles.drawerImage}/>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.drawerHeaderText}>Restorante Con Fusion</Text>
                    </View>
                </View>
            </SafeAreaView>
            <DrawerItemList {...props}/>

        </DrawerContentScrollView>
    )
}
const Drawer= createDrawerNavigator()
function MainNavigator({navigation}){
    return(
        <Drawer.Navigator 
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor: '#C1D4E9'
            }}
            drawerContent= {CustomDrawerContent}
            >
            <Drawer.Screen 
                name="Home" 
                component={HomeNavigatorScreen}
                options={{

                    drawerIcon: ({ tintColor, focused }) => (
                      <Icon
                        name='home'
                        type='font-awesome'            
                        size= {24}
                        color={tintColor}
                        
                      />
                    )
                }}
              
            />
            <Drawer.Screen
                 name="Login" 
                 component={LoginNavigatorScreen}
                 options={{
 
                     drawerIcon: ({ tintColor, focused }) => (
                       <Icon
                         name='key'
                         type='font-awesome'            
                         size= {24}
                         color={tintColor}
                         
                       />
                     )
                 }}

            />
            <Drawer.Screen 
                name="Menu" 
                component={MenuNavigatorScreen}
                options={{
                    drawerIcon: ({ tintColor }) => (
                      <Icon
                        name='list'
                        type='font-awesome'            
                        size={24}
                        color={tintColor}
                      />
                    )
                }}
                />
            <Drawer.Screen 
            name="Contact Us" 
            component={ContactNavigatorScreen}
            options={{
                drawerIcon: ({ tintColor }) => (
                  <Icon
                    name='address-card'
                    type='font-awesome'            
                    size={24}
                    color={tintColor}
                  />
                )
            }}
            />
            <Drawer.Screen 
                name="About" 
                component={AboutNavigatorScreen}
                options={{
                    drawerIcon: ({ tintColor }) => (
                      <Icon
                        name='info-circle'
                        type='font-awesome'            
                        size={24}
                        color={tintColor}
                      />
                    )
                }}
            />
            <Drawer.Screen 
                name="Favorites" 
                component={FavoritesNavigatorScreen}
                options={{
                    drawerIcon: ({ tintColor }) => (
                      <Icon
                        name='heart'
                        type='font-awesome'            
                        size={24}
                        color={tintColor}
                      />
                    )
                }}
            />

            <Drawer.Screen
                name= 'Reserve Table'
                component= {ReserveNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name= 'cutlery'
                            type= 'font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}

            />
        </Drawer.Navigator>
    )
}
const ReserveNavigator = createStackNavigator()

class Main extends Component {  
    componentDidMount(){
        this.props.fetchDishes()
        this.props.fetchLeaders()
        this.props.fetchComments()
        this.props.fetchPromos()
    }
  render() {
 
    return (
        <NavigationContainer>
            <MainNavigator/>           
        </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  
export default connect('',mapDispatchToProps)(Main);