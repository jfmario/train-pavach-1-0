// fills the card
function fill_card(index) {
	document.getElementById("d-question").innerHTML = '';
	put_script(index);
	put_transliteration(index);
	put_audio(index);
	put_meaning(index);
}

// clears the card
function empty_card() {
	document.getElementById("d-question").innerHTML = '';
	document.getElementById("d-script").innerHTML = '';
	document.getElementById("d-sound").innerHTML = '';
	document.getElementById("d-transliteration").innerHTML = '';
	document.getElementById("d-meaning").innerHTML = '';
	document.getElementById("d-form").innerHTML = '';
	document.getElementById("d-buttons").innerHTML = '';
}

// places the audio of the word at the correct place on the word card
function put_audio(index) {
	document.getElementById("d-sound").innerHTML = getAudio(WORD_LIST[index].code);
}

// places the meaning of the word at the correct place on the word card
function put_meaning(index) {
	document.getElementById("d-meaning").innerHTML = WORD_LIST[index].meaning;
}

function put_script(index) {
	debug_enter_func('put_script');
	code = WORD_LIST[index].code;
	
	// debug_var("imageList", imageList);
	document.getElementById("d-script").innerHTML = getScript(code)
	debug_exit_func('put_script');
}

function put_transliteration(index) {
	document.getElementById("d-transliteration").innerHTML = getTransliteration(WORD_LIST[index].code);
}

// populates the audio as a hint
function audio_hint(index) {
	put_audio(index);
	document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="answer(' + index + ')">Submit</button>';
}

// populates the meaning as a hint
function meaning_hint(index) {
	put_meaning(index);
	document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="answer(' + index + ')">Submit</button>';
}

// populates the script as a hint
function script_hint(index) {
	put_script(index);
	document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="answer(' + index + ')">Submit</button>';
}

// returns four shuffled words, one of which is the question word
function get_answers(index) {
	var all_answers = [];
	var four_options = [];
	four_options.push(WORD_LIST[index]);
	
	for (var i = 0; i < WORD_LIST.length; i++) {
		if (i !== index) {
			all_answers.push(WORD_LIST[i]);
		}
	}
	
	all_answers = shuffle(all_answers);
	
	// adds 3 incorrect options to four_options
	four_options.push(all_answers.shift());
	four_options.push(all_answers.shift());
	four_options.push(all_answers.shift());
	
	// shuffles the options and returns
	debug_return_func('get_answers', four_options);
	return shuffle(four_options);
}

