import React, { useState } from "react";
import io from "socket.io-client";
import { StatusBar } from "expo-status-bar";
import { TextInput, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const socket = io("http://192.168.1.12:3000");
  socket.on("chat message", (msg) => {
    setChatMessages([...chatMessages, msg]);
  });

  function submitChatMessage() {
    socket.emit("chat message", chatMessage);
    setChatMessage("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 2 }}
        autoCorrect={false}
        value={chatMessage}
        onSubmitEditing={() => submitChatMessage()}
        onChangeText={(chatMessage) => {
          setChatMessage(chatMessage);
        }}
      />
      {chatMessages.map((msg, key) => {
        return <Text key={key}>{msg}</Text>;
      })}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: "#fff",
  },
});
