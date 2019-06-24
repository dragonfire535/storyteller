require('dotenv').config();
const { STORYTELLER_TOKEN, OWNERS, STORYTELLER_PREFIX, INVITE } = process.env;
const path = require('path');
const Client = require('./structures/Client');
const client = new Client({
	commandPrefix: STORYTELLER_PREFIX,
	owner: OWNERS.split(','),
	invite: INVITE,
	disableEveryone: true,
	disabledEvents: ['TYPING_START']
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['util', 'Utility'],
		['games', 'Games'],
		['other', 'Other']
	])
	.registerDefaultCommands({
		help: false,
		ping: false,
		prefix: false,
		commandState: false,
		unknownCommand: false
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	client.logger.info(`[READY] Logged in as ${client.user.tag}! ID: ${client.user.id}`);
	client.setInterval(() => client.user.setActivity('Mafia'), 60000);
});

client.on('disconnect', event => {
	client.logger.error(`[DISCONNECT] Disconnected with code ${event.code}.`);
	process.exit(0);
});

client.on('error', err => client.logger.error(err));

client.on('warn', warn => client.logger.warn(warn));

client.on('commandError', (command, err) => client.logger.error(`[COMMAND:${command.name}]\n${err.stack}`));

client.login(STORYTELLER_TOKEN);
