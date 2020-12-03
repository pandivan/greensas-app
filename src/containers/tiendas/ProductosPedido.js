import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, Alert, AsyncStorage } from "react-native";
import styles from './stylesTiendas';


import pedidoServices from "../../services/PedidoServices";


class ProductosPedido extends Component 
{

  constructor(props) 
  {
    super(props);
    
    this.state = 
    {
      cliente: "",
      pedido: ""
    };
  }



  /**
   * Función que se llama antes de renderizar el componente
   */
  componentDidMount = async () =>
  {
    try
    {
      //Se valida si hay un cliente en el storage
      let cliente = await AsyncStorage.getItem("@cliente");

      this.setState({cliente: JSON.parse(cliente)});

      this.unsubscribe = this.props.navigation.addListener('focus', this.cargarProductosPedido);

      this.cargarProductosPedido();
    }
    catch(error)
    {
      //TODO: Guardar log del error en BD
      Alert.alert("Información", "En el momento, no es posible cargar los productos del pedido");
    }
  }


  componentWillUnmount()
  {
    //TODO: Validar si el unsubscribe funcion o es mentira
    if(undefined !== this.unsubscribe)
    {
      this.unsubscribe();
    }
  }


  /**
   * Metodo que permite cargar el pedido con sus productos
   */
  cargarProductosPedido = async () =>
  {
    try
    {
      //Se obtiene el pedido desde el navigator de historial-pedidos
      let pedido = this.props.route.params;

      if(null !== pedido) 
      {
        this.setState({ pedido });
      }
      else
      {
        this.setState({ pedido: "" });
      }
    }
    catch(error)
    {
      //TODO: Guardar log del error en BD
      Alert.alert("Información", "En el momento, no es posible cargar los productos del pedido");
    }
  }


  render() 
  {
    return (      
      <View style={styles.viewPedido}>
        <View style={{height:20}} />

        <FlatList 
          data={this.state.pedido.lstProductosPedido}
          renderItem={ ({ item }) => this.visualizarProductoPedido(item) }
          keyExtractor={ (item) => item.idProductoPedido.toString() }
        />

        <View style={{height: 20}} />

        <Text style={styles.textValorTotal}>$ {this.calcularTotalPedido()}</Text>

        <View style={{height: 10}} />

        {
          ('tienda' === this.state.cliente.tipoCliente && 101 !== this.state.pedido.idEstado) ? 
          (
            <TouchableOpacity style={styles.botonTomarPedido} onPress={this.tomarPedido}>
              <Text style={styles.textTomarPedido}>TOMAR PEDIDO</Text>
            </TouchableOpacity>
          )
          :
          null
        }
        

        <View style={{height:20}} />
      </View>
    );
  }



  /**
   * Funcion que permite listar los productos seleccionados del pedido
   */
  visualizarProductoPedido = (productoPedido) => 
  {
    return(
      <View style={styles.viewProductoPedido}>
        <Image resizeMode={"contain"} style={styles.imageProductoPedido} source={{uri: productoPedido.producto.urlImagenProducto}} />

        <View style={styles.viewBotonesProductoPedido}>
          <View>
            <Text style={styles.textProductoPedido}>{productoPedido.producto.nombre}</Text>
            <Text>Descripcion de producto</Text>
          </View>

          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={styles.textValorProductoPedido}>${productoPedido.valor * productoPedido.cantidad}</Text>
          </View>
        </View>
      </View>
    )
  }




  /**
   * Funcion que permite calcular el total del pedido
   */
  calcularTotalPedido()
  {
    let totalPedido = 0;

    if(undefined != this.state.pedido.lstProductosPedido)
    {
      this.state.pedido.lstProductosPedido.forEach((productoPedido)=>
      {
        totalPedido += productoPedido.valor * productoPedido.cantidad
      })
    }

    return totalPedido;
  }


  /**
   * Función que le permite a una tienda tomar el pedido
   */
  tomarPedido = async () =>
  {
    try
    {
      let pedidoAceptado =
      {
        idPedido: this.state.pedido.idPedido,
        idTienda: this.state.cliente.idCliente
      }

      let {success} = await pedidoServices.actualizarPedido(pedidoAceptado);

      if (success) 
      {
        Alert.alert("Información", "Pedido confirmado, favor validar su historial.");
      }
      else
      {
        Alert.alert("Información", "El pedido ya fue tomado por otra tienda.");
      }
      
      this.props.navigation.navigate("Pedidos", this.state.pedido);
    }
    catch (error) 
    {
      //TODO: Guardar log del error en BD
      Alert.alert("Información", "En el momento, no es posible cargar los pedidos");
    }
  }
}


export default ProductosPedido;