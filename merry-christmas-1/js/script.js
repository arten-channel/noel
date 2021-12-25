const lights = document.querySelector(".tree__lights"),
   balls = document.querySelector(".tree__balls");

function addLights() {
   let template = `
      <span></span>`;
   for (let i = 0; i < 11; i++) {
      lights.insertAdjacentHTML("beforeend", template);
   }
}

function addBalls() {
   let template = `
      <span></span>`;
   for (let i = 0; i < 9; i++) {
      balls.insertAdjacentHTML("beforeend", template);
   }
}

// Get Message ans Split Chars

function text() {
   const message = "Merry Christmas",
      messageText = document.querySelector(".message"),
      messageSplit = message.split("");

   messageSplit.forEach(function (el) {
      let template = `
      <p class="message__letter">
        ${el}
      </p>`;

      messageText.insertAdjacentHTML("beforeend", template);
   });
}

// Functions
addLights();
addBalls();
text();

function particles() {
   particlesJS("particles-js", {
      particles: {
         number: { value: 80, density: { enable: true, value_area: 800 } },
         color: { value: "#ffffff" },
         shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "", width: 100, height: 100 }
         },
         opacity: {
            value: 0.8,
            random: true,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
         },
         size: {
            value: 3.5,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
         },
         line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
         },
         move: {
            enable: true,
            speed: 4.810236182596568,
            direction: "bottom",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
               enable: false,
               rotateX: 721.5354273894853,
               rotateY: 1283
            }
         }
      },
      interactivity: {
         detect_on: "canvas",
         events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
         },
         modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
               distance: 400,
               size: 40,
               duration: 2,
               opacity: 8,
               speed: 3
            },
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
         }
      },
      retina_detect: true
   });
}

particles();
