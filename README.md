# Storyteller
[![Build Status](https://travis-ci.org/dragonfire535/storyteller.svg?branch=master)](https://travis-ci.org/dragonfire535/storyteller)
[![Discord Server](https://discordapp.com/api/guilds/252317073814978561/embed.png)](https://discord.gg/sbMe32W)
[![Donate on Patreon](https://img.shields.io/badge/patreon-donate-orange.svg)](https://www.patreon.com/dragonfire535)
[![Donate on PayPal](https://img.shields.io/badge/paypal-donate-blue.svg)](https://www.paypal.me/dragonfire535)

> This bot is not available for invite.

Storyteller is a Discord bot coded in JavaScript with
[discord.js](https://discord.js.org/) using the
[Commando](https://github.com/discordjs/Commando) command framework
for Discord's 2019 Hack Week. His main feature is the ability to play
the classic circle game Mafia, using a voice channel for the players
to interact alongside a fully-voiced storyteller, creating one of the
most immersive Discord bot games in existence.

## Installing

### Before You Begin

1. Make sure you have installed [Node.js](https://nodejs.org/en/) >=10 and [Git](https://git-scm.com/).
2. Clone this repository with `git clone https://github.com/dragonfire535/storyteller.git`.
3. Run `cd storyteller` to move into the folder that you just created.

### Windows

1. Open an **ADMIN POWERSHELL** window and run `npm i -g --production windows-build-tools`.
2. [Follow these instructions to install ffmpeg](https://www.wikihow.com/Install-FFmpeg-on-Windows).
3. Run `npm i --production` in the folder you cloned the bot.
4. Run `npm i -g pm2` to install PM2.
5. Run `pm2 start Storyteller.js --name mafia` to run the bot.

### Mac

1. Use a real (cheaper!) OS to host your bot.
2. ???
3. Profit.

### Ubuntu and other Debian-based systems

1. Run `apt update`.
2. Run `apt upgrade` to install the latest dependencies of your distro.
3. Run `apt install ffmpeg` to install ffmpeg.
4. Run `npm i --production` in the folder you cloned the bot.
5. Run `npm i -g pm2` to install PM2.
6. Run `pm2 start Storyteller.js --name mafia` to run the bot.

## How to Play

1. Have all the players who want to play join a voice channel. You need at least 5 to play, and can have up to 15.
2. Use the `mafia` command, which will start a game using the members of the voice channel. Make sure all players open their DMs.
3. Have fun! The storyteller will guide you through the game.

## Licensing

The bot is licensed under the GPL 3.0 license. See the file `LICENSE` for more
information. If you plan to use any part of this source code in your own bot, I
would be grateful if you would include some form of credit somewhere.
