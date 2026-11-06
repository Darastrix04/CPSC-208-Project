import audioHandler from "./SFX";
class Camera {
    lastCam = "1A";
    cameras = new Map();
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
    show() {
        const cameraSection = document.getElementById("cameraSection");
        const cameraMonitor = document.getElementById("cameraScene");
        const cameraMap = cameraSection?.querySelector(".camera-map");
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
    close() {
        const cameraSection = document.getElementById("cameraSection");
        const cameraMonitor = document.getElementById("cameraScene");
        const cameraMap = cameraSection?.querySelector(".camera-map");
        if (!cameraSection || !cameraMonitor) {
            return;
        }
        if (cameraMap) {
            cameraMap.style.visibility = "hidden";
        }
        let frame = 10;
        const animation = setInterval(() => {
            cameraMonitor.src = `/ASSETS/TEXTURES/CAMERA/cam_flippa_annimation/camera_flip_${frame}.png`;
            frame--;
            if (frame < 1) {
                clearInterval(animation);
                cameraSection.style.visibility = "hidden";
                cameraSection.style.display = "none";
            }
        }, 30);
    }
    getCamFeed(cam) {
        return this.cameras.get(cam);
    }
    setCameraFeed(cam) {
        if (cam != this.lastCam) {
            audioHandler.playSFX(audioHandler.SFX.cam_switch);
        }
        this.lastCam = cam;
        let cameraMonitor = document.getElementById("cameraScene");
        cameraMonitor.src = this.cameras.get(cam) ?? "ASSETS/TEXTURES/CAMERA/show_stage/show_stage_everyone.png";
    }
    updateCamFeed(cam, src) {
        this.cameras.set(cam, src);
    }
    getLastCam() {
        return this.lastCam;
    }
}
const camFeed = new Camera();
export default camFeed;
//# sourceMappingURL=Camera.js.map