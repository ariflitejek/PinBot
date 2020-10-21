const Discord = require('discord.js')

module.exports = {
  name: 'ping',
  cooldown: 3,
  category: 'Misc',
  description: 'Check ping from bot to server.',
  execute (message, args) {
    message.channel.send('Getting info . . .').then(m => {
      const embed = new Discord.MessageEmbed()
        .setAuthor('PinBot')
        .setDescription(
          `====================\n🌂 Last ping **${m.createdTimestamp -
            message.createdTimestamp}**ms.\n💍 Last API **${Date.now() -
            message.createdTimestamp}**ms.\n====================`
        )
        .setColor('RANDOM')
        .setFooter('©️ PinBot™️ - 2020')
      m.edit(embed)
    })
  }
}
