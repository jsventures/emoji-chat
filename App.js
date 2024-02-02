import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

  const createAnimationStyle = (animation) => {
    const windowHeight = Dimensions.get('window').height;
    const randomTranslateY = -windowHeight * (0.25 + Math.random() * 0.25)
    const randomX = Math.random() * 150 - 75; // Random value between -50 and 50
    const randomY = Math.random() * 200 + 100; // Random value between 200 and 300
    const randomScale = 0.5 + Math.random() * 1; // Random scale between 0.5 and 1.5
    const randomRotation = Math.random() * 360; // Random rotation between 0 and 360 degrees

    return {
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [randomY, randomTranslateY]
          })
        },
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [randomX, randomX * 2] // Modify to control the spread
          })
        },
        {
          scale: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [randomScale, 0.6]
          })
        },
        {
          rotate: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [-randomRotation + 'deg', randomRotation + 'deg']
          })
        },
      ],
      opacity: animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.25, 0]
      })
    };
  };

  const multipleHandleEmote = async (emoji) => {
    const count = Math.random() * 15
    for (let i = 0; i < count; i++) {
      handleEmote(emoji);
      await sleep(Math.random() * 100);
    }
  }

  const handleEmote = (emoji) => {
    const newEmote = {
      id: generateUID(),
      emoji: emoji,
      animation: new Animated.Value(0), // Initial value for animation
    };

    newEmote.animationStyle = createAnimationStyle(newEmote.animation);
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
          return (
            <Animated.View
              key={emote.id}
              style={[
                styles.emote,
                emote.animationStyle,
              ]}
            >
              <Text style={{ fontSize: 40 }}>{emote.emoji}</Text>
            </Animated.View>
          );
        })}
      </View>
      <Emotes options={['😍', '😂', '🔥', '🎉']} onEmotePress={multipleHandleEmote} />
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
