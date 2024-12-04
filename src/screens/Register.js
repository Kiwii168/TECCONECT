import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, BackHandler, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Registration = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [selectedTechnological, setSelectedTechnological] = useState('');
  const [selectedCareer, setSelectedCareer] = useState(''); // Only one career selected
  const [technologicals, setTechnologicals] = useState([]);

  useEffect(() => {
    const fetchTechnologicals = async () => {
      try {
        const response = await fetch('https://app-tq3o5pftgq-uc.a.run.app/api/tecs');
        const data = await response.json();
        setTechnologicals(data);
      } catch (error) {
        setError('Could not load the list of Technologicals');
      }
    };

    fetchTechnologicals();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!selectedTechnological || !selectedCareer || !name || !email || !password) {
      setError('Please complete all fields');
      return;
    }

    setError(null);

    try {
      const response = await fetch('https://app-tq3o5pftgq-uc.a.run.app/api/new-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          degree: selectedCareer,
          tec: selectedTechnological,
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Register Your Account</Text>
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
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Picker
          selectedValue={selectedTechnological}
          style={styles.input}
          onValueChange={(itemValue) => {
            setSelectedTechnological(itemValue);
            setSelectedCareer(''); // Clear career selection when changing technological
          }}
        >
          <Picker.Item label="Select a Technological" value="" />
          {technologicals.map((technological, index) => (
            <Picker.Item key={index} label={technological.name} value={technological.name} />
          ))}
        </Picker>

        {selectedTechnological && (
          <View>
            <Text style={styles.subTitle}>Choose your career</Text>
            {technologicals
              .find((technological) => technological.name === selectedTechnological)?.degree?.map((career, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCareer(career)}
                  style={[
                    styles.careerOption,
                    selectedCareer === career && styles.selectedCareer,
                  ]}
                >
                  <Text>{career}</Text>
                </TouchableOpacity>
              )) || <Text>No careers available</Text>}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={handleRegister} color="#000080" />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Index')}>
          <Text style={styles.link}>Go back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
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
});

export default Registration;
