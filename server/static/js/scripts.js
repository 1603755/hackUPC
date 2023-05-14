// Obtén el canvas y el contexto

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var joc = {
  contador: 0,
  objectes: []
};

id = Math.floor(Math.random() * 1000000000);
num_airplanes = 0;
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
  var x, y, direction;
  x = 400
  y = 300
  direction = {x: Math.floor(Math.random() * 2) - 1, y: Math.floor(Math.random() * 2) - 1}
  var objecte = { x: x, y: y, agafat: false, path: [], direction: direction, id: id, number: num_airplanes};
  joc.objectes.push(objecte);
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
        mouseX <= objecte.x + 40 && //20
        mouseY >= objecte.y &&
        mouseY <= objecte.y + 40
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
  console.log("OBJECTES: ", joc.objectes)
  for (var i = 0; i < joc.objectes.length; i++) {
      var objecte = joc.objectes[i.toString()];
      if (objecte["id"] == id ){
        if (objecte["path"].length > 0) {
          moureObjecte(objecte);
        } else {
          moureObjecteAleatori(objecte);
        }
      }
  }
}
async function moureObjecte(objecte) {
  var timestamp = new Date().getTime();
  if (timestamp % 50 <= 5) {
    try {
      // Get the current position
      const data = {
        direction: {x: objecte["direction"]["x"], y: objecte["direction"]["y"]},
        x: objecte.x,
        y: objecte.y,
        id: id,
        number: num_airplanes
    };
    console.log("CURRENT POSITION: ", data)
    // Make an asynchronous POST request to the Flask route to update the position
    const response = await fetch('/handle_client', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const updatedPositionData = await response.json();
    var planes = []
    var i=0
    for (user in updatedPositionData["Map"]["users"]){
      var j=0
      for (plane in updatedPositionData["Map"]["users"][i.toString()]["planes"]){
        
        updatedPositionData["Map"]["users"][i.toString()]["planes"][j.toString()]["path"] = []
        updatedPositionData["Map"]["users"][i.toString()]["planes"][j.toString()]["agafat"]  = false
        
        planes.push(updatedPositionData["Map"]["users"][i.toString()]["planes"][j.toString()])
        j+=1
      }
      i+=1
    }
    console.log("PLANES BEFORE: ", joc.objectes)
    console.log("PLANES AFTER: ", planes)
    joc.objectes.forEach((plane) => {
      planes.forEach((new_plane) => {
        var i = 0
        if(new_plane.id == planes[i.toString()].id && new_plane.num_airplanes == planes[i.toString()].num_airplanes){
          new_plane["path"] = plane["path"]
          new_plane["agafat"]  = plane["agafat"] 
        }
        i+=1
      });
    });
    joc.objectes = []
    joc.objectes = planes

      // You can access the updated position properties like updatedPositionData.x, updatedPositionData.y, etc.
    } catch (error) {
        console.error('Error:', error);
    }
  }
  if (objecte.path.length > 0) {
    var desti = objecte.path[0];
    var velocitat = 2; 
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

async function moureObjecteAleatori(objecte) {
  var timestamp = new Date().getTime();
  if (timestamp % 50 <= 5) {
    try {
      // Get the current position
      console.log("OBJECTE: ", objecte)
      //objecte["direccio"] = {x: 1, y: 0}
      const data = {
          direction: {x: objecte["direction"]["x"], y: objecte["direction"]["y"]},
          x: objecte.x,
          y: objecte.y,
          id: id,
          number: num_airplanes
      };
      console.log("CURRENT POSITION: ", data)
      // Make an asynchronous POST request to the Flask route to update the position
      const response = await fetch('/handle_client', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      const updatedPositionData = await response.json();
      var planes = []
      var i=0
      for (user in updatedPositionData["Map"]["users"]){
        var j=0
        for (plane in updatedPositionData["Map"]["users"][i.toString()]["planes"]){
          
          updatedPositionData["Map"]["users"][i.toString()]["planes"][j.toString()]["path"] = []
          updatedPositionData["Map"]["users"][i.toString()]["planes"][j.toString()]["agafat"]  = false
          
          planes.push(updatedPositionData["Map"]["users"][i.toString()]["planes"][j.toString()])
          j+=1
        }
        i+=1
      }
      console.log("PLANES BEFORE: ", joc.objectes)
      console.log("PLANES AFTER: ", planes)
      joc.objectes.forEach((plane) => {
        planes.forEach((new_plane) => {
          var i = 0
          if(new_plane.id == planes[i.toString()].id && new_plane.num_airplanes == planes[i.toString()].num_airplanes){
            new_plane["path"] = plane["path"]
            new_plane["agafat"]  = plane["agafat"] 
          }
          i+=1
        });
      });
      joc.objectes = []
      joc.objectes = planes
      // You can access the updated position properties like updatedPositionData.x, updatedPositionData.y, etc.
    } catch (error) {
        console.error('Error:', error);
    }
  }
  var velocitat = 2; // Velocidad de movimiento del objeto

  objecte.x += objecte.direction.x * velocitat;
  objecte.y += objecte.direction.y * velocitat;

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
    context.fillStyle = "green";
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

