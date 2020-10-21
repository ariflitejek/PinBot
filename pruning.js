const fs = require('fs')
const set = require('../../set.json')

module.exports = {
  name: 'pruning',
  category: 'Music',
  description: 'Toggle pruning of bot messages',
  execute (message) {
    set.PRUNING = !set.PRUNING

    fs.writeFile('../../set.json', JSON.stringify(set, null, 2), (err) => {
      if (err) {
        console.log(err)
        return message.channel.send('There was an error writing to the file.').catch(console.error)
      }

      return message.channel
        .send(`Message pruning is ${set.PRUNING ? '**enabled**' : '**disabled**'}`)
        .catch(console.error)
    })
  }
}
