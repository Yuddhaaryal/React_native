import React from 'react';
import Main from './Components/MainComponent';
import {Provider}  from 'react-redux';
import {ConfigureStore} from './Redux/ConfigureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import { Loading } from './Components/LoadingComponent';



const {store, persistor} = ConfigureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={Loading}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}