const jittery = document.getElementById("jittery");
const aText = jittery.innerText.split("");
let letters = "";

for (let i = 0; i < aText.length; i++) {
    letters += `<span style="animation-delay: -${i * 25 + 70}ms;">${aText[i]}</span>`;
}

jittery.innerHTML = letters;
