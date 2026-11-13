import camFeed from "../Camera";
import audioHandler from "../SFX";
import Animatronic from "./Animatronic";
import MoveNode from "./MoveNode";

class Chicka extends Animatronic{
    readonly moveInt: number = 4;
    protected pos: MoveNode;
    constructor(difficulty: string, night: number) {
        super(difficulty, night);
        switch(night) {
            case 1:
                this.aiLvl = 0;
                break
            case 2:
                this.aiLvl = 1;
                break;
            case 3:
                this.aiLvl = 5;
                break;
            case 4:
                this.aiLvl = 4;
                break;
            case 5:
                this.aiLvl = 7;
                break;
            case 6:
                this.aiLvl = 12;
                break;
            default:
                this.aiLvl = 0;
                break;
        }
        const room1A = new MoveNode("1A", "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_everyone.png");
        const room1B = new MoveNode("1B", "ASSETS/TEXTURES/CAMERA/dining_area/dining_area_chica_1.png");
        const room7 = new MoveNode("7", "ASSETS/TEXTURES/CAMERA/restrooms/restrooms_chica_2.png");
        const room4A = new MoveNode("4A", "ASSETS/TEXTURES/CAMERA/east_hall/east_hall_chica.png");
        const room6 = new MoveNode("6", "ASSETS/SFX/cameras/kitchen/sfx_fumbling_kitchen_short.mp3");
        const room4B = new MoveNode("4B", "ASSETS/TEXTURES/CAMERA/e_hall_corner/e_hall_corner_chica_1.png");
        const rightDoor = new MoveNode("leftDoor", "");
        room1A.addNode(room1B);
        room7.addNode(room1B, room6, room4A);
        room1B.addNode(room7, room6, room4A);
        room4A.addNode(room4B, room6, room1B);
        room6.addNode(room4A, room7);
        room4B.addNode(room4A, rightDoor);
        rightDoor.addNode(room4B);
        this.pos = room1A;
    }


    override move(): void {
        const next = this.pos.nextNode();
        const currentRoom = this.pos.getName();
        if (next.getName() !== "1B" || !camFeed.isOccupied("1B")) {
            if (currentRoom === "1A") {
                switch (camFeed.getCamFeed("1A")) {
                    case "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_everyone.png":
                        camFeed.updateCamFeed("1A", "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_freddy_bonnie.png");
                    break;
                    case "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_freddy_chica.png":
                        camFeed.updateCamFeed("1A", "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_freddy.png");
                    break;
            }
        } else {
            camFeed.updateCamEmpty(currentRoom);
        }
        this.pos = next;
        if(this.getPos() === "rightDoor" || currentRoom === "rightDoor") {
            this.toggleLastTurnAtDoor();
        } else {
            camFeed.updateCamFeed(next.getName(), next.getSrc());
        }
        console.log(`Chica moved to ${next.getName()}`);
    } else {
        console.log(`Chica couldn't move because ${next.getName()} is occupied`);
    }
}

    public override attack(): void {
        document.getElementById("cameraMonitor")?.setAttribute("style", "Display: none;");
        console.log("chica attacked");
        let frame = 1;
        const jumpscare = document.getElementById("topLayer") as HTMLImageElement;
        audioHandler.playSFX(audioHandler.SFX.foxy_scream);
        const animation = setInterval(() => {
            jumpscare.src = `ASSETS/TEXTURES/OFFICE/3-CHICA/${frame}.png`;
            frame++;
            if (frame > 16) {
                clearInterval(animation);
            }
        }, 80);
    }


    override aiReaval(hr: number): void {
        switch(hr) {
            case 2:
                this.aiLvl++;
              break;
            case 3: 
                this.aiLvl++;
                break;
            case 4: 
                this.aiLvl++;
                break;       
        }
    }

    override toString(): string {
        return "chica";
    }

}


export default Chicka;