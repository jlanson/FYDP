import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const App: React.FC = () => {
  const [getLocation, setLocation] = useState('');
  const [getRoute, setRoute] = useState('');
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');

  const handleGetRequest = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/locations');
      setLocation(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostRequest = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/routes?from=${param1}to=${param2}`);
      setRoute(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };


  const clear = () =>{
    setRoute('')
    setLocation('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Get Locations" onPress={handleGetRequest} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Get Routes" onPress={handlePostRequest} />
      </View>
      <View style={styles.inputContainer}>
      <Text style={{color:'white', fontSize:20}}>From:</Text>
        <TextInput
          style={styles.input}
          placeholder="Parameter 1"
          value={param1}
          onChangeText={setParam1}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={{color:'white', fontSize:20}}>To:</Text>
        <TextInput
          style={styles.input}
          placeholder="Parameter 2"
          value={param2}
          onChangeText={setParam2}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={clear} />
      </View>
      <View style={styles.responseContainerTop}>
        <Text style={styles.responseHeading}>Get Locations:</Text>
        <Text style={styles.responseText}>{getLocation}</Text>
      </View>
      <View style={styles.responseContainerBottom}>
        <Text style={styles.responseHeading}>Get Route:</Text>
        <Text style={styles.responseText}>{getRoute}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    paddingHorizontal: 10,
  },
  responseContainerTop: {
    marginTop: 20,
  },
  responseContainerBottom: {
    marginTop: 100,
  },
  responseHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gold',
    marginBottom: 10,
  },
  responseText: {
    color: 'gold',
  },
});

export default App;
