const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../models/todo')
const { User } = require('../models/user')
const { ObjectID } = require('mongodb')

// let id = '5aea215f9fba467600e32588'

// if (!ObjectID.isValid(id)) {
//   console.log('invalid ID')
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID not found')
//   }
//   console.log('Todo by ID', todo)
// }).catch((e) => console.log(e))

let userID = '5aea0f456afb16725b306dc0'

User.findById(userID).then((user) => {
  if (!user) {
    return console.log('User ID not found')
  }
  console.log(JSON.stringify(user, undefined, 2))
}, (e) => {
  console.log(e)
})