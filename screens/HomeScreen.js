import React from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import { Avatar } from "react-native-paper";
import useStatusBar from "../hooks/useStatusBar";

const barbers = [
  {
    id: 0,
    name: "Hector Barbosa",
    experience: "3 años de experiencia profesional",
    img:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ5Ff1AAkVczpGfYLuUmTv3lPLewpchAfTCw&usqp=CAU'
  },

  {
    id: 1,
    name: "Sandra Lima",
    experience: "3 años de experiencia profesional",
    img:
      "https://images.unsplash.com/photo-1527772837295-9150784b5ae5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },

  {
    id: 2,
    name: "Luis Castro",
    experience: "3 años de experiencia profesional",
    img:
      "https://image.freepik.com/free-photo/hairdresser-cleaning-electric-trimmer-with-brush_23-2147839780.jpg",
  },
  {
    id: 3,
    name: "Eduardo Torres",
    experience: "3 años de experiencia profesional",
    img:
      "https://images.unsplash.com/photo-1567894340315-735d7c361db0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80",
  },
  {
    id: 4,
    name: "Carlos Pérez",
    experience: "3 años de experiencia profesional",
    img:
      "https://images.unsplash.com/photo-1598887142533-b915bc96619a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=926&q=80",
  },
  {
    id: 5,
    name: "Julieta Kaeshi",
    experience: "3 años de experiencia profesional",
    img:
      "https://images.unsplash.com/photo-1553519367-2b1993d992dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
];

export default function HomeScreen({ navigation }) {
  useStatusBar("dark-content");

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.warn("works");
          navigation.navigate("BarberDetails", {
            img: item.img,
            name: item.name,
            experience: item.experience,
          });
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "13%",
            marginVertical: 50,
          }}
        >
          <Avatar.Image size={82} source={{ uri: item.img }} />
          <Text style={{ fontWeight: "bold", marginTop: 6 }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      numColumns={2}
      data={barbers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
