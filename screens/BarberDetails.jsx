import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import {
  Avatar,
  Button,
  Divider,
  Dialog,
  Portal,
  IconButton,
} from "react-native-paper";


const workImages = [
  {
    title: "Mid Fade",
    img:
      "https://www.menshairstyletrends.com/wp-content/uploads/2016/04/agusbarber__and-cool-mens-haircut-with-movement-on-top.jpg",
  },
  {
    title: "Twists",
    img:
      "https://www.menshairstyletrends.com/wp-content/uploads/2016/04/captain_smash_and-cool-hair-design-fade-and-natural-curls.jpg",
  },
  {
    title: "Twists",
    img:
      "https://www.menshairstyletrends.com/wp-content/uploads/2016/04/danperri_hair_and-cool-short-mens-haircut.jpg",
  },
  {
    title: "Twists",
    img:
      "https://www.menshairstylestoday.com/wp-content/uploads/2016/09/Barber-Haircuts-Low-Fade-with-Slick-Back.jpg",
  },
  {
    title: "Twists",
    img:
      "https://cdn.shopify.com/s/files/1/0162/2116/files/Comb-Over-Fade.jpg?v=1509598544",
  },
  {
    title: "Twists",
    img:
      "https://www.byrdie.com/thmb/8qcWZlibRXLcHLwyAn-IJwW8ExQ=/1374x1155/filters:no_upscale():max_bytes(150000):strip_icc()/haircutting-fe93f463c3094cb0850bb61a89c2f257.jpg",
  },
  {
    title: "Twists",
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4uz8NXxd6GXkXIMTEJW2wxqtcg2zXpaRHzA&usqp=CAU",
  },
  {
    title: "Twists",
    img:
      "https://i.pinimg.com/originals/98/62/24/986224ab9aa5a748ed89560502b28d06.jpg",
  },
  {
    title: "Twists",
    img:
      "https://www.menshairstyletrends.com/wp-content/uploads/2018/05/criztofferson-cool-undercut-hairstyle-for-men-2018-e1526332798445.jpg",
  },
  {
    title: "Twists",
    img:
      "https://www.menshairstyletrends.com/wp-content/uploads/2016/04/captain_smash_and-cool-hair-design-fade-and-natural-curls.jpg",
  },
  {
    title: "Twists",
    img:
      "https://www.menshairstyletrends.com/wp-content/uploads/2016/04/captain_smash_and-cool-hair-design-fade-and-natural-curls.jpg",
  },
  {
    title: "Twists",
    img:
      "https://www.menshairstyletrends.com/wp-content/uploads/2016/04/captain_smash_and-cool-hair-design-fade-and-natural-curls.jpg",
  },
];

export default function BarberDetails({ route, navigation }) {
  const { img, name, experience } = route.params;
  const [visible, setVisible] = useState(false);
  const [SelectedImage, setSelectedImage] = useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const renderImage = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          showDialog();
          setSelectedImage(item.img);
        }}
      >
        <Image
          style={{
            height: 120,
            width: 120,
            marginVertical: 14,
            marginHorizontal: 24,
          }}
          source={{ uri: item.img }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        style={{
          height: "23%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar.Image source={{ uri: img }} />
        <Button
          onPress={() => {
              navigation.navigate('CalendarScreen',{name, img})
          }}
          icon="calendar"
          style={{ marginTop: 14 }}
          mode="outlined"
        >
          Agendar Cita
        </Button>
      </View>
      <Divider />
      <FlatList
        data={workImages}
        renderItem={renderImage}
        numColumns={2}
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
        }}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{ height: 300, width: 300 }}
        >
          <ImageBackground
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
            source={{ uri: SelectedImage }}
          >
            <TouchableOpacity onPress={() => hideDialog()}>
              <View
                style={{
                  borderRadius: 100,
                  width: 25,
                  height: 25,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 6,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>X</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </Dialog>
      </Portal>
    </View>
  );
}
