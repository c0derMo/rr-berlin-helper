const Jimp = require("jimp");

function drawTriangle(image,x,y,size,direction,color) {
    const directionSplit = direction.split("-")
    let i = 0;
    while(i < size+1) {
        let j = 0;
        while (j < size-i+1) {
            let currentX, currentY;
            if (directionSplit[0] === "left") {
                currentX = x - j;
            } else {
                currentX = x + j;
            }
            if (directionSplit[1] === "up") {
                currentY = y - i;
            } else {
                currentY = y + i;
            }
            image.setPixelColor(parseInt(color), currentX, currentY);
            j++;
        }
        i++;
    }
}

function drawPlayerIndicator(image,config,side) {
    const indicatorConfig = config.playerindicators[side]
    // TODO: Implement more types
    if (indicatorConfig.type === "triangle") {
        drawTriangle(image,indicatorConfig.x,indicatorConfig.y,indicatorConfig.size,indicatorConfig.direction,config.colors[side])
    }
}

function drawTargetIndicator(image,config,side,index) {
    const offsetX = config.targetindicators[index].x + config.targetindicators[side].offsetX
    const offsetY = config.targetindicators[index].y + config.targetindicators[side].offsetY
    drawTriangle(image, offsetX, offsetY, config.targetindicators[side].size, config.targetindicators[side].direction, config.colors[side])
}

function drawState(config, state) {
    new Jimp(config.width, config.height, function(err, image) {
        if(err) throw err;

        drawPlayerIndicator(image,config,"left");
        drawPlayerIndicator(image,config,"right");

        state.forEach(function(elem, idx) {
            if(elem.blue) {
                drawTargetIndicator(image, config, "left", idx+1)
            }
            if(elem.red) {
                drawTargetIndicator(image, config, "right", idx+1)
            }
        })

        image.write("berlin.png", (err) => {
            if(err) throw err;
        })
    })
}

// drawState(config, [{"blue": true, "red": true},{"blue": true, "red": true},{"blue": true, "red": true},{"blue": true, "red": true},{"blue": true, "red": true}])

module.exports = drawState;