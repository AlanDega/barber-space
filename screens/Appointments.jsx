import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { AuthUserContext } from "../navigation/AuthUserProvider";

import { db } from "../components/Firebase/firebase";

export default function Appointments({}) {
  const { user, setUser } = useContext(AuthUserContext);
  const [UserAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    db.collection("USER_APPOINTMENTS")
      .where("user", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => doc.data());
        console.log("querySnapshot: ", docs);
      });

    // db.collection("USER_APPOINTMENTS")
    //   .doc(user.uid)
    //   .get()
    //   .then((querySnapshot) => {
    //     const docs = querySnapshot.docs.map((doc) => {
    //       return {
    //         _id: doc.id,
    //         data: doc.data(),
    //       };
    //     });
    //     console.log("appointments:", docs);

    //     setUserAppointments(docs);
    //   });
  }, []);

  const renderAppointment = ({ item }) => {
    return (
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Avatar source={{ uri: item.barberImg }} />
        </Card.Content>
        <Card.Actions>
          <Button>Cancelar</Button>
          <Button>Editar</Button>
        </Card.Actions>
      </Card>
    );
  };

  // Render Component
  return (
    <FlatList
      data={UserAppointments}
      renderItem={renderAppointment}
      keyExtractor={(item) => item._id}
    />
  );
}
