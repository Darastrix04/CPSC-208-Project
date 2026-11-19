import { WebSocket } from "ws";
export class Lobby {
    private player: string | null;
    private host: string;
    private hostSocket: WebSocket;
    private playerSocket: WebSocket | null;
    private hostTeam: string | null;
    private playerTeam: string | null;

    constructor(host:string, socket: WebSocket) {
        this.host = host;
        this.hostSocket = socket;
        this.playerSocket = null;
        this.hostTeam = null;
        this.playerTeam = null;
        this.player = null;
    }


    public addPlayer(playerid: string, socket: WebSocket) {
        if(this.player === null) {
            this.player = playerid;
            this.playerSocket = socket;
        }
    }

    public setTeam(id: string,team: string) {
        if(id === this.player) {
            this.playerTeam = team;
        } else if (id === this.host) {
            this.hostTeam = team;
        }
    }

    public getTeam(id: string) : string {
        if(id === this.playerTeam) {
            return this.playerTeam;
        } else if (id === this.hostTeam){
            return this.hostTeam;
        } else {
            return "";
        }
    }

    public getAnimatronicTeam(): string | null {
        if(this.playerTeam === "anima") {
            return this.playerTeam;
        } else if(this.hostTeam === "anima") {
            return this.hostTeam;
        } else {
            return null;
        }
    }

    public getMinWageTeam(): string | null {
        if(this.playerTeam === "minWage") {
            return this.playerTeam;
        } else if(this.hostTeam === "minWage") {
            return this.hostTeam;
        } else {
            return null;
        }
    }

    public removePlayer() {
        if(this.player !== null) {
            this.player = null;
            this.playerSocket = null;
        }
    }

    public getHost(): string {
        return this.host;
    }
    public getHostWebSocket() : WebSocket {
        return this.hostSocket;
    }

    public getPlayer(): string | null {
        return this.player;
    }

    public getPlayerWebSocket(): WebSocket | null {
        return this.playerSocket;
    }

}