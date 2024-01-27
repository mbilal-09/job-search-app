import React from 'react';
import {SafeAreaView} from 'react-native';
import Navigator from './src/navigation';
import Home from './src/screens/home';

function App(): React.JSX.Element {
  return (
    <>
      <Navigator />
    </>
  );
}

export default App;
