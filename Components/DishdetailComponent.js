import React, { Component } from 'react';
import { render } from 'react-dom';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Card,Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        comments: state.comments,
        dishes: state.dishes
    }
}


function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl+dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                   <Icon 
                        raised reverse
                        name={ props.favorite ? 'heart-o': 'heart'}
                        type= 'font-awesome'
                        color= '#f50'
                        onPress={() => props.favorite ? console.log("Already favorite"): props.onPress()}
                   />
                </Card>
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
        
            <Card title='Comments'>
            <FlatList
                keyExtractor={item=>item.id.toString()}
                renderItem={renderComment}
                data={comments}
            />
        </Card>
    ) 
    
}

class Dishdetail extends Component {

    constructor(props) {
        super()
        this.state = {
            favorites: []
        };
    }
    markFavorite(dishId){
        this.setState({
            favorites: this.state.favorites.concat(dishId)
        })
    }
  

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
            <RenderDish 
                dish={this.props.dishes.dishes[+dishId]}
                favorite={this.state.favorites.some(el => el===dishId)}
                onPress={() => this.markFavorite(dishId)}
             
            />
            <RenderComments comments={this.props.comments.comments.filter(comment=>comment.dishId===dishId)}/>
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps)(Dishdetail);