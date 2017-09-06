const SECTION_HEIGHT = (height / 3)
const GRAPH_HEIGHT = (SECTION_HEIGHT * 0.6)

function renderFn (fn, x, graphY, color) {
    // graph axys + limits
    ctx.fillStyle = 'lightgray'
    ctx.fillRect(0, graphY, width, 1)
    ctx.fillRect(0, graphY - (GRAPH_HEIGHT / 2), width, 1)
    ctx.fillRect(0, graphY + (GRAPH_HEIGHT / 2), width, 1)

    // label
    ctx.fillStyle = color
    ctx.font= '16px monospace'
    ctx.fillText(fn.toString(), 0, graphY - (GRAPH_HEIGHT / 2) - 8)

    // graph fn
    const y = fn(x / 20)
    ctx.fillRect(x, graphY - y * (GRAPH_HEIGHT / 2), 1, 1)

    // bar with fn(x) as opacity
    ctx.save()
    ctx.globalAlpha = max(0, y)
    ctx.fillRect(x, graphY + (GRAPH_HEIGHT / 2) + 3, 1, 5)
    ctx.restore()
}

let x = 0
function render () {
    renderFn((x) => sin(x),            x, (SECTION_HEIGHT / 2),     'red')
    renderFn((x) => abs(sin(x)),       x, (SECTION_HEIGHT * 3 / 2), 'green')
    renderFn((x) => sin(x % (PI / 2)), x, (SECTION_HEIGHT * 5 / 2), 'blue')
    x++
}









