import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Registro from "../containers/login/Registro";
import Login from "../containers/login/Login";


const Stack = createStackNavigator();

function MenuAutenticacion() 
{
  return (
    <Stack.Navigator initialRouteName="Login" headerMode ="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registro" component={Registro} />
    </Stack.Navigator>
  );
}

export default MenuAutenticacion;