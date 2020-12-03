// const BACKEND_URL = "https://api-rest-retail.herokuapp.com/api/cliente/barrio";
const BACKEND_URL = "http://192.168.1.8:7788/api/cliente/barrio";

import axios from "axios";




/**
 * Función que permite actualizar o registrar un nuevo cliente en BD
 * @param cliente, Cliente actualizar o registrar
 */
const registrarCliente = async (cliente) => 
{
  try
  {
    // console.log(JSON.stringify(cliente));
    let respuesta = await axios.post(`${BACKEND_URL}`, cliente);

    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), cliente: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    console.log(`Error al registrar: ${error}`);
    return { success: false };
  }
}



/**
 * Función que permite validar un cliente en BD, según login y password
 * @param cliente, Cliente a consultar
 */
const validarCliente = async (cliente) => 
{
  try
  {
    let respuesta = await axios.post(`${BACKEND_URL}/validar`, cliente);

    // console.log("Respuesta API-REST Consultar Cliente ");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), cliente: respuesta.data };
  }
  catch(error)
  {
    //TODO: Guardar log en BD
    console.log(`Error al validar: ${error}`);
    return { success: false };
  }
}


export default 
{
  registrarCliente,
  validarCliente
};