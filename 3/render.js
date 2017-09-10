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

const jsNode = audioContext.createScriptProcessor(2048, 1, 1)
jsNode.connect(audioContext.destination)

const analyser = audioContext.createAnalyser()
analyser.smoothingTimeConstant = 0.3
analyser.fftSize = 1024

const sourceNode = audioContext.createBufferSource()
sourceNode.connect(audioContext.destination)
sourceNode.connect(analyser)
analyser.connect(jsNode)

const req = new XMLHttpRequest()
fetch('mutemath - vitals.mp3', { mode: 'cors' })
.then(response => response.arrayBuffer())
.then(buffer => audioContext.decodeAudioData(buffer))
.then(audioBuffer => {
    sourceNode.buffer = audioBuffer
    sourceNode.start(0)
})

const MAX_SAMPLES = 300
const GREEN = '#69E8BB'
// http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound

const arrays = []
jsNode.onaudioprocess = function () {
    const array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(array)
    arrays.unshift(array)
    if (arrays.length > MAX_SAMPLES) arrays.pop()

    ctx.fillStyle = '#f3fdff'
    ctx.fillStyle = 'black'
    ctx.fillStyle = '#5fd2a9'
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
    // ctx.clearRect(0, 0, width, height)
    const barWidth = width / array.length

    ctx.save()
    ctx.translate(75, - MAX_SAMPLES / 2)
    ctx.translate(width / 2, height / 2)
    ctx.scale(0.5, 0.5)
    ctx.translate(- width, - height)
    ctx.lineWidth = 3

    for (let k = MAX_SAMPLES; k >= 0; --k) {
        const array = arrays[k]
        ctx.translate(0, 2)
        if (!array) continue
        for (let i = 0; i < array.length; ++i) {
            const val = array[i]
            // ctx.fillRect(i * barWidth, height, barWidth, (-array[i]/255) * height)
            ctx.strokeStyle = 'white'
            ctx.beginPath()
            ctx.moveTo(i * barWidth + 257, height - 2)
            ctx.lineTo(i * barWidth + 257 - val / 2, height - 2 - val)
            ctx.stroke()

            ctx.strokeStyle = GREEN
            ctx.beginPath()
            ctx.moveTo(i * barWidth + 255, height)
            ctx.lineTo(i * barWidth + 255 - val / 2, height - val)
            ctx.stroke()
        }
    }
    ctx.fillStyle = GREEN
    ctx.font = 'bold 20px Helvetica'
    ctx.fillText('MUTEMATH - VITALS', 255 - 2, height + 30)
    ctx.restore()
}

function render () {

}