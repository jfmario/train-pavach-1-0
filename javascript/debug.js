function debug(statement) {
	if (DEBUG) {
		document.getElementById("debug").innerHTML += "DEBUG: " + statement + "<br>";
	}
}

function debug_var(variable, value) {
	if (DEBUG) {
		document.getElementById("debug").innerHTML += "DEBUG VARIABLE: " + variable + " = " + value + "<br>";
	}
}

function debug_enter_func(func) {
	if (DEBUG) {
		document.getElementById("debug").innerHTML += "DEBUG FUNCTION: Entering " + func + "<br>";
	}
}

function debug_exit_func(func) {
	if (DEBUG) {
		document.getElementById("debug").innerHTML += "DEBUG FUNCTION: Exiting " + func + "<br>";
	}
}

function debug_return_func(func, value) {
	if (DEBUG) {
		document.getElementById("debug").innerHTML += "DEBUG FUNCTION: " + func + '() returning ' + value + '<br>';
	}
}
