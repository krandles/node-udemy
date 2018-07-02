const expect = require('expect')
const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'User'
    const text = 'hello'
    const message = generateMessage(from, text)

    expect(typeof message.createdAt).toMatch('number');
    expect(message).toMatchObject({
      from,
      text
    })
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'User'
    const latitude = 1234
    const longitude = 5678
    const url = 'https://www.google.com/maps?q=1234,5678'
    const message = generateLocationMessage(from, latitude, longitude)
    
    expect(typeof message.createdAt).toMatch('number');
    expect(message).toMatchObject({
      from,
      url
    })
   })
})