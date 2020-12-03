import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, AsyncStorage, Alert, SafeAreaView } from "react-native";
import { Container, Content, Left, Right } from "native-base";
//import AsyncStorage from "@react-native-community/async-storage"; instalar en el visual stuidio code
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import styles from './stylesProductos';
import productoServices from "../../services/ProductoServices";




class Productos extends Component 
{
  constructor(props) 
  {
    super(props);
    
    this.state = 
    {
      arrayBanner: 
      [
        "http://tutofox.com/foodapp//banner/banner-1.jpg",
        "http://tutofox.com/foodapp//banner/banner-2.jpg",
        "http://tutofox.com/foodapp//banner/banner-3.png"
      ],
      arrayCategorias: [],
      arrayProductos: [],
      idCategoria: ""
    };
  }


  /**
   * Función que permite hacer una solicitud a un API REST
   */
  componentDidMount()
  {
    // console.log("componentDidMount ");

    this.unsubscribe = this.props.navigation.addListener('focus', this.cargarProductosApiRest);
  }


  componentWillUnmount()
  {
    // console.log("desmontando...");
    if(undefined !== this.unsubscribe)
    {
      this.unsubscribe();
    }
  }



  /**
   * Metodo que permite cargar los productos desde el API-REST
   */
  cargarProductosApiRest = async () =>
  {
    try
    {
      let arrayproductosPedido = await AsyncStorage.getItem("@productosPedido");

      //Si no hay productos en el storage, entonces los cargo del api-rest
      if(null === arrayproductosPedido)
      {
        try
        {
          let {success, catalogo} = await productoServices.getAllCategoriasProductos();

          // console.log(JSON.stringify(catalogo));

          if (success) 
          {
            this.setState(
            {
              arrayCategorias: catalogo.lstCategorias,
              arrayProductos: catalogo.lstProductos,
            });
          }
        }
        catch (error) 
        {
          //TODO: Guardar log del error en BD
          Alert.alert("Información", "En el momento, no es posible cargar los productos.");
        } 
      }
      else
      {
        let arrayProductos = JSON.parse(arrayproductosPedido);

        this.setState(
        {
          arrayProductos
        });
      }
    }
    catch (error) 
    {
      //TODO: Guardar log del error en BD
      Alert.alert("Información", "En el momento, no es posible cargar los productos.");
    }
  }
  
  
  
  render() 
  {
    return (
      <View style={styles.contentProductos}>
       
        <View style={styles.viewBanner}>
          <Swiper style={styles.swiperBanner} showsButtons={false} autoplay={true} autoplayTimeout={4}>
          {
            this.state.arrayBanner.map((banner, index)=>
            {
              return( <Image style={styles.imageBanner} resizeMode="contain" source={{uri: banner}} key={index}/> )
            })
          }
          </Swiper>
          <View style={{height:20}	} />
        </View>

        <SafeAreaView style={styles.viewCategoriasProductos}> 
          <FlatList 
            ListHeaderComponent=
            {
              <FlatList
                data={this.state.arrayCategorias}
                renderItem={ ({ item }) => this.visualizarCategorias(item) }
                horizontal={ true }
                keyExtractor={ (item) => item.idCategoria.toString() }
              />
            }
            data={this.state.arrayProductos}
            renderItem={ ({ item }) => this.visualizarProductos(item) }
            numColumns={2}
            keyExtractor={ (item) => item.idProducto.toString() }
          />
        </SafeAreaView>
      </View>
    );
  }


  /**
   * Funcion que permite listar las categorias
   */
  visualizarCategorias = (categoria) => 
  {
    return(
      <TouchableOpacity style={ [styles.touchableCategoria, {backgroundColor:categoria.color}] } onPress={ () => this.setState( {idCategoria: categoria.idCategoria} ) }>
        <Image style={styles.imageCategoria} resizeMode="contain" source={{uri: categoria.urlImagenCategoria}} />
        <Text style={styles.textImageCategoria} >{categoria.nombre}</Text>
      </TouchableOpacity>
    )
  }


  /**
   * Funcion que permite listar los productos segun la categoria seleccionada
   */
  visualizarProductos = (producto) => 
  {
    //TODO: Pruebas cargando el array de 1000 productos en el state inicial y pintando con la estrategia de tutico fox

    // console.log(this.state.arrayProductos.length);
    let idCategoria = this.state.idCategoria;

    if("" === idCategoria || idCategoria === producto.categoriaNivel1)
    {
      return(
        <View style={styles.viewProducto}>
          <Image style={styles.imageProducto} resizeMode="contain" source={{uri: producto.urlImagenProducto}} />
          <View style={styles.viewEspacioProducto}/>
          <Text style={styles.textProductoNombre}>{producto.nombre}</Text>
          <Text style={styles.textProductoValor}>$ {producto.valor}</Text>

          <View style={styles.viewAdicionarEliminar}>
            <Left>
              <TouchableOpacity onPress={() => this.adicionarEliminarProducto(producto, false)}>
                <Icon name="ios-remove-circle" size={30} color={"white"} />
              </TouchableOpacity>
            </Left>
            <Text style={styles.textCantidadProducto}>{producto.cantidad} und</Text>
            <Right> 
                <TouchableOpacity onPress={() => this.adicionarEliminarProducto(producto, true)}>
                  <Icon name="ios-add-circle" size={30} color={"white"} />
                </TouchableOpacity>
            </Right>
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
    let arrayProductos = this.state.arrayProductos;

    producto.isSeleccionado = true;

    if(isAdicionar)
    {
      producto.cantidad += 1;
    }
    else
    {
      if(0 === producto.cantidad)
      {
        producto.isSeleccionado = false;
      }
      else
      {
        producto.cantidad -= 1;
      }
    }

    //Se guarda el producto en el carrito de compras cuando la cantidad pedida es mayor a cero
    if(producto.cantidad >= 0)
    {
      //Se actualiza la nueva cantidad solicitada
      this.setState({arrayProductos});

      try 
      {
        await AsyncStorage.setItem("@productosPedido", JSON.stringify(arrayProductos));
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD
        Alert.alert("Información", "En el momento, no es posible adicionar productos.");
      }
    }
  }
}


export default Productos;