import { StyleSheet, Dimensions } from "react-native"; 

var {height, width } = Dimensions.get("window");

const stylesProductos = StyleSheet.create({
  swiperBanner:
  {
    height:width/2
  },
  contentProductos: 
  {
    backgroundColor: "#f2f2f2"
    ,flex:1
  },
  viewBanner:
  {
    height: (width/2)+5,
    width: width,
    alignItems: "center"
  },
  imageBanner: 
  {
    height: width/2,
    width: width-40,
    borderRadius: 10,
    marginHorizontal: 21,
    marginTop: 5
  },
  viewCategoriasProductos: 
  {
    backgroundColor: "white",
    borderRadius: 20, 
    paddingVertical: 20,
    width: width,
    flex:1
  },
  viewCategorias: 
  {
    backgroundColor: "red",
    borderTopLeftRadius:20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    width: width,
    flex:1
  },
  viewProductos: 
  {
    backgroundColor: "orange",
    borderBottomLeftRadius:20,
    borderBottomRightRadius: 20,
    paddingVertical: 20,
    width: width,
    flex:1
  },
  viewProducto: 
  {
    width: (width/2)-20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: "white"
  },
  imageCategoria:
  {
    width: 100,
    height: 80
  },
  textImageCategoria:
  {
    fontWeight: "bold",
    fontSize: 22
  },
  touchableCategoria:
  {
    margin: 5, 
    alignItems: "center",
    borderRadius: 10,
    padding: 10
  },
  imageProducto: 
  {
    width: ((width/2)-20)-10,
    height: ((width/2)-20)-30,
    position: "absolute",
    top: -45
  },
  textProductoNombre: 
  {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center"
  },
  textProductoValor: 
  {
    fontSize: 20,
    color: "green",
    marginBottom: 30
  },
  viewEspacioProducto: 
  {
    height: ((width/2)-20)-90, 
    width:((width/2)-20)-10
  },
  viewAdicionarEliminar:
  {
    width: (width/2)-40,
    backgroundColor: "#9fd236",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    padding: 4
  },
  textCantidadProducto:
  {
    fontSize: 18, 
    color: "white", 
    fontWeight: "bold"
  },
  viewPedido:
  {
    flex:1,
    alignItems: "center", 
    justifyContent: "center"
  },
  imageProductoPedido:
  {
    width:width/3,
    height:width/3
  },
  viewBotonesProductoPedido:
  {
    flex:1, 
    padding:10, 
    justifyContent:"space-between"
  },
  botonEnviarPedido:
  {
    backgroundColor:"#9fd236",
    width:width-40,
    alignItems:"center",
    padding:10,
    borderRadius:5
  },
  textEnviarPedido:
  {
    fontSize:24,
    fontWeight:"bold",
    color:"white"
  },
  viewProductoPedido:
  {
    width:width-20,
    margin:10, 
    flexDirection:"row", 
    borderBottomWidth:2, 
    borderColor:"#cccccc", 
    paddingBottom:10
  },
  textProductoPedido:
  {
    fontWeight:"bold", 
    fontSize:20
  },
  textValorProductoPedido:
  {
    fontWeight:"bold",
    color:"#9fd236",
    fontSize:20
  },
  textValorTotal:
  {
    fontSize: 28, 
    color: "#9fd236",
    textAlign: "center"
  }
});

export default stylesProductos;