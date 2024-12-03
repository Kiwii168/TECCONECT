import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, BackHandler, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [selectedTecnologico, setSelectedTecnologico] = useState('');
  const [selectedCareers, setSelectedCareers] = useState([]); // Store multiple selected careers
  const [tecnologicos, setTecnologicos] = useState([]);  // State for storing Tecnologicos and their careers

  // Fetch tecnologicos and careers from the correct API endpoint
  useEffect(() => {
    const fetchTecnologicos = async () => {
      try {
        const response = await fetch('https://app-tq3o5pftgq-uc.a.run.app/api/tecs');
        const data = await response.json();
        
        // Assuming the API returns an array of objects with 'name' and 'degree' properties
        setTecnologicos(data);
      } catch (error) {
        setError('Could not load the list of Tecnologicos');
      }
    };

    fetchTecnologicos();
  }, []);

  // Handle back press to disable the default back action
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  // Handle registration
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!selectedTecnologico || selectedCareers.length === 0 || !name || !email || !password) {
      setError('Please fill out all fields');
      return;
    }

    setError(null);

    try {
      // Send data to the server using fetch
      const response = await fetch('https://app-tq3o5pftgq-uc.a.run.app/api/new-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          degree: selectedCareers, // Send multiple degrees (careers)
          tec: selectedTecnologico,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Successfully registered', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        setError(data.message || 'There was an error registering the account');
      }
    } catch (error) {
      setError('There was an error registering the account');
    }
  };

  // Handle selecting or deselecting a career
  const handleCareerSelect = (career) => {
    setSelectedCareers((prevState) => {
      if (prevState.includes(career)) {
        return prevState.filter((item) => item !== career); // Remove career if already selected
      } else {
        return [...prevState, career]; // Add career if not already selected
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register your account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Tecnologico Dropdown */}
      <Picker
        selectedValue={selectedTecnologico}
        style={styles.input}
        onValueChange={(itemValue) => {
          setSelectedTecnologico(itemValue);
          setSelectedCareers([]); // Reset careers when tecnologico changes
        }}
      >
        <Picker.Item label="Select a Tecnologico" value="" />
        {tecnologicos && tecnologicos.length > 0 ? (
          tecnologicos.map((tecnologico, index) => (
            <Picker.Item key={index} label={tecnologico.name} value={tecnologico.name} />
          ))
        ) : (
          <Picker.Item label="Loading Tecnologicos..." value="" />
        )}
      </Picker>

      {/* Career Dropdown, visible only when a Tecnologico is selected */}
      {selectedTecnologico && (
        <View>
          {tecnologicos
            .find((tecnologico) => tecnologico.name === selectedTecnologico)?.degree?.map((career, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCareerSelect(career)}
                style={[styles.careerOption, selectedCareers.includes(career) && styles.selectedCareer]}
              >
                <Text>{career}</Text>
              </TouchableOpacity>
            )) || (
              <Text>No careers available</Text>
            )}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} color="#000080" />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Index')}>
        <Text style={styles.link}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  careerOption: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedCareer: {
    backgroundColor: '#cce5ff',
  },
});

export default Register;
