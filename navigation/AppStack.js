import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../utils/colors";

import HomeScreen from "../screens/HomeScreen";
import BarberDetails from "../screens/BarberDetails";
import CalendarScreen from "../screens/CalendarScreen";
import Appointments from "../screens/Appointments";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BarbersFlow() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BarbersList" component={HomeScreen} />
      <Stack.Screen name="BarberDetails" component={BarberDetails} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="StackOneAppointments" component={Appointments} />
    </Stack.Navigator>
  );
}

export default function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Barberos") {
            iconName = focused ? "ios-cut" : "ios-cut-outline";
          } else if (route.name === "Citas") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Barberos" component={BarbersFlow} />
      <Tab.Screen name="Citas" component={Appointments} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
