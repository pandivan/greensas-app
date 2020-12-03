import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Container, CardItem, Card, Icon } from "native-base";
import styles from './stylesTiendas';

import pedidoServices from "../../services/PedidoServices";



class Pedidos extends Component 
{
  // webSocket = new WebSocket("ws://192.168.1.8:7788/tienda-websocket");

  constructor(props) 
  {
     super(props);

     this.state = 
     {
       arrayPedidos: []
     };
  }


  /**
   * Función que permite hacer una solicitud a un API REST
   */
  componentDidMount = async () =>
  {
    this.cargarPedidos();
    // this.conectarWebSocket();
    this.unsubscribe = this.props.navigation.addListener('focus', this.refrescarPedidos);

    //TODO: this.refrescarPedidos();
  }



  componentWillUnmount()
  {
    //TODO: Validar si el unsubscribe funcion o es mentira
    //Cerrando conexion del websocket
    // this.webSocket.close();
    if(undefined !== this.unsubscribe)
    {
      this.unsubscribe();
    }
  }



    /**
   * Método que permite establecer conexion con el servidor a traves de websocket
   */
  conectarWebSocket = () => 
  {
    console.log("abrirConexion Tendero::: ");

    this.webSocket.onopen = () => 
    {
      console.log("Conexion Abierta Tendero:::");
      this.webSocket.send("Soy la tienda luisa");
    };
    
    this.webSocket.onmessage = (e) => 
    {
      console.log("Mensaje Recibido del Servidor para Tendero:::");
      console.log(e.data);
      this.cargarPedidos();
    };
    
    this.webSocket.onerror = (e) => 
    {
      console.log("Ocurrio error Tendero:::");
      console.log(e.message);
      this.webSocket.close();
    };
    
    this.webSocket.onclose = (e) => 
    {
      console.log("Conexion Tendero cerrada:::");
      console.log(e.code, e.reason);
    };
  };



  /**
   * Metodo que permite cargar todos los pedidos pendientes
   */
  cargarPedidos = async () =>
  {
    try
    {
      let {success, arrayPedidos} = await pedidoServices.getAllPedidos();

      // console.log(JSON.stringify(arrayPedidos));

      if (success) 
      {
        this.setState(
        {
          arrayPedidos
        });
      }
    }
    catch (error) 
    {
      //TODO: Guardar log del error en BD
      Alert.alert("Información", "En el momento, no es posible cargar los pedidos");
    }
  }
  
  
  render() 
  {
    return (
      <Container>
        <FlatList
          ListHeaderComponent=
          {
            <View style={styles.contentPedidos}>
              <Text style={{fontSize:28, color:"#9fd236"}}>Pedidos</Text>
              <View style={{height:10}} />
            </View>
          }
          data={this.state.arrayPedidos}
          renderItem={ ({ item }) => this.visualizarPedidos(item) }
          horizontal={ false }
          keyExtractor={ (item ) => item.idPedido.toString() }
        />
    </Container>
    );
  }


 /**
   * Funcion que permite listar los pedidos
   */
  visualizarPedidos = (pedido) => 
  {
    return(
      <Card>
        <CardItem style={styles.cardItemPedido}>
          <Icon active name="ios-home" style={styles.iconoPedido} />
          <Text style={styles.textProductoPedido}>Unidad: </Text>
          <Text>{pedido.cliente.barrio}</Text>
        </CardItem>

        <CardItem style={styles.cardItemPedido}>
          <Icon active name="md-pin" style={styles.iconoPedido} />
          <Text>Direccion: {pedido.cliente.direccion}</Text>
        </CardItem>

        <CardItem style={styles.cardItemPedido}>
          <Icon active name="ios-phone-portrait" style={styles.iconoPedido} />
          <Text>Telefono: {pedido.cliente.telefono}</Text>
        </CardItem>

        <CardItem style={styles.cardItemPedido}>
          <Icon active name="logo-usd" style={styles.iconoPedido} />
          <Text>Valor Pedido: {pedido.valor}</Text>
        </CardItem>

        <CardItem>
          <TouchableOpacity style={styles.botonVerPedido} onPress={() => this.verProductosPedido(pedido)}>
            <Text style={styles.textVerPedido}>Ver Pedido</Text>
          </TouchableOpacity>
        </CardItem>
      </Card>
    )
  }



  /**
   * Funcion que permite almacenar en el storage los productos pedidos
   * y navegar hacia la pantalla de productos pedido
   */
  verProductosPedido = async (pedido) =>
  {
    //Se pasa por props del navigator, el pedido.
    this.props.navigation.navigate("ProductosPedido", pedido);
  }


  /**
   * Método que permite recagar la pantalla con los pedidos activos
   */
  refrescarPedidos = () =>
  {
    let pedidoTomado = this.props.route.params;

    if(undefined !== pedidoTomado)
    {
      let arrayPedidosActivo = this.state.arrayPedidos.filter(pedido => pedido.idPedido != pedidoTomado.idPedido);

      this.setState({arrayPedidos: arrayPedidosActivo});
    }
  }
}


export default Pedidos;