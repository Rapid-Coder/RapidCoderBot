const Discord = require("discord.js")
const bot = new Discord.Client
const config = require("./config.json")


bot.on("ready", () => {
    console.log("Loaded up!")
    bot.user.setActivity(`&help to ${bot.guilds.cache.size} servers.`, { url: '', type: 'PLAYING' })
});

bot.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username}'s commands`)
            .setDescription(`**Prefix:** ${config.prefix}`)
            .addField(`\`ping\``, `Check your bot's ping`)
            .addField(`\`bdfdhelp\``, `**get help with BDFD**`)
        message.channel.send(helpEmbed)
    }

    if (command === "bdfdhelp") {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username}'s commands`)
            .setDescription(`**Prefix:** ${config.prefix}`)
            .addField(`\`ping\``, `Check your bot's ping`)
            .addField(`\`bdfdvariables\``, `**Learn how the variables work in BDFD if your a experienced user this may help too.**`)
            .addField(`\`custocommandsbdfd\``, `**Custom Commands made by the Developer's of RapidCoding!**`)
            .addField(`\`premiumbdfd\``, `**Help with premium commands**`)
            .addField(`\`bdfdcommands\``, `**All commands, Premium ones are not in this section!**`)
            .addField(`\`bdfdquestions\``, `**An answer to common questions in BDFD!**`)
        message.channel.send(helpEmbed)
    }

if (command === "bdfdvariables") {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username}'s commands`)
            .setDescription(`Using Variables in BDFD is easier than you think, Here is an example of when you can use a variable and how to do it. 
We are going to make a cool id command so people on for example your staff team can set a unique id to be identified by.
1. Make a variable called **specialid**
2. Make a new command and place this code inside it: $setUserVar[specialid;$message]
$description[**$username** your id should now be set!
$footer[This is your unique id]

After that lets make a command to check the ID
$username your id is: $getUserVar[specialid;$authorID
$deletecommand
$varExistError[specialid;You have no Unique ID, Error]

After that you can make a command to delete the ID if you wish
$sesetUserVar[specialid;$atuhorID]
#description[Your id should now be reset!]
$deletecommand

And your done, Good Job. Please do not use this without giving us credit.`)
        message.channel.send(helpEmbed)
    }













    if (command === "ping") {
        message.channel.send(`Pong **(${Date.now() - message.createdTimestamp}ms)**`)
    }

    if (command === "kick") {
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("Insufficient permissions (Requires permission `Kick members`)").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        if (!member.kickable)
            return message.channel.send("This user is unkickable").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} was kicked, no reason was provided`);
            })

            if (reason) return member.kick().then(member => {
                message.channel.send(`${member.user.tag} was kicked for ${reason}`);
            })
        }
    }

    if (command === "ban") {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send("Insufficient permissions (Requires permission `Ban members`)").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        if (!member.bannable)
            return message.channel.send("This user is unbannable").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const reason = args.slice(1).join(" ")
        if (member) {
            if (!reason) return member.ban().then(member => {
                message.channel.send(`${member.user.tag} was banned, no reason was provided`);
            })

            if (reason) return member.ban(reason).then(member => {
                message.channel.send(`${member.user.tag} was banned for ${reason}`);
            })
        }
    }

    if (command === "add") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const add = args.slice(1).join(" ")
        if (!add)
            return message.channel.send("You have not specified a role").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const roleAdd = message.guild.roles.cache.find(role => role.name === add)
        if (!roleAdd)
            return message.channel.send("This role does not exist").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        if (member.roles.cache.get(roleAdd.id))
            return message.channel.send(`This user already has the ${add} role`).then(msg => {
                msg.delete({ timeout: 30000 })
            })
        member.roles.add(roleAdd.id).then((member) => {
            message.channel.send(`${add} added to ${member.displayName}`)
        })
    }

    if (command === "remove") {
        if (!message.member.hasPermission('MANAGE_ROLES'))
            return message.channel.send("Insufficient permissions (Requires permission `Manage roles`)").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const member = message.mentions.members.first()
        if (!member)
            return message.channel.send("You have not mentioned a user").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const remove = args.slice(1).join(" ")
        if (!remove)
            return message.channel.send("You have not specified a role").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        const roleRemove = message.guild.roles.cache.find(role => role.name === remove)
        if (!roleRemove)
            return message.channel.send("This role does not exist").then(msg => {
                msg.delete({ timeout: 30000 })
            })
        if (!member.roles.cache.get(roleRemove.id))
            return message.channel.send(`This user does not have the ${remove} role`).then(msg => {
                msg.delete({ timeout: 30000 })
            })
        member.roles.remove(roleRemove.id).then((member) => {
            message.channel.send(`${remove} removed from ${member.displayName}`)
        })
    }

    if (command === "say") {
        const text = args.join(" ")
        if (!text) return message.channel.send("You have not specified something to say").then(msg => {
            msg.delete({ timeout: 30000 })
        })
        message.channel.send(text)

    }

    if (command === "purge") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Insufficient permissions (requires permission `Manage messages`)").then(msg => {
            msg.delete({ timeout: 30000 })
        })
        const number = args.join(" ")
        if (!number) return message.channel.send("You haven't specified a number to purge").then(msg => {
            msg.delete({ timeout: 30000 })
        })
        message.channel.bulkDelete(number).catch(console.error)

    }

    if (command === "rps") {
        const options = [
            "rock :shell: ",
            "paper :newspaper2:",
            "scissors :scissors: "
        ]
        const option = options[Math.floor(Math.random() * options.length)]
        message.channel.send(`You got ${option}`)
    }

});

bot.login(config.token)
