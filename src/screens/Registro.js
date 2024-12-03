import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, BackHandler, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [selectedTecnologico, setSelectedTecnologico] = useState('');
  const [selectedCarreras, setSelectedCarreras] = useState([]); // Store multiple selected careers
  const [tecnologicos, setTecnologicos] = useState([]);  // State for storing Tecnologicos and their careers

  // Fetch tecnologicos and carreras from the correct API endpoint
  useEffect(() => {
    const fetchTecnologicos = async () => {
      try {
        const response = await fetch('https://app-tq3o5pftgq-uc.a.run.app/api/tecs');
        const data = await response.json();
        
        // Assuming the API returns an array of objects with 'name' and 'degree' properties
        setTecnologicos(data);
      } catch (error) {
        setError('No se pudo cargar la lista de Tecnológicos');
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
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!selectedTecnologico || selectedCarreras.length === 0 || !name || !email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setError(null);

    try {
      // Enviar los datos al servidor usando fetch
      const response = await fetch('https://app-tq3o5pftgq-uc.a.run.app/api/new-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          degree: selectedCarreras, // Send multiple degrees (careers)
          tec: selectedTecnologico,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Registrado con éxito', [
          { text: 'OK', onPress: () => navigation.navigate('Entrar') },
        ]);
      } else {
        setError(data.message || 'Hubo un error al registrar la cuenta');
      }
    } catch (error) {
      setError('Hubo un error al registrar la cuenta');
    }
  };

  // Handle selecting or deselecting a career
  const handleCarreraSelect = (carrera) => {
    setSelectedCarreras((prevState) => {
      if (prevState.includes(carrera)) {
        return prevState.filter((item) => item !== carrera); // Remove carrera if already selected
      } else {
        return [...prevState, carrera]; // Add carrera if not already selected
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registra tu cuenta</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
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
          setSelectedCarreras([]); // Reset carreras when tecnologico changes
        }}
      >
        <Picker.Item label="Selecciona un Tecnológico" value="" />
        {tecnologicos && tecnologicos.length > 0 ? (
          tecnologicos.map((tecnologico, index) => (
            <Picker.Item key={index} label={tecnologico.name} value={tecnologico.name} />
          ))
        ) : (
          <Picker.Item label="Cargando Tecnológicos..." value="" />
        )}
      </Picker>

      {/* Carrera Dropdown, visible only when a Tecnologico is selected */}
      {selectedTecnologico && (
        <View>
          {tecnologicos
            .find((tecnologico) => tecnologico.name === selectedTecnologico)?.degree?.map((carrera, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCarreraSelect(carrera)}
                style={[styles.carreraOption, selectedCarreras.includes(carrera) && styles.selectedCarrera]}
              >
                <Text>{carrera}</Text>
              </TouchableOpacity>
            )) || (
              <Text>No hay carreras disponibles</Text>
            )}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Registrar" onPress={handleRegister} color="#000080" />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
        <Text style={styles.link}>Regresar</Text>
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
  carreraOption: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedCarrera: {
    backgroundColor: '#cce5ff',
  },
});

export default Registro;
