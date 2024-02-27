import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  Image,
  Pressable,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Componentes/Login";
import Menu from "./Componentes/Menu";
import Proveedores from "./Componentes/Proveedores";
import Productos from "./Componentes/Productos";
import EscogerAutoparte from "./Componentes/EscogerAutoparte";
//import AllAutoparts from "./Componentes/AllAutoparts";
import EscogerCategoriasSubactegorias from "./Componentes/EscogerCategoriasSubactegorias";
import AllCategories from "./Componentes/AllCategories";
import Subcategorias from "./Componentes/Subcategorias";
import MenuSubcategories from "./Componentes/Menus/MenuSubcategories";
import salir from "./assets/imgs/salir.jpg";
import Registro from "./Componentes/Registro";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  const handleLogin = () => {
    // Simulacion de autenticacion exitosa
    setIsAuthenticated(true);
    navigation.navigate("Menu");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigation.navigate("Login");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, title: "Login" }}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              handleLogin();
            },
          })}
        />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            title: "Inicio",
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="Productos"
          component={Productos}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="Proveedores"
          component={Proveedores}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="EscogerAutoparte"
          component={EscogerAutoparte}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        {/* <Stack.Screen
          name="AllAutoparts"
          component={AllAutoparts}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        /> */}
        <Stack.Screen
          name="EscogerCategoriasSubactegorias"
          title="Todas las Categorias"
          component={EscogerCategoriasSubactegorias}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="AllCategories"
          title="Todas las Categorias"
          component={AllCategories}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="Subcategorias"
          component={Subcategorias}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="MenuSubcategories"
          component={MenuSubcategories}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    position: "bottom",
    height: 50,
    border: {
      width: 1,
      color: "#ccc",
    },
    backgroundColor: "#000",
    color: "#fff",
  },
  logo: {
    width: 37,
    height: 57,
    resizeMode: "contain",
    marginLeft: 50,
  },
});

export default App;
