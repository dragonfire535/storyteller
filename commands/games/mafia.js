const Command = require('../../structures/Command');
const Game = require('../../structures/mafia/Game');
const { verify } = require('../../util/Util');
const stories = require('../../assets/json/mafia');

module.exports = class MafiaCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mafia',
			aliases: ['start', 'play', 'begin'],
			group: 'games',
			memberName: 'mafia',
			description: 'Who is the Mafia? Who is the detective? Will the Mafia kill them all?',
			guildOnly: true
		});
	}

	async run(msg) {
		const current = this.client.games.get(msg.channel.id);
		if (current) return msg.reply('Please wait until the current game is finished.');
		const voiceChannel = msg.member.voice.channel;
		if (!voiceChannel) return msg.reply('You must be in a voice channel to start a game.');
		const game = new Game(this.client, msg.channel, voiceChannel);
		this.client.games.set(msg.channel.id, game);
		try {
			await game.init();
			await msg.say('Wanna play? To join, join the voice channel and type `join game`.');
			game.playAudio('init').catch(() => null);
			const awaitedPlayers = await game.awaitPlayers(msg, 20, 3);
			if (!awaitedPlayers) {
				game.end();
				return msg.say('There weren\'t enough players to start the game...');
			}
			await game.generate(awaitedPlayers);
			await game.playAudio('rule-ask');
			const rules = await verify(msg.channel, msg.author);
			if (rules) await game.playAudio('rules');
			while (!game.shouldEnd) {
				let killed = null;
				await game.playAudio(`night-${game.turn}`);
				await game.playAudio('mafia');
				const mafia = game.players.filter(p => p.role === 'mafia');
				const choices = await Promise.all(mafia.map(player => player.dmRound()));
				const randomizer = choices.filter(c => c !== null);
				if (randomizer.length) killed = game.players.get(randomizer[Math.floor(Math.random() * randomizer.length)]);
				await game.playAudio('mafia-decision-made');
				await game.playAudio('detective');
				const detective = game.players.find(p => p.role === 'detective');
				await detective.dmRound();
				await game.playAudio('detective-decision-made');
				await game.playAudio(`day-${game.turn}`);
				if (killed) {
					await game.playAudio(stories[Math.floor(Math.random() * stories.length)]);
					await game.playAudio('reveal-deceased');
					await msg.say(`Deceased: **${killed}**`);
					game.players.remove(killed.id);
				} else {
					await game.playAudio('no-deceased');
				}
				await game.playAudio('vote');
				const playersArr = Array.from(game.players.values());
				const votes = await game.getVotes(playersArr);
				if (!votes) {
					await game.playAudio('no-votes');
					continue;
				}
				const hanged = game.getHanged(votes, playersArr);
				await game.playAudio('hanged');
				await msg.say(`Hanged: **${hanged}**`);
				game.players.delete(hanged.id);
				++game.turn;
			}
			const mafia = game.players.find(p => p.role === 'mafia');
			if (mafia) await game.playAudio('mafia-loses');
			else await game.playAudio('mafia-wins');
			await game.playAudio('credits');
			game.end();
			return null;
		} catch (err) {
			game.end();
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
