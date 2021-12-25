let simpleParallax;

function Snowfall(params) {
  const snowfall = this;
  let CANVAS_WIDTH = 600;
  let CANVAS_HEIGHT = 400;
  const TOTAL_SNOWFLAKES = 6000;
  const FALL_TIME = 13;
  const TOTAL_SNOWFLAKE_LAYERS = 8;
  const BLOW_DISTANCE = 400;
  let snowfallLayersByIndex = [];
  let snowfallLayersByCanvasId = [];
  let bSimpleParallaxLibLoaded = false;
  let coreSnowflakeStylesNd;
  let skyNd = getVal(params, "skyNode", document.body);

  const moonlitEvening = {
    skyColor1: "#2B3C46",
    skyColor2: "#3363A1",
    flakeColors: ["#61899e", "#61899e"]
  };

  try {
    window.addEventListener("DOMContentLoaded", domContentLoaded);

    function domContentLoaded(evt) {
      try {
        CANVAS_WIDTH = screen.width + BLOW_DISTANCE * 2;
        CANVAS_HEIGHT = screen.height + 100;
        let bSkyStyleBuilt = false;
        let sSnowySkyClass = "snowySky";

        if (typeof SimpleParallax !== "undefined") {
          simpleParallax = new SimpleParallax({
            maxMovement: BLOW_DISTANCE * 2
          });
          bSimpleParallaxLibLoaded = true;
        } // end if

        coreSnowflakeStylesNd = document.getElementById("coreSnowflakeStyles");
        if (
          coreSnowflakeStylesNd === null ||
          typeof coreSnowflakeStylesNd === "undefined"
        ) {
          coreSnowflakeStylesNd = document.createElement("style");
          coreSnowflakeStylesNd.id = "coreSnowflakeStyles";
          let s = [];

          //s.push("")
          //s.push("  ")
          if (
            skyNd.style.background === "" &&
            skyNd.style.backgroundImage === ""
          ) {
            let dt = new Date();
            let nCode = dt.getTime();
            sSnowySkyClass = sSnowySkyClass + nCode + "";

            s.push("." + sSnowySkyClass + " {");
            s.push("  height: 100%;");
            s.push("  background-image: linear-gradient(#2B3C46, #3363A1);");
            s.push("  padding:0px;");
            s.push("  margin:0px;");
            s.push("  overflow:hidden;");
            s.push("  background-repeat: no-repeat;");
            s.push("  background-attachment: fixed;");
            s.push("}");
            s.push("");
            bSkyStyleBuilt = true;
          } // end if

          s.push(".snowFlakes {");
          s.push("  position:absolute;");
          s.push("  top:0px;");
          s.push("  left:0px;");
          s.push("  overflow:hidden;");
          s.push("  opacity:.8;");
          s.push("}");
          s.push("");

          s.push(".iAmHidden {");
          s.push("  display:none;");
          s.push("}");

          if (!bSimpleParallaxLibLoaded) {
            s.push("");
            s.push(".snowLayer {");
            s.push("  position:absolute;");
            s.push("  left:-" + BLOW_DISTANCE + "px;");
            s.push("  top:-" + BLOW_DISTANCE + "px;");
            s.push("  overflow:hidden;");
            s.push("}");
          } // end if

          coreSnowflakeStylesNd.innerHTML = s.join("\n");
          document.body.appendChild(coreSnowflakeStylesNd);

          if (bSkyStyleBuilt) {
            skyNd.className = sSnowySkyClass;
          } // end if
        } // end if

        setupSnowFlakeLayers();
      } catch (err) {
        logErr(err);
      } // end of try/catch block
    } // end of domContentLoaded()

    function setupSnowFlakeLayers() {
      try {
        let flakeColors = [];
        for (let n = 0; n < TOTAL_SNOWFLAKE_LAYERS; n++) {
          flakeColors.push("white"); // set defaults
        } // next n

        // furthest away is darkest
        flakeColors[0] = "#61899e";
        flakeColors[1] = "#61899e";
        flakeColors[2] = "#81a0b1";
        flakeColors[3] = "#81a0b1";
        flakeColors[4] = "#d0dce2";
        flakeColors[5] = "#eff3f5";

        for (let n = 0; n < TOTAL_SNOWFLAKE_LAYERS; n++) {
          let dv;

          if (bSimpleParallaxLibLoaded) {
            const layer = simpleParallax.addLayer();
            dv = layer.domNode;
          } else {
            // no parallax...
            dv = document.createElement("div");
            dv.className = "snowLayer";
            dv.style.width = CANVAS_WIDTH + "px";
            dv.style.height = CANVAS_HEIGHT + "px";
            dv.style.margin = "0px";
            dv.style.padding = "0px";
            dv.style.boxSizing = "border-box";
            document.body.appendChild(dv);
          } // end if/else

          drawSnowFlakesForLayer(n + 1, dv, flakeColors[n]);
        } // next n
      } catch (err) {
        logErr(err);
      } // end of try/catch block
    } // end of setupSnowFlakeLayers()

    function drawSnowFlakesForLayer(nCanvas, cntrNd, siFlakeColor) {
      try {
        const canvasA = document.createElement("canvas");
        const canvasB = document.createElement("canvas");
        const aniStyle = document.createElement("style");

        canvasA.id = "sn" + nCanvas + "_A";
        canvasB.id = "sn" + nCanvas + "_B";

        let sFlakeColor = "white";

        if (typeof siFlakeColor === "string") {
          sFlakeColor = siFlakeColor;
        } // end if

        drawSnowflakesOnCanvas(canvasA, nCanvas, sFlakeColor);
        drawSnowflakesOnCanvas(canvasB, nCanvas, sFlakeColor);

        cntrNd.appendChild(canvasA);
        cntrNd.appendChild(canvasB);

        let nRange = BLOW_DISTANCE * 2;

        let xOffset = intRnd(nRange) - Math.floor(nRange / 2);

        const s = [];

        // s.push("")
        s.push("@keyframes snowfall" + nCanvas + "Part1 {");
        s.push(" from {");
        s.push("        transform: translate(0px, -" + screen.height + "px);");
        s.push("        opacity:.5;");
        s.push("      }");
        s.push(" 20%  {");
        s.push("        opacity:1;");
        s.push("      }");

        s.push(" to {transform: translate(" + xOffset + "px, 0px);}");
        s.push("}");
        s.push("");
        s.push(".doAni" + nCanvas + "Part1 {");
        s.push(" animation-name: snowfall" + nCanvas + "Part1;");
        s.push(" animation-duration: " + (FALL_TIME - nCanvas / 2) + "s;");
        s.push(" animation-timing-function:linear;");
        s.push(" animation-fill-mode: both;");
        s.push("}");

        s.push("");
        s.push("@keyframes snowfall" + nCanvas + "Part2 {");
        s.push(" from {");
        s.push("       transform: translate(" + xOffset + "px, 0px);");
        s.push("       opacity:.5;");
        s.push("      }");
        s.push(" 20%  {");
        s.push("        opacity:1;");
        s.push("      }");
        s.push(
          " to {transform: translate(" +
            xOffset * 2 +
            "px, " +
            screen.height +
            "px);}"
        );
        s.push("}");
        s.push("");
        s.push(".doAni" + nCanvas + "Part2 {");
        s.push(" animation-name: snowfall" + nCanvas + "Part2;");
        s.push(" animation-duration: " + (FALL_TIME - nCanvas / 2) + "s;");
        s.push(" animation-timing-function:linear;");
        s.push(" animation-fill-mode: both;");
        s.push("}");

        aniStyle.innerHTML = s.join("\n");
        document.body.appendChild(aniStyle);

        const snowflakeLayer = {};
        snowflakeLayer.layerNum = nCanvas;
        snowflakeLayer.aniPart1 = "doAni" + nCanvas + "Part1";
        snowflakeLayer.aniPart2 = "doAni" + nCanvas + "Part2";
        snowflakeLayer.canvasA = canvasA;
        snowflakeLayer.canvasB = canvasB;
        snowflakeLayer.currentAniPartA = 1;
        snowflakeLayer.currentAniPartB = 1;
        snowfallLayersByIndex.push(snowflakeLayer);
        snowfallLayersByCanvasId[canvasA.id] = snowflakeLayer;
        snowfallLayersByCanvasId[canvasB.id] = snowflakeLayer;

        canvasA.addEventListener("animationend", canvasAAnimationCompleted);
        canvasB.addEventListener("animationend", canvasBAnimationCompleted);

        canvasA.classList.add(snowflakeLayer.aniPart1);
        canvasB.classList.add("iAmHidden");
      } catch (err) {
        logErr(err);
      } // end of try/catch block
    } // end of drawSnowFlakesForLayer()

    function canvasAAnimationCompleted(evt) {
      try {
        const el = evt.srcElement || evt.originalTarget;

        const snowflakeLayer = snowfallLayersByCanvasId[el.id];

        const canvasA = snowflakeLayer.canvasA;
        const canvasB = snowflakeLayer.canvasB;

        snowflakeLayer.currentAniPartA = handleAnimationSwitch(
          canvasA,
          canvasB,
          snowflakeLayer.currentAniPartA,
          snowflakeLayer.aniPart1,
          snowflakeLayer.aniPart2,
          "A"
        );
      } catch (err) {
        logErr(err);
      } // end of try/catch block
    } // end of canvasAAnimationCompleted()

    function canvasBAnimationCompleted(evt) {
      try {
        const el = evt.srcElement || evt.originalTarget;

        const snowflakeLayer = snowfallLayersByCanvasId[el.id];

        const canvasA = snowflakeLayer.canvasA;
        const canvasB = snowflakeLayer.canvasB;

        snowflakeLayer.currentAniPartB = handleAnimationSwitch(
          canvasB,
          canvasA,
          snowflakeLayer.currentAniPartB,
          snowflakeLayer.aniPart1,
          snowflakeLayer.aniPart2,
          "B"
        );
      } catch (err) {
        logErr(err);
      } // end of try/catch block
    } // end of canvasBAnimationCompleted()

    /*
     step 1:   (part 1 animation finishes ... A Canvas)
        (A) canvas moves from part 1 to part 2
        (B) canvas moves from hidden to part 1

     step 2:   (part 2 animation finishes ... A Canvas)
        (A) canvas moves from part 2 to hidden
   */

    function handleAnimationSwitch(
      eventCanvas,
      otherCanvas,
      currentAniPart,
      sAniPart1,
      sAniPart2,
      sAB
    ) {
      try {
        if (currentAniPart === 1) {
          /*
          - move from part1 animation to part2 animation on event canvas
          - move from hidden to part1 animation on other canvas.
         */
          eventCanvas.classList.remove(sAniPart1);
          eventCanvas.classList.add(sAniPart2);

          otherCanvas.classList.remove("iAmHidden");
          otherCanvas.classList.add(sAniPart1); // when done should trigger canvasBAnimationCompleted

          currentAniPart = 2;
          return currentAniPart;
        } // end if

        /*
         - move from part2 animation to hidden on event canvas
       */
        eventCanvas.classList.remove(sAniPart2);
        eventCanvas.classList.add(sAniPart1);
        currentAniPart = 1;
        return currentAniPart;
      } catch (err) {
        logErr(err);
      } // end try/catch
    } // end of handleAnimationSwitch()

    function drawSnowflakesOnCanvas(canvas, nLayer, siFlakeColor) {
      try {
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        canvas.style.width = CANVAS_WIDTH + "px";
        canvas.style.height = CANVAS_HEIGHT + "px";
        canvas.style.zIndex = nLayer * 4 + "";
        canvas.className = "snowFlakes";

        let sFlakeColor = "white";

        if (typeof siFlakeColor === "string") {
          sFlakeColor = siFlakeColor;
        } // end if

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = sFlakeColor;

        for (let n = 0; n < TOTAL_SNOWFLAKES; n++) {
          ctx.beginPath();
          let x = intRnd(CANVAS_WIDTH);
          let y = intRnd(CANVAS_HEIGHT);
          let nSize = 1 + intRnd(2);
          ctx.arc(x, y, nSize, 0, Math.PI * 2, true); //
          ctx.fill();
        } // next n
      } catch (err) {
        logErr(err);
      } // end of try/catch
    } // end of drawSnowflakesOnCanvas()

    function intRnd(nMax) {
      return Math.floor(Math.random() * nMax);
    } // end of function intRnd()
  } catch (err) {
    logErr(err);
  } // end of try/catch block for Snowfall

  function getVal(params, sParam, defVal) {
    if (!params) {
      params = {};
    } // end if

    if (params[sParam]) {
      return params[sParam];
    } else {
      if (typeof params[sParam] === "boolean") {
        return params[sParam];
      } // end if

      return defVal;
    } // if / else
  } // end of function getVal()

  /*************************************************************************
   *************************************************************************/

  function logErr(err) {
    console.group();
    console.error(err.message);
    console.error("line: " + err.line);
    console.groupEnd();
  } // end of logErr()
} // end of Snowfall() Constructor

