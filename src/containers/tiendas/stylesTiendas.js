import { StyleSheet, Dimensions } from "react-native"; 

var {height, width } = Dimensions.get("window");

const stylesTiendas = StyleSheet.create(
{
  contentPedidos:
  {
    backgroundColor: "#f2f2f2",
    padding: 10
  },
  cardItemPedido:
  {
    height: 30
  },
  botonVerPedido:
  {
    backgroundColor: "#9fd236",
    width: width/3.6,
    alignItems: "center",
    padding: 6,
    borderRadius: 5
  },
  botonCancelarPedido:
  {
    backgroundColor: "red",
    width: width/3.6,
    alignItems: "center",
    padding: 6,
    borderRadius: 5
  },
  textVerPedido:
  {
    fontWeight:"bold",
    color: "white"
  },
  iconoPedido:
  {
    color: "orange", 
    fontSize: 24
  },
  viewPedido:
  {
    flex:1,
    alignItems: "center", 
    justifyContent: "center"
  },
  textValorTotal:
  {
    fontSize: 28, 
    color: "#9fd236",
    textAlign: "center"
  },
  botonTomarPedido:
  {
    backgroundColor:"#9fd236",
    width:width-40,
    alignItems:"center",
    padding:10,
    borderRadius:5
  },
  textTomarPedido:
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
  }
});

export default stylesTiendas;