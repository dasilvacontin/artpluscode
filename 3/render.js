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

const arrays = []
jsNode.onaudioprocess = function () {
    const array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(array)
    arrays.unshift(array)

    ctx.fillStyle = '#f3fdff'
    ctx.fillRect(0, 0, width, height)
    const barWidth = width / 2 / array.length

    ctx.save()
    ctx.lineWidth = 3
    ctx.translate(0, -200)
    for (let k = 0; k < Math.min(arrays.length, 5); ++k) {
        const array = arrays[k]
        for (let i = 0; i < array.length; ++i) {
            const val = array[i]
            // ctx.fillRect(i * barWidth, height, barWidth, (-array[i]/255) * height)
            ctx.strokeStyle = 'lightgray'
            ctx.beginPath()
            ctx.moveTo(i * barWidth + 257, height - 2)
            ctx.lineTo(i * barWidth + 258 - val, height - 1 - val)
            ctx.stroke()
            ctx.strokeStyle = '#69E8BB'
            ctx.beginPath()
            ctx.moveTo(i * barWidth + 255, height)
            ctx.lineTo(i * barWidth + 255 - val, height - val)
            ctx.stroke()

            ctx.fillStyle = 'white'
            ctx.fillRect(i * barWidth + 255 - val, height - val, 3, 3)
            ctx.translate(0, 2)
        }
    }
    ctx.restore()
}


function render () {

}