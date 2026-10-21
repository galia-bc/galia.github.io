# Changelog

## 0.4.16 — Beta

- Added Chess with Unicode pieces, board rotation, legal-move highlights and four promotion choices.
- Includes castling, en passant, checkmate, stalemate, repetition, fifty-move and insufficient-material draws.
- Only player 12291 can initiate Chess games or rematches; invited opponents can accept and play.
- Added Chess Beta to the Casual and Gambling radial menus and the classic menu for the tester.
- Validates opponent, game session, move sequence and legality before accepting remote moves.
- Verified build, 25 automated tests and both board orientations visually.


## 0.4.15 — Beta

- Restored remote chat avatars with on-demand thumbnail requests between confirmed addon users.
- Cached avatars for 24 hours; unchanged thumbnails are not retransmitted, and discovery pings stay avatar-free.

## 0.4.14 — Beta

- Fixed private chat, bank, game and trade messages being broadcast to the whole room.
- Added shared discovery caching and exponential backoff for clients that do not reply.
- Fixed unnecessary Leash beeps, room metadata exposure and repeated base64 avatar transfers.
- Limited lobby cancellation to participants and removed private message payloads from network logs.
