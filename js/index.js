// 'preloadImages' is a utility function that handles the preloading of images to ensure they are fully loaded before being used.
import { preloadImages } from "./utils.js";
// 'ImageTrail' is a class designed to manage and animate a sequence of images, reacting to mouse movements.
import { ImageTrail } from "./imageTrail.js";

gsap.registerPlugin(CustomEase);

CustomEase.create("native", "0.25, 0.1, 0.25, 1");

// lagging/delay in chrome , but actually pretty smooth when use in wallpaper engine, i dont know why lol
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const boxes = container.querySelectorAll(".box");

  boxes.forEach((box, index) => {
    box.addEventListener("mouseover", () => {
      const columns = Array(5).fill("1fr");
      columns[index] = "5fr";
      gsap.to(container, {
        duration: 0.4,
        gridTemplateColumns: columns.join(" "),
        ease: "native",
      });
    });

    box.addEventListener("mouseout", () => {
      gsap.to(container, {
        duration: 0.4,
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        ease: "native",
      });
    });
  });
});

// script.js
document.getElementById("goFullscreen").addEventListener("click", function () {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    // Chrome, Safari, Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    // IE/Edge
    document.documentElement.msRequestFullscreen();
  }

  // Hide the backdrop and show main content
  document.getElementById("backdrop").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
});

// Optionally, listen for the fullscreen change event in case the user exits fullscreen
document.addEventListener("fullscreenchange", function () {
  if (!document.fullscreenElement) {
    document.getElementById("backdrop").style.display = "flex";
    document.getElementById("mainContent").style.display = "none";
  }
});

// Preload all images
preloadImages(".content__img-inner").then(() => {
  // Once all images are preloaded, remove the 'loading' class from the body element.
  document.body.classList.remove("loading");

  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("mousemove", (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      box.style.setProperty("--pointer-x", `${x}px`);
      box.style.setProperty("--pointer-y", `${y}px`);
    });
  });

  // Instantiate a new ImageTrail object, initializing it with the element that has the class 'content'.
  // The ImageTrail instance starts managing and animating the sequence of images within the specified element, reacting to mouse movements.
  new ImageTrail(document.querySelector(".content"));
});
