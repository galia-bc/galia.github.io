# Changelog

## 0.4.14 — Beta

- Fixed private chat, bank, game and trade messages being broadcast to the whole room.
- Added shared discovery caching and exponential backoff for clients that do not reply.
- Fixed unnecessary Leash beeps, room metadata exposure and repeated base64 avatar transfers.
- Limited lobby cancellation to participants and removed private message payloads from network logs.
