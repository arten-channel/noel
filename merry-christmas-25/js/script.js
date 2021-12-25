window.onload = function () {
    var CHRISTMAS_SPIRIT = true;
    var URL, TOP_TEXT, BOTTOM_TEXT;

    if (CHRISTMAS_SPIRIT) {

        URL = "audio/Jingle-Bell-Rock_Bobby-Helms.mp3";
        TOP_TEXT = "Merry";
        BOTTOM_TEXT = "Christmas";

    } else {

        URL = "audio/Joey-Pecoraro_tired-boy.mp3";
        TOP_TEXT = "Joey Pecoraro";
        BOTTOM_TEXT = "Tired Boy";

    }

    function Snowflake(xBound, yBound) {
        this.x = Math.random() * xBound;
        this.y = Math.random() * yBound;
        this.xBound = xBound;
        this.yBound = yBound;
        this.radius = Math.random() * 5 + 2;
        this.v = this.radius / 5;
    }

    Snowflake.prototype.update = function () {
        this.y += this.v;
        if (this.y - this.radius >= this.yBound) {
            this.y = 0 - this.radius;
        }
    };

    Snowflake.prototype.render = function ($) {
        this.update();
        $.beginPath();
        $.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        $.fill();
    };

    var i, value0, value1, angle, points, point0, point1, array0, array1, middlePointX, middlePointY, s, snowflakes;
    var c = document.getElementById('c');
    var $ = c.getContext('2d');
    var w = c.width = window.innerWidth;
    var h = c.height = window.innerHeight;
    $.textAlign = "center";
    $.lineJoin = "round";
    $.strokeStyle = 'white';
    $.lineWidth = 5;
    $.font = "30px Pacifico";

    var MODE = "columns";
    var MAX_SNOWFLAKES = 100;
    var NUMBER_OF_POINTS = 150; 
    var RADIUS = 200; 
    var VISUALISER_RESOLUTION = 8192; 
    var FREQUENCY_MULTIPLIER = 0.7; 


    var SCREEN_CENTER = {
        X: w / 2,
        Y: h / 2
    };
    var THIRD_OF_CIRCUMFERENCE = (Math.PI * 2) / 3;
    var TEXT_INCLINATION = -Math.PI / 8;
    var CIRCUMFERENCE_STEPS = (2 * Math.PI) / (NUMBER_OF_POINTS * 2);
    var COLUMNS_WIDTH = (RADIUS * 2 * Math.PI) / (NUMBER_OF_POINTS * 2);

    var OUTER_GRADIENT = $.createRadialGradient(SCREEN_CENTER.X, SCREEN_CENTER.Y, 0, SCREEN_CENTER.X, SCREEN_CENTER.Y, w / 2);

    OUTER_GRADIENT.addColorStop(0, 'rgb(255, 0, 127)');
    OUTER_GRADIENT.addColorStop(1, 'rgb(163, 0, 163)');

    var INNER_GRADIENT = $.createRadialGradient(SCREEN_CENTER.X, SCREEN_CENTER.Y, RADIUS, SCREEN_CENTER.X, SCREEN_CENTER.Y, 400);

    INNER_GRADIENT.addColorStop(1, 'rgb(127, 0, 63)');
    INNER_GRADIENT.addColorStop(0.05, 'rgb(191, 0, 191)');

    if (CHRISTMAS_SPIRIT) {

        snowflakes = [];

        var OUTER_GRADIENT = $.createRadialGradient(SCREEN_CENTER.X, SCREEN_CENTER.Y, 0, SCREEN_CENTER.X, SCREEN_CENTER.Y, w / 2);

        OUTER_GRADIENT.addColorStop(0, 'rgb(255, 0, 0)');
        OUTER_GRADIENT.addColorStop(1, 'rgb(122, 22, 22)');

        var INNER_GRADIENT = $.createRadialGradient(SCREEN_CENTER.X, SCREEN_CENTER.Y, RADIUS, SCREEN_CENTER.X, SCREEN_CENTER.Y, 400);

        INNER_GRADIENT.addColorStop(1, 'rgb(3, 175, 20)');
        INNER_GRADIENT.addColorStop(0.05, 'rgb(11, 86, 18)');

        for (i = 0; i < MAX_SNOWFLAKES; i++) {
            s = new Snowflake(w, h);
            snowflakes.push(s);
        }

    }

    var triangleRotationStep = 0,
        triangleRotationAngle = 0;

    visualise();

    if (!window.AudioContext) {
        if (window.webkitAudioContext) {
            window.AudioContext = window.webkitAudioContext;
        } else {
            throw new Error('audio context not supported :(');
        }
    }

    var audioContext = new AudioContext();

    var analyserChannel0 = audioContext.createAnalyser();
    var analyserChannel1 = audioContext.createAnalyser();
    analyserChannel0.fftSize = analyserChannel1.fftSize = VISUALISER_RESOLUTION;

    var processingNode = audioContext.createScriptProcessor(1024);
    processingNode.connect(audioContext.destination);
    processingNode.onaudioprocess = function (event) {
        array0 = new Uint8Array(analyserChannel0.frequencyBinCount);
        array1 = new Uint8Array(analyserChannel1.frequencyBinCount);
        analyserChannel0.getByteFrequencyData(array0);
        analyserChannel1.getByteFrequencyData(array1);
        visualise(array0, array1);
    };

    var splitter = audioContext.createChannelSplitter(2);

    splitter.connect(analyserChannel0, 0);
    splitter.connect(analyserChannel1, 1);

    var audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.src = URL;
    audio.volume = 0.5;
    audio.addEventListener("canplaythrough", function () {

        console.log('sound clip at ' + this.src + ' loaded successfully');
        var source = audioContext.createMediaElementSource(this);
        source.connect(audioContext.destination);
        source.connect(splitter);
        source.connect(processingNode);
        this.play();

    });

    function visualise(array0, array1) {

        points = [];

        $.clearRect(0, 0, w, h);

        $.fillStyle = OUTER_GRADIENT;
        $.fillRect(0, 0, w, h);

        if (CHRISTMAS_SPIRIT) {

            $.fillStyle = 'white';

            for (i = 0; i < snowflakes.length; i++) {
                snowflakes[i].render($);
            }

        }

        $.fillStyle = INNER_GRADIENT;

        if (array0 && array1) {


            for (i = 0; i < NUMBER_OF_POINTS; i++) {
                value0 = array0[i] * FREQUENCY_MULTIPLIER;
                value1 = array1[i] * FREQUENCY_MULTIPLIER;
                angle = i * CIRCUMFERENCE_STEPS - (Math.PI / 2);
                point0 = {
                    x: SCREEN_CENTER.X + (Math.cos(angle) * (RADIUS + value0)),
                    y: SCREEN_CENTER.Y + (Math.sin(angle) * (RADIUS + value0)),
                    value: value0
                };
                point1 = {
                    x: SCREEN_CENTER.X - (Math.cos(angle + CIRCUMFERENCE_STEPS) * (RADIUS + value1)),
                    y: SCREEN_CENTER.Y + (Math.sin(angle + CIRCUMFERENCE_STEPS) * (RADIUS + value1)),
                    value: value1
                };
                points.push(point0);
                points.unshift(point1);
            }

            if (MODE === "goo") {


                $.beginPath();
                $.moveTo(points[0].x, points[0].y);
                for (i = 1; i < points.length - 1; i++) {
                    middlePointX = (points[i].x + points[i + 1].x) / 2;
                    middlePointY = (points[i].y + points[i + 1].y) / 2;
                    $.quadraticCurveTo(points[i].x, points[i].y, middlePointX, middlePointY);
                }
                $.quadraticCurveTo(points[i].x, points[i].y, points[0].x, points[0].y);
                $.closePath();
                $.stroke();
                $.fill();

            }

            if (MODE === "columns") {

                $.beginPath();
                for (i = 0; i < points.length; i++) {
                    $.save();
                    $.translate(points[i].x, points[i].y);
                    $.rotate(i * CIRCUMFERENCE_STEPS);
                    $.fillRect(-(COLUMNS_WIDTH / 2), 0, COLUMNS_WIDTH - 1, -points[i].value);
                    $.restore();
                }

            }

            $.beginPath();
            $.arc(SCREEN_CENTER.X, SCREEN_CENTER.Y, RADIUS, 0, 2 * Math.PI);
            $.fill();
            $.stroke();

        } else {
            $.beginPath();
            $.arc(SCREEN_CENTER.X, SCREEN_CENTER.Y, RADIUS, 0, 2 * Math.PI);
            $.fill();
            $.stroke();

        }

        $.fillStyle = OUTER_GRADIENT;
        $.beginPath();
        $.moveTo(SCREEN_CENTER.X + Math.cos(triangleRotationAngle) * (RADIUS - 5), SCREEN_CENTER.Y + Math.sin(triangleRotationAngle) * (RADIUS - 5));
        $.lineTo(SCREEN_CENTER.X + Math.cos(triangleRotationAngle + THIRD_OF_CIRCUMFERENCE) * (RADIUS - 5), SCREEN_CENTER.Y + Math.sin(triangleRotationAngle + THIRD_OF_CIRCUMFERENCE) * (RADIUS - 5));
        $.lineTo(SCREEN_CENTER.X + Math.cos(triangleRotationAngle - THIRD_OF_CIRCUMFERENCE) * (RADIUS - 5), SCREEN_CENTER.Y + Math.sin(triangleRotationAngle - THIRD_OF_CIRCUMFERENCE) * (RADIUS - 5));
        $.closePath();
        $.stroke();
        $.fill();

        if (audio && !audio.paused && triangleRotationStep < 0.05) {
            triangleRotationStep += 0.001;
        } else if (audio && audio.paused && triangleRotationStep > 0) {
            triangleRotationStep -= 0.001;
        }
        triangleRotationAngle += triangleRotationStep;

        $.save();
        $.fillStyle = "white";
        $.translate(SCREEN_CENTER.X, SCREEN_CENTER.Y);
        $.rotate(TEXT_INCLINATION);
        if (CHRISTMAS_SPIRIT) {
            $.font = "35px Pacifico";
            $.fillText(TOP_TEXT, -30, -40);
            $.font = "85px Pacifico";
            $.fillText(BOTTOM_TEXT, 0, 40);
        } else {
            $.font = "30px Pacifico";
            $.fillText(TOP_TEXT, -43, -50);
            $.font = "85px Pacifico";
            $.fillText(BOTTOM_TEXT, 0, 40);
        }
        $.restore();

    }

    window.addEventListener('resize', function () {

        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
        SCREEN_CENTER = {
            X: w / 2,
            Y: h / 2
        };

        if (CHRISTMAS_SPIRIT) {

            snowflakes = [];

            for (i = 0; i < MAX_SNOWFLAKES; i++) {
                s = new Snowflake(w, h);
                snowflakes.push(s);
            }

            OUTER_GRADIENT = $.createRadialGradient(SCREEN_CENTER.X, SCREEN_CENTER.Y, 0, SCREEN_CENTER.X, SCREEN_CENTER.Y, w / 2);

            OUTER_GRADIENT.addColorStop(0, 'rgb(255, 0, 0)');
            OUTER_GRADIENT.addColorStop(1, 'rgb(122, 22, 22)');

            INNER_GRADIENT = $.createRadialGradient(SCREEN_CENTER.X, SCREEN_CENTER.Y, RADIUS, SCREEN_CENTER.X, SCREEN_CENTER.Y, 400);

            INNER_GRADIENT.addColorStop(1, 'rgb(3, 175, 20)');
            INNER_GRADIENT.addColorStop(0.05, 'rgb(11, 86, 18)');

        } else {

            OUTER_GRADIENT = $.createRadialGradient(SCREEN_CENTER.X, SCREEN_CENTER.Y, 0, SCREEN_CENTER.X, SCREEN_CENTER.Y, w / 2);

            OUTER_GRADIENT.addColorStop(0, 'rgb(255, 0, 127)');
            OUTER_GRADIENT.addColorStop(1, 'rgb(163, 0, 163)');

            INNER_GRADIENT = $.createRadialGradient(SCREEN_CENTER.X, SCREEN_CENTER.Y, RADIUS, SCREEN_CENTER.X, SCREEN_CENTER.Y, 400);

            INNER_GRADIENT.addColorStop(1, 'rgb(127, 0, 63)');
            INNER_GRADIENT.addColorStop(0.05, 'rgb(191, 0, 191)');

        }

        $.textAlign = "center";
        $.lineJoin = "round";
        $.strokeStyle = 'white';
        $.lineWidth = 5;

    });

    window.addEventListener('keypress', function (e) {
        if ((e.keyCode === 32 || e.keyCode === 0) && !audio.paused) {
            audio.pause();
        }
        if (e.keyCode === 13 && audio.paused) {
            audio.play();
        }
    });

    window.addEventListener('wheel', function (e) {
        if (e.wheelDeltaY > 0) {
            if (audio.volume < 0.95) {
                audio.volume += 0.04;
            } else {
                audio.volume = 1;
            }
        }
        if (e.wheelDeltaY < 0) {
            if (audio.volume > 0.05) {
                audio.volume -= 0.04;
            } else {
                audio.volume = 0;
            }
        }
    });

    window.addEventListener('click', function () {
        if (MODE === 'goo') {
            MODE = 'columns';
        } else if (MODE === 'columns') {
            MODE = 'goo';
        }
    });

};