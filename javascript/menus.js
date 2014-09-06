/*
	Produces the beginning and end menus.
*/

var FINAL_TEXT = "You have a completed a full cycle of the Pavach Trainer. Please take a moment to note the words that you struggled with. When you are ready, you may either repeat the cycle with the same settings or go back to the beginning.";

var LESSON_NAMES = [ 'The Alphabet', 'Numbers' ];

/* MAIN MENUS */

function select_lesson_menu() {
	WORD_LIST = [];
	document.getElementById("temp-title").innerHTML = 'Lessons';
	document.getElementById("temp-desc").innerHTML = "Select the lessons you want to practice.";
	document.getElementById("temp-menu").innerHTML = '<form>';
	for (var n = 1; n <= active_lessons.length; n++) {
		document.getElementById("temp-menu").innerHTML += '<input type="checkbox" id="c' + (n) + '">Lesson ' + (n) + ': ' + LESSON_NAMES[n-1] + '<br>';
		// document.getElementById("temp-menu").innerHTML += 'test';
	}
	document.getElementById("temp-menu").innerHTML += '</form><br><button type="submit" onclick="process_lesson_menu()">Submit</button>';
}

function select_question_types_menu() {
	document.getElementById("temp-title").innerHTML = 'Question Types';
	document.getElementById("temp-desc").innerHTML = "Select the types of questions that you want to encounter.";
	document.getElementById("temp-menu").innerHTML = '<form>';
	document.getElementById("temp-menu").innerHTML += '<input type="checkbox" id="qt-writing">Writing (Translate words into Pavach and write them in Pavach script)<br>';
	document.getElementById("temp-menu").innerHTML += '<input type="checkbox" id="qt-speaking">Speaking (Translate words into Pavach and say them)<br>';
	document.getElementById("temp-menu").innerHTML += '<input type="checkbox" id="qt-writtentranslation" disabled="disabled" checked="checked">Written Translation (Translate Pavach script into English - always part of the program)<br>';
	document.getElementById("temp-menu").innerHTML += '<input type="checkbox" id="qt-reading">Reading (Read Pavach script aloud -basic)<br>';
	document.getElementById("temp-menu").innerHTML += '<input type="checkbox" id="qt-spokentranslation">Spoken Translation (Translate Pavach audio into English)<br>';
	document.getElementById("temp-menu").innerHTML += '<input type="checkbox" id="qt-transcription">Transcription (Transcribe Pavach audio in Pavach script)<br>';
	document.getElementById("temp-menu").innerHTML += '</form><br><button type="submit" onclick="process_question_type_menu()">Submit</button>';
	
}

/* SUBMIT FUNCTION REACTIONS */

function process_lesson_menu() {
	for (var n = 0; n < active_lessons.length; n++) {
		active_lessons[n] = false;
	}
	var count = 0;
	for (var n = 1; n <= active_lessons.length; n++) {
		if (document.getElementById("c" + (n)).checked) {
			count++;
			active_lessons[n-1] = true;
		}
	}
	if (count > 0) {
		debug_var("active_lessons", active_lessons);
		select_question_types_menu();
	}
}

function process_question_type_menu() {
	QT = [ 'wt', 'wt' ];
	if (document.getElementById("qt-writing").checked) {
		WRITING = true;
		QT.push('wr');
		QT.push('wr');
	}
	if (document.getElementById("qt-speaking").checked) {
		SPEAKING = true;
		QT.push('sp');
		QT.push('sp');
	}
	if (document.getElementById("qt-reading").checked) {
		READING = true;
		QT.push('rd');
		QT.push('rd');
	}
	if (document.getElementById("qt-spokentranslation").checked) {
		SPOKEN_TRANSLATION = true;
		QT.push('st');
		QT.push('st');
	}
	if (document.getElementById("qt-transcription").checked) {
		TRANSCRIPTION = true;
		QT.push('tr');
		QT.push('tr');
	}
	document.getElementById("temp-title").innerHTML = '';
	document.getElementById("temp-desc").innerHTML = '';
	document.getElementById("temp-menu").innerHTML = '';
	debug_var("QT", QT);
	load_word_lists();
}

/* FINAL MENU */

function end_cycle() {
	empty_card();
	document.getElementById("d-form").innerHTML = FINAL_TEXT;
	document.getElementById("d-buttons").innerHTML += '<button type="submit" onclick="shuffle_word_list()">Keep Settings and Try Again</button>' + '<button type="submit" onclick="select_lesson_menu()">Reset</button>';
}
