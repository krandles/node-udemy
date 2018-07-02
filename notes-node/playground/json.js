// let obj = {
//   name: "Kevin"
// }

// var stringObj = JSON.stringify(obj)

// console.log(stringObj)

// let personString = '{"name": "Kevin","age": 41}';
// let personObject = JSON.parse(personString);
// console.log(personObject);

const fs = require('fs');

let originalNote = {
  title: 'title',
  body: 'body'
}

let originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json')

let note = JSON.parse(noteString);

console.log(typeof note)
console.log(note.title)