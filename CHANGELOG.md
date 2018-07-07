# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
- Ability to disable bot messages upon automatic deletion of messages
- Ability to disable fishing within servers (or channels)
- Defend against SQL injections using prepared statements
- Add unit tests using Yarn and Jest
- Clean up code's constants, utils, and imports
- Fix bug where reserved words can be put on stop list

## v3.0.1 - 2018-05-19
### Added
- Added `reset` command, which resets bot to default settings and empties lists

### Fixed
- Words with apostrophes can now be added/removed from stop and delete lists: `stop don't`.
- Restricted words will no longer be deleted if listed at once: `delete go fish` and `delete set stop`
- Found a small bug and squashed it. Therefore, `stop video` command works again!

## v3.0.0 - 2018-01-29
### Added
- Bot replies can now be customized through `set stopmsg <msg>` and `set deletemsg <msg>`
- Users are now mentionable in the `stop` command: `stop <user>`
- User-specific bulk message deletion is now possible using mentions, `delete <#> <user>`
- To prevent spam, word lists can be sent through DMs after toggling, `set toggledm`
- Sending lists through DMs can be disabled again through the same command as above
- `dmhelp` command added, so `help` can be sent through DMs instead of in-server
- Warning is sent if user tries to bulk delete >= 100 messages, above the limit

### Changed
- Move all settings helpers to one file, `setters.js`
- Updated documentation, `help` command, and `update` commands to match latest updates.
- Blurb in `info` commands more informative and useful
- Remove `go fish` from bot tagline

### Fixed
- Fixed bug where commands and subcommands could be put on the stop or delete list
- Documentation links made more clear in `help` and `info` commands

## v2.2.0 - 2018-01-06
### Added
- Multiple words, separated by a space, can be stopped and deleted in one message
- Overall `set` prefix command added and set up for future subcommands
- Bot prefix customizable through `set prefix <prefix>` command
- Added `updates` command. Bot DMs latest updates and links user to server

### Changed
- Code more modular, such as permissions checks and `checkMessage()`
- Server count is now updated every time a server invites the bot rather than sporadically
- Updated `help` command with `set` section and `updates` command
- Subtle update to stop and delete subcommands in `help` embed: "word" became plural

## v2.1.1 - 2017-12-28
### Added
- Simple website live on `gh-pages` linking to docs and invite links

### Fixed
- Fixed file organization of Go Fish
- Catch statements for everything that didn't have one
- A semicolon was missing. Now it is not.

## v2.1.0 - 2017-12-17
### Added
- Go Fish and inventory are back, rewritten and added to pg database
- Server amount added to bot tagline

### Changed
- Code more dry and readable, slightly optimized
- Updated help command and documentation for fishing and new database

## v2.0.0 - 2017-08-21
### Changed
- Convert from JSON data to PostgreSQL database
- Rewrite and refactor all code to query from database

### Removed
- Go Fish and inventory temporarily removed due to change in database

### Fixed
- No more confounded and misencoded data from JSON
- Fix use of `fetchMember()`, null members inserted into cache correctly
- Use `type` property for `setPresence` for library update compatibility
- Moderate messages beginning with exclamation marks and are not commands
- Prevent sending multiple warnings and multiple deletions for one message

## v1.0.0 - 2017-08-08
### Added
- Fully functioning help, go, stop, delete commands
- Go Fish feature with cooldowns and inventory
- Data saving of lists and inventories in JSON format
- Posting data to two major Discord bot lists
- Documentation for links, commands, and contributing
- Admin and mod permission checking for restricted commands
