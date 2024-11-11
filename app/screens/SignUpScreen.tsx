import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignupScreen: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all required fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://10.2.5.206:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
          role_id: 2, // Mobile user role
          appType: 'mobile', // Set app type for mobile
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Account created successfully!');
        setTimeout(() => {
          router.push('/login');
        }, 2000); // Redirect after 2 seconds
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>LET'S GET YOU STARTED</Text>
        <Text style={styles.title}>Create an Account</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username*"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email*"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Create Password*"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Re-type Password*"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Success message */}
        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ) : null}
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => router.push('/login')}>
          LOGIN HERE
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  circleOne: {
    position: 'absolute',
    top: -300,
    left: -50,
    width: 450,
    height: 450,
    borderRadius: 450,
    backgroundColor: '#FFD966',
    opacity: 0.5,
  },
  circleTwo: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 200,
    backgroundColor: '#FFD966',
    opacity: 0.5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    color: '#444',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  form: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  registerButton: {
    backgroundColor: '#FFC600',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  loginLink: {
    color: '#000',
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 15,
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
