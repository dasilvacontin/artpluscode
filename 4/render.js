// transform muse - hysteria  (some song) into an image
// each row of pixels will be like a second
// showing intensity of each frequence

/*
sample-rate (sampling rate, S/s):
number of samples per second

sample:
approximation of audio signal, numbers referring to the height of the wave at that point.

bit depth:
number of points per per sample. e.g. 16-bit digital
(usually 16-bit for CD quality)
*/

const audioContext = new AudioContext()

const processorNode = audioContext.createScriptProcessor(2048, 1, 1)
processorNode.connect(audioContext.destination)

const analyser = audioContext.createAnalyser()
analyser.smoothingTimeConstant = 0.3
analyser.fftSize = 1024

const sourceNode = audioContext.createBufferSource()
sourceNode.connect(audioContext.destination)
sourceNode.connect(analyser)
analyser.connect(processorNode)

const req = new XMLHttpRequest()
fetch('mutemath - vitals.mp3', { mode: 'cors' })
.then(response => response.arrayBuffer())
.then(buffer => audioContext.decodeAudioData(buffer))
.then(audioBuffer => {
    sourceNode.buffer = audioBuffer
    sourceNode.start(0)
})

let colors = (localStorage.colors && JSON.parse(localStorage.colors)) || {
    primary: '#6970e8',
    secondary: '#ffd9fa',
    background: '#2ae1ff'
}

colors = {
    primary: '#7081fa',
    secondary: '#def5ff',
    background: '#aad7ff'
}

colors = {
    primary: '#7384ff',
    secondary: '#def5ff',
    background: '#a8d5fc'
}

colors = {
    primary: '#5f72ff',
    secondary: '#8cf1ff',
    background: '#ffffff'
}

const params = {
    title: 'MUTEMATH - VITALS',
    tilt: 0.5
}

function init () {
    ctx.fillStyle = colors.background
    ctx.fillRect(0,0,width,height)
}

// http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
processorNode.onaudioprocess = function () {
    const sample = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(sample)

    // translate old musics bars
    const dpx = 2
    ctx.drawImage(canvas,
        /* source: */ 0,  0, width*dpx,(3*height/4+4)*dpx,
        /* dest:   */ 0, -2, width,    (3*height/4+4)
    )

    // position origin to bottom half of screen
    const spectrumWidth = 900
    ctx.save()
    ctx.translate(width/2, 3*height/4)
    ctx.scale(.5,.5)
    ctx.translate(-spectrumWidth*0.67/2 + 256/5, 0)


    const barWidth = (spectrumWidth / sample.length)
    for (let x = 0; x < sample.length; ++x) {
        // frequency data for current bar
        const val = sample[x]

        // draw right side of bar
        ctx.strokeStyle = colors.secondary
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(x * barWidth + 2, -2)
        ctx.lineTo(x * barWidth + 2 - val * params.tilt, -2 -val)
        ctx.stroke()

        // draw front side of bar
        ctx.strokeStyle = colors.primary
        ctx.beginPath()
        ctx.moveTo(x * barWidth, 0)
        ctx.lineTo(x * barWidth - val * params.tilt, -val)
        ctx.stroke()
    }

    // draw song title
    ctx.fillStyle = colors.background
    ctx.fillRect(-10, 10, 300, 100)
    ctx.fillStyle = colors.primary
    ctx.font = 'bold 20px Helvetica'
    ctx.fillText(params.title, -2, 30)
    ctx.restore()
}

// parameter edition UI
const gui = new dat.GUI()
gui.add(params, 'tilt')
gui.add(params, 'title')
gui.addColor(colors, 'primary').onChange(saveColors)
gui.addColor(colors, 'secondary').onChange(saveColors)
gui.addColor(colors, 'background').onChange(() => {init();saveColors()})

function saveColors () {
    localStorage.setItem('colors', JSON.stringify(colors))
}