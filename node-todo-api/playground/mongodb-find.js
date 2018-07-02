const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }

  console.log('Connected to MongoDB server')

  const db = client.db('TodoApp')

  // db.collection('Todos').find({
  //   _id: new ObjectId('5ae9e9df6d94b66d39002edf')
  // }).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) => {
  //   console.log('unable to fetch todos', err)
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`)
  // }, (err) => {
  //   console.log('unable to fetch todos', err)
  // })

  db.collection('Users').find({name: 'krandles'}).toArray().then((docs) => {
    console.log(`Users:`)
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('unable to fetch users', err)
  })

  // client.close();
});