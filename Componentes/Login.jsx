import {
  ScrollView,
  Image,
  View,
  // Pressable,
  Pressable,
  StyleSheet,
  Card, // Card no se está usando
  Alert, // Faltaba importar Alert
  TextInput, // Faltaba importar TextInput
} from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { useState } from "react";
import Logo from "../assets/imgs/jucar.jpg";
import axios from "axios";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const val = useContext (AuthContext)
  //   const {isLoading, login} =useContext(AuthConstext)

  const handleLogin = async () => {
    try {
      // Configura la URL de tu API
      const apiUrl = "https://localhost:7028/api/authentication/login";

      // Realiza la llamada a la API con Axios
      const response = await axios.post(apiUrl, {
        username: username,
        password: password,
      });

      // Aquí puedes manejar la respuesta de la API según tus necesidades
      console.log("Respuesta de la API:", response.data);

      // Por ejemplo, puedes mostrar un mensaje de éxito
      Alert.alert("Éxito", "Inicio de sesión exitoso");
    } catch (error) {
      // Maneja los errores de la llamada a la API
      console.error("Error al iniciar sesión:", error);

      // Muestra un mensaje de error
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
          <Image source={Logo} style={styles.logo} />

          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>

        <View style={styles.card}>
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
              onChangeText={(Text) => setUsername(Text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={true}
              value={password}
              onChangeText={(Text) => setPassword(Text)}
            />
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={(handleLogin) => navigation.navigate("Menu")}
        >
          <Text style={styles.buttontxt}> Ingresar </Text>
        </Pressable>

        {/* Footer (pie de pagina) */}

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
    flex: 1,
    backgroundColor: "#fff",
  },

  navbar: {
    backgroundColor: "#f80759",
    color: "#fff",
    borderColor: "#03a9f4",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: 30,
    fontWeight: 500,
    marginTop: 1,
  },

  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginLeft: 50,
  },

  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 128,
    marginRight: -21,
    marginBottom: -19,
    width: 269.906,
    height: 68,
  },

  //card
  container: {
    marginTop: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
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
    elevation: 1,
    marginTop: 33,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 35,
  },

  image: {
    width: 250,
    height: 180,
    borderRadius: 10,
  },

  form: {
    marginTop: 1,
    padding: 2,
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
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#f80759",
    padding: 10,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
  },

  buttontxt: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    textTransform: "uppercase",
  },

  link: {
    fontSize: 16,
    color: "#9E9E9E",
    marginTop: 15,
  },

  //footer

  footer: {
    backgroundColor: "black",
    color: "white",
    borderColor: "red",
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginEnd: "auto",
    marginLeft: "auto",
    flexDirection: "row",
  },

  containerFooter: {
    width: "80%",
    margin: 50,
    padding: 20,
  },

  titleFooter: {
    fontSize: 17,
    textAlign: "center",
    height: 30,
    marginBottom: -5,
    color: "white",
  },

  address: {
    fontSize: 17,
    width: "60%",
    height: 24.5,
    margin: 16,
    textAlign: "center",
    padding: 10,
    backgroundColor: "white",
  },

  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "2%",
    //margin: 2,
    padding: 20,
    backgroundColor: "white",
    marginRight: 200,
  },
});

export default Login;
