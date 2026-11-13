
class AnimateFrames {

    public animate(anim: HTMLImageElement, totalFrames: number, baseLinePath: string, delay: number, doAtBeginning?: () => void, doAtEnd?: () => void) {
        let frame = 1;
        doAtBeginning?.();
        const animationInterval = setInterval(() => {
            anim.src = `${baseLinePath}${frame}.png`;
            frame++;
            if (frame > totalFrames) {
                doAtEnd?.();
                clearInterval(animationInterval);
            }
        }, delay);
    }
}

export default AnimateFrames;
