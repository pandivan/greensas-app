import React, { Component } from "react";
import { Text, View, TouchableOpacity, AsyncStorage, FlatList, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './stylesProductos';

import pedidoServices from "../../services/PedidoServices";



const ESTADO_PEDIDO_PENDIENTE = 100;



class Carrito extends Component 
{
  // webSocket = new WebSocket("ws://192.168.1.8:7788/cliente-websocket");

  constructor(props) 
  {
    super(props);
    
    this.state = 
    {
      arrayproductosPedido: []
    };
  }

   

  /**
   * Función que se llama despues de renderizar el componente
   */
  componentDidMount()
  {
    // console.log("didmount carrito");
    // this.conectarWebSocket();
    this.unsubscribe = this.props.navigation.addListener('focus', this.cargarProductosPedido);

    // TODO: this.cargarProductosPedido();
  }



  /**
   * Método que se ejecuta automaticamente cuando se cierra la sesion de la app
   */
  componentWillUnmount()
  {
    console.log("desmontando....");

    //Cerrando conexion del websocket
    // this.webSocket.close();
    if(undefined !== this.unsubscribe)
    {
      this.unsubscribe();
    }
  }



  /**
   * Metodo que permite cargar los productos seleccionados en el carrito de compra
   */
  cargarProductosPedido = async () =>
  {
    try
    {
      let arrayproductosPedido = await AsyncStorage.getItem("@productosPedido");

      if(null !== arrayproductosPedido) 
      {
        arrayproductosPedido = JSON.parse(arrayproductosPedido);
        this.setState({arrayproductosPedido});
      }
      else
      {
        this.setState({arrayproductosPedido: []});
      }
    }
    catch(error)
    {
      //TODO: Guardar log del error en BD
      Alert.alert("Información", "En el momento, no es posible cargar los productos del pedido");
    }
  }



  /**
   * Método que permite establecer conexion con el servidor a traves de websocket
   */
  conectarWebSocket = () => 
  {
    console.log("abrirConexion::: ");

    this.webSocket.onopen = () => 
    {
      console.log("Conexion Abierta:::");
    };
    
    this.webSocket.onmessage = (e) => 
    {
      console.log("Mensaje Recibido del Servidor:::");
      console.log(e.data);
    };
    
    this.webSocket.onerror = (e) => 
    {
      console.log("Ocurrio error:::");
      console.log(e.message);
      this.webSocket.close();
    };
    
    this.webSocket.onclose = (e) => 
    {
      console.log("Conexion cerrada:::");
      console.log(e.code, e.reason);
    };
  };




  render() 
  {
    return (      
      <View style={styles.viewPedido}>
        <View style={{height:20}} />
        <Text style={{fontSize:28, color:"#9fd236"}}>Pedido</Text>
        <View style={{height:10}} />

        <FlatList 
          data={this.state.arrayproductosPedido}
          renderItem={ ({ item }) => this.visualizarProductoPedido(item) }
          keyExtractor={ (item) => item.idProducto.toString() }
        />

        <View style={{height: 20}} />

        <Text style={styles.textValorTotal}>$ {this.calcularTotalPedido()}</Text>

        <View style={{height: 10}} />

        <TouchableOpacity style={styles.botonEnviarPedido} onPress={this.registrarPedido}>
          <Text style={styles.textEnviarPedido}>ENVIAR PEDIDO</Text>
        </TouchableOpacity>

        <View style={{height:20}} />
      </View>
    );
  }




  /**
   * Funcion que permite listar los productos seleccionados del pedido
   */
  visualizarProductoPedido = (producto) => 
  {
    if(producto.isSeleccionado)
    {
      return(
        <View style={styles.viewProductoPedido}>
          <Image resizeMode={"contain"} style={styles.imageProductoPedido} source={{uri: producto.urlImagenProducto}} />

          <View style={styles.viewBotonesProductoPedido}>
            <View>
              <Text style={styles.textProductoPedido}>{producto.nombre}</Text>
              <Text>Descripcion de producto</Text>
            </View>

            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={styles.textValorProductoPedido}>${producto.valor * producto.cantidad}</Text>
              
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <TouchableOpacity onPress={() => this.adicionarEliminarProducto(producto, false)}>
                  <Icon name="ios-remove-circle" size={30} color={"#9fd236"} />
                </TouchableOpacity>
                <Text style={{paddingHorizontal:8, fontWeight:"bold"}}>{producto.cantidad}</Text>
                <TouchableOpacity onPress={() => this.adicionarEliminarProducto(producto, true)}>
                  <Icon name="ios-add-circle" size={30} color={"#9fd236"} />
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
      )
    }
  }


  /**
   * Funcion que permite adicionar y eliminar la cantidad de un producto seleccionado
   */
  adicionarEliminarProducto = async (producto, isAdicionar) =>
  {
    let arrayproductosPedido = this.state.arrayproductosPedido;

    if(isAdicionar)
    {
      producto.cantidad += 1;
    }
    else
    {
      producto.cantidad -= 1;

      if(0 === producto.cantidad)
      {
        producto.isSeleccionado = false;
      }
    }

    //Se guarda el producto al carrito de compras cuando la cantidad pedida es mayor a cero
    if(producto.cantidad >= 0)
    {
      //Se actualiza la nueva cantidad solicitada
      this.setState({arrayproductosPedido});
      
      try 
      {
        await AsyncStorage.setItem("@productosPedido", JSON.stringify(arrayproductosPedido));
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD
        Alert.alert("Información", "En el momento, no es posible adicionar productos.");
      }
    }
  }



  /**
   * Funcion que permite calcular el total del pedido
   */
  calcularTotalPedido()
  {
    let totalPedido = 0;

    this.state.arrayproductosPedido.forEach((producto)=>
    {
      totalPedido += producto.valor * producto.cantidad
    })

    return totalPedido;
  }



  /**
   * Funcion que permite enviar el pedido al servidor via api-res y registrarlo en BD
   */
  registrarPedido = async () =>
  {
    try 
    {
      //TODO: Reemplazar por el envio del cliente desde el navigator de App.js
      let cliente = await AsyncStorage.getItem("@cliente"); 
      cliente = JSON.parse(cliente);
      
      let lstProductosPedido = [];

      //TODO: Probar el map para iterar y q devuelva directamente en lstProductosPedido para evitar el push
      
      //Se itera el array completo de productos para obtener los seleccionados por el cliente
      this.state.arrayproductosPedido.forEach((producto)=>
      {
        if(producto.isSeleccionado)
        {
          //Creando entity ProductoPedido
          let productoPedido = 
          {
            cantidad: producto.cantidad,
            valor: producto.valor,
            producto,
            pedido: null
          }

          lstProductosPedido.push(productoPedido);
          // console.log("Producto: " + JSON.stringify(producto.nombre));
        }
      })

      if(0 === lstProductosPedido.length)
      {
        Alert.alert("Información", "Debe escoger al menos un producto de la carta.");
        return;
      }

      
      //Creando entity Pedido
      let pedido = 
      {
        cliente,
        idEstado: ESTADO_PEDIDO_PENDIENTE,
        lstProductosPedido
      };


      //Registrando pedido en BD
      let {success} = await pedidoServices.registrarPedido(pedido);
      
      if(success)
      {
        // this.webSocket.send("Pedido 100");

        this.setState({arrayproductosPedido: []});
        await AsyncStorage.removeItem("@productosPedido");
        
        this.props.navigation.navigate("Productos");

        Alert.alert("Información", "Su pedido fue registrado. Dentro de poco será informado de su estado.");
      }
      else
      {
        Alert.alert("Información", "El pedido no pudo registrarse correctamente, por favor vuelva a intentar.");
      }
    } 
    catch (error) 
    {
      Alert.alert("Información", "No es posible registrar el pedido");
    }
  }
}


export default Carrito;