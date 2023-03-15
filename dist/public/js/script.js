const socket = io();

// flag to check if the game has been initialized
let myID;

const handleKeyUp = (event) => {
  // handle keyup event
  const currentPlayer = document.getElementById(myID);
  console.log("newPlayer Listener", myID);

  switch (event.key) {
    case "ArrowUp":
      currentPlayer.style.top = currentPlayer.offsetTop - 10 + "px";
      break;

    case "ArrowDown":
      currentPlayer.style.top = currentPlayer.offsetTop + 10 + "px";
      break;

    case "ArrowLeft":
      currentPlayer.style.left = currentPlayer.offsetLeft - 10 + "px";
      break;

    case "ArrowRight":
      currentPlayer.style.left = currentPlayer.offsetLeft + 10 + "px";
      break;
    default:
      return;
  }

  // emit a 'move' event to the server
  socket.emit("move", {
    playerId: myID,
    color: window.getComputedStyle(currentPlayer).getPropertyValue("color"),
    top: currentPlayer.offsetTop,
    left: currentPlayer.offsetLeft,
  });
};

socket.on("addPlayer", (players) => {
  console.log("*************************************");
  console.log("Received-Players-Front: ", players);
  console.log("*************************************");

  const lastAddedPlayer = players[players.length - 1];

  if (!myID) {
    players.forEach((player) => {
      // create a new player element and append it to the body
      const newPlayer = document.createElement("div");

      newPlayer.classList.add("player");
      newPlayer.id = player.playerId;
      console.log("id, ", newPlayer.id);
      newPlayer.style.top = player.top + "px";
      newPlayer.style.left = player.left + "px";
      newPlayer.style.backgroundColor = player.color;
      document.body.appendChild(newPlayer);
    });

    window.addEventListener("keyup", handleKeyUp);

    //update ID
    myID = lastAddedPlayer.playerId;

    //change the color to highlight the current player
    document.getElementById(myID).style.backgroundColor = "#ffffff";
  } else {
    console.log("lastAddedPlayer:", lastAddedPlayer);

    // create a new player element and append it to the body
    const newPlayer = document.createElement("div");

    newPlayer.classList.add("player");
    newPlayer.id = lastAddedPlayer.playerId;
    console.log("id, ", lastAddedPlayer.id);
    newPlayer.style.top = lastAddedPlayer.top + "px";
    newPlayer.style.left = lastAddedPlayer.left + "px";
    newPlayer.style.backgroundColor = lastAddedPlayer.color;
    document.body.appendChild(newPlayer);
  }
});

socket.on("removePlayer", (playerId) => {
  const player = document.getElementById(playerId);
  document.body.removeChild(player);
});

socket.on("updatePosition", (data) => {
  console.log("data_to_update:", data);
  const playerId = data.playerId;

  const updatedPlayer = document.getElementById(playerId);
  console.log(updatedPlayer);
  updatedPlayer.style.left = data.left + "px";
  updatedPlayer.style.top = data.top + "px";

  console.log(
    `>>>After update= left: ${updatedPlayer.style.left}, top:${updatedPlayer.style.top}`
  );
});
