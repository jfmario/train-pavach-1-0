/*
	Manages the word list and stuff
*/

function load_word_lists() {
	debug_enter_func("load_word_lists");
	if (active_lessons[0] === true) {
		var json;
		debug("Calling lesson 1 JSON");
		var jqxhr = $.getJSON("json/vocab_list_lesson_1.json", function(data) {
			var wordlist = data.lesson_1;
			for (var n = 0; n < wordlist.length; n++) {
				WORD_LIST.push(wordlist[n]);
			}
			shuffle_word_list();
		});
		jqxhr.fail(function() {
			document.getElementById("debug").innerHTML += "JSON Fail!!!";
		});
	}

}

function clear_card() {
	document.getElementById("d-question").innerHTML = '';
	document.getElementById("d-script").innerHTML = '';
	document.getElementById("d-sound").innerHTML = '';
	document.getElementById("d-transcription").innerHTML = '';
	document.getElementById("d-meaning").innerHTML = '';
}

// borrowed from stackoverflow.com
// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function shuffle_word_list() {
	debug_enter_func("shuffle_word_list");
	WORD_LIST = shuffle(WORD_LIST);
	SCORE = 0;
	document.getElementById("progress-label").innerHTML = "Progress: ";
	document.getElementById("amount-complete").innerHTML = "0";
	document.getElementById("amount-correct").innerHTML = "0";
	document.getElementById("total").innerHTML = WORD_LIST.length;
	document.getElementById("study-guide").innerHTML = "";
	debug("Calling next()");
	next(0);
}
