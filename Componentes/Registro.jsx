import React, { useState } from "react";
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Picker,
} from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("Usuario");

  const handleRegister = async () => {
    try {
      if (
        !firstName ||
        !lastName ||
        !userName ||
        !password ||
        !email ||
        !phoneNumber
      ) {
        Alert.alert("Error", "Por favor, completa todos los campos");
        return;
      }

      const apiUrl = "https://localhost:7028/api/authentication";
      const response = await axios.post(apiUrl, {
        FirstName: firstName,
        LastName: lastName,
        UserName: userName,
        Password: password,
        Email: email,
        PhoneNumber: phoneNumber,
        Roles: [userType === "Administrador" ? "Administrator" : "User"],
      });

      console.log("Respuesta de la API:", response.data);

      if (response.status === 200) {
        Alert.alert("Éxito", "Usuario creado exitosamente", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        throw new Error("Error en la creación de usuario");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      let errorMessage =
        "Error al registrar usuario. Por favor, intenta nuevamente.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/imgs/jucar.jpg")}
          style={styles.logo}
        />
        <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.form}>
          <Text style={styles.title}>Registro de Usuario</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={firstName}
            onChangeText={setFirstName}
            key="firstName"
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
            key="lastName"
          />

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={userName}
            onChangeText={setUserName}
            key="userName"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            key="password"
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            key="email"
          />

          <TextInput
            style={styles.input}
            placeholder="Número de teléfono"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            key="phoneNumber"
          />

          <Picker
            selectedValue={userType}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
            key="userType"
          >
            <Picker.Item label="Usuario" value="Usuario" />
            <Picker.Item label="Administrador" value="Administrador" />
          </Picker>

          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttontxt}>Guardar Usuario</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  card: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
    marginTop: 50,
  },
  form: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#f80759",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttontxt: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    textTransform: "uppercase",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  titleLogo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
});

export default Register;
