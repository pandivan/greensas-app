import * as React from "react"; 
import { Image, Text } from "react-native"; 
import { Container, Content, Button, Item, Input, Form, Label, DatePicker, Right, Left, Radio } from "native-base";
import styles from "./stylesLogin";
import ContextoAutenticacion from "../../../ContextoAutenticacion";


console.disableYellowBox=true;

//Componente Funcional
function Registro()
{
  const [email, setEmail] = React.useState("e");
  const [telefono, setTelefono] = React.useState("t");
  const [nombre, setNombre] = React.useState("n");
  const [password, setPassword] = React.useState("p");
  const [direccion, setDireccion] = React.useState("d");
  const [barrio, setBarrio] = React.useState("b");
  const [fechaNacimiento, setFechaNacimiento] = React.useState("");
  const [sexo, setSexo] = React.useState("M");
  const [isMostrar, setIsMostrar] = React.useState(false);
  const [idBarrio, setIdBarrio] = React.useState(1);
  const [tipoCliente, setTipoCliente] = React.useState("cliente");

  
  const { registrarse } = React.useContext(ContextoAutenticacion);
  

  return (
    <Container>

      <Content>

        <Image source={{ uri:"https://drive.google.com/uc?id=1tp7sy2gjRhMvSD0ka8rgANUA82t10ujQ"}} style={styles.logoApp} />

        <Form style={styles.form}>
          <Label style={styles.textRegistro}>Crea tu cuenta.</Label>

          <Item floatingLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItemRegistro}>Email</Label>
            <Input value={email} onChangeText={setEmail}/>
          </Item>
          <Item floatingLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItemRegistro}>Número de teléfono</Label>
            <Input value={telefono} onChangeText={setTelefono}/>
          </Item>
          <Item floatingLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItemRegistro}>Nombre completo</Label>
            <Input value={nombre} onChangeText={setNombre}/>
          </Item>
          <Item floatingLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItemRegistro}>Contraseña nueva</Label>
            <Input value={password} onChangeText={setPassword} secureTextEntry={isMostrar}/>
          </Item>
          <Item floatingLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItemRegistro}>Dirección</Label>
            <Input value={direccion} onChangeText={setDireccion}/>
          </Item>
          <Item floatingLabel regular style={styles.itemRegistro}>
            <Label style={styles.labelItemRegistro}>Barrio</Label>
            <Input value={barrio} onChangeText={setBarrio}/>
          </Item>
          <Item regular style={styles.itemRegistro}>
            <DatePicker
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"spinner"}
              placeHolderText="Fecha cumpleaños"
              placeHolderTextStyle={styles.labelItemRegistro}
              onDateChange={setFechaNacimiento}
              disabled={false}
            />
          </Item>
          <Item regular style={styles.itemRegistro}>
            <Left>
              <Label style={styles.labelItemRegistro}>Sexo</Label>
            </Left>
            <Right style={styles.labelItemRegistro}>
              <Label style={styles.labelItemRegistro}>Hombre</Label>
              <Radio selected={sexo === "M" ? true : false} onPress={() => setSexo("M")} selectedColor={"#5cb85c"} />
            </Right>
            <Right style={styles.labelItemRegistro}>
              <Label style={styles.labelItemRegistro}>Mujer</Label>
              <Radio selected={sexo === "F" ? true : false} onPress={() => setSexo("F")} selectedColor={"#5cb85c"} />
            </Right>
          </Item>
        
          <Button danger style={styles.buttonRegistro} onPress={() => registrarse({ email, telefono, nombre, password, direccion, barrio, fechaNacimiento, sexo, idBarrio, tipoCliente })}>
            <Text>Continuar</Text>
          </Button>
        </Form>
      </Content>
      
    </Container>
  );
}


export default Registro;