function next(index) {
	// check if cycle is over
	if (index === WORD_LIST.length) {
		empty_card();
		debug("The cycle is over.");
		end_cycle();
		return
	}

	// determines what type of question to display
	var qt = QT[Math.floor(Math.random()*QT.length)];
	
	// clears the old stuff
	empty_card();
	
	// this is a writing question
	if (qt === 'wr') {
		debug("This is a writing question.");
		document.getElementById("d-question").innerHTML = "How do your write this word in Pavach script?";
		put_meaning(index);
		document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="audio_hint(' + (index) + ')">Hint</button>';
		
		// creates multiple choice options
		var options = get_answers(index);
		for (var i = 0; i < 4; i++) {
			document.getElementById("d-form").innerHTML += '<input type="radio" id="option-' + (i + 1) + '" name="option" value="' + options[i].code + '">' + getScript(options[i].code) + '</input><br>';
		}
	}
	
	// this is a speaking question
	else if (qt === 'sp') {
		debug("This is a speaking question.");
		document.getElementById("d-question").innerHTML = "How do you say this word in Pavach?";
		put_meaning(index);
		document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="script_hint(' + (index) + ')">Hint</button>';
		
		// creates multiple choice options
		var options = get_answers(index);
		for (var i = 0; i < 4; i++) {
			document.getElementById("d-form").innerHTML += '<input type="radio" id="option-' + (i + 1) + '" name="option" value="' + options[i].code + '">' + getAudio(options[i].code) + '</input><br>';
		}
	}
	
	// this is a reading question
	else if (qt === 'rd') {
		debug("This is a reading question.");
		document.getElementById("d-question").innerHTML = "How do you say this word?";
		put_script(index);
		document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="meaning_hint(' + (index) + ')">Hint</button>';
		
		// creates multiple choice options
		var options = get_answers(index);
		for (var i = 0; i < 4; i++) {
			document.getElementById("d-form").innerHTML += '<input type="radio" id="option-' + (i + 1) + '" name="option" value="' + options[i].code + '">' + getAudio(options[i].code) + '</input><br>';
		}
	}
	
	// this is a spoken translation question
	else if (qt === 'st') {
		debug("This is a spoken translation question.");
		document.getElementById("d-question").innerHTML = "What does this word mean?";
		put_audio(index);
		document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="script_hint(' + (index) + ')">Hint</button>';
		
		// creates multiple choice options
		var options = get_answers(index);
		for (var i = 0; i < 4; i++) {
			document.getElementById("d-form").innerHTML += '<input type="radio" id="option-' + (i + 1) + '" name="option" value="' + options[i].code + '">' + options[i].meaning + '</input><br>';
		}
	}
	
	// this is a transcription question
	else if (qt === 'tr') {
		debug("This is a transcription question.");
		document.getElementById("d-question").innerHTML = "How do you write this word in Pavach script?";
		put_audio(index);
		document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="meaning_hint(' + (index) + ')">Hint</button>';
		
		// creates multiple choice options
		var options = get_answers(index);
		for (var i = 0; i < 4; i++) {
			document.getElementById("d-form").innerHTML += '<input type="radio" id="option-' + (i + 1) + '" name="option" value="' + options[i].code + '">' + getScript(options[i].code) + '</input><br>';
		}
	}
	
	// this is a written translation question
	else {
		debug("This is a written translation question.");
		document.getElementById("d-question").innerHTML = "What does this word mean?";
		put_script(index);
		document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="audio_hint(' + (index) + ')">Hint</button>';
		
		// creates multiple choice options
		var options = get_answers(index);
		for (var i = 0; i < 4; i++) {
			document.getElementById("d-form").innerHTML += '<input type="radio" id="option-' + (i + 1) + '" name="option" value="' + options[i].code + '">' + options[i].meaning + '</input><br>';
		}
	}
	
	document.getElementById("d-buttons").innerHTML += '<button type="submit" onclick="answer(' + index + ')">Submit</button>';
}

// checks if the user selected the correct answer and calls the next question
function answer(index) {
	debug_enter_func("training_cycle.js/answer");
	var options = [ 'option-1', 'option-2', 'option-3', 'option-4' ];
	var correct = false;
	debug('Looping through radio buttons');
	for (var i = 0; i < 4; i++) {
		if (document.getElementById(options[i]).checked) {
			debug("Found checked item.");
			if (document.getElementById(options[i]).getAttribute("value") === WORD_LIST[index].code) {
				correct = true;
			}
			debug("Found user's choice, breaking out of loop");
			break;
		}
	}
	if (correct) {
		document.getElementById("d-form").innerHTML = '<p class="feedback-good">Correct!</p>';
		SCORE += 1;
		document.getElementById("amount-correct").innerHTML = SCORE;
	}
	else {
		document.getElementById("d-form").innerHTML = '<p class="feedback-bad">Incorrect!</p>';
		debug("Trying to fill study guide");
		document.getElementById("study-guide").innerHTML += '<li>' + getTransliteration(WORD_LIST[index].code) + '</li>';
	}
	fill_card(index);
	document.getElementById("amount-complete").innerHTML = index + 1;
	document.getElementById("d-buttons").innerHTML = '<button type="submit" onclick="next(' + (index + 1) + ')">Next</button>';
}
