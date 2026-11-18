"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lobby = void 0;
class Lobby {
    player;
    host;
    hostSocket;
    playerSocket;
    hostTeam;
    playerTeam;
    constructor(host, socket) {
        this.host = host;
        this.hostSocket = socket;
        this.playerSocket = null;
        this.hostTeam = null;
        this.playerTeam = null;
        this.player = null;
    }
    addPlayer(playerid, socket) {
        if (this.player === null) {
            this.player = playerid;
            this.playerSocket = socket;
        }
    }
    setTeam(id, team) {
        if (id === this.player) {
            this.playerTeam = team;
        }
        else if (id === this.host) {
            this.hostTeam = team;
        }
    }
    getTeam(id) {
        if (id === this.playerTeam) {
            return this.playerTeam;
        }
        else if (id === this.hostTeam) {
            return this.hostTeam;
        }
        else {
            return "";
        }
    }
    getAnimatronicTeam() {
        if (this.playerTeam === "anima") {
            return this.playerTeam;
        }
        else if (this.hostTeam === "anima") {
            return this.hostTeam;
        }
        else {
            return null;
        }
    }
    getMinWageTeam() {
        if (this.playerTeam === "minWage") {
            return this.playerTeam;
        }
        else if (this.hostTeam === "minWage") {
            return this.hostTeam;
        }
        else {
            return null;
        }
    }
    removePlayer() {
        if (this.player !== null) {
            this.player = null;
            this.playerSocket = null;
        }
    }
    getHost() {
        return this.host;
    }
    getHostWebSocket() {
        return this.hostSocket;
    }
    getPlayer() {
        return this.player;
    }
    getPlayerWebSocket() {
        return this.playerSocket;
    }
}
exports.Lobby = Lobby;
//# sourceMappingURL=Lobby.js.map