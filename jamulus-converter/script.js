function pre_split(input, style) {
    const max_length = 1600;
    const html_pre = {
        default: '<pre>',
        small: '<pre><small>',
        big: '<pre><big>',
        big_bold: '<pre><big><b>'
    };
    const html_post = {
        default: '</pre>',
        small: '</small></pre>',
        big: '</big></pre>',
        big_bold: '</b></big></pre>'
    };
    const html_break = {
        none: '',
        br: '<br>',
        p: '<p>'
    };

    // split and trim input
    var lines = input.split('\n').map(i => i.trimEnd());

    var output = [''];
    var o = 0;
    var break_tag = 'br'

    for (const line of lines) {
        if (line) {
            var length = output[o].length;

            if (length == 0) {
                // no break on a new line
                break_tag = 'none'
            }

            if (length + html_break[break_tag].length + line.length + html_pre[style].length + html_post[style].length > max_length) {
                // switch to next line when line is full
                o++;
                output.push('');
                break_tag = 'none'
            }

            output[o] += html_break[break_tag] + line;
            break_tag = 'br';
        } else {
            // create new paragraph when one or more lines are empty
            break_tag = 'p';
        }
    }

    return output.map(o => html_pre[style] + o + html_post[style]);
}

function pre_convert() {
    const outputs = ['text_output_1', 'text_output_2', 'text_output_3', 'text_output_4', 'text_output_5'];

    var input = document.getElementById("text_input").value;
    var style = document.getElementById("text_output_style").value;

    var output = pre_split(input, style)

    for (var o = 0; o < outputs.length; o++) {
        document.getElementById(outputs[o]).value = output[o] || '';
    }
}

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