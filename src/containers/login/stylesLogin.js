import { StyleSheet } from "react-native"; 

const stylesLogin = StyleSheet.create({
  logoApp:
  {
    width: 95,
    height: 90,
    resizeMode: "contain"
  },
  header:
  {
    height: 80,
    backgroundColor: "black"
  },
  form:
  {
    padding: 25
  },
  body: 
  {
    flex : 1,
    justifyContent : "center",
    backgroundColor: "black"
  },
  bodyAjustes: 
  {
    marginTop: 40,
    justifyContent : "center"
  },
  field: 
  {
    alignItems: "center",
    backgroundColor: "dimgray",
    height: 65,
    borderColor: "dimgray",
    borderRadius: 7
  },
  buttonLogin: 
  {
    marginTop: 40,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 7
  },
  text: 
  {
    fontSize: 17,
    color: "white",
    alignItems: "center",
    fontWeight: "bold",
  },
  textSuscripcion: 
  {
    marginTop: 80,
    fontSize: 17,
    color: "white",
    alignItems: "center"
  },
  input: 
  {
    fontSize: 20,
    color: "white"
  },
  itemRegistro: 
  {
    marginLeft: 0,
    height: 60,
    marginTop: 12
  },
  labelItemRegistro:
  {
    alignItems: "center",
    color: "gray"
  },
  buttonRegistro: 
  {
    marginTop: 40,
    backgroundColor: 'red',
    justifyContent : 'center'
  },
  textRegistro: 
  {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    alignItems: 'center',
    fontWeight: "bold"
  }
});

export default stylesLogin;