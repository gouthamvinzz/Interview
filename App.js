import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Route from './src/Routes';

export default function App() {
  return (
    <Provider store={store}>
  
  <Route />

 </Provider>
  );
}



