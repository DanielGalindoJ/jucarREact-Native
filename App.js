// import Usuers from "./Componentes/Users"; // Mal importado 'Usuers';
// import Users from "./Componentes/Users";
// import AllAutopartes from "./Componentes/AllAutoparts"; // Tenía mal el nombre del componente 'AllAutopartes' y es 'AllAutoparts';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Componentes/Login";
import Menu from "./Componentes/Menu";
import Proveedores from "./Componentes/Proveedores";
import Productos from "./Componentes/Productos";
import EscogerAutoparte from "./Componentes/EscogerAutoparte";
import AllAutoparts from "./Componentes/AllAutoparts";
import { NavigationContainer } from "@react-navigation/native";
import EscogerCategoriasSubactegorias from "./Componentes/EscogerCategoriasSubactegorias";
import AllCategories from "./Componentes/AllCategories";
import Subcategorias from "./Componentes/Subcategorias";
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

        <Stack.Screen
          name="EscogerAutoparte"
          component={EscogerAutoparte}
          options={{ headerShown: false, title: "EscogerAutoparte" }}
        />

        {/* <Stack.Screen
          name="AllAutoparts"
          component={AllAutoparts}
          options={{ headerShown: false, title: "AllAutoparts" }}
        /> */}

        <Stack.Screen
          name="EscogerCategoriasSubactegorias"
          component={EscogerCategoriasSubactegorias}
          options={{
            headerShown: false,
            title: "EscogerCategoriasSubactegorias",
          }}
        />
        <Stack.Screen
          name="AllCategories"
          component={AllCategories}
          options={{
            headerShown: false,
            title: "AllCategories",
          }}
        />
        <Stack.Screen
          name="Subcategorias"
          component={Subcategorias}
          options={{
            headerShown: false,
            title: "Subcategorias",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
