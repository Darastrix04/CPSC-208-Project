import camFeed from "../Camera";
import audioHandler from "../SFX";
import Animatronic from "./Animatronic";
import MoveNode from "./MoveNode";

class Freddy extends Animatronic{
    readonly moveInt: number = 3;
    constructor(difficulty: string, night: number) {
        super(difficulty, night);
        switch(night) {
            case 1:
                this.aiLvl = 0;
                break
            case 2:
                this.aiLvl = 0;
                break;
            case 3:
                this.aiLvl = 1;
                break;
            case 4:
                this.aiLvl = Math.floor(Math.random() * 2);
                break;
            case 5:
                this.aiLvl = 3;
                break;
            case 6:
                this.aiLvl = 4;
                break;
            default:
                this.aiLvl = 0;
                break;
        }
        const room1A = new MoveNode("1A", "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_freddy.png");
        const room1B = new MoveNode("1B", "ASSETS/TEXTURES/CAMERA/dining_area/dining_area_freddy.png");
        const room7 = new MoveNode("7", "ASSETS/TEXTURES/CAMERA/restrooms/restrooms_freddy.png");
        const room4A = new MoveNode("4A", "ASSETS/TEXTURES/CAMERA/east_hall/east_hall_freddy.png");
        const room6 = new MoveNode("6", "ASSETS/SFX/cameras/kitchen/music box.wav");
        const room4B = new MoveNode("4B", "ASSETS/TEXTURES/CAMERA/e_hall_corner/e_hall_corner_freddy.png");
        const rightDoor = new MoveNode("rightDoor", "");
        room1A.addNode(room1B);
        room7.addNode(room6, room1B);
        room1B.addNode(room7);
        room4A.addNode(room4B, room6);
        room6.addNode(room4A, room7);
        room4B.addNode(room4A, rightDoor);
        rightDoor.addNode(room4B);
        this.pos = room1A;
    }


    override move(): void {
        if((!camFeed.getIsUsingCam() || camFeed.getLastCam() !== this.pos?.getName())) {
            const next = this.pos!.nextNode();
            const currentRoom = this.pos!.getName();
            if(camFeed.getCamFeed("1A") === "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_freddy.png") {
                camFeed.updateCamFeed("1A", "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_empty.png");
                this.pos = next;
            } else if (camFeed.getCamFeed("1A") === "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_empty.png") {
                camFeed.updateCamEmpty(currentRoom);
                this.pos = next;
                if(this.getPos() === "rightDoor" || currentRoom === "rightDoor") {
                    this.toggleLastTurnAtDoor();
                }
                if(!camFeed.isOccupied(next.getName())) {
                    camFeed.updateCamFeed(next.getName(), next.getSrc());
                }
            }
            console.log(`Freddy moved to ${next.getName()}`);
            audioHandler.playSFX(audioHandler.SFX.freddy_laugh);
        } else {
            console.log("freddy attempted to move, but there is someone still on stage with him or someone is looking at him");
        }
    }

    public override attack() {
        document.getElementById("cameraMonitor")?.setAttribute("style", "Display: none;");
        if((camFeed.getIsUsingCam() && camFeed.getLastCam() !== "4B") || (!camFeed.getIsUsingCam())) {
            console.log("Freddy attacked");
            let frame = 1;
            const jumpscare = document.getElementById("topLayer") as HTMLImageElement;
            audioHandler.playSFX(audioHandler.SFX.foxy_scream);
            document.getElementById("rightDoor")?.setAttribute("style", "Display: none;");
            if(jumpscare.src.endsWith("office_top_layer.png") ){
                const animation = setInterval(() => {
                    jumpscare.src = `/ASSETS/TEXTURES/OFFICE/1-FREDDY/${frame}.png`;
                    frame++;
                    if (frame > 29) {
                        clearInterval(animation);
                    }
                }, 40);
            } else if(jumpscare.src.endsWith("office_dark.png")) {
                const animation = setInterval(() => {
                    jumpscare.src = `/ASSETS/TEXTURES/OFFICE/1-FREDDY_LIGHTS_OUT/${frame}.png`;
                    frame++;
                    if (frame > 20) {
                        clearInterval(animation);
                    }
                }, 40);

            }
        } else {
            console.log("player was looking at freddy during attack chance");
        }
    }


    override toString(): string {
        return "freddy";
    }

}


export default Freddy;