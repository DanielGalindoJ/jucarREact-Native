// import Usuers from "./Componentes/Users"; // Mal importado 'Usuers';
// import Users from "./Componentes/Users";
// import AllAutopartes from "./Componentes/AllAutoparts"; // Tenía mal el nombre del componente 'AllAutopartes' y es 'AllAutoparts';
import AutoparteId from "./Componentes/AutopartesSubcategoria";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Componentes/Login";
import Menu from "./Componentes/Menu";
import Proveedores from "./Componentes/Proveedores";
import Productos from "./Componentes/Productos";
import EscogerAutoparte1 from "./Componentes/EscogerAutoparte1";
import AllAutoparts from "./Componentes/AllAutoparts";
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

        {/* Ventas no está importado, porque lo borré al ser un componente vacío */}

        {/* <Stack.Screen
          name="Ventas"
          component={Ventas}
          options={{ headerShown: false, title: "Ventas" }}
        /> */}

        <Stack.Screen
          name="Proveedores"
          component={Proveedores}
          options={{ headerShown: false, title: "Proveedores" }}
        />

        {/* Negocio no está importado, porque lo borré al ser un componente vacío */}

        {/* <Stack.Screen
          name="Negocio"
          component={Negocio}
          options={{ headerShown: false, title: "Negocio" }}
        /> */}

        {/* <Stack.Screen

          // Estaba usando el nombre del componente mal importado 'Usuers' 

          // name="Usuers"
          // component={Usuers}
          // options={{ headerShown: false, title: "Usuers" }}
          name="Users"
          component={Users}
          options={{ headerShown: false, title: "Users" }}
        /> */}

        <Stack.Screen
          name="EscogerAutoparte1"
          component={EscogerAutoparte1}
          options={{ headerShown: false, title: "EscogerAutoparte1" }}
        />

        <Stack.Screen
          name="AllAutoparts"
          // component={AllAutopartes} // Tenía mal el nombre del componente
          component={AllAutoparts}
          options={{ headerShown: false, title: "AllAutoparts" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
