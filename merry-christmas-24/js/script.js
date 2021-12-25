const hatEase = "Sine.easeInOut";
let hatDuration = 0.3;

const hatTl = gsap.timeline({
    repeat: -1,
    yoyo: true,
})
.to('#hat-1',{
    morphSVG: "M332.84 146.29s-3.54-36.88 76.59-39.21c0 0-23.41 39.65-38.22 46.62 0 0-33.76 16.5-38.37-7.41z",
    ease: hatEase,
    duration: hatDuration,
},0)
.to('#hat-ball',{
    x: -10,
    y: -20,
    ease: hatEase,
    duration: hatDuration,
},0)

gsap.set('#snowman',{
    x: -30,
    y: -30,
})

gsap.set('#snowman-body',{
    x: -5,
    y: -3,
    rotate: 10,
    transformOrigin: '30% 40%',
})

const skingEase = "Sine.easeInOut";
const skingTl = gsap.timeline({
    repeat: -1,
    yoyo: true,
})
.to('#snowman',{
    x: 30,
    y: 15,
    ease: skingEase,
},"ski-right")
.to('#snowman-body',{
    x: 3,
    y: 3,
    rotate: -3,
    transformOrigin: 'center',
    ease: skingEase,
},"ski-right")
// .to('.head',{
//     x: 2,
//     y: 2,
//     ease: skingEase,
// },"ski-right")

skingTl.timeScale(0.4)

const speedTl = gsap.timeline({
    paused: true,
    // repeat: -1,
})
.to('#snowman-container',{
    x: -50,
    y: 20,
},0)
.to('.head',{
    x: -20,
    y: 20,
},0)
.to('#snaman-face',{
    x: -3,
    y: 3,
},0)
.to('.arms',{
    x: -10,
    y: 5,
},0)
.to('#stick-back',{
    x: 0,
    y: -5,
},0)
.to('#stick-front',{
    x: 0,
    y: -8,
},0)
.to('#left-arm-1',{
    rotate: 20,
    transformOrigin: 'right top',
},0)
.to('#right-arm-1',{
    rotate: 10,
    transformOrigin: 'right top',
},0)

function resetPosition(){
    gsap.to('#snowman-container',{ x: 0, y: 0, })
    gsap.to('.head',{ x: 0, y: 0, })
    gsap.to('#snaman-face',{ x: 0, y: 0, })
    gsap.to('.arms',{ x: 0, y: 0, })
    gsap.to('#stick-back',{ x: 0, y: 0, })
    gsap.to('#snowman-container',{ x: 0, y: 0, })
    gsap.to('#stick-front',{ x: 0, y: 0, })
    gsap.to('#left-arm-1',{ rotate: 0, })
    gsap.to('#right-arm-1',{ rotate: 0, })
}


for (let i = 0; i < 20; i++) {
    let snow = document.querySelector("#snow").cloneNode(true);
    gsap.set(snow, {
        attr: {
            cx: "115.05",
            cy: "117.16",
            r: "6.97",
            fill: "#fff"
        },
        scale: "random(0.5, 1)",
        x: -100 + (i * 15),
        y: 200 + (i * 10),
        opacity: 0,
    });
    document.querySelector("svg").appendChild(snow);

    const snowTl = gsap.timeline({
        repeat: -1,
    })
    .to(snow, {
        x: (i * 15) + 350,
        y: (i * 5),
        duration: "random(0.8, 1)",
    },0)
    .to(snow, {
        opacity: 1,
        duration: 0.1,
    },0)
    .to(snow, {
        opacity: 0,
        duration: 0.4,
    },"-=0.4")
    .seek(100)

    
}


const svg = document.getElementById("hover");

svg.addEventListener('mouseover', () => {
    hatTl.timeScale(1.8);
    skingTl.timeScale(0.9);
    speedTl.restart();
})
svg.addEventListener('mouseleave', () => {
    hatTl.timeScale(1);
    skingTl.timeScale(0.4);
    resetPosition();
})