import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, Alert, AsyncStorage } from 'react-native';
import { Container, CardItem, Card, Icon } from "native-base";
import styles from './stylesTiendas';

import pedidoServices from "../../services/PedidoServices";


const ID_ESTADO_CANCELADO = 102;
const ID_ESTADO_DESPACHADO = 105;



class HistorialPedidos extends Component 
{
  
  constructor(props) 
  {
     super(props);

     this.state = 
     {
       cliente: "",
       arrayHistorialPedidos: []
     };
  }


  /**
   * Función que permite hacer una solicitud a un API REST
   */
  componentDidMount = async () =>
  {
    try
    {
      
      //Se valida si hay un cliente en el storage
      let cliente = await AsyncStorage.getItem("@cliente");
      
      this.setState({cliente: JSON.parse(cliente)});
      
      this.unsubscribe = this.props.navigation.addListener('focus', this.cargarHistorialPedidos);
      this.cargarHistorialPedidos();
    }
    catch(error)
    {
      //TODO: Guardar log del error en BD
      Alert.alert("Información", "En el momento, no es posible cargar el historial.");
    }
  }


  componentWillUnmount()
  {
    //TODO: Validar si el unsubscribe funcion o es mentira
    // console.log(this.unsubscribe);

    if(undefined !== this.unsubscribe)
    {
      this.unsubscribe();
    }
  }



  /**
   * Metodo que permite cargar todos los pedidos pendientes
   */
  cargarHistorialPedidos = async () =>
  {
    try
    {
      let {success, arrayHistorialPedidos} = await pedidoServices.getAllHistorialPedidos(this.state.cliente);

      // console.log(JSON.stringify(arrayHistorialPedidos));

      if (success) 
      {
        this.setState({ arrayHistorialPedidos });
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
              <Text style={{fontSize:28, color:"#9fd236"}}>Historial de Pedidos</Text>
              <View style={{height:10}} />
            </View>
          }
          data={this.state.arrayHistorialPedidos}
          renderItem={ ({ item }) => this.visualizarHistorialPedidos(item) }
          horizontal={ false }
          keyExtractor={ (item ) => item.idPedido.toString() }
        />
    </Container>
    );
  }


 /**
  * Funcion que permite listar los pedidos
  * @param pedido Pedido a visualizar
  */
  visualizarHistorialPedidos = (pedido) => 
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
          <Text>{pedido.idPedido}</Text>
        </CardItem>

        <CardItem>
          <TouchableOpacity style={styles.botonVerPedido} onPress={() => this.verProductosPedido(pedido)}>
            <Text style={styles.textVerPedido}>Ver Pedido</Text>
          </TouchableOpacity>

          {
            'tienda' === this.state.cliente.tipoCliente ?
            (
              <View style={{flexDirection:"row", marginLeft:20}}>
                <TouchableOpacity style={styles.botonVerPedido} onPress={() => this.actualizarEstadoPedido(pedido.idPedido, ID_ESTADO_DESPACHADO)}>
                  <Text style={styles.textVerPedido}>Despachado</Text>
                </TouchableOpacity>
                
                <View style={{width:5}} />
         
                <TouchableOpacity style={styles.botonCancelarPedido} onPress={() => this.actualizarEstadoPedido(pedido.idPedido, ID_ESTADO_CANCELADO)}>
                  <Text style={styles.textVerPedido}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )
            :
            (
              <View style={{flex: 1, flexDirection:"row-reverse"}}>
                <Text style={{color:"tomato", fontWeight:"bold"}}>En proceso</Text>
              </View>
            )
          }
        </CardItem>
      </Card>
    )
  }



  /**
   * Funcion que permite almacenar en el storage los productos pedidos y navegar hacia la pantalla de productos pedido
   * @param pedido Pedido seleccionado
   */
  verProductosPedido = async (pedido) =>
  {
    //Se pasa por props del navigator, el pedido.
    this.props.navigation.navigate("ProductosPedido", pedido);
  }



  /**
   * Funcion que permite actualizar el estado del pedido
   * @param idEstado Identifica el estado actualizar, DESPACHADO o CANCELADO
   */
  actualizarEstadoPedido = async (idPedido, idEstado) =>
  {
    try
    {
      let pedido =
      {
        idPedido,
        idEstado
      }

      let {success} = await pedidoServices.actualizarEstadoPedido(pedido);

      // console.log(JSON.stringify(arrayPedidos));

      if (success) 
      {
        let arrayHistorialPedidos = this.state.arrayHistorialPedidos.filter(pedidoHistorial => pedidoHistorial.idPedido !== idPedido);

        this.setState({ arrayHistorialPedidos });
      }
    }
    catch (error) 
    {
      //TODO: Guardar log del error en BD
      Alert.alert("Información", "En el momento, no es posible cargar los pedidos");
    }
  }
}






export default HistorialPedidos;