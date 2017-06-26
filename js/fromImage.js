function finished(data, i, j) {
	// The given part has ended if the current data is 0 and the following pixel has an opacity of 0% or if the current data is 0 and the opacity of the current pixel is of 0%
	if((data[i+j] == 0 && data[i+4+3] == 0) || (data[i+j] == 0 && data[i+3] == 0)) return true
	else return false
}

function fromImage(img) {
	canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx = canvas.getContext('2d')
	ctx.drawImage(img, 0, 0, img.width, img.height);
	data = ctx.getImageData(0, 0, img.width, img.height).data

	if(data[0] != 255 || data[1] != 255 || data[2] != 255 || data[3] != 255) {
		alert('There has been an error converting the image (incorrect configuration?).')
		return
	}

	MIME = ''
	MIME1:
	for(i=4;true;i+=4) {	// Skip the first pixel starting in i=4
		MIME2:
		for(j=0;j<3;j++) {
			if(finished(data, i, j)) {
				break MIME1	// Conclude the loop
			}
			MIME += String.fromCharCode(data[i+j])
		}
	}

	k = 0	// k var is used to calculate the start position of the content
	k += 4	// First (white) pixel
	k += MIME.length // MIME length
	k += Math.ceil(MIME.length / 3)	// The number of opacity bytes (255) for the MIME pixels
	if((MIME.length % 3) != 0) k += (3 - (MIME.length % 3))	// The pixels left by the MIME part
	k += 4	// Reserved null pixel

	clean = []
	loop1:
	for(i=k;i<data.length;i+=4) {
		if(data[i+3] == 0) break	// If the current pixel has no opacity, the loop is concluded.
		loop2:
		for(j=0;j<3;j++) {
			if(finished(data, i, j)) break loop1
			clean.push(data[i+j])
		}
	}

	download(clean, 'decrypted', MIME)
}