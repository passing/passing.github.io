function clean_double_newlines(text) {
    var input = text.split('\n');
    var output = [];

    // loop over all lines
    for (var i = 0; i < input.length; i++) {
        if (i % 2 == 0) {
            // add odd lines to output
            output.push(input[i])
        } else if (input[i] != '') {
            // return original text if any even line is not empty
            return text;
        }
    }

    // return all odd lines when all even lines were empty
    return output.join('\n');
}

function clean_leading_spaces(text) {
    var input = text.split('\n');
    var output = [];
    var trim = null;

    for (const line of input) {
        // only check lines that have non space characters
        if (/\S/.test(line)) {
            // get number of leading spaces
            var trailing_spaces = /^\s*/.exec(line)[0].length
            if (trim == null || trailing_spaces < trim) {
                trim = trailing_spaces;
            }
        }
    }

    for (const line of input) {
        // trim all lines
        output.push(line.substring(trim));
    }

    return output.join('\n');
}

function clean() {
    var text = document.getElementById("text_input").value;

    text = clean_double_newlines(text);
    text = clean_leading_spaces(text);

    document.getElementById("text_input").value = text;
}
