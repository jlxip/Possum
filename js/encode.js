function encode(array, mime) {	// Request dec array
	for(i=0;i<(array.length % 3);i++) array.push(0)
	
	mime = mime.split('')
	MIMEarray = []
	for(i=0;i<mime.length;i++) MIMEarray.push(mime[i].charCodeAt(0))
	for(i=0;i<(MIMEarray.length % 3);i++) MIMEarray.push(0)

	k = 0
	k++	// One pixel because of the white initial
	k += MIMEarray.length / 3	// Some pixels due to the MIME type
	k++	// One reserved pixel to end the mime type
	k += array.length / 3	// One third of the length of the array
	k++	// One reserved pixel to end the content

	l = Math.ceil( Math.sqrt( k ) )
	canvas = $('canvas').get(0)
	canvas.width = l
	canvas.height = l
	ctx = canvas.getContext('2d')
	img = ctx.createImageData(l, l)

	for(i=0;i<4;i++) img.data[i] = 255	// White pixel!

	n = 0
	for(i=0;i<MIMEarray.length;i+=3) {	// MIME type!
		k = i+n+4	// +4 because of the white pixel
		for(j=0;j<3;j++) img.data[k+j] = MIMEarray[i+j]
		img.data[k+3] = 255
		n++
	}

	_n = n
	n = 0
	for(i=0;i<array.length;i+=3) {	// Content!
		k = i+n+4+MIMEarray.length+_n+4	// +4 for the white pixel, MIMEarray.length and _n for the MIME type and +4 for the reserved null pixel
		for(j=0;j<3;j++) img.data[k+j] = array[i+j]
		img.data[k+3] = 255
		n++
	}

	ctx.putImageData(img, 0, 0)
}