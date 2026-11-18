"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Lobby_1 = require("./Lobby");
const wsServer = new ws_1.WebSocket.Server({ port: 443 }, () => {
    console.log("WebSocket server ready....");
});
const activeLobbies = new Map();
wsServer.on("connection", (observer) => {
    console.log("Client Connected");
    observer.on("message", (message) => {
        console.log(String(message));
        const MessageParts = String(message).split("_");
        const messageType = MessageParts[0];
        const pid = MessageParts[1];
        switch (messageType) {
            case "createLobby":
                if (!activeLobbies.get(pid)) {
                    activeLobbies.set(pid, new Lobby_1.Lobby(pid, observer));
                    wsServer.clients.forEach((observer) => {
                        observer.send(`lobby_${pid}`);
                    });
                }
                break;
            case "endLobby":
                if (activeLobbies.get(pid)) {
                    const playerSocket = activeLobbies.get(pid)?.getPlayerWebSocket();
                    const hostSocket = activeLobbies.get(pid)?.getHostWebSocket();
                    if (playerSocket !== null && playerSocket?.readyState === ws_1.WebSocket.OPEN) {
                        playerSocket.send(`lobbyEnded_${pid}`);
                    }
                    hostSocket?.send(`${pid}`);
                    activeLobbies.delete(pid);
                    let lobbyMessage = "returnedLobbies";
                    const ids = [...activeLobbies.keys()];
                    if (activeLobbies.size > 0) {
                        for (let i = 0; i < ids.length; i++) {
                            lobbyMessage += `_${ids[i]}`;
                        }
                    }
                    else {
                        lobbyMessage += "_";
                    }
                    wsServer.clients.forEach((observer) => {
                        observer.send(lobbyMessage);
                    });
                }
                break;
            case "getLobbies":
                let lobbyMessage = "returnedLobbies";
                const ids = [...activeLobbies.keys()];
                if (activeLobbies.size > 0) {
                    for (let i = 0; i < ids.length; i++) {
                        lobbyMessage += `_${ids[i]}`;
                    }
                    observer.send(lobbyMessage);
                }
                else {
                    observer.send("returnedLobbies_");
                }
                break;
            case "joinLobby": {
                const hostId = MessageParts[2];
                if (!pid || !hostId) {
                    break;
                }
                const lobby = activeLobbies.get(hostId);
                if (lobby) {
                    const hostSocket = activeLobbies.get(hostId)?.getHostWebSocket();
                    lobby.addPlayer(pid, observer);
                    if (hostSocket?.readyState === ws_1.WebSocket.OPEN) {
                        hostSocket.send(`joined_${pid}`);
                    }
                    if (observer.readyState === ws_1.WebSocket.OPEN) {
                        observer.send(`joined_${hostId}`);
                    }
                    console.log(`${pid} joined ${hostId}'s lobby`);
                }
                break;
            }
            case "leaveLobby":
                const hostId = MessageParts[2];
                if (activeLobbies.get(hostId)) {
                    const lobby = activeLobbies.get(hostId);
                    if (lobby) {
                        const hostSocket = activeLobbies.get(hostId)?.getHostWebSocket();
                        const playerSocket = activeLobbies.get(hostId)?.getPlayerWebSocket();
                        if (playerSocket?.readyState === ws_1.WebSocket.OPEN) {
                            playerSocket.send(`leftLobby_${hostId}`);
                            console.log("left lobby");
                        }
                        if (hostSocket?.readyState === ws_1.WebSocket.OPEN) {
                            hostSocket.send(`leftLobby_${pid}`);
                            console.log("leftLobby");
                        }
                        activeLobbies.get(hostId)?.removePlayer();
                    }
                }
                break;
            case "chooseTeam":
                const hostIds = MessageParts[2];
                if (activeLobbies.get(hostIds)) {
                    const lobby = activeLobbies.get(hostIds);
                    if (lobby) {
                        const hostSocket = activeLobbies.get(hostIds)?.getHostWebSocket();
                        const playerSocket = activeLobbies.get(hostIds)?.getPlayerWebSocket();
                        activeLobbies.get(hostIds)?.setTeam(pid, MessageParts[3]);
                        if (playerSocket?.readyState === ws_1.WebSocket.OPEN) {
                            playerSocket.send(`setTeamSelection_${activeLobbies.get(hostIds)?.getTeam(pid)}`);
                        }
                        if (hostSocket?.readyState === ws_1.WebSocket.OPEN) {
                            hostSocket.send(`setTeamSelection_${activeLobbies.get(hostIds)?.getTeam(pid)}`);
                        }
                    }
                }
                break;
        }
    });
    const pid = `pid${String(new Date().getTime() * (Math.random() * 20)).slice(0, 6)}`;
    const message = `connected_${pid}`;
    console.log(message);
    observer.send(message);
});
//# sourceMappingURL=server.js.map