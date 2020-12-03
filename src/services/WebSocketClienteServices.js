// var ws = new WebSocket("ws://192.168.1.8:7788/tiendas-websocket");

// // const saludo = () =>
// // {
// //   console.log("Saludo");
// // }

// export default ws;


// const connect = () => 
// {
//   ws.onopen = () => 
//   {
//     console.log("Conexion Abierta:::");
//     // connection opened
//     // ws.send('something'); // send a message
//   };
  
//   ws.onmessage = (e) => 
//   {
//     // a message was received
//     console.log("Mensaje Recibido del Servidor:::");
//     console.log(e.data);
//   };
  
//   ws.onerror = (e) => 
//   {
//     console.log("Ocurrio error:::");
//     console.log(e.message);
//     ws.close();
//   };
  
//   ws.onclose = (e) => 
//   {
//     console.log("Conexion cerrada:::");
//     console.log(e.code, e.reason);
//   };
// }

// const close = () =>
// {
//   ws.close();
// }


// const send = (mensajeCliente) =>
// {
//   ws.send(mensajeCliente);
// }


// export default 
// {
//   connect,
//   close,
//   send
// };



// class WebSocketClienteServices 
// {
//   constructor(url) 
//   {
//     console.log("Constructor del websocket");

//     this.url = url;
    
//     console.log("1");
//     this.client = new WebSocket(this.url);
//     console.log("2");
//     this.client.onmessage = this.onMessage;
    
//     this.client.onerror = (err) =>
//     {
//       console.log("Error conectando al servidor: " + err);
//     }

//     console.log("WebSocketClient inicializado!");
//   }

//   send(message) 
//   {
//     if (this.client && this.client.readyState === this.client.OPEN)
//     {
//       this.client.send(JSON.stringify(message));
//     }
//     else 
//     {
//       console.log("No puedo enviar el mensaje: ", message);
//     }
//   }


//   onMessage = (message) => 
//   {
//     const messagePayload = JSON.parse(message.data);
//     console.log("Mensaje recibido desde el servidor: ", messagePayload);

//     console.log("3::: " + this.onReceiveMessage);
//     if (this.onReceiveMessage) 
//     {
      
//       this.onReceiveMessage(messagePayload);
//     }
//   };

//   close = () => 
//   {
//     this.client.close();
//   };
// }


// const client = new WebSocketClienteServices("ws://192.168.1.8:7788/tiendas-websocket");

// export default client;


// import SockJS from "sockjs-client";
// import webstomp from 'webstomp-client';

// var stompClient = null;



// const connect = () =>
// {
//   try
//   {
//     // console.log("0");
//     var socket = new SockJS("http://192.168.1.8:7788/tiendas-websocket");
//     // console.log("1");
//     stompClient = webstomp.over(socket);
//     console.log("2");

//     stompClient.connect(
//       {}, 
//       function (frame) 
//       {
//           // console.log('Connected: ' + frame);
          
//           stompClient.subscribe('/topic/tiendas/pedido', function (mensajeServidor) 
//           {
//             console.log("subscribe...");
//             console.log(mensajeServidor);
//           });
//       },
//       error => 
//       {
//         console.log(error);
//         this.connected = false;
//       }
//     );
//     // console.log("1");
//   }
// 	catch(error)
//   {
//     console.log(`Error al conectar websocket: ${error}`);
//   }
// }




// const disconnect = () => 
// {
//   console.log("Disconnected");

//   if (stompClient !== null) 
//   {
//       stompClient.disconnect();
//   }
// }


// const enviarPedido = (pedido) => 
// {
//   console.log("enviarPedido--> " + pedido);
//   // console.log(JSON.stringify(pedido));
//   stompClient.send("/app/ws", {}, pedido);
// }




// export default 
// {
//     connect,
//     disconnect,
//     enviarPedido
// };