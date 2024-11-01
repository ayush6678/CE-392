import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const App = () => {
  const [count, setCount] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [selection, setSelection] = useState('');
  const [percentValue, setPercentValue] = useState(50);  // Set an initial value
  const [distribution, setDistribution] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.x.x:5000/predict', { // Replace with your IP
        parameter1: parseFloat(count),
        parameter2: selection,
        parameter3: selection === "percent" ? parseFloat(percentValue) : selection,
        parameter4: distribution
      });
      setPrediction(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch prediction');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DroneMapping Error Predictor Model</Text>
      
      <Text style={styles.label}>Enter the number of GCP</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Count Value'
        value={count}
        onChangeText={setCount}
      />

      <Text style={styles.label}>Select Drone Mode</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={() => setSelection('percent')}>
          <Text style={[styles.radioButton, selection === 'percent' && styles.radioButtonSelected]}>Percent Overlap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelection('rtk')}>
          <Text style={[styles.radioButton, selection === 'rtk' && styles.radioButtonSelected]}>RTK</Text>
        </TouchableOpacity>
      </View>

      {/* Slider for Percent Overlap */}
      <Text style={styles.label}>Percent Value: {percentValue}</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        step={1}
        onValueChange={(val) => setPercentValue(val)}  // Ensure onValueChange is properly updating state
        style={styles.slider}
      />

      <Text style={styles.label}>Select Distribution Type:</Text>
      <Picker
        selectedValue={distribution}
        style={styles.picker}
        onValueChange={(itemValue) => setDistribution(itemValue)}
      >
        <Picker.Item label="--Select--" value="" />
        <Picker.Item label="Uniform Distribution" value="Uniform-Distribution" />
        <Picker.Item label="Half of Area" value="Half-of-Area" />
        <Picker.Item label="Corner Distribution" value="Corner-Distribution" />
        <Picker.Item label="Center Distribution" value="Center-Distribution" />
      </Picker>

      <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />

      {prediction && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionTitle}>Predicted Error:</Text>
          <View style={styles.predictionValues}>
            <Text style={styles.predictionText}>RMSEx: {prediction.x}</Text>
            <Text style={styles.predictionText}>RMSEy: {prediction.y}</Text>
            <Text style={styles.predictionText}>RMSEz: {prediction.z}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop:24,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 8,
    width: '80%',
    borderRadius: 5,
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    color: '#555',
  },
  radioButtonSelected: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  slider: {
    width: '80%',
    height: 40,
    marginVertical: 10,
  },
  picker: {
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
  },
  predictionContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    width: '80%',
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  predictionValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  predictionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default App;
