function betterEncodeURIComponent(array) {
	encoded = ''
	for(i=0;i<array.length;i++) {
		encoded += '%'
		hex = array[i].toString(16)
		if(hex.length < 2) encoded += '0'
		encoded += hex
	}
	return encoded
}

function download(array, filename, type) {
	encoded = betterEncodeURIComponent(array)
	
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:'+type+';,' + encoded);
	pom.setAttribute('download', filename);
	
	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
	}
}