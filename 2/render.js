let SPACING = 9
let OFFSET = -3
let textData

function init () {
    ctx.save()
    ctx.font = '120px Helvetica'
    ctx.translate(20, 20)
    ;'Aim for the impossible'.split(' ').forEach(word => {
        ctx.translate(0, 120)
        ctx.fillText(word, 0, 0)
    })
    ctx.restore()
    textData = ctx.getImageData(0, 0, canvas.width, canvas.height) 
}

function render () {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i <= width / SPACING; ++i) {
        for (let j = 0; j <= height / SPACING; ++j) {
            const x = j * SPACING
            const y = i * SPACING
            ctx.strokeStyle = 'black'
            if (x > 0) joinPoints({x: (x - SPACING), y: y}, {x: x, y: y})
            if (y > 0) joinPoints({x: x, y: (y - SPACING)}, {x: x, y: y})
        }
    }
}

function joinPoints (p1, p2) {
    const offset1 = isPixelPainted(textData, p1.x, p1.y) ? OFFSET : 0
    const offset2 = isPixelPainted(textData, p2.x, p2.y) ? OFFSET : 0

    ctx.beginPath()
    ctx.moveTo(p1.x + offset1, p1.y + offset1)
    ctx.lineTo(p2.x + offset2, p2.y + offset2)
    ctx.stroke()
}









