/* eslint-disable @typescript-eslint/no-unused-vars */
const socket = io();

// flag to check if the game has been initialized
let myID;

const getCurrentPlayer = () => {
  return document.getElementById(myID);
};

const checkWinner = () => {
  const currentPlayer = getCurrentPlayer();
  const endBar = document.querySelector('.end-bar');

  if (!currentPlayer || !endBar) {
    console.error('Player or end bar element not found');
    return;
  }

  const playerRect = currentPlayer.getBoundingClientRect();
  const endBarRect = endBar.getBoundingClientRect();

  // Check if the player's right edge has passed the end bar's left edge
  if (playerRect.right >= endBarRect.left) {
    socket.emit("haveWinner");
  }
};

const handleKeyDown = (event) => {
  const arrowContainer = document.getElementById("arrow-container");

  if (event.key === "ArrowDown") {
    arrowContainer.classList.add("arrow-down-pressed");
  } else if (event.key === "ArrowUp") {
    arrowContainer.classList.add("arrow-up-pressed");
  } else if (event.key === "ArrowLeft") {
    arrowContainer.classList.add("arrow-left-pressed");
  } else if (event.key === "ArrowRight") {
    arrowContainer.classList.add("arrow-right-pressed");
  }
}

const handleKeyUp = (event) => {

  console.log("Here=================keyUp=================================")

  const arrowContainer = document.getElementById("arrow-container");

  // handle keyup event
  const currentPlayer = getCurrentPlayer();
  console.log("newPlayer Listener", myID);

  switch (event.key) {
    case "ArrowUp":
      currentPlayer.style.top = currentPlayer.offsetTop - 30 + "px";
      arrowContainer.classList.remove("arrow-up-pressed");
      break;

    case "ArrowDown":
      currentPlayer.style.top = currentPlayer.offsetTop + 30 + "px";
      arrowContainer.classList.remove("arrow-down-pressed");
      break;

    case "ArrowLeft":
      currentPlayer.style.left = currentPlayer.offsetLeft - 30 + "px";
      arrowContainer.classList.remove("arrow-left-pressed");
      break;

    case "ArrowRight":
      currentPlayer.style.left = currentPlayer.offsetLeft + 30 + "px";
      arrowContainer.classList.remove("arrow-right-pressed");
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

  // check Winner
  checkWinner();
};

const fireKeyDown = (key) => {
  console.log("fireKeydown_inside func");
  const event = new KeyboardEvent('keydown', {key: key});
  console.log("keydown event created: ", event);
  console.log("****************************");
  console.log(window.dispatchEvent(event)); 
}

const fireKeyUp = (key) => {
  console.log("fireKeyUp_inside func");
  const event = new KeyboardEvent('keyup', {key: key});
  console.log("keydown event created: ", event);
  console.log("****************************");
  console.log(window.dispatchEvent(event)); 
}

socket.on("addPlayer", (players) => {
  console.log("*************************************");
  console.log("Received-Players-Front: ", players);
  console.log("*************************************");

  const lastAddedPlayer = players[players.length - 1];

  if (!myID) {   //I'm the new added ball
    players.forEach((player) => {
      // create a new player element and append it to the body
      const newPlayer = document.createElement("div");

      newPlayer.classList.add("ball");
      newPlayer.classList.add("blackBall");
      newPlayer.id = player.playerId;
      console.log("id, ", newPlayer.id);
      newPlayer.style.top = player.top + "px";
      newPlayer.style.left = player.left + "px";
      newPlayer.style.backgroundColor = player.color;
      document.body.appendChild(newPlayer);
    });

    //update ID
    myID = lastAddedPlayer.playerId;

    //change the color to highlight the current player
    const currentPlayer = getCurrentPlayer();

    currentPlayer.style.backgroundColor = "#ffffff";
    currentPlayer.classList.remove("blackBall");
    currentPlayer.classList.add("whiteBall");
  } else {
    console.log("lastAddedPlayer:", lastAddedPlayer);

    // create a new player element and append it to the body
    const newPlayer = document.createElement("div");

    newPlayer.classList.add("ball");
    newPlayer.classList.add("blackBall");
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

socket.on("gameOver", () => {
  console.log("**Game Over**");
  Swal.fire({
    icon: "info",
    title: "Game Over!",
    text: "We Have a Winner",
    customClass: "confetti",
    showConfirmButton: false,
  });

  window.removeEventListener("keyup", handleKeyUp);
  window.removeEventListener("keydown", handleKeyUp);
});

//handleKeyUp
window.addEventListener("keyup", handleKeyUp);

//handleKeyDown
document.addEventListener("keydown", handleKeyDown);
