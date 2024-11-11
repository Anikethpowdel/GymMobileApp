import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const ManageProfile = () => {
  const navigation = useNavigation();
  const { user, token, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
//   const [contactNo, setContactNo] = useState(user?.contactNo || ""); 

  const validateFields = () => {
    if (!name.trim() || !email.trim() ) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (!validateFields()) return;

    try {
      const response = await axios.put(
        'http://10.2.5.206:3001/api/auth/user',
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);  // Update user data in context
      Alert.alert("Success", "Your profile has been updated successfully.", [{ text: "OK", style: "default" }]);
    } catch (error) {
      console.error('Failed to update user:', error);
      Alert.alert("Update failed", "An error occurred while updating your profile.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.jumpTo('(tabs)', { screen: 'index' }))}
          style={styles.iconContainer}
        >
          <Ionicons name="chevron-back" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Edit Profile</Text>

      <Image
        source={require('@/assets/images/profile.png')}
        style={styles.avatar}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Your Email"
          keyboardType="email-address"
        />
      </View>

      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact No</Text>
        <TextInput
          style={styles.input}
          value={contactNo}
          onChangeText={setContactNo}
          keyboardType="phone-pad"
          placeholder="Your Contact No"
        />
      </View> */}

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    paddingRight: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: "#FFC600",
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 90,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
