import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firestore from "@react-native-firebase/firestore";


const bookGetter = () => {
  // return firestore().collection('books').doc('9Idt8fZgE4zhodn2y4fm').get()
  return firestore().collection('books').get()
  .then((res) => {
    res.forEach((element) => {
      console.log({...element.data()})
    })
  })
}
const bookMaker = () => {
  const docRef = firestore().collection("users").doc().set({first: "bob",last: "johnson", born: 1815})
}

let bookDocument=bookGetter()
// bookMaker()

export default function App() {
  return (
    <View style={styles.container}>
      <Text></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
