import SFX from "./SFX";
class Camera {
    private lastCam: string = "1A";
    private cameras = new Map<string, string>();
    public camBlip = new Audio('ASSETS/SFX/cameras/blip3.wav');

    
    constructor() {
        this.cameras.set("1A", "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_everyone.png");
        this.cameras.set("1B", "ASSETS/TEXTURES/CAMERA/dining_area/dining_area_empty.png");
        this.cameras.set("1C", "ASSETS/TEXTURES/CAMERA/pirate_cove/pirate_cove_1.png");
        this.cameras.set("2A", "ASSETS/TEXTURES/CAMERA/west_hall/west_hall_empty.png");
        this.cameras.set("2B", "ASSETS/TEXTURES/CAMERA/w_hall_corner/w_hall_corner_empty.png");
        this.cameras.set("3", "ASSETS/TEXTURES/CAMERA/supply_closet/supply_closet_empty.png");
        this.cameras.set("4A", "ASSETS/TEXTURES/CAMERA/east_hall/east_hall_empty.png");
        this.cameras.set("4B", "ASSETS/TEXTURES/CAMERA/e_hall_corner/e_hall_corner_empty.png");
        this.cameras.set("5", "ASSETS/TEXTURES/CAMERA/backstage/backstage_empty.png");
        this.cameras.set("6", "ASSETS/TEXTURES/OFFICE/office_bottom_layer.png");
        this.cameras.set("7", "ASSETS/TEXTURES/CAMERA/restrooms/restrooms_empty.png");
    }

   public show() {
        let cameraMonitor = document.getElementById("cameraScene") as HTMLImageElement;
        let frame = 1;
        const animation = setInterval(() => {
            cameraMonitor.src = `ASSETS/TEXTURES/CAMERA/cam_flippa_annimation/camera_flip_${frame}.png`;
            frame++;
            if (frame > 10) {
                clearInterval(animation);
                cameraMonitor.src = this.getCamFeed(this.lastCam) ?? "";
            }
        }, 30);
    }

    public close() {
        let cameraMonitor = document.getElementById("cameraScene") as HTMLImageElement;
        let frame = 10;
        
        const animation = setInterval(() => {
            cameraMonitor.src = `ASSETS/TEXTURES/CAMERA/cam_flippa_annimation/camera_flip_${frame}.png`;
            frame--;
            if (frame < 1) {
                clearInterval(animation);
            }
        }, 30);
    }


    public getCamFeed(cam: string): string | undefined {
        return this.cameras.get(cam);
    }

    public setAudioLvl(volume: number) {
        if (volume >= 1 || volume <= 100) {
            this.camBlip.volume = volume;
        }
    }


    public setCameraFeed(cam: string, volume: number) {
        if (cam != this.lastCam) {
            this.lastCam = cam;
            let cameraMonitor = document.getElementById("cameraScene") as HTMLImageElement;
            this.camBlip.play();
            cameraMonitor.src = this.cameras.get(cam) ?? "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_everyone.png";
        }
    }
}

export default Camera;