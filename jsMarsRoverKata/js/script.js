const cardinalPoints = ["North", "South", "East","West"];
var theSafeZone = [
  [{x: 0, y: 0},{x: 1, y: 0},{x:2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x:5, y: 0},{x: 6, y: 0},{x: 7, y: 0},{x:8, y: 0},{x:9, y: 0}],
  [{x: 0, y: 1},{x: 1, y: 1},{x:2, y: 1},{x: 3, y: 1},{x: 4, y: 1},{x:5, y: 1},{x: 6, y: 1},{x: 7, y: 1},{x:8, y: 1},{x:9, y: 1}],
  [{x: 0, y: 2},{x: 1, y: 2},{x:2, y: 2},{x: 3, y: 2},{x: 4, y: 2},{x:5, y: 2},{x: 6, y: 2},{x: 7, y: 2},{x:8, y: 2},{x:9, y: 2}],
  [{x: 0, y: 3},{x: 1, y: 3},{x:2, y: 3},{x: 3, y: 3},{x: 4, y: 3},{x:5, y: 3},{x: 6, y: 3},{x: 7, y: 3},{x:8, y: 3},{x:9, y: 3}],
  [{x: 0, y: 4},{x: 1, y: 4},{x:2, y: 4},{x: 3, y: 4},{x: 4, y: 4},{x:5, y: 4},{x: 6, y: 4},{x: 7, y: 4},{x:8, y: 4},{x:9, y: 4}],
  [{x: 0, y: 5},{x: 1, y: 5},{x:2, y: 5},{x: 3, y: 5},{x: 4, y: 5},{x:5, y: 5},{x: 6, y: 5},{x: 7, y: 5},{x:8, y: 5},{x:9, y: 5}],
  [{x: 0, y: 6},{x: 1, y: 6},{x:2, y: 6},{x: 3, y: 6},{x: 4, y: 6},{x:5, y: 6},{x: 6, y: 6},{x: 7, y: 6},{x:8, y: 6},{x:9, y: 6}],
  [{x: 0, y: 7},{x: 1, y: 7},{x:2, y: 7},{x: 3, y: 7},{x: 4, y: 7},{x:5, y: 7},{x: 6, y: 7},{x: 7, y: 7},{x:8, y: 7},{x:9, y: 7}],
  [{x: 0, y: 8},{x: 1, y: 8},{x:2, y: 8},{x: 3, y: 8},{x: 4, y: 8},{x:5, y: 8},{x: 6, y: 8},{x: 7, y: 8},{x:8, y: 8},{x:9, y: 8}],
  [{x: 0, y: 9},{x: 1, y: 9},{x:2, y: 9},{x: 3, y: 9},{x: 4, y: 9},{x:5, y: 9},{x: 6, y: 9},{x: 7, y: 9},{x:8, y: 9},{x:9, y: 9}],
];
var xy = 1, xx = 0, yy = 0, yx = 1;
var rover = {
  name: "Curiosity",
  x: theSafeZone[xy][xx].x,
  y: theSafeZone[yy][yx].y,
  direction: cardinalPoints[0],
  path: [{x: 0, y: 0}],
  travelLog: function(){
    for(var i = 0; i < this.path.length; i++){
      console.log(this.path[i]);
    }
  }
};
var obstacle = {
  name: "rock",
  x: theSafeZone[xy][xx].x,
  y: theSafeZone[yy][yx].y,
  path: [],
  travelLog: function(){
    for(var i=0; i < this.path.length; i++){
      console.log(this.path[i]);
    }
  }
}
var goal = {
  name: "prize",
  x: theSafeZone[xy][xx].x,
  y: theSafeZone[yy][yx].y,
  path: []
}
let ordersInput = document.querySelector('#ordersInput');
let numberInput = document.querySelector('#numberInput');

var table = document.getElementById('table');
var checkedBox = table.children[0].children[rover.y].children[rover.x];
checkedBox.id = 'checkedBoxN';

function turnLeft(machine) {
  switch (machine.direction){
    case "North":
      rover.direction = cardinalPoints[3];
      checkedBox.id = 'checkedBoxW';
      break;
    case "South":
      rover.direction = cardinalPoints[2];
      checkedBox.id = 'checkedBoxE';
      break;
    case "East":
      rover.direction = cardinalPoints[0];
      checkedBox.id = 'checkedBoxN';
      break;
    case "West":
      rover.direction = cardinalPoints[1];
      checkedBox.id = 'checkedBoxS';
      break;
  }
  
  console.log(`${machine.name} turns left - New direction is ${machine.direction}`);
  return this.direction;
}

