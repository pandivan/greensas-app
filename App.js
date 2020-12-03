import * as React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuCliente from "./src/routes/MenuCliente";
import MenuTienda from "./src/routes/MenuTienda";
import MenuAutenticacion from "./src/routes/MenuAutenticacion";
import SplashScreen from "./src/routes/SplashScreen";
import clienteServices from "./src/services/ClienteServices";
import ContextoAutenticacion from "./ContextoAutenticacion";




const Stack = createStackNavigator();



export default function App() 
{

  //Valores iniciales del state
  const inicializarState = 
  {
    isLoading: true,
    isLogueado: false,
    cliente: null
  }


  //Funcion que permite el manejo del state
  const reducer = (prevState, action) => 
  {
    switch (action.type) 
    {
      case "restaurarSesion":
      return {
        ...prevState, //Retorna todas las propieades del objeto y ACTUALIZA solo la propiedad isLoading y cliente
        cliente: action.cliente,
        isLoading: false
      };

      case "iniciarSesion":
      return {
        isLoading: false,
        isLogueado: true,
        cliente: action.cliente
      };

      case "cerrarSesion":
      return {
        isLoading: false,
        isLogueado: false,
        cliente: null
      };
      
      default:
        console.log("switch default");
        return state;
    }
  };

  
  //Creando state....
  const [state, dispatch] = React.useReducer(reducer, inicializarState);
  

  /**
   * Funcion que permite validar el cliente despues de renderizar la pantalla
   */
  React.useEffect(() => 
  {
    const cargarData = async () => 
    {
      try 
      {
        //Se valida si hay un cliente en el storage
        let cliente = await AsyncStorage.getItem("@cliente");  

        //TODO: Probar q no se dañe la perfilacion... quitar el undefine en la clase ProductoPedido liena 130 para q rebiente
        // console.log("useEffect cliente " + JSON.parse(cliente));

        dispatch({ type: "restaurarSesion", cliente: cliente });
      } 
      catch (e) 
      {
        Alert.alert("Restoring token failed...");
      }
    };

    cargarData();
  }, []);


  
  const contextoAutenticacion = React.useMemo(() => (
  {
    iniciarSesion: async infoCliente => 
    {
      try 
      {
        let {success, cliente} = await clienteServices.validarCliente(infoCliente);
        
        if(success)
        {
          // console.log("Iniciando sesion: ".concat(cliente.tipoCliente));
          //Gurdando token en AsyncStorage...
          await AsyncStorage.setItem("@cliente", JSON.stringify(cliente));

          dispatch({ type: "iniciarSesion", cliente: cliente });
        }
        else
        {
          Alert.alert("Información", "Usuario o Clave invalida.");
        }
      } 
      catch (error) 
      {
        Alert.alert("Información", "No es posible consultar el cliente");
      }
    },
    
    cerrarSesion: () => 
    {
      dispatch({ type: "cerrarSesion" });
      AsyncStorage.clear();
    },
    
    registrarse: async infoCliente => 
    {
      try 
      {
        let {success, cliente} = await clienteServices.registrarCliente(infoCliente);
        
        if(success)
        {
          //Se ha registrado con éxito. Seleccione "Aceptar" para ingresar.
          //Gurdando token en AsyncStorage...
          await AsyncStorage.setItem("@cliente", JSON.stringify(cliente));

          dispatch({ type: "iniciarSesion", cliente: cliente });
        }
        else
        {
          Alert.alert("Información", "El correo electrónico ingresado ya está registrado. Por favor ingrese otro.");
          //Alert.alert("Información", "Ingresaste un direccion de email que ya esta registrada en , Si ya eres miembro, haz clic en Iniciar sesion");
        }
      } 
      catch (error) 
      {
        Alert.alert("Información", "No es posible registrar el cliente");
      }
    },
  }),
  []
  );

  
  return (
    <ContextoAutenticacion.Provider value={contextoAutenticacion}>
      <NavigationContainer>
        <Stack.Navigator headerMode ="none">
        {
          (state.isLoading) ? 
          (<Stack.Screen name="Splash" component={SplashScreen} />) 
          :
          (null != state.cliente && "cliente" === state.cliente.tipoCliente) ? 
          (<Stack.Screen name="MenuCliente" component={MenuCliente} />)
          : 
          (null != state.cliente && "tienda" === state.cliente.tipoCliente) ?
          (<Stack.Screen name="MenuTienda" component={MenuTienda}/>)
          : 
          (<Stack.Screen name="MenuAutenticacion" component={MenuAutenticacion} />)
        }
        </Stack.Navigator>
      </NavigationContainer>
    </ContextoAutenticacion.Provider>
  );
}
