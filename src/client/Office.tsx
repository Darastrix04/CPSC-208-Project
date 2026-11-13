import { useEffect, type ReactNode } from "react";
import { usePage } from "./PageContext";

interface OfficeViewProps {
    children?: ReactNode;
}

export default function OfficeView({children}: OfficeViewProps) {
    
    const {display} = usePage();


    useEffect(() => {
    
        const viewport = document.getElementById("viewport");
        const scene = document.getElementById("scene");
    
        let targetX = 0;
        let currentX = 0;
        let maxPan = 0;
        let init = false;
    
        function mouseMovment(event: MouseEvent) {
            const rect = viewport!.getBoundingClientRect();
            const mouseX = Math.max(0, Math.min(1,
                (event.clientX - rect.left) / rect.width
            ));
            targetX = -mouseX * maxPan;
        }
    
        function animate() {
            currentX += (targetX - currentX) * 0.12;
            scene!.style.transform = `translateX(${currentX}px)`;
            requestAnimationFrame(animate);
        }
    
        function updateBounds() {
            let prevPan = maxPan;
            maxPan = Math.max(0, scene!.offsetWidth - viewport!.clientWidth);
            if (!init) {
                targetX = -maxPan / 2;
                currentX = targetX;
                init = true;
            } else if (prevPan != maxPan) {
                if(prevPan > 0){
                    targetX = targetX / prevPan * maxPan;
                    currentX = currentX / prevPan * maxPan;
                }
            }
            scene!.style.transform = `translateX(${currentX}px)`;
        }
        updateBounds();
        viewport!.addEventListener("mousemove", mouseMovment);
        window.addEventListener("resize", updateBounds);
        document.getElementById("topLayer")!.addEventListener("load", updateBounds);
        animate();
    }, [display]);



    return (
        <div id="gameView">
            <div id="viewport">
                <div id="scene">
                    {children}
                </div>
            </div>
        </div>
    );
}
