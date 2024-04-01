/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Earthquake from './src/screens/earthquake';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import auth from '@react-native-firebase/auth';
import LoginScreen from './src/screens/login';
import EarthquakeDetails from './src/screens/earthquake-details';
import { EARTH_QUAKE_DETAILS_SCREEN, LOGIN_SCREEN, MAP_SCREEN, REGISTER_SCREEN } from './src/utils/Constants';
import Register from './src/screens/register';

function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const Stack = createNativeStackNavigator();
  const theme = useTheme();
  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    theme.dark = false;
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name={MAP_SCREEN} component={Earthquake} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} options={{ title: "Login" }} />
          )}
          <Stack.Screen name={EARTH_QUAKE_DETAILS_SCREEN} component={EarthquakeDetails} options={{ title: "Detalles" }} />
          <Stack.Screen name={REGISTER_SCREEN} component={Register} options={{ title: "Registro" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
