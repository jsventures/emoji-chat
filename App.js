import { init, useQuery, transact, tx } from '@instantdb/react-native'
import { useState } from 'react'
import { View, Text, Linking, Button, StyleSheet } from 'react-native'

// Visit https://instantdb.com/dash to get your APP_ID :)
const APP_ID = 'ee1eed1e-7ed6-4819-880b-3bc53b65e62c'

init({ appId: APP_ID })

function App() {
  const { isLoading, error, data } = useQuery({ colors: {} })
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Error: {error?.message}</Text>
      </View>
    )
  }

  return <Main data={data} />
}



function Main({ data }) {
  const [messages, setMessages] = useState([]);

  const addMessage = (emoji) => {
    setMessages([...messages, emoji]);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Hello world!</Text>
      {messages.map((message, index) => (
        <Text key={index} style={{ fontSize: 24, margin: 5 }}>
          {message}
        </Text>
      ))}
      <View className="absolute bottom-0 flex-row justify-around w-full bg-white py-2">
        <Button title="😀" onPress={() => addMessage('😀')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded" />
        <Button title="😂" onPress={() => addMessage('😂')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded" />
        <Button title="😍" onPress={() => addMessage('😍')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded" />
      </View>
    </View>
  );
}


export default App
