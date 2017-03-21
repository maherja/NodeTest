var fs = require('fs'),
    command = process.argv[2];

switch (command) {
    case 'list':
        listTodos();
        break;
    case 'add':
        addToDo();
        break;
    case 'reset':
        resetToDo();
        break;
        // case 'remove':
        // removeToDo();
        // break;
    case 'help':
    default:
        showHelp();
        break;
}

function splitStringByNewline(string) {
    return string.split('\n').filter(function(element) {
        element = element.trim();
        return element.length > 0;
    });
}

// check From Value if it's empty or not
function checkFromValue() {
    if (process.argv.slice(3) == '') {
        console.log(` You can't add an empty value!`);
        return "";
    } else {
        console.log('The data is appended');
        return process.argv.slice(3).join(' ') + "\n";
    }
}

// add to todo.txt
function addToDo() {
    fs.appendFile('./todo.txt', checkFromValue(), (err) => {
        if (err) throw err;
    });
}

// Remove a task from todo.txt
// function removeToDo() {}

// Reset todo.txt
function resetToDo() {
    fs.truncate('./todo.txt', 0, () => console.log('Todo is clean now'));
}

function showHelp() {
    openFile('help.txt', function(error, data) {
        if (error) {
            return console.log('Error: the help file could not be displayed', error);
        }
        console.log(data);
    });
}

function listTodos() {
    openFile('todo.txt', function(error, data) {
        if (error) {
            if (error.code === 'ENOENT') {
                return console.log('Nothing to do! (or your dog ate your todo list)');
            } else {
                return console.log('Error: Something went wrong', error);
            }
        }


        var todos = splitStringByNewline(data);

        if (todos.length === 0) {
            return console.log('Nothing to do!')
        }

        console.log('Your todo list looks like this');
        todos.forEach(function(element, index) {
            index = (index + 1).toString();
            console.log(index, element);
        });

        if (todos.length > 5) {
            console.log('You have too much to do!');
        }
    });
}

function openFile(fileName, callback) {
    fs.readFile(__dirname + '/' + fileName, 'utf8', function(error, data) {
        callback(error, data)
    });
}