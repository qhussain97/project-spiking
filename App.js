import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite'
import { useEffect, useState } from 'react';
import TestComp from './TestComp.jsx';


export default function App() {
  const [names, setNames] = useState([])
  const [buttonPressed, setButtonPressed] = useState(false)
  const [currentName, setCurrentName] = useState([])
  const [db, setDb] = useState(SQLite.openDatabase('example.db'))
  
  useEffect(() => {
    
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
    })
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM names', null,
      (txObj,resultSet) => {
        setNames(resultSet.rows._array)
        console.log(names,"data fresh from DB")},
      (txObj, error) => console.log(error)
      );
    })
  }, [db])

  const addName = () => {
    setButtonPressed(!buttonPressed)
    db.transaction(tx => {
      tx.executeSql('INSERT INTO names (name) values (?)', [currentName],
      (txObj, resultSet) => {
        let existingNames = [...names];
        existingNames.push({id: resultSet.insertId, name: currentName});
        setNames(existingNames);
        setCurrentName(undefined);
      },
      (txObj, error) => console.log(err))
    })
  }

  const deleteName = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM names WHERE id = ?',[id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names].filter(name => name.id !== id)
            setNames(existingNames)

          }
        },
        (txObj, error) => console.log(error)
      )
    })
  }

  const updateName = (id) => {
    db.transaction(tx => {
      tx.executeSql('UPDATE names SET name = ? WHERE id = ?', [currentName, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let existingNames = [...names]
          const indexToUpdate = existingNames.findIndex(name => name.id === id)
          existingNames[indexToUpdate].name = currentName
          setNames(existingNames);
          setCurrentName(undefined)
        }
      },)
    })
  }
  
  const showNames = () => {
    return names.map((name, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text>{name.name}</Text>
          <Button title='Delete' onPress={() => {deleteName(name.id)}} />
          <Button title='Update' onPress={() => {updateName(name.id)}} />
        </View>
      )
    })
  }
  return (
    <View style={styles.container}>
      <TextInput value={currentName} placeholder='name' onChangeText={setCurrentName}></TextInput>
      <Button title="Add Name" onPress={addName} />
      <Text>Name list from DB:
        {showNames()}
      </Text>
      <Text>Get random cocktail:
      </Text>
      <TestComp />

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8

  }
});
