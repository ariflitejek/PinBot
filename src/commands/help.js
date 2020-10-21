module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Display all commands and descriptions',
  execute (message) {
    const commands = message.client.commands.array()

    const muscmd = commands.filter(y => y.category === 'Music').map(x => `${x.name}`)
    const misccmd = commands.filter(y => y.category === 'Misc').map(x => `${x.name}`)

    message.channel.send({
      embed: {
        title: 'PinBot™️',
        fields: [
          { name: 'Music Commands', value: muscmd.join(', ') },
          { name: 'Misc Commands', value: misccmd.join(', ') }
        ]
      }
    })
  }
}
