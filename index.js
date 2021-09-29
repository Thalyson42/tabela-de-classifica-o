var players = [];
var ids = 0;

function addPlayer() {
  const playerName = document.getElementById("playerName");
  const photoUrl = document.getElementById("photoUrl");

  const name = playerName.value;
  const photo = photoUrl.value;

  const player = {
    id: ids,
    name: name,
    photo: photo,
    win: 0,
    tie: 0,
    loses: 0,
    points: 0
  };

  players.push(player);
  playerName.value = "";
  photoUrl.value = "";
  ids++;
  addPlayerTable(player);
}

function addPlayerTable(player) {
  const tableBody = document.getElementById("tableBody");
  const elementTable = document.createElement("tr");

  elementTable.id = player.id;
  elementTable.className = "";

  elementTable.innerHTML +=
    "<td class=name>" +
    player.name +
    "<span><img src=" +
    player.photo +
    "/></span></td>";
  elementTable.innerHTML +=
    "<td class=win><input type=number size=1 value=" +
    parseInt(player.win) +
    " /> </td>";
  elementTable.innerHTML +=
    "<td class=tie><input type=number size=1 value=" +
    parseInt(player.tie) +
    " /></td>";
  elementTable.innerHTML +=
    "<td class=loses><input type=number size=1 value=" +
    parseInt(player.loses) +
    " /></td>";
  elementTable.innerHTML +=
    "<td class=points><input type=number size=1 value=" +
    parseInt(player.points) +
    " /></td>";
  elementTable.innerHTML +=
    '<td><button onClick="addWin(' + player.id + ');">Win</button></td>';
  elementTable.innerHTML +=
    '<td><button onClick="addTie(' + player.id + ');">Tie</button></td>';
  elementTable.innerHTML +=
    '<td><button onclick="addLose(' + player.id + ');">Lose</button></td>';
  elementTable.innerHTML +=
    '<td><button onclick="removePlayer(' +
    player.id +
    ');">Remover</button></td></tr>';

  tableBody.appendChild(elementTable);
  tableEvents(elementTable, player.id);
}

function tableEvents(tr, id) {
  const tds = tr.querySelectorAll("td");
  const points = tr.querySelector("td[class=points]");
  for (let i = 0; i < tds.length; i++) {
    if (tds[i].classList == "win") {
      tds[i].firstChild.addEventListener("change", (event) => {
        const index = getPlayerIndex(id);
        const targetValue = parseInt(event.target.value);
        players[index].win = targetValue;
        const calculatedPoint = calculatePoints(index);
        points.firstChild.value = calculatedPoint;
        players[index].points = calculatedPoint;
        checkWinning();
      });
    } else if (tds[i].classList == "tie") {
      tds[i].firstChild.addEventListener("change", (event) => {
        const index = getPlayerIndex(id);
        const targetValue = parseInt(event.target.value);
        players[index].tie = targetValue;
        const calculatedPoint = calculatePoints(index);
        points.firstChild.value = calculatedPoint;
        players[index].points = calculatedPoint;
        checkWinning();
      });
    } else if (tds[i].classList == "loses") {
      tds[i].firstChild.addEventListener("change", (event) => {
        const index = getPlayerIndex(id);
        const targetValue = parseInt(event.target.value);
        players[index].loses = targetValue;
        checkWinning();
      });
    }
  }
}

function getPlayerIndex(id) {
  for (let player of players) {
    if (player.id == id) return players.indexOf(player);
  }
}

function checkWinning() {
  const tr = document.querySelectorAll("tr[class]");

  //Reseting tr
  for (let i = 0; i < tr.length; i++) {
    if (tr[i].className.match("winning")) {
      tr[i].className = "";
    }
  }

  let maxPoints = players[0].points;
  let indexWinner = 0;
  let samePoints = 0;
  let samePointsIndexList = [];
  
  //Checking who have more points
  for (let i = 0; i < players.length; i++) {
      if (players[i].points > maxPoints) {
        maxPoints = players[i].points;
        indexWinner = i;
        }
    }
  
  //Checking if have samePoints
  for(let i = 0; i < players.length; i++) {
      if (players[i].points == maxPoints) {
        samePoints++;
        if(samePointsIndexList.length == 0) {
          samePointsIndexList[0] = i;
          
        } else if (samePoints > 1) {
          samePointsIndexList.push(i);
        }
      }
    }

  //If have same points the winner will be who have less loses.
  if (samePointsIndexList.length > 1) {
    let loses = players[samePointsIndexList[0]].loses;
    for (let i = 0; i < samePointsIndexList.length; i++) {
      if (players[samePointsIndexList[i]].loses < loses) {
        loses = players[samePointsIndexList[i]].loses;
        indexWinner = samePointsIndexList[i];
      }
    }
    tr[indexWinner].className = "winning";
  } else {
    tr[indexWinner].className = "winning";
  }
}

function addWin(id) {
  const index = getPlayerIndex(id);
  players[index].win++;
  players[index].points = calculatePoints(index);
  const playerTr = document.getElementById(id);
  playerTr.querySelector("td[class=win]").querySelector("input").value =
    players[index].win;
  playerTr.querySelector("td[class=points]").querySelector("input").value =
    players[index].points;
  checkWinning();
}

function addTie(id) {
  const index = getPlayerIndex(id);
  players[index].tie++;
  players[index].points = calculatePoints(index);
  const playerTr = document.getElementById(id);
  playerTr.querySelector("td[class=tie]").querySelector("input").value =
    players[index].tie;
  playerTr.querySelector("td[class=points]").querySelector("input").value =
    players[index].points;
  checkWinning();
}

function addLose(id) {
  const index = getPlayerIndex(id);
  players[index].loses++;
  const playerTr = document.getElementById(id);
  playerTr.querySelector("td[class=loses]").querySelector("input").value =
    players[index].loses;
  checkWinning();
}

function calculatePoints(index) {
  const calculatedPoints = players[index].win * 3 + players[index].tie;
  return calculatedPoints;
}

function removePlayer(id) {
  const index = getPlayerIndex(id);
  let msg = "";
  msg = "Remover " + players[index].name + "?";

  if (confirm(msg)) {
    players.splice(index, 1);
    const tr = document.getElementById(id);
    tr.parentNode.removeChild(tr);
    console.log(players);
  }
}
