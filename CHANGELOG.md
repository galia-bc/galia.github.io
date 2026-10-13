# Changelog

## 0.4.15 — Beta

- Restored remote chat avatars with on-demand thumbnail requests between confirmed addon users.
- Cached avatars for 24 hours; unchanged thumbnails are not retransmitted, and discovery pings stay avatar-free.

## 0.4.14 — Beta

- Fixed private chat, bank, game and trade messages being broadcast to the whole room.
- Added shared discovery caching and exponential backoff for clients that do not reply.
- Fixed unnecessary Leash beeps, room metadata exposure and repeated base64 avatar transfers.
- Limited lobby cancellation to participants and removed private message payloads from network logs.
