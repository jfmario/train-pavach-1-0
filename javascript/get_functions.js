function getTransliteration(code) {
	debug_enter_func('get_functions.js/getTransliteration()');
	debug_var('local_var: code', code);
	var transliteration = "";
	
	var characters = code.split('_');
	
	for (var character in characters) {
		
		var letters = characters[character].split('-');
		
		for (var letter in letters) {
			debug("Grabbing transliteration letter");
			debug_var('for_loop_var: letter', letter);
			transliteration += ALPHABET[letters[letter]];
			debug("Grabbed transliteration letter");
		}
	}
	debug_exit_func('get_functions.js/getTransliteration()');
	return transliteration;
}

function getScript(code) {
	var imageList = [];
	
	var syllables = code.split('_');
	debug_var('syllables', syllables);
	for (var i = 0; i < syllables.length; i++) {
		letters = syllables[i].split('-');
		folder = letters[0].toUpperCase();
		image = SCRIPT_PATH + folder + '/' + letters.join('') + '.png';
		image_tag = '<img class="script-pic" src="' + image + '"/>';
		imageList.push(image_tag);
	}
	return imageList.join('');
}

function getAudio(code) {
	var syllables = code.split('_');
	var folder = syllables[0].split('-').join('').toUpperCase();
	var audio_src = AUDIO_PATH + folder + '/' + code + '.wav';
	return '<audio controls>\n<source src="' + audio_src + '" type="audio/wav">\n</audio>'
}
