import React, { Component } from 'react';
import { FlatList, Modal, ScrollView, Text, View, StyleSheet, Button,TouchableHighlight,Alert, PanResponder,Share } from 'react-native';
import { Card,Icon,Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import {postComment, postFavorite} from '../Redux/ActionCreator';
import * as Animatable from 'react-native-animatable';


const mapDisPatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId,author,rating,comment) => dispatch(postComment(dishId,author,rating,comment))
})
const mapStateToProps = state => {
    return {
        comments: state.comments,
        dishes: state.dishes,
        favorites: state.favorites,


    }
}
function RenderDish(props) {
    const dish = props.dish
    const recognizeGesture = ({x,y,dx,dy}) =>{
        if(dx < -200)
        return true
        else 
        return false
    }
    const recognizeComment = ({dx}) => {
        if(dx>200)
        return true
        else
        return false
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e,gestureState) => {
            return true
        },
        onPanResponderEnd: (e,gestureState) => {
            if(recognizeGesture(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure to add this dish to your favorite?',
                    [
                        {
                            text: 'Cancel',
                            onPress: console.log('Cancel Pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: ()=> props.favorite ? console.log('Already Favorite'): props.onPress()
                        }
                    ],
                    {cancelable: 'false'}
                )
            if(recognizeComment(gestureState)){
                   props.showModal()
            }

    
            return true
        },
  
    })
    const shareDish =(title,message,url)=>{
        Share.share({
            title: title,
            message: title+':'+message+''+url,
            url: url
        },
        {
            dialogTitle: "Share"+title, //android
            tintColor: "#512DA8",
            subject: 'Sharing a dish'

        })
        Share.sharedAction
    }



    if (dish != null) {
            return(
                <Animatable.View animation='fadeInDown' duration={2000} 
                    {...panResponder.panHandlers}>
                    <Card
                        featuredTitle={dish.name}
                        image={{uri: baseUrl+dish.image}}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <Icon 
                                raised reverse
                                name={ props.favorite ? 'heart': 'heart-o'}
                                type= 'font-awesome'
                                color= '#f50'
                                onPress={() => props.favorite ? console.log("Already favorite"): props.onPress()}
                            />
                            <Icon raised reverse
                                name={'pencil'}
                                type= 'font-awesome'
                                color= '#f50'
                                onPress={() => props.showModal()}
                            />
                              <Icon raised reverse
                                name={'share'}
                                type= 'font-awesome'
                                color= '#f50'
                                onPress={() => shareDish(dish.name,dish.description,baseUrl+dish.image)}
                            />
                        </View>
                
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}
function RenderComments(props){
    const comments=props.comments
    
    const renderComment= ({item,index}) => {
        return(
        <View key={index} style={{margin:10}}>
            <Text style={{fontSize: 14}}>{item.comment}</Text>
            <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
            <Text style={{fontSize: 12}}>-- {item.author+','+item.date}</Text>

        </View>
        )
    }
    return(
        <Animatable.View animation='fadeInUp' duration={2000}>
            <Card title='Comments'>
                <FlatList
                    keyExtractor={item=>item.id.toString()}
                    renderItem={renderComment}
                    data={comments}
                />
            </Card>
        </Animatable.View>
    ) 
    
}

class Dishdetail extends Component {
    constructor(props){
        super()
        this.state={
            author: '',
            rating: 0,
            comment: '',
            visible: false,
            
        }
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId)
    }
    toggleModal(){
        this.setState({
            visible: !this.state.visible
        })
    }
   resetForm(){
    
            
        this.setState({author: '',comment: '', rating: 0})
    }
   

    handleFeedback(dishId){

        this.props.postComment(dishId, this.state.author, this.state.rating, this.state.comment)
        this.resetForm()

        
    }
    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
            <RenderDish 
                dish={this.props.dishes.dishes[+dishId]}
                favorite={this.props.favorites.some(el => el === dishId)}
                onPress={() => this.markFavorite(dishId)}
                showModal={() => this.toggleModal()}
             
            />
            <RenderComments comments={this.props.comments.comments.filter(comment=>comment.dishId===dishId)}
                           
                           />
            <Modal 
                visible={this.state.visible}
                onDismiss={()=>{this.toggleModal()}}
                animationType= {'slide'}
                transparent= {false}
            >
                <View style={styles.modal}>  
                
                    <Text style={styles.modalTitle}>Your Feedback</Text>
                    <Rating
                        defaultRating= {this.state.rating}
                        type='star'
                        ratingCount={5}
                        imageSize={50}
                        showRating
                        startingValue={this.state.rating}
                        onFinishRating={(rating)=>this.setState({rating: rating})}
                    />
                    <Input
                        value={this.state.author}
                        clearButtonMode="always"
                        placeholder='Author'
                        leftIcon={{type:'font-awesome',name: 'user',color: '#f50'}}
                        onChangeText={value => this.setState({ author: value})}
                    />
                    <Input
                        value={this.state.comment}
                        clearButtonMode="always"
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment',color:'#f50' }}
                        onChangeText={value => this.setState({ comment: value})}
                    />
                    <View >
                      
                    <TouchableHighlight 
                        style ={{
                            height: 40,
                            width:'100%',
                            borderRadius:10,
                            backgroundColor : '#512DA8',
                            marginTop:20
                        }}
                    >
                        <Button
                            onPress={()=>this.handleFeedback(dishId)}
                            title={'Submit'}
                            color={'white'}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                             style ={{
                                height: 40,
                                width:'100%',
                                borderRadius:10,
                                backgroundColor : 'grey',
                                marginTop:20
                            }}
                    >
                        <Button
                            onPress={()=>this.toggleModal()}
                            title={'Cancel'}
                            color={'white'}
                        />
                    </TouchableHighlight>
                      
                        
                    </View>
                </View>
            </Modal>
            </ScrollView>
            
        );
     
    }


}



const styles= StyleSheet.create({
    modalTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        color: 'white',
        padding:5,
        width: '100%',
        textAlign: 'center'
       
      
    },
    modal:{
        margin: 30
    }
})
export default connect(mapStateToProps,mapDisPatchToProps)(Dishdetail);