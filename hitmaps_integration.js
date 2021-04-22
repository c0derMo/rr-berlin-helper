const https = require("https")

function requestSpinData(spinID, callback) {
    const options = {
        hostname: 'roulette.hitmaps.com',
        port: 443,
        path: '/api/matchups/' + spinID,
        method: 'GET'
    }
    
    const req = https.request(options, res => {
        let data = ""
    
        res.on('data', d => {
            data += d.toString();
        });
    
        res.on('end', () => {
            try {
                const otherData = JSON.parse(data)
                const importantData = JSON.parse(otherData.matchupData)
                const playerOne = otherData.playerOneName
                const playerTwo = otherData.playerTwoName

                let killConditions = {}

                if (importantData.missionName !== "Apex Predator") {
                    callback({status: "wrong_map"})
                } else if (new Date(importantData.matchTime) - new Date() > 0) {
                    callback({status: "spin_hasnt_arrived"})
                } else {
                    importantData.spinResults.forEach((e) => {
                        killConditions[e.target.id] = e.killMethod.name + " / " + e.disguise.name
                    })
                    callback({status: "success", killConditions: killConditions, playerOne: playerOne, playerTwo: playerTwo})
                }
            } catch {
                callback({status: "error"})
            }
        })
    })
    
    req.on('error', error => {
        console.error(error)
        callback({status: "error"})
    })
    
    req.end()
}

module.exports = requestSpinData