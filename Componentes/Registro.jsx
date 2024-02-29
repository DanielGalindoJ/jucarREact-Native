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
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("Roles");

  const handleRegister = async () => {
    try {
      const apiUrl = "https://localhost:7028/api/authentication/login";
      const response = await axios.post(apiUrl, {
        FirstName,
        LastName,
        UserName,
        Password,
        Email,
        PhoneNumber,
        Roles: userType,
      });

      console.log("Respuesta de la API:", response.data);

      Alert.alert("Éxito", "Usuario creado exitosamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      Alert.alert(
        "Error",
        "Error al registrar usuario. Por favor, intenta nuevamente."
      );
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
            value={FirstName}
            onChangeText={setFirstName}
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={LastName}
            onChangeText={setLastName}
          />

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={UserName}
            onChangeText={setUserName}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={Password}
            onChangeText={setPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={Email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Número de teléfono"
            value={PhoneNumber}
            onChangeText={setPhoneNumber}
          />

          <Picker
            selectedValue={userType}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
          >
            <Picker.Item label="Usuario" value="usuario" />
            <Picker.Item label="Administrador" value="administrador" />
          </Picker>

          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttontxt}>Guaradar Usuario</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
