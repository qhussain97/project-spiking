import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';

const PlaceholderImage = 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' } }>Shake-N-Make Project Spiking</Text>
      <View> style={styles.imageContainer}
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a cocktail" />
        <Button label="Random cocktail" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // imageContainer: {
  //   flex: 1,
  //   paddingTop: 58,
  // },
  // image: {
  //   width: 320,
  //   height: 440,
  //   borderRadius: 18,
  // },
});
