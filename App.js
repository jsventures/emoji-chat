import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

// Helper to generate unique IDs for each emote
const generateUID = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Emotes Component
const Emotes = ({ options, onEmotePress }) => {
  return (
    <View style={styles.emotesBar}>
      {options.map((emoji) => (
        <TouchableOpacity key={emoji} onPress={() => onEmotePress(emoji)} style={styles.emoteButton}>
          <Text style={{ fontSize: 25 }}>{emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Main Component
const Main = () => {
  const [emotes, setEmotes] = useState([]);

  const handleEmote = (emoji) => {
    const newEmote = {
      id: generateUID(),
      emoji: emoji,
      animation: new Animated.Value(0), // Initial value for animation
    };

    setEmotes((currentEmotes) => [...currentEmotes, newEmote]);

    // Start animation
    Animated.timing(newEmote.animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // Animation completed
      setEmotes((currentEmotes) => currentEmotes.filter((emote) => emote.id !== newEmote.id));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.emotesContainer}>
        {emotes.map((emote) => {
          const translateY = emote.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -Dimensions.get('window').height], // Adjust based on your view height
          });

          const rotate = emote.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          });

          const scale = emote.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.6],
          });

          const opacity = emote.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          });

          return (
            <Animated.View
              key={emote.id}
              style={[
                styles.emote,
                {
                  transform: [{ translateY }, { rotate }, { scale }],
                  opacity: opacity,
                },
              ]}
            >
              <Text style={{ fontSize: 40 }}>{emote.emoji}</Text>
            </Animated.View>
          );
        })}
      </View>
      <Emotes options={['😍', '😂', '🔥', '🎉']} onEmotePress={handleEmote} />
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
    padding: 10,
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
