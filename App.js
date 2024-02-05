import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Componentes/Login";
import Menu from "./Componentes/Menu";
import Negocio from "./Componentes/Negocio";
import Proveedores from "./Componentes/Proveedores";
import Usuers from "./Componentes/Users";
import Ventas from "./Componentes/Ventas";

import Productos from "./Componentes/Productos";
import EscogerAutoparte1 from "./Componentes/EscogerAutoparte1";
import AllAutopartes from "./Componentes/AllAutoparts";
import AutoparteId from "./Componentes/AutopartesSubcategoria";

import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

//
//  const api = axios.create({
//    baseUrl: "url api",
//    timeout : 10000
//  })

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, title: "Login" }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false, title: "Menu" }}
        />
        <Stack.Screen
          name="Productos"
          component={Productos}
          options={{ headerShown: false, title: "Productos" }}
        />
        <Stack.Screen
          name="Ventas"
          component={Ventas}
          options={{ headerShown: false, title: "Ventas" }}
        />
        <Stack.Screen
          name="Proveedores"
          component={Proveedores}
          options={{ headerShown: false, title: "Proveedores" }}
        />
        <Stack.Screen
          name="Negocio"
          component={Negocio}
          options={{ headerShown: false, title: "Negocio" }}
        />
        <Stack.Screen
          name="Usuers"
          component={Usuers}
          options={{ headerShown: false, title: "Usuers" }}
        />

        <Stack.Screen
          name="EscogerAutoparte1"
          component={EscogerAutoparte1}
          options={{ headerShown: false, title: "EscogerAutoparte1" }}
        />
        <Stack.Screen
          name="AllAutoparts"
          component={AllAutopartes}
          options={{ headerShown: false, title: "AllAutoparts" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
