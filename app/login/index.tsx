import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const router = useRouter();
  const { login, loading } = useAuth(); // Access loading from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = async () => {
    try {
      await login(email, password);
      router.replace('/(tabs)'); // Redirect to authenticated screens
    } catch (error: any) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background circles */}
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFC600" />
          <Text style={styles.loadingText}>Logging you in...</Text>
        </View>
      )}

      {!loading && (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>
              CST <Text style={styles.titleHighlight}>GYM</Text>
            </Text>
            <Text style={styles.welcomeBack}>WELCOME BACK</Text>
            <Text style={styles.loginText}>Log In to your Account</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Enter email id"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            Not registered yet?{' '}
            <Text
              style={styles.createAccount}
              onPress={() => router.push('/screens/SignUpScreen')}
            >
              Create Account
            </Text>
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOne: {
    position: 'absolute',
    top: -200,
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
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -50 }],
  },
  loadingText: {
    marginTop: 10,
    color: '#FFC600',
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  titleHighlight: {
    color: '#FFC600',
  },
  welcomeBack: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  loginButton: {
    backgroundColor: '#FFC600',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  createAccount: {
    color: '#000',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Login;
