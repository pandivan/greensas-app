
import * as React from 'react'; 
import { Image, Text } from 'react-native'; 
import { Container, Content, Button, Item, Input, Header, Form, Left, Right, Label, ListItem, CheckBox, Body } from 'native-base';
import styles from './stylesLogin';
import ContextoAutenticacion from '../../../ContextoAutenticacion';



//Componente Funcional
function Login({navigation})
{
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isMostrar, setIsMostrar] = React.useState(false);
  
  const { iniciarSesion } = React.useContext(ContextoAutenticacion);
  

  return (
    <Container>

      <Header style={styles.header}>
        <Left>
          <Image source={{ uri:"https://drive.google.com/uc?id=1tp7sy2gjRhMvSD0ka8rgANUA82t10ujQ"}} style={styles.logoApp} />
        </Left>
        <Right />
      </Header>

      <Content contentContainerStyle={styles.body} enableOnAndroid={true} extraScrollHeight={120}>
        <Form style={styles.form}>
          <Item floatingLabel last style={styles.field}>
              <Label style={styles.text}>Email o número de teléfono</Label>
              <Input style={styles.input} value={login} onChangeText={setLogin}/>
          </Item>
          <Item floatingLabel last style={styles.field}>
            <Label style={styles.text}>Contraseña</Label> 
            <Input style={styles.input}  value={password} onChangeText={setPassword} secureTextEntry={isMostrar}/>
          </Item>

          <Button bordered style={styles.buttonLogin} onPress={() => iniciarSesion({ telefono: login, email: login, password })}>
            <Text style={styles.text}>Iniciar Sesión</Text>
          </Button>

          <Label style={styles.textSuscripcion} onPress={() => navigation.navigate('Registro')}>Primera vez en Pollo Sorpresa? Suscribete ya.</Label>
        </Form>
      </Content>
      
    </Container>
  ); 
}



export default Login;

// <Label style={styles.textSuscripcion} onPress={() => this.setState({isMostrar: !this.state.isMostrar})}>Primera vez en mi Tienda? Suscribete ya.</Label>

// isMostrar = () => 
//   {
//     if(this.state.isMostrar)
//     {
//       this.setState({isMostrar: false})
//     }
//     else
//     {
//       this.setState({isMostrar: true})
//     }
//   };

// const onPressTitle = () => 
// {
//   Alert.alert("title pressed");
// };


