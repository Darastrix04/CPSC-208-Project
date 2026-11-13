class SFX {
    public readonly SFX = {
        light: new Audio('./ASSETS/SFX/office/light/BallastHumMedium2.wav'),
        click: new Audio('./ASSETS/SFX/MENU/sfx_menu_confirm.mp3'),
        door_close: new Audio('./ASSETS/SFX/office/door/SFXBible_12478.wav'),
        cam_down: new Audio('./ASSETS/SFX/cameras/put down.wav'),
        cam_switch: new Audio('./ASSETS/SFX/cameras/blip3.wav'),
        door_error: new Audio('./ASSETS/SFX/office/door/error.wav'),
        main_menu: new Audio('./ASSETS/SFX/MENU/darkness music.wav'),
        night_1_call: new Audio('./ASSETS/SFX/phone_calls/voiceover1c.wav'),
        night_2_call: new Audio('./ASSETS/SFX/phone_calls/voiceover2a.wav'),
        night_3_call: new Audio('./ASSETS/SFX/phone_calls/voiceover3.wav'),
        night_4_call: new Audio('./ASSETS/SFX/phone_calls/voiceover4.wav'),
        night_5_call: new Audio('./ASSETS/SFX/phone_calls/voiceover5.wav'),
        victory_bell: new Audio('./ASSETS/SFX/victory/chimes2.wav'),
        victory_cheer: new Audio('./ASSETS/SFX/victory/CROWD_SMALL_CHIL_EC049202.wav'),
        foxy_knocking: new Audio('./ASSETS/SFX/office/door/sfx_foxy_knocking.mp3'),
        foxy_scream: new Audio('./ASSETS/SFX/jumpscare/XSCREAM.wav'),
        ballast_humming: new Audio('./ASSETS/SFX/office/light/Buzz_Fan_Florescent2.wav'),
        death_static: new Audio('./ASSETS/SFX/jumpscare/static.wav'),
        light_jumpscare: new Audio('./ASSETS/SFX/office/light/sfx_jumpscare_window.mp3'),
        freddy_laugh: new Audio('./ASSETS/SFX/ambience/events/laughing/sfx_monster_laugh_distant.mp3'),
        chica_kitchen_audio: new Audio('./ASSETS/SFX/cameras/kitchen/sfx_fumbling_kitchen_short.mp3'),
        freddy_kitchen_audio: new Audio('./ASSETS/SFX/cameras/kitchen/circus.wav'),
        power_down: new Audio('./ASSETS/SFX/jumpscare/powerdown.wav'),
        freddy_power_down: new Audio('./ASSETS/SFX/jumpscare/music box.wav'),
        foxy_running: new Audio('./ASSETS/SFX/footsteps/sfx_foxy_running.mp3')
    };

    
    public readonly BACKGROUND_SFX: HTMLAudioElement[] = [
        new Audio(`./ASSETS/SFX/ambience/ambience2.wav`),
        new Audio(`./ASSETS/SFX/ambience/ColdPresc B.wav`),
        new Audio(`./ASSETS/SFX/ambience/EerieAmbienceLargeSca_MV005.wav`)
    ];


    private currentBackGround: HTMLAudioElement | null = null;
    private activeSFX: HTMLAudioElement[] = [];

    constructor() {
        this.SFX.light.loop = true;
        this.SFX.main_menu.loop = true;
        this.SFX.ballast_humming.loop = true;

    }


    public isCurrentlyPlaying(audio: HTMLAudioElement): boolean {
        this.activeSFX.forEach(sfx => {
            if(sfx === audio) {
                return true;
            }
        });
        return false;
    }

    public playSFX(audio: HTMLAudioElement) {
        if(!(audio instanceof Audio)) {return;}
        const sound = audio;
        sound.volume = audio.volume;
        sound.currentTime = 0;
        this.activeSFX.push(audio);
        sound.play();
    }

    public stopSFX(audio: HTMLAudioElement): void {
        this.activeSFX.forEach(element => {
            if(element === audio) {
                element.pause();
                element.remove();
            }
        });
    }

    public stopAllSFX(): void {
        this.activeSFX.forEach(element => {
            element.pause();
            element.remove();
        });
    }
    
    public playBackGround(): void {
        this.stopBackGround();
        const rand = Math.floor(Math.random() * (this.BACKGROUND_SFX.length - 1));
        if(this.BACKGROUND_SFX[rand] !== undefined) {
            this.currentBackGround = this.BACKGROUND_SFX[rand];
        }
        if(this.currentBackGround !== null) {
            this.currentBackGround.onended = () => {
                    this.currentBackGround = null;
                    this.playBackGround();
            };
            this.playSFX(this.currentBackGround);
        }
    }

    public stopBackGround(): void {
        if (this.currentBackGround !== null) {
            this.currentBackGround.pause();
            this.currentBackGround.currentTime = 0;
            this.currentBackGround = null;
        }
    }

}

const audioHandler = new SFX();
export default audioHandler;