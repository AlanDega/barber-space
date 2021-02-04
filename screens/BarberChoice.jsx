import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";

export default function BarberChoice({ route, navigation }) {
  const { img, experience, name } = route.params;
  return (
    <View>
      <View
        style={{
          height: "20%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar.Image source={{ uri: img }} />
      </View>
      <View
        style={{
          height:'80%',
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button mode='contained' >Agendar Cita </Button>
        <View style={{width:20}}></View>
        <Button mode='contained' onPress={() => {
            navigation.navigate('BarberDetails', {name, experience, img})
        }} >Ver Perfil </Button>
      </View>
    </View>
  );
}
