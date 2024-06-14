import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from "@expo/vector-icons";

import Home from "../home/home";
import Mapa from "../mapa/mapa"

const Tab = createBottomTabNavigator();

export default function Navegacao(){

  return(
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <Feather name="map" size={size} color={color} />
        )
      }}/>
      <Tab.Screen
      name="Mapa"
      component={Mapa}
      options={{
        headerShown: false,
        tabBarIcon: ({ size, color }) => (
          <Feather name="file-minus" size={size} color={color} />
        )
      }}/>

    </Tab.Navigator>
  )
}