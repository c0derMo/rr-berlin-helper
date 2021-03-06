const Jimp = require("jimp");

const width = 1920;
const height = 397;

const red = 0xA11515FF;
const blue = 0x1629A6FF;

function drawRedPlayer(image) {
    let i = 0;
    while(i<100) {
        let j = 0;
        while(j < i+1) {
            image.setPixelColor(red, 1315+j, 99-i);
            j++;
        }
        i++;
    }
}

function drawBluePlayer(image) {
    let i = 0;
    while(i<100) {
        let j = 0;
        while(j < i+1) {
            image.setPixelColor(blue, 602-j, 99-i);
            j++;
        }
        i++;
    }
}

function drawBluePlayerDone(image, idx) {
    let left = 842 + (((idx)%3)) * 233;
    let top = 0;
    if(idx > 2) {
        top = 161;
    }
    let i = 0;
    while(i<29) {
        let j = 0;
        while(j < i+1) {
            image.setPixelColor(blue, left+i-29, top+j);
            j++;
        }
        i++;
    }
}

function drawRedPlayerDone(image, idx) {
    let left = 842 + (((idx)%3)) * 233;
    let top = 58;
    if(idx > 2) {
        top = 216;
    }
    let i = 0;
    while(i<29) {
        let j = 0;
        while(j < i+1) {
            image.setPixelColor(red, left+i-29, top-j);
            j++;
        }
        i++;
    }
}

function drawState(state) {
    new Jimp(width, height, function(err, image) {
        if(err) throw err;

        drawRedPlayer(image);
        drawBluePlayer(image);
        state.forEach(function(elem, idx) {
            if(elem.blue) {
                drawBluePlayerDone(image, idx);
            }
            if(elem.red) {
                drawRedPlayerDone(image, idx);
            }
        });

        image.write("berlin.png", (err) => {
            if(err) throw err;
        })
    });
}

// drawState([{"blue": true, "red": true},{"blue": true, "red": true},{"blue": true, "red": true},{"blue": true, "red": true},{"blue": true, "red": true}])

module.exports = drawState;