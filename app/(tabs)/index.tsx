import { StyleSheet } from 'react-native';


import { Text, View } from '@/components/Themed';
import DreamForm from '@/components/DreamForm'


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Renseignez vos rêves :</Text>
      <DreamForm/>
    </View>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20, // Ajoutez cette ligne pour descendre le texte
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
