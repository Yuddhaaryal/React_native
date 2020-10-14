import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export const Loading= () => {
    return(
        <View style={stl.loadingView}>
            <ActivityIndicator size='large' color="#512A8"/>
            <Text style={stl.loadingText}>Loading...</Text>
        </View>
    )
}
const stl= StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
         fontWeight: 'bold',
         fontSize: 14,
         color: '#522DA8'
}
})