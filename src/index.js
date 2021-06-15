// index.js

import { TerminalUI } from "./TerminalUI";

import io from "socket.io-client";
import { FitAddon } from "xterm-addon-fit";
// io = require("socket.io-client");
// TerminalUI = require("TerminalUI");
// IMPORTANT: Make sure you replace this address with your server address.

const serverAddress = "https://game-server-starboard.herokuapp.com/";

//Server sandbox available at https://codesandbox.io/s/web-terminal-tutorial-server-g2ihu

function connectToSocket(serverAddress) {
  return new Promise((res) => {
    const socket = io(serverAddress);
    res(socket);
  });
}

function startTerminal(container, socket) {
  // Create an xterm.js instance (TerminalUI class is a wrapper with some utils. Check that file for info.)
  const terminal = new TerminalUI(socket);

  // Attach created terminal to a DOM element.
  terminal.attachTo(container);

  // When terminal attached to DOM, start listening for input, output events.
  // Check TerminalUI startListening() function for details.
  var cd = "cd Starboard_jar\r";
  terminal.sendInput(cd);
  var run = "java -jar Starboard.jar\r";
  terminal.sendInput(run);
  terminal.startListening();
}

function start() {
  const container = document.getElementById("terminal-container");
  // Connect to socket and when it is available, start terminal.
  connectToSocket(serverAddress).then((socket) => {
    startTerminal(container, socket);
  });

  FitAddon.fit();
}



// Better to start on DOMContentLoaded. So, we know terminal-container is loaded
start();

