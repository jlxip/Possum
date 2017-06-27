function readInputFile(evt) {
	reader = new FileReader()
	reader.onload = () => {
		rawarray = new Int8Array(reader.result)
		array = []
		for(i=0;i<rawarray.length;i++) {
			toPush = rawarray[i]
			if(rawarray[i] < 0) toPush += 256	// There are some numbers in the array that are negative. Just adding 256 to them, we get the real value.
			array.push(toPush)
		}

		encode(array, evt.target.files[0].type)
	}
	reader.readAsArrayBuffer(evt.target.files[0])
}

function readInputText() {
	input = $('textarea#input').get(0).value
	input = encode_utf8(input)	// UTF-8!
	input = input.split('')
	array = []
	for(i=0;i<input.length;i++) array.push(input[i].charCodeAt(0))
	encode(array, 'text/plain')
}

function readOutputFile(evt) {
	canvas = $('canvas').get(0)
	ctx = canvas.getContext('2d')
	img = new Image()

	img.onload = () => {
		decode(img)
	}

	img.src = URL.createObjectURL(evt.target.files[0])
}

$(document).ready(() => {
	$('textarea#input').get(0).addEventListener('change', readInputText, false)
	$('input#inputFile').get(0).addEventListener('change', readInputFile, false)
	$('input#outputFile').get(0).addEventListener('change', readOutputFile, false)
})