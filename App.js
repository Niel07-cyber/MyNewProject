import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [exchangeRate, setExchangeRate] = useState(1); // Default is 1 for USD to USD

  const handlePress = (value) => {
    if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        const evalResult = eval(input);
        const convertedResult = evalResult * exchangeRate;
        setResult(`${convertedResult.toFixed(2)}`);
      } catch (e) {
        setResult('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calculator with Currency Conversion</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={input} editable={false} />
        <Text style={styles.result}>{result}</Text>
      </View>

      <RNPickerSelect
        onValueChange={(value) => setExchangeRate(value)}
        items={[
          { label: 'USD to USD', value: 1 },
          { label: 'USD to EUR', value: 0.85 }, // Example rate, update with real-time data
        ]}
        placeholder={{ label: 'Select Currency', value: null }}
        style={pickerSelectStyles}
      />

      <View style={styles.buttons}>
        {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'C', '0', '=', '/'].map((value) => (
          <TouchableOpacity key={value} style={styles.button} onPress={() => handlePress(value)}>
            <Text style={styles.buttonText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 32,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    textAlign: 'right',
  },
  result: {
    fontSize: 32,
    textAlign: 'right',
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '22%',
    margin: '1%',
    padding: 20,
    backgroundColor: '#FF6232',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
});
