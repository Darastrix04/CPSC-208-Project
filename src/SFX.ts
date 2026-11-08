class SFX {
    public readonly SFX = {
        light: new Audio('./ASSETS/SFX/office/light/BallastHumMedium2.wav'),
        click: new Audio('./ASSETS/SFX/MENU/sfx_menu_confirm.mp3'),
        door_close: new Audio('./ASSETS/SFX/office/door/SFXBible_12478.wav'),
        cam_down: new Audio('ASSETS/SFX/cameras/put down.wav'),
<<<<<<< HEAD
        cam_switch: new Audio('ASSETS/SFX/cameras/blip3.wav')
    };
=======
        cam_switch: new Audio('ASSETS/SFX/cameras/blip3.wav'),
        door_error: new Audio('ASSETS/SFX/office/door/error.wav')
    };
    public readonly BACKGROUND_SFX: HTMLAudioElement[] = [
        new Audio(`ASSETS/SFX/ambience/ambience2.wav`),
        new Audio(`ASSETS/SFX/ambience/ColdPresc B.wav`),
        new Audio(`ASSETS/SFX/ambience/EerieAmbienceLargeSca_MV005.wav`)
    ];
    private currentBackGround: HTMLAudioElement | null = null;
>>>>>>> kolby-developement
    constructor() {
        this.SFX.light.loop = true;
    }
    public playSFX(audio: HTMLAudioElement) {
        if(!(audio instanceof Audio)) {return;}
        const sound = audio;
        sound.volume = audio.volume;
        sound.currentTime = 0;
        sound.play();
<<<<<<< HEAD
;
=======
>>>>>>> kolby-developement
    }
    public stopSFX(audio: HTMLAudioElement) {
        if(!(audio instanceof Audio)) {return;}
        audio.pause();
    }
<<<<<<< HEAD
=======
    public playBackGround(): void {
        const rand = Math.floor(Math.random() * this.BACKGROUND_SFX.length);
        const curr = this.BACKGROUND_SFX[rand];
        if (!curr) return;
        curr.onended = () => {
            this.playBackGround();
        };
        this.playSFX(curr);
    }
    public stopBackGround(): void {
        if (this.currentBackGround !== null) {
            this.currentBackGround.pause();
            this.currentBackGround.currentTime = 0;
            this.currentBackGround = null;
        }
    }

>>>>>>> kolby-developement
}

const audioHandler = new SFX();
export default audioHandler;