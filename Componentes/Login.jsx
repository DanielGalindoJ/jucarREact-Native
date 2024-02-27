import React, { useState } from "react";
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const apiUrl = "https://localhost:7028/api/authentication/login";
      const response = await axios.post(apiUrl, {
        username: username,
        password: password,
      });

      // Aquí puedes manejar la respuesta de la API según tus necesidades
      console.log("Respuesta de la API:", response.data);

      // Por ejemplo, puedes mostrar un mensaje de éxito y navegar a la pantalla del menú
      Alert.alert("Éxito", "Inicio de sesión exitoso");
      navigation.navigate("Menu");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert(
        "Error",
        "Error al iniciar sesión. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.navbar}>
          <Image
            source={require("../assets/imgs/jucar.jpg")}
            style={styles.logo}
          />
          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>

        <View style={styles.form}>
          <Image
            source={{
              uri: "https://us.123rf.com/450wm/rigsby8131/rigsby81311704/rigsby8131170400147/75488593-tuercas-pernos-y-arandelas-en-un-fondo-de-acero.jpg?ver=6",
            }}
            style={styles.image}
          />
          <Text style={styles.titleInicard}>Iniciar sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttontxt}>Ingresar</Text>
          </Pressable>
          <Pressable
            style={styles.link}
            onPress={() => navigation.navigate("Registro")}
          >
            <Text style={styles.linkText}>
              ¿No tienes una cuenta? Regístrate aquí
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View style={styles.containerFooter}>
            <Text style={styles.titleFooter}>
              Derechos reservados Jucar S.A.S
            </Text>
            <Text style={styles.titleFooter}>Calle 7 #90-76</Text>
          </View>
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
  navbar: {
    backgroundColor: "#f80759",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 20,
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
  image: {
    width: 250,
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  form: {
    alignItems: "center",
  },
  titleInicard: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#9E9E9E",
    marginBottom: 20,
    textTransform: "uppercase",
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
  footer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  containerFooter: {
    width: "80%",
    paddingVertical: 20,
  },
  titleFooter: {
    fontSize: 17,
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
});

export default Login;
