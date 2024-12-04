import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, BackHandler, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [selectedTecnologico, setSelectedTecnologico] = useState('');
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [tecnologicos, setTecnologicos] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchTecnologicos = async () => {
      try {
        const response = await fetch('https://app-tq3o5pftgq-uc.a.run.app/api/tecs');
        const data = await response.json();
        setTecnologicos(data);
      } catch (error) {
        setError('No se pudo cargar la lista de Tecnológicos');
      }
    };

    fetchTecnologicos();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!selectedTecnologico || !selectedCarrera || !name || !email || !password) {
      setError('Por favor completa todos los campos');
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
          degree: selectedCarrera,
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Text style={styles.eyeText}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Text style={styles.eyeText}>{showConfirmPassword ? "Ocultar" : "Mostrar"}</Text>
          </TouchableOpacity>
        </View>

        <Picker
          selectedValue={selectedTecnologico}
          style={styles.input}
          onValueChange={(itemValue) => {
            setSelectedTecnologico(itemValue);
            setSelectedCarrera(''); // Limpiar la selección de carrera al cambiar de tecnológico
          }}
        >
          <Picker.Item label="Selecciona un Tecnológico" value="" />
          {tecnologicos.map((tecnologico, index) => (
            <Picker.Item key={index} label={tecnologico.name} value={tecnologico.name} />
          ))}
        </Picker>

        {selectedTecnologico && (
          <View>
            <Text style={styles.subTitle}>Elige tu carrera</Text>
            {tecnologicos
              .find((tecnologico) => tecnologico.name === selectedTecnologico)?.degree?.map((carrera, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCarrera(carrera)}
                  style={[
                    styles.carreraOption,
                    selectedCarrera === carrera && styles.selectedCarrera,
                  ]}
                >
                  <Text>{carrera}</Text>
                </TouchableOpacity>
              )) || <Text>No hay carreras disponibles</Text>}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Registrar" onPress={handleRegister} color="#000080" />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
          <Text style={styles.link}>Regresar</Text>
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
  carreraOption: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedCarrera: {
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
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  eyeText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default Registro;
