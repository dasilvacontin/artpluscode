const params = {
    bg: '#ffffff',
    strokeStyle: '#4636be',

    rot: 0.1,
    rot2: 0.1,
    inc: 0.005,
    inc2: 0.01,

    squareDiagonal: 70,
    vertixRadius: 0,
    vertixBorderSize: 8,
    edgeWidth: 8,
    columnHeight: 150,
    transparentBases: true,

    signatureMargin: 25,
}

const gui = new dat.GUI()
gui.addColor(params, 'bg')
gui.addColor(params, 'strokeStyle')

for (let param in params) {
    gui.add(params, param)
}

function renderSquare (rot) {
    ctx.fillStyle = params.bg
    ctx.strokeStyle = params.strokeStyle

    // render lines between square's vertices
    ctx.lineWidth = params.edgeWidth
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
        const angle = i * PI / 2 + rot
        const x = Math.cos(angle) * params.squareDiagonal
        const y = Math.sin(angle) * params.squareDiagonal
        ctx.lineTo(x, y)
    }
    if (!params.transparentBases) ctx.fill()
    ctx.stroke()

    // render square's vertices
    ctx.fillStyle = params.strokeStyle
    ctx.lineWidth = params.vertixBorderSize
    for (let i = 0; i < 4; i++) {
        const angle = i * PI / 2 + rot
        ctx.beginPath()
        ctx.arc(
            Math.cos(angle) * params.squareDiagonal,
            Math.sin(angle) * params.squareDiagonal,
            params.vertixRadius,
            0,
            2 * Math.PI
        )
        ctx.fill()
        ctx.stroke()
    }
}

function renderLines (rot, rot2) {
    ctx.lineWidth = params.edgeWidth
    ctx.lineCap = 'round'
    for (let i = 0; i < 4; i++) {
        const angle = i * PI / 2 + rot
        const angle2 = i * PI / 2 + rot2
        ctx.beginPath()
        ctx.moveTo(
            Math.cos(angle) * params.squareDiagonal,
            Math.sin(angle) * params.squareDiagonal + params.columnHeight / 2)
        ctx.lineTo(
            Math.cos(angle2) * params.squareDiagonal,
            Math.sin(angle2) * params.squareDiagonal - params.columnHeight / 2)
        ctx.strokeStyle = params.strokeStyle
        ctx.stroke()
    }
}

let count = 6
let i = 0
let j = 0

function init () {
    ctx.fillStyle = params.bg
    ctx.fillRect(0, 0, width, height)

    // render signature
    /*
    ctx.fillStyle = params.strokeStyle
    ctx.font = '12px Monaco'
    ctx.fillText('dasilvacontin',
        params.signatureMargin,
        height - params.signatureMargin)
    */
    ctx.scale(1 / count, 1 / count)
}

function render () {
    ctx.save()
    ctx.translate(width / 2, height / 2)

    ctx.translate(0, params.columnHeight / 2)
    renderSquare(params.rot)

    ctx.translate(0, - params.columnHeight / 2)
    renderLines(params.rot, params.rot2)

    ctx.translate(0, - params.columnHeight / 2)
    renderSquare(params.rot2)

    ctx.restore()

    j++;
    ctx.translate(width, 0)
    if (j > count) {
        j = 0;
        i++;
        ctx.translate(-(1+count)*width, height)
    }

    /*
    const mult = (2 * Math.PI / (count*count)) / 0.005
    params.rot += params.inc * mult
    params.rot2 += params.inc2 * mult
    */
    params.rot = 0.1 + (6*i+j) * 2 * Math.PI / 35
    params.rot2 = 0.1 + (6*i+j) * 4 * Math.PI / 35
}