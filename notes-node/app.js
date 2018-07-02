const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'title of note',
  demand: true,
  alias: 't'
}

const bodyOptions = {
  describe: 'body of note',
  demand: true,
  alias: 'b'
}

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;

let command = process.argv[2];

if (command === 'add') {
  let note = notes.addNote(argv.title, argv.body)
  if (note) {
    console.log(`title: ${note.title}, body: ${note.body}`)
  } else {
    console.log('A note with this title already exists')
  }
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`printing ${allNotes.length} note(s)`)
  for (let i = 0; i < allNotes.length; i++) {
    console.log(`title: ${allNotes[i].title}, body: ${allNotes[i].body}`)
  }
} else if (command === 'read') {
  let note = notes.getNote(argv.title)
  if (note) {
    console.log(`title: ${note.title}, body: ${note.body}`)
  } else {
    console.log('note not found')
  }
} else if (command === 'remove') {
  let noteRemoved = notes.removeNote(argv.title);
  let message = noteRemoved ? 'Note removed' : "Note title not found";
  console.log(message);
} else {
  console.log('command not recognized')
}