const viewport = document.getElementById("viewport");
    const scene = document.getElementById("scene");

    let targetX = 0;
    let currentX = 0;
    let maxPan = 0;

    function updateBounds() {
        maxPan = Math.max(0, scene.offsetWidth - viewport.clientWidth);

        // Start at the center of the image
        targetX = -maxPan / 2;
        currentX = targetX;
    }

    scene.addEventListener("load", updateBounds);
    window.addEventListener("resize", updateBounds);

    viewport.addEventListener("mousemove", (event) => {
      const rect = viewport.getBoundingClientRect();

      // Mouse position from 0 (left) to 1 (right)
      const mouseX = (event.clientX - rect.left) / rect.width;

      // Map the mouse position to the image's full range
      targetX = -mouseX * maxPan;
    });

    // Smooth movement
    function animate() {
      currentX += (targetX - currentX) * 0.12;
      scene.style.transform = `translateX(${currentX}px)`;
      requestAnimationFrame(animate);
    }

    animate();