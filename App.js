import { init, useQuery, transact, tx } from '@instantdb/react-native'
import { View, Text, Linking, Button, StyleSheet } from 'react-native'

// Visit https://instantdb.com/dash to get your APP_ID :)
const APP_ID = 'ee1eed1e-7ed6-4819-880b-3bc53b65e62c'

init({ appId: APP_ID })

function App() {
  const { isLoading, error, data } = useQuery({ colors: {} })
  // if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  // }
  // if (error) {
  //   return (
  //     <View>
  //       <Text>Error: {error.message}</Text>
  //     </View>
  //   )
  // }

  return <Main data={data} />
}

const selectId = '4d39508b-9ee2-48a3-b70d-8192d9c5a059'

function Main({ data }) {
  const { colors } = data
  const { color } = colors[0] || { color: 'grey' }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.spaceY4}>
        <Text style={styles.header}>Hi! pick your favorite color</Text>
        <View style={styles.spaceX4}>
          {['green', 'blue', 'purple'].map((c) => {
            return (
              <Button
                title={c}
                onPress={() => {
                  transact(tx.colors[selectId].update({ color: c }))
                }}
                key={c}
              />
            )
          })}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceY4: {
    marginVertical: 16,
  },
  spaceX4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})

export default App
