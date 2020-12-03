import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Left, Body, Text, Right } from 'native-base';
var {height, width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";


const data = {
  sizeMenuIcon: 28,
  sizeInputIcon: 20,
  primaryAppColor: '#07697a',
  secondAppColor: '#00d2b3',
};

//<Row style={{ backgroundColor: 'black', width: 20 }} />
const PruebasRapidas = () => {
  return (
    <Container>
        <Header />
        <Content contentContainerStyle={styles.contentPedidos}>
        <Text style={{fontSize:28, color:"#9fd236"}}>Pedidos</Text>

        <Card >
          <CardItem style={{height:10}}>
            <Icon active name="logo-googleplus" style={{ color: 'red'}} />
            <Text>Unidad: Entreparques</Text>
          </CardItem>

          <CardItem style={{height:10}}>
            <Icon active name="logo-googleplus" style={{ color: 'red'}} />
            <Text>Unidad: Entreparques</Text>
          </CardItem>

        </Card>

        
          
      </Content>
      </Container>
  );
};

//<Icon ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'red'}}/>
//<Icon type="FontAwesome" name="home" />

const styles = StyleSheet.create({
logo:
{
    width: 120,
    height: 180
  },
  textDescripcionProducto:
  {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 7
  },
  textValorProducto:
  {
    fontWeight: "bold",
    color: 'red',
    fontSize: 20
  },
  container:
  {
     width: 210,
     //height: 50
  },
  cardItemAddProducto:
  {
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 7,
    height: 45
  },
  cardItemAddProductoCenter:
  {
    alignItems: 'center',
    justifyContent: 'center'
  }

});


export default PruebasRapidas;
