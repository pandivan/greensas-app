// const BACKEND_URL = "https://api-rest-retail.herokuapp.com/api/productos";
const BACKEND_URL = "http://192.168.1.8:7788/api/productos";

import axios from "axios";




/**
 * Función que permite obtener todas las categorias con sus respectivos productos
 */
const getAllCategoriasProductos = async () => 
{
  try
  {
    // console.log(JSON.stringify(pedido));
    let respuesta = await axios.get(`${BACKEND_URL}`);

    // console.log("Respuesta API-REST Productos. ");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), catalogo: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    console.log(`Error al registrar: ${error}`);
    return { success: false};
  }
}


export default 
{
  getAllCategoriasProductos
};