import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { init, useQuery, transact, id, tx } from '@instantdb/react-native';
import EmoteAnimator from './EmoteAnimator';


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const generateUID = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const Emotes = ({ options, onEmotePress }) => {
  return (
    <View style={styles.emotesBar}>
      {options.map((emoji) => (
        <TouchableOpacity key={emoji} onPress={() => onEmotePress(emoji)} style={styles.emoteButton}>
          {emoji == 'FRI'
            ? <Text style={{ fontSize: 36, color: 'red', fontWeight: 'bold' }}>{emoji}</Text>
            : <Text style={{ fontSize: 36 }}>{emoji}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

init({ appId: "1cbb853a-3058-478d-863f-d6030bc7964b" });

const onEmotePress = async (emoji) => {
  const mId = id();
  transact(tx.messages[mId].update({ emoji, createdAt: Date.now() }));
  await sleep(2000);
  transact(tx.messages[mId].delete());
}

const Main = () => {
  const { isLoading, error, data } = useQuery({ messages: {} });
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const { messages } = data;
  return (
    <View style={styles.container}>
      <EmoteAnimator messages={messages} />
      <Emotes options={['👋', '🎉', '😊', '🇺🇸', 'FRI']} onEmotePress={onEmotePress} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotesContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  emotesBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  emoteButton: {
    margin: 5,
    padding: 10,
  },
  emote: {
    position: 'absolute',
    bottom: 100,
  },
});

export default Main;
