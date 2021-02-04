import React, { useState, useEffect, useContext } from "react";
import { View, Platform, Text, TouchableOpacity } from "react-native";
import {
  Dialog,
  Portal,
  Divider,
  IconButton,
  Button,
} from "react-native-paper";
import { Calendar } from "react-native-calendars";
import Colors from "../utils/colors";
import { FlatList } from "react-native-gesture-handler";
import { AuthUserContext } from "../navigation/AuthUserProvider";

import { db } from "../components/Firebase/firebase";

const hours = [
  {
    id: 0,
    available: true,
    hour: "9-10 AM",
  },
  {
    id: 1,
    available: true,
    hour: "10-11 AM",
  },
  {
    id: 2,
    available: true,
    hour: "11-12 PM",
  },
  {
    id: 3,
    available: true,
    hour: "12-1 PM",
  },
  {
    id: 4,
    available: true,
    hour: "1-2 PM",
  },
  {
    id: 5,
    available: true,
    hour: "3-4 PM",
  },
  {
    id: 6,
    available: false,
    hour: "4-5 PM",
  },
  {
    id: 7,
    available: true,
    hour: "5-6 PM",
  },
];

export default function CalendarScreen({ navigation, route }) {
  const { user, setUser } = useContext(AuthUserContext);
  const [visible, setVisible] = useState(false);
  const [Hours, setHours] = useState(Hours);
  const [MonthDay, setMonthDay] = useState("");
  const [Appointments, setAppointments] = useState(Appointments);

  const { name, img } = route.params;

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  function createDay(month, day) {
    const docId = month + "-" + day;
    hours.map((hour, index) => {
      db.collection(name)
        .doc(docId)
        .collection("APPOINTMENTS")
        .doc(index.toString())
        .set({
          available: true,
          hour: hour.hour,
          user: "",
        });
    });
  }

  function createAppointment(hour, id) {
    db.collection(name)
      .doc(MonthDay)
      .collection("APPOINTMENTS")
      .doc(id)
      .update({
        user: user.uid,
        available: false,
      })
      .then(() => {
        db.collection("USER_APPOINTMENTS")
          .add({
            user: user.uid,
            barberImg: img,
            hour: hour,
          })
          .then(() => {
            navigation.navigate("StackOneAppointments");
          });
      });
  }

  function getAppointments(month, day) {
    const docId = month + "-" + day;
    setMonthDay(docId);
    db.collection(name)
      .doc(docId)
      .collection("APPOINTMENTS")
      .get()
      .then((querySnapshots) => {
        const appointments = querySnapshots.docs.map((doc) => {
          return {
            _id: doc.id,
            data: doc.data(),
          };
        });
        console.log("appointments1", appointments);
        setAppointments(appointments);
      });
  }

  const renderHour = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => createAppointment(item.data.hour, item._id)}
      >
        <View
          style={{
            width: 120,
            height: 30,
            borderRadius: 30,
            borderWidth: 0.5,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
            backgroundColor: !item.data.available ? "red" : "white",
          }}
        >
          <Text>{item.data.hour}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Button>Create Day</Button>
      <Calendar
        // Initially visible month. Default = Date()
        current={Date.now()}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={Date.now()}

        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={"2021-05-30"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          showDialog();
          // createDay(day.month, day.day);
          getAppointments(day.month, day.day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => <Arrow />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={true}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={true}
        // Disable right arrow. Default = false
        disableArrowRight={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={false}
        // Replace default month and year title with custom one. the function receive a date as parameter.
        renderHeader={(date) => {
          //  console.warn('date:', date)
          /*Return JSX*/
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            alignItems: "center",
            height: "65%",
          }}
        >
          <View
            style={{
              height: "10%",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              borderColor: "lightgray",
              borderBottomWidth: 0.5,
              flexDirection: "row",
            }}
          >
            <View></View>
            <Text>Date</Text>
            <IconButton icon="close" onPress={() => hideDialog()} />
          </View>
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ width: "100%", alignItems: "center" }}
            data={Appointments}
            renderItem={renderHour}
          />
        </Dialog>
      </Portal>
    </View>
  );
}
