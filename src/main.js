/**
                            WARNING!
            You may copy my code for your own use.
DM me if you find an error in the discord bot coding process
                        ipincamp#3958
*/

/**
 * Module Imports
 */
const { MessageEmbed, Client, Collection } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')
const { TOKEN, PREFIX } = require('../set.json')

const client = new Client({ disableMentions: 'everyone' })

client.login(TOKEN)
client.commands = new Collection()
client.prefix = PREFIX
client.queue = new Map()
const cooldowns = new Collection()
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Client Events
 */
client.on('ready', () => {
  const act = [
    { name: `${PREFIX}help`, type: 'LISTENING' },
    { name: 'project.cfromd.xyz', type: 'LISTENING' },
    { name: 'inspirasi Coffe Robusta', type: 'LISTENING' },
    { name: `${client.users.cache.size} members`, type: 'WATCHING' },
    { name: `${client.channels.cache.size} channels`, type: 'WATCHING' },
    { name: `${client.guilds.cache.size} servers`, type: 'WATCHING' },
    { name: 'https://www.youtube.com/', type: 'LISTENING' },
    { name: 'any problem?, just DM to ipincamp!', type: 'WATCHING' }
  ]
  setInterval(() => {
    const actind = Math.floor(Math.random() * (act.length - 1) + 1)
    client.user.setActivity(act[actind])
  }, 15000)
  console.log(`${client.user.tag} was activated!`)
})
client.on('warn', (info) => console.log(info))
client.on('error', console.error)

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, 'commands')).filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = require(join(__dirname, 'commands', `${file}`))
  client.commands.set(command.name, command)
}

client.on('message', async (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`)
  if (!prefixRegex.test(message.content)) return

  const [, matchedPrefix] = message.content.match(prefixRegex)

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) return

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 1) * 1000

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      )
    }
  }

  timestamps.set(message.author.id, now)
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('There was an error executing that command.').catch(console.error)
  }
})
/**
 * If client was tag by someone
 */
client.on('message', message => {
  if (message.author.bot) return
  if (!message.guild) return

  const tagbot = message.mentions.users.first()
  if (!tagbot) return
  if (tagbot.id === message.client.user.id) {
    const embd = new MessageEmbed()
      .setAuthor('PinBot')
      .setTitle(`Hey **${message.author.username}**!`)
      .setDescription(`Type \`${PREFIX}help\` to see all the commands available.\n\nIf you found some bug, please contact me.\nDiscord: ipincamp#3958`)
      .setColor('RED')
      .setFooter('©️ PinBot™️ - 2020')
    message.channel.send(embd)
  }
})
