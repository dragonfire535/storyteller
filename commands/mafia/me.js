const Command = require('../../structures/Command');

module.exports = class MeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'me',
			aliases: ['role'],
			group: 'mafia',
			memberName: 'me',
			description: 'Displays your current role in the game.'
		});
	}

	run(msg) {
		const games = this.client.games.filter(game => game.players.has(msg.author.id));
		if (!games.size) return msg.reply('You aren\'t a member of any games.');
		return msg.reply(games.map(game => {
			const { role } = game.players.get(msg.author.id);
			return `**${game.channel.guild.name} (${game.channel}):** ${role}`;
		}).join('\n'));
	}
};