const snowfall = new Snowfall();

// typing

const words = [
  "I know it's a scary time right now . . .",
  "But that doesn't stop us from Being thankful.",
  "I'm thankful for all the blessings I received this year.",
  "And thankful for the challenges that came along the way.",
  "And I'm thankful for all the love.",
  "I don't want much for Christmas . . . I just want the person reading this to feel loved.",
  "May you get everything you want and need to fill your family and life with happiness.",
  "Merry Christmas!"
];
let i = 0;
let timer;
// speed in ms
let deleteDelay = 3000;
let typeSpeed = 100;
let delSpeed = 50;

function typingEffect() {
  let word = words[i].split("");
  var loopTyping = function () {
    if (word.length > 0) {
      document.getElementById("word").innerHTML += word.shift();
    } else {
      delay(function () {
        deletingEffect(); // do stuff
      }, deleteDelay); // end delay
      // deletingEffect();
      return false;
    }
    timer = setTimeout(loopTyping, typeSpeed);
  };
  loopTyping();
}

function deletingEffect() {
  let word = words[i].split("");
  var loopDeleting = function () {
    if (word.length > 0) {
      word.pop();
      document.getElementById("word").innerHTML = word.join("");
    } else {
      if (words.length > i + 1) {
        i++;
      }
      // else {
      //   i = 0;
      // }
      typingEffect();
      return false;
    }

    timer = setTimeout(loopDeleting, delSpeed);
  };

  loopDeleting();
}

var delay = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

typingEffect();