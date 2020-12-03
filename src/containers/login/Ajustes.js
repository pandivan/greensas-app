
import * as React from 'react'; 
import { Image, Text } from 'react-native'; 
import { Container, Content, Button, ListItem, Icon, Header, Left, Right, Body } from 'native-base';
import styles from './stylesLogin';
import ContextoAutenticacion from '../../../ContextoAutenticacion';



//Componente Funcional
function Ajustes()
{
  
  const { cerrarSesion } = React.useContext(ContextoAutenticacion);


  return (
    <Container>

      <Header style={styles.header}>
        <Left>
          <Image source={{ uri:"https://drive.google.com/uc?id=1tp7sy2gjRhMvSD0ka8rgANUA82t10ujQ"}} style={styles.logoApp} />
        </Left>
        <Right />
      </Header>

      <Content contentContainerStyle={styles.bodyAjustes}>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "tomato" }}>
              <Icon active name="ios-contact" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.labelItemRegistro}>Perfil</Text>
          </Body>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "tomato" }}>
              <Icon active name="ios-key" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.labelItemRegistro}>Cambiar Contraseña</Text>
          </Body>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "tomato" }} onPress={() => cerrarSesion()}>
              <Icon active name="ios-contact" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.labelItemRegistro}>Cerrar Sesión</Text>
          </Body>
        </ListItem>
      </Content>
      
    </Container>
  ); 
}


export default Ajustes;
