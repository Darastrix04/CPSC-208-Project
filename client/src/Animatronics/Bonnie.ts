import Animatronic from "./Animatronic";
import camFeed from "../Camera";
import MoveNode from "./MoveNode";
import audioHandler from "../SFX";

class Bonnie extends Animatronic{
    readonly moveInt: number = 5;
    protected pos: MoveNode;

    constructor(difficulty: string, night: number) {
        super(difficulty, night);
        switch(night) {
            case 1:
                this.aiLvl = 0;
                break
            case 2:
                this.aiLvl = 3;
                break;
            case 3:
                this.aiLvl = 0;
                break;
            case 4:
                this.aiLvl = 2;
                break;
            case 5:
                this.aiLvl = 5;
                break;
            case 6:
                this.aiLvl = 10;
                break;
            default:
                this.aiLvl = 0;
                break;
        }
        const room1A = new MoveNode("1A", "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_everyone.png");
        const room1B = new MoveNode("1B", "ASSETS/TEXTURES/CAMERA/dining_area/dining_area_bonnie_1.png");
        const room5 = new MoveNode("5", "ASSETS/TEXTURES/CAMERA/backstage/backstage_bonnie.png");
        const room2A = new MoveNode("2A", "ASSETS/TEXTURES/CAMERA/west_hall/west_hall_bonnie.png");
        const room2B = new MoveNode("2B", "ASSETS/TEXTURES/CAMERA/w_hall_corner/w_hall_corner_bonnie_1.png");
        const room3 = new MoveNode("3", "ASSETS/TEXTURES/CAMERA/supply_closet/supply_closet_bonnie.png");
        const leftDoor = new MoveNode("leftDoor", "");
        room1A.addNode(room5, room1B);
        room5.addNode(room1B, room2A);
        room1B.addNode(room5, room2A);
        room2A.addNode(room5, room1B, room3, room2B);
        room3.addNode(room2A, room2B);
        room2B.addNode(room3, room2A, leftDoor);
        leftDoor.addNode(room2B);
        this.pos = room1A;
    }

    override move(): void {
        const next = this.pos.nextNode();
        const currentRoom = this.pos.getName();
        if (next.getName() !== "1B" || !camFeed.isOccupied("1B")) {
            if (currentRoom === "1A") {
                switch (camFeed.getCamFeed("1A")) {
                    case "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_everyone.png":
                        camFeed.updateCamFeed("1A", "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_freddy_chica.png");
                    break;
                    case "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_freddy_bonnie.png":
                        camFeed.updateCamFeed("1A", "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_freddy.png");
                    break;
            }
        }else {
            camFeed.updateCamEmpty(currentRoom);
        }
        this.pos = next;
        if(camFeed.getFoxyRun() || (this.getPos() === "leftDoor" || currentRoom === "leftDoor")) {
            this.toggleLastTurnAtDoor();
        } else {
            camFeed.updateCamFeed(this.pos.getName(), this.pos.getSrc());
        }
        console.log(`Bonnie moved to ${next.getName()}`);
    } else {
        console.log(`Bonnie couldn't move because ${next.getName()} is occupied`);
    }
}



    public override attack(): void {
        this.anim.animate(document.getElementById("topLayer") as HTMLImageElement,
    11,
    "ASSETS/TEXTURES/OFFICE/2-BONNIE/",
    80,
    () => {
        console.log("bonnie attacked");
        audioHandler.playSFX(audioHandler.SFX.foxy_scream);})
    }

    public override aiReaval(hr: number): void {
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
        return "bonnie";
    }

    public getPos(): string {
        return this.pos.getName();
    }

}


export default Bonnie;