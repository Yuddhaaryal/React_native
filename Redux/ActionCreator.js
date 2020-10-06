import baseUrl from './shared/baseUrl';
import * as ActionTypes from '/ActionTypes';


export const dishesLoading =()  => ({
    type: ActionTypes.DISHES_LOADING
})
export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
})
export const addDishes = (dishes) ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading)
    return fetch(baseUrl+'dishes')
    .then(response => {
        if(response.ok)
            return response
        else
        var error = new Error('Error'+ response.status+ ':'+ response.statusText)
        error.response= response
        throw error
    },error => {
        var errmess = new Error(error.message)
        throw errmess
    }).then(response => response.jsson())
    .then(dishes =>dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
}

export const promosLoading =()  => ({
    type: ActionTypes.PROMOS_LOADING
})
export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
})
export const addPromos = (promos) ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading)
    return fetch(baseUrl+'promotions')
    .then(response => {
        if(response.ok)
            return response
        else
        var error = new Error('Error'+ response.status+ ':'+ response.statusText)
        error.response= response
        throw error
    },error => {
        var errmess = new Error(error.message)
        throw errmess
    }).then(response => response.jsson())
    .then(promos =>dispatch(addDishes(promos)))
    .catch(error => dispatch(dishesFailed(error.message)))
}

export const leadersLoading =()  => ({
    type: ActionTypes.LEADERS_LOADING
})
export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
})
export const addLeaders = (leaders) ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading)
    return fetch(baseUrl+'leaders')
    .then(response => {
        if(response.ok)
            return response
        else
        var error = new Error('Error'+ response.status+ ':'+ response.statusText)
        error.response= response
        throw error
    },error => {
        var errmess = new Error(error.message)
        throw errmess
    }).then(response => response.jsson())
    .then(leaders =>dispatch(addDishes(leaders)))
    .catch(error => dispatch(dishesFailed(error.message)))
}


export const commentssFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
})
export const addDishes = (comments) ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})
export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl+'comments')
    .then(response => {
        if(response.ok)
            return response
        else
        var error = new Error('Error'+ response.status+ ':'+ response.statusText)
        error.response= response
        throw error
    },error => {
        var errmess = new Error(error.message)
        throw errmess
    }).then(response => response.jsson())
    .then(comments =>dispatch(addDishes(comments)))
    .catch(error => dispatch(dishesFailed(error.message)))
}