# Changelog

## 0.4.17 — Beta

- Added Chess premoves: choose the next move while waiting; select another piece to cancel. Queued moves execute once when legal, and cancel on check, checkmate, game over or an invalidated move.
- Added a large CHECK MATE result banner, an outlined CHESS title matching the other games, and clearer piece contrast on sage-green and wood-brown squares.
- Renamed Chess throughout the interface, removing the Beta suffix.
- Added the Chess radial submenu in Casual and Gambling with 1+0, 5+3, 10 minutes and ∞ options, using the existing animated submenu rings.
- Added both clocks, Fischer increments, synchronized move clock values and host-adjudicated timeouts. The selected rhythm travels with the invitation and is preserved for rematches.
- Kept game creation restricted to tester 12291. Verified 34 automated tests, board and checkmate rendering, and the four-option radial submenu.

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
