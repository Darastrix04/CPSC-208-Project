import audioHandler from "./SFX";
class Camera {
    private lastCam: string = "1A";
    private cameras = new Map<string, string>();
    private canRun: boolean = false;
    private emptyCameras = new Map<string, string>();
    private readonly kitchenAudio = new Audio("ASSETS/SFX/cameras/kitchen/sfx_fumbling_kitchen_short.mp3");

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
        this.emptyCameras = new Map(this.cameras);
    }
    public show(): void {
        const cameraSection = document.getElementById("cameraSection");
        const cameraMonitor = document.getElementById("cameraScene") as HTMLImageElement | null;
        const cameraMap = cameraSection?.querySelector<HTMLElement>(".camera-map");
        if (!cameraSection || !cameraMonitor) {
            return;
        }
        cameraSection.style.display = "block";
        cameraSection.style.visibility = "visible";
        if (cameraMap) { 
            cameraMap.style.visibility = "hidden";
        }
        let frame = 1;
        const animation = setInterval(() => {
            cameraMonitor.src = `/ASSETS/TEXTURES/CAMERA/cam_flippa_annimation/camera_flip_${frame}.png`;
            frame++;
            if (frame > 10) {
                clearInterval(animation);
                cameraMonitor.src = this.getCamFeed(this.lastCam) ?? "";
                if (cameraMap) {
                    cameraMap.style.visibility = "visible";
                } 
            }
        }, 30);
    }
    public close(): void {
        const cameraSection = document.getElementById("cameraSection");
        const cameraMonitor = document.getElementById("cameraScene") as HTMLImageElement | null;
        const cameraMap = cameraSection?.querySelector<HTMLElement>(".camera-map");
        if (!cameraSection || !cameraMonitor) {
            return;
        }
        if (cameraMap) {
            cameraMap.style.visibility = "hidden";
        }
        let frame = 10;
        const animation = setInterval(() => {
            cameraMonitor.src = `/ASSETS/TEXTURES/CAMERA/cam_flippa_annimation/camera_flip_${frame}.png`
            frame--;
            if (frame < 1) {
                clearInterval(animation);
                cameraSection.style.visibility = "hidden";
                cameraSection.style.display = "none";
            }
        }, 30);
    }


    public getCamFeed(cam: string): string | undefined {
        return this.cameras.get(cam);
    }

    public isOccupied(cam: string): boolean {
        if (cam !== "1B") return false;
        return this.cameras.get(cam) !== this.emptyCameras.get(cam);
    }

    public setCameraFeed(cam: string) {
        if (cam != this.lastCam) {
            audioHandler.playSFX(audioHandler.SFX.cam_switch);
        }
            this.lastCam = cam;
            let cameraMonitor = document.getElementById("cameraScene") as HTMLImageElement;
            if (cam === "6" && camFeed.getCamFeed("6") !== "ASSETS/TEXTURES/OFFICE/office_bottom_layer.png") {
                cameraMonitor.src = "ASSETS/TEXTURES/OFFICE/office_bottom_layer.png";
                if (this.kitchenAudio.paused) {
                    this.kitchenAudio.currentTime = 0;
                    this.kitchenAudio.play();
                }
            } else if(cam === "1C" && this.canRun){
                let frame = 1;
                const animation = setInterval(() => {
                    cameraMonitor.src = `src/ASSETS/TEXTURES/CAMERA/west_hall/foxy_running/foxy_running_${frame}.png`;
                    frame++;
                    if (frame > 29) {
                        clearInterval(animation);
                        cameraMonitor.src = this.getCamFeed(this.lastCam) ?? "";
                    }
                }, 10);
            } else {
                this.kitchenAudio.pause();
                this.kitchenAudio.currentTime = 0;
                cameraMonitor.src = this.cameras.get(cam) ?? "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_everyone.png";
            }
    }
    public updateCamFeed(cam: string, src: string) {
        this.cameras.set(cam, src);
        if(cam === this.lastCam && cam !== "1A") {
            this.setCameraFeed(cam)
        }
    }

    public setFoxyRun(canRun: boolean) {
        this.canRun = canRun;
    }


    public updateCamEmpty(cam: string) {
        this.cameras.set(cam, this.emptyCameras.get(cam)!);
    }
    public getLastCam(): string {
        return this.lastCam;
    }
}
const camFeed = new Camera();
export default camFeed;