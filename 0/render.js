const start = Date.now()
const EDGE = 40

function render () {
    ctx.fillStyle = 'magenta'
    ctx.fillRect(0, 0, width, height)

    const delta = floor((Date.now() - start) / 100)
    ctx.fillStyle = 'white'

    for (let i = 0; i <= height / EDGE; ++i) {
        for (let j = 0; j <= width / EDGE; ++j) {
            const num = ((i + j + delta) / 7) % (Math.PI / 2)
            ctx.globalAlpha = abs(sin(num))
            ctx.fillRect(j * EDGE, i * EDGE, EDGE, EDGE)
        }
    }
}
