function turnRight(machine){
  switch (machine.direction){
    case "North":
      rover.direction = cardinalPoints[2];
      checkedBox.id = 'checkedBoxE';
      break;
    case "South":
      rover.direction = cardinalPoints[3];
      checkedBox.id = 'checkedBoxW';
      break;
    case "East":
      rover.direction = cardinalPoints[1];
      checkedBox.id = 'checkedBoxS';
      break;
    case "West":
      rover.direction = cardinalPoints[0];
      checkedBox.id = 'checkedBoxN';
      break;
  }
  console.log(`${machine.name} turns right - New direction is ${machine.direction}`);
  return this.direction;
}

function moveForward(machine){
  var outOfZone = "Impossible to continue";
  var posInfoMF = `${machine.name} moves forward. Now it's in position: (${machine.x}, ${machine.y})`;
  function info(machine){
    console.log(posInfoMF);
  }
  function resume(machine){
    console.log(`${machine.name} position is: x=${machine.x}, y=${machine.y}`);
  }
  let newPosition = [{x: machine.x, y: machine.y}];
  switch(machine.direction){
        case "North":
      if(yy > 0 && yy <= theSafeZone.length-1 && table.children[0].children[machine.y-1].children[machine.x].id != "blockedBox"){
        yy--;
        machine.y = theSafeZone[yy][yx].y,
        rover.x = machine.x, rover.y = machine.y;
        newPosition = {x: rover.x, y: rover.y};
        rover.path.push(newPosition);
        checkedBox.id = 'checkedBoxWhite';
        checkedBox = table.children[0].children[machine.y].children[machine.x];
        checkedBox.id = 'checkedBoxN';
        if(rover.x == goal.x && rover.y == goal.y){
          console.warn("Congrats, you win!!!"); 
        }
        return info(machine);
      }else{
        console.warn(outOfZone);
      }
      break;
    case "South":
      if(yy >= 0 && yy < theSafeZone.length-1 && table.children[0].children[machine.y+1].children[machine.x].id != "blockedBox"){
        yy++;
        machine.y = theSafeZone[yy][yx].y,
        rover.x = machine.x, rover.y = machine.y;
        newPosition = {x: rover.x, y: rover.y};
        rover.path.push(newPosition);
        checkedBox.id = 'checkedBoxWhite';
        checkedBox = table.children[0].children[machine.y].children[machine.x];
        checkedBox.id = 'checkedBoxS';
        if(rover.x == goal.x && rover.y == goal.y){
          console.warn("Congrats, you win!!!");  
        }
        return info(machine);
      }else{
        console.warn(outOfZone);  
      }
      break;
    case "East":
      if(xx >= 0 && xx < theSafeZone.length-1 && table.children[0].children[machine.y].children[machine.x+1].id != "blockedBox") {
        xx++;
        machine.x = theSafeZone[xy][xx].x;
        rover.x = machine.x, rover.y = machine.y;
        newPosition = {x: rover.x, y: rover.y};
        rover.path.push(newPosition);
        checkedBox.id = 'checkedBoxWhite';
        checkedBox = table.children[0].children[machine.y].children[machine.x];
        checkedBox.id = 'checkedBoxE';
        if(rover.x == goal.x && rover.y == goal.y){
          console.warn("Congrats, you win!!!"); 
        }
        return info(machine);
      }else{
        console.warn(outOfZone);  
      }
      break;
      case "West":
        if(xx > 0 && xx <= theSafeZone.length-1 && table.children[0].children[machine.y].children[machine.x-1].id != "blockedBox") {
        xx--;
        machine.x = theSafeZone[xy][xx].x;
        rover.x = machine.x, rover.y = machine.y;
        newPosition = {x: rover.x, y: rover.y};
        rover.path.push(newPosition);
        checkedBox.id = 'checkedBoxWhite';
        checkedBox = table.children[0].children[machine.y].children[machine.x];
        checkedBox.id = 'checkedBoxW';
          if(rover.x == goal.x && rover.y == goal.y){
            console.warn("Congrats, you win!!!"); 
        }
        return info(machine);
      }else{
        console.warn(outOfZone);
      }
      break;
  }
  for(let i = 0; i < rover.path.length; i++){
    console.log(`Path ${i} ==> x = ${machine.path[i].x}, y = ${machine.path[i].y}`);
  }
  return resume(machine);
}

function moveBackward(machine){
  var outOfZone = "Impossible to continue";
  var posInfoMF = `${machine.name} moves forward. Now it's in position: (${machine.x}, ${machine.y}) `;
  function info(machine){
    console.log(posInfoMF);
  }
  function resume(machine){
    console.log(`${machine.name} position is: x=${machine.x}, y=${machine.y}`);
  }
  let newPosition = [{x: machine.x, y: machine.y}];
  switch(machine.direction){
      case "North":
        if(yy >= 0 && yy < theSafeZone.length-1 && table.children[0].children[machine.y+1].children[machine.x].id != "blockedBox"){
        yy++;
        machine.y = theSafeZone[yy][yx].y,
        rover.x = machine.x, rover.y = machine.y;
        newPosition = {x: rover.x, y: rover.y};
        rover.path.push(newPosition);
        checkedBox.id = 'checkedBoxWhite';
        checkedBox = table.children[0].children[machine.y].children[machine.x];
        checkedBox.id = 'checkedBoxN';
        if(rover.x == goal.x && rover.y == goal.y){
          console.warn("Congrats, you win!!!");  
        }
        return info(machine);
      }else{
        console.warn(outOfZone);  
      }
      break;
      case "South":
        if(yy > 0 && yy <= theSafeZone.length-1 && table.children[0].children[machine.y-1].children[machine.x].id != "blockedBox") {
        yy--;
        machine.y = theSafeZone[yy][yx].y,
        rover.x = machine.x, rover.y = machine.y;
        newPosition = {x: rover.x, y: rover.y};
        rover.path.push(newPosition);
        checkedBox.id = 'checkedBoxWhite';
        checkedBox = table.children[0].children[machine.y].children[machine.x];
        checkedBox.id = 'checkedBoxS';
        if(rover.x == goal.x && rover.y == goal.y){
          console.warn("Congrats, you win!!!");  
        }
        return info(machine);
      }else{
        console.warn(outOfZone);
      }
      break;
      case "East":
      if(xx > 0 && xx <= theSafeZone.length-1 && table.children[0].children[machine.y].children[machine.x-1].id != "blockedBox") {
        xx--;
        machine.x = theSafeZone[xy][xx].x;
        rover.x = machine.x, rover.y = machine.y;
        newPosition = {x: rover.x, y: rover.y};
        rover.path.push(newPosition);
        checkedBox.id = 'checkedBoxWhite';
        checkedBox = table.children[0].children[machine.y].children[machine.x];
        checkedBox.id = 'checkedBoxE';
        if(rover.x == goal.x && rover.y == goal.y){
          console.warn("Congrats, you win!!!"); 
        }
        return info(machine);
      }else{
        console.warn(outOfZone);
      }
      break;
    case "West":
      if(xx >= 0 && xx < theSafeZone.length-1 && table.children[0].children[machine.y].children[machine.x+1].id != "blockedBox"){
        xx++;
        machine.x = theSafeZone[xy][xx].x;
        rover.x = machine.x, rover.y = machine.y;
        newPosition = {x: rover.x, y: rover.y};
        rover.path.push(newPosition);
        checkedBox.id = 'checkedBoxWhite';
        checkedBox = table.children[0].children[machine.y].children[machine.x];
        checkedBox.id = 'checkedBoxW';
        if(rover.x == goal.x && rover.y == goal.y){
         console.warn("Congrats, you win!!!");  
        }
        return info(machine);
      }else{
        console.warn(outOfZone);  
      }
      break;
  }
  for(let i = 0; i < rover.path.length; i++){
    console.log(`Path ${i} ==> x = ${machine.path[i].x}, y = ${machine.path[i].y}`);
  }
  return resume(machine);
}

function command(machine, orders){
  if(!machine || !orders){
    console.log("Please provide a machine, an order and number of repeats");
    return;
  }
  for( var i = 0; i < orders.length; i++){
    var replay = orders[i];
    switch(replay){
      case 'l':
        turnLeft(machine);
        break;
      case 'r':
        turnRight(machine);
        break;
      case 'f':
        moveForward(machine);
        break;
      case 'b':
        moveBackward(machine);
        break;
    }
  }
  machine.travelLog();
}

function obbeyOnClick(){
  command(rover, ordersInput.value);
}

function createObstacles(number){
  let newObstacle;
  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  for(var i = 0; i < number; i++){
    obstacle.y = theSafeZone[getRandomArbitrary(0,9)][yx].y;
    obstacle.x = theSafeZone[xy][getRandomArbitrary(0,9)].x;
    newObstacle = [{x: obstacle.x, y: obstacle.y}];
    var blockedBox = table.children[0].children[obstacle.y].children[obstacle.x];
    blockedBox.id = 'blockedBox';
    obstacle.path.push(newObstacle);
  }
  obstacle.travelLog();
  createGoal();
  console.log(goal.path);
}

function createGoal(){
  let newGoal;
  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  goal.y = theSafeZone[getRandomArbitrary(1,9)][yx].y;
  goal.x = theSafeZone[xy][getRandomArbitrary(1,9)].x;
  newGoal = [{x: goal.x, y: goal.y}];
  var prizedBox = table.children[0].children[goal.y].children[goal.x];
  prizedBox.id = 'prizedBox';
  goal.path.push(newGoal);
}

function addOnClick(){
  createObstacles(numberInput.value);
}

/*
function createObstacles(obstacle){
  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  obstacle.y = theSafeZone[getRandomArbitrary(0,9)][yx].y;
  obstacle.x = theSafeZone[xy][getRandomArbitrary(0,9)].x;
  var blockedBox = table.children[0].children[obstacle.y].children[obstacle.x];
  blockedBox.id = 'blockedBox';
}
*/