// Obtén el canvas y el contexto
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var joc = {
  contador: 0,
  objectes: []
};

// Variables para capturar el path del ratón
var path = [];
var seguirPath = false;

function inicialitzaJoc() {
  canvas.addEventListener("mousemove", capturarPath);
  canvas.addEventListener("mousedown", agafaObjecte);
  canvas.addEventListener("mouseup", deixaObjecte);

  generarObjecteAleatori();

  bucleJoc();
}

function generarObjecteAleatori() {
  var x, y, direccio;

  var costat = Math.floor(Math.random() * 4) + 1;
  if (costat === 1) {
    x = 0;
    y = Math.floor(Math.random() * canvas.height);
    direccio = { x: 1, y: 0 };
  } else if (costat === 2) {
    x = Math.floor(Math.random() * canvas.width);
    y = 0;
    direccio = { x: 0, y: 1 };
  } else if (costat === 3) {
    x = canvas.width;
    y = Math.floor(Math.random() * canvas.height);
    direccio = { x: -1, y: 0 };
  } else if (costat === 4) {
    x = Math.floor(Math.random() * canvas.width);
    y = canvas.height;
    direccio = { x: 0, y: -1 };
  }
<<<<<<< HEAD

  var objecte = { x: x, y: y, agafat: false, path: [], direccio: direccio };
  joc.objectes.push(objecte);
=======
  if (joc.objectes.length == 0) {
    var objecte = { x: x, y: y, agafat: false, path: [], direccio: direccio, id: id, number: num_airplanes};
    joc.objectes.push(objecte);
  }
  
>>>>>>> parent of 34d1173 (sasd)
}

function capturarPath(event) {
  if (seguirPath) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    path.push({ x: mouseX, y: mouseY });
  }
}

function agafaObjecte(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    for (var i = 0; i < joc.objectes.length; i++) {
      var objecte = joc.objectes[i];
      if (
        mouseX >= objecte.x &&
        mouseX <= objecte.x + 20 &&
        mouseY >= objecte.y &&
        mouseY <= objecte.y + 20
      ) {
        objecte.agafat = true;
        seguirPath = true;
        path = [{ x: mouseX, y: mouseY }];


        objecte.path = path;  //modifico

        break;
      }
    }
  
}

function deixaObjecte(event) {
  for (var i = 0; i < joc.objectes.length; i++) {
    var objecte = joc.objectes[i];
  //  if (objecte.agafat) {
      objecte.agafat = false;
      seguirPath = false;
//      objecte.path = path;
      break;
    }
 // }
}

function bucleJoc() {
  actualitzaJoc();
  dibuixaJoc();
  requestAnimationFrame(bucleJoc);
}

function actualitzaJoc() {
  for (var i = 0; i < joc.objectes.length; i++) {
    var objecte = joc.objectes[i];
    if (objecte.path.length > 0) {
      moureObjecte(objecte);
    } else {
      moureObjecteAleatori(objecte);
    }
  }
}

<<<<<<< HEAD
function moureObjecte(objecte) {
=======
async function moureObjecte(objecte) {
  var timestamp = new Date().getTime();
  if (timestamp % 10 == 0) {
    try {
      // Get the current position
      const currentPosition = {
          x: objecte.x,
          y: objecte.y,
          direction: objecte.direccio,
          id: id,
          number: num_airplanes
      };

      // Make an asynchronous POST request to the Flask route to update the position
      const response = await fetch('/handle_client', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentPosition)
      });

      const updatedPositionData = await response.json();

      // You can access the updated position properties like updatedPositionData.x, updatedPositionData.y, etc.
    } catch (error) {
        console.error('Error:', error);
    }
  }
>>>>>>> parent of 34d1173 (sasd)
  if (objecte.path.length > 0) {
    var desti = objecte.path[0];
    var velocitat = 2; // Velocidad de movimiento del objeto

    var dx = desti.x - objecte.x;
    var dy = desti.y - objecte.y;
    var distancia = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);

    var velocitatX = Math.cos(angle) * velocitat;
    var velocitatY = Math.sin(angle) * velocitat;

    if (distancia <= velocitat) {
      objecte.x = desti.x;
      objecte.y = desti.y;
      objecte.path.shift();
    } else {
      objecte.x += velocitatX;
      objecte.y += velocitatY;
    }
  } else {
    moureObjecteAleatori(objecte);
  }
}

<<<<<<< HEAD
function moureObjecteAleatori(objecte) {
=======
async function moureObjecteAleatori(objecte) {
  var timestamp = new Date().getTime();
  if (timestamp % 10 == 0) {
    try {
      // Get the current position
      const currentPosition = {
          x: objecte.x,
          y: objecte.y,
          direction: objecte.direccio,
          id: id,
          number: num_airplanes
      };

      // Make an asynchronous POST request to the Flask route to update the position
      const response = await fetch('/handle_client', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentPosition)
      });

      const updatedPositionData = await response.json();

      //Check if the airplane 
      for (user in updatedPositionData["Map"]["users"]) {
        console.log("Planes", user)
        for (airplane in user){
          if (airplane["id"] != id) {
            
            var objecte = { x: airplane["x"], y: airplane["y"], agafat: false, path: [], direccio: airplane["direction"], id: user["id"], number: airplane["number"]};
            joc.objectes.push(objecte);
          }
          if (airplane["id"] == id && airplane.number != num_airplanes) {
            var objecte = { x: airplane["x"], y: airplane["y"], agafat: false, path: [], direccio: airplane["direction"], id: user["id"], number: airplane["number"]};
            joc.objectes.push(objecte);
          }
        }
      }
      console.log(joc.objectes.length)

      // Process the updated position data
      console.log(updatedPositionData);
      // You can access the updated position properties like updatedPositionData.x, updatedPositionData.y, etc.
    } catch (error) {
        console.error('Error:', error);
    }
  }
>>>>>>> parent of 34d1173 (sasd)
  var velocitat = 2; // Velocidad de movimiento del objeto

  objecte.x += objecte.direccio.x * velocitat;
  objecte.y += objecte.direccio.y * velocitat;

  if (
    objecte.x < 0 ||
    objecte.x > canvas.width ||
    objecte.y < 0 ||
    objecte.y > canvas.height
  ) {
    joc.objectes = joc.objectes.filter(function (obj) {
      return obj !== objecte;
    });

    generarObjecteAleatori();
  }
  
}

function dibuixaJoc() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < joc.objectes.length; i++) {
    var objecte = joc.objectes[i];
    context.beginPath();
    context.rect(objecte.x, objecte.y, 20, 20);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
  }

  if (seguirPath) {
    context.beginPath();
    context.moveTo(path[0].x, path[0].y);
    for (var i = 1; i < path.length; i++) {
      context.lineTo(path[i].x, path[i].y);
    }
    context.strokeStyle = "blue";
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
  }
}

// Inicializamos el juego cuando la página se ha cargado completamente
window.addEventListener("load", inicialitzaJoc);

