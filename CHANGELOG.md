# Changelog

## 0.4.36 — Beta

- Reduced the ongoing Skirmish room action message from every 15 seconds to every 60 seconds. Only the initiator sends it, missed intervals never catch up in a burst, and result/cancellation stops reminders.
- Added an immediate local warning for the attacker after choosing the item: "You are approaching (Name) with (item)… Get ready for action!" The target keeps the existing local warning and five-second approach window before the countdown. Notices remain local, use crafted item names when selected and do not add public chat messages.
- Verified 128 tests and TypeScript/build checks, including minute boundaries, long pauses, result cleanup and both local warnings. Stable remains 0.4.18.

## 0.4.35 — Beta

- Bounded the phone's previously unbounded decoded-image cache to 32 least-recently-used images and an estimated 16 MiB RGBA pixel budget. Loaded images exceeding the budget evict older entries; evictions/disposal clear image sources and callbacks. Chat history and persistent addon discovery caches are preserved.
- Stopped the inactive Hypnotic Visor effect from searching the entire chat twice every half second. Restoration now runs once when needed; repeated idle ticks skip the DOM searches. Addon disposal explicitly stops the visor effect and its callbacks.
- Presence disposal now removes its own socket subscriptions and clears transient memory, preventing old instances from remaining attached after reloads. Stored discovery/avatar cache remains intact.
- Skirmish no longer starts a 25ms interval while idle; its timer exists only during an active session and stops at the result/cancellation. Blush preview buffers are explicitly released on replacement, fade and exit. A failed native avatar rebuild is not retried every frame, and original BC character canvases are never resized or cleared.
- Added on-demand console command `debugmemory()` with numeric phone-image, presence-cache and Skirmish-buffer/timer statistics. Optional browser JS-heap usage covers the whole page (BC and other addons included), not GGC alone. No background sampling or additional network traffic.
- Verified 127 tests and TypeScript/build checks, including thousands of image changes, decoded-image budget eviction, ten simulated idle minutes, socket cleanup and blush failure/cleanup. These checks verify resource bounds and idle work; live browser memory attribution still requires measurement in the affected session. Stable remains 0.4.18.

## 0.4.34 — Beta

- Skirmish now starts as a surprise action, without an invitation or acceptance screen. After validating the selected item, only the target receives a local English warning: "(Name) is approaching you dangerously with (item)… Get ready for action!" Both participants keep their normal room/chat view for five seconds, then automatically enter the arena and its 3–2–1 countdown. ESC, departure, busy-state guards and empty-slot/permission checks still cancel safely. The private readiness exchange has no user prompt; protocol 4 requires both players to update.
- Replaced hardcoded "them" in the opening room action with "him" or "her" from the character's native pronouns, using the character name for other pronoun choices.
- Added native crafted items to the slot selector alongside base items. Distinct crafted variants retain native names/icons and their full craft descriptor, including colors, configuration and supported locks. Crafting validation and item/lock permissions are checked for both potential losers, at start and again before native application. The selected craft is copied, included in private readiness matching and passed to BC's native item-wear operation; roleplay messages use its crafted name.
- The arena header shows the selected item's name. Retained the avatar/blush rendering fix and private keyboard/score traffic. Verified 121 automated tests, including exact warning timing, automatic start, cancellation during the warning, crafted variants and pronouns, plus TypeScript/build checks. Stable remains 0.4.18.

## 0.4.33 — Beta

- Fixed disappearing Skirmish characters when the local blush preview takes over. BC now initializes its own native character canvases rather than receiving browser-default 300x150 canvases.
- Keep the original visible character until the blush canvas matches the native dimensions and contains rendered pixels. Pending, blank, failed or unreadable renders fall back to the original avatar; an empty blink frame uses the visible normal frame. Preview checks are throttled and cached, and actual character expressions remain unchanged.
- Added a regression covering delayed rendering, blank/default-size canvases, blink frames, later rebuilds and rendering errors. Verified 116 tests and TypeScript/build checks. Stable remains 0.4.18.

## 0.4.32 — Beta

- Removed the club branding, Club Showdown subtitle, visible five-second timer and checkpoint explanation from Skirmish. The initial 3–2–1 countdown, ordered letters, bubble feedback, progress bar and ESC exit remain.
- Added restrained Low/Medium native blush expressions to isolated arena character previews following correct keys. Blush fades after a short pause, uses cached canvases and never changes or syncs a player's actual expression.
- Test skirmish now returns to the native inventory for the selected item slot. Cancel skirmish is the first entry and exits the entire menu; allowed base items retain their native buttons. All native item slots are supported, and the activity is hidden whenever either player already has that slot occupied.
- The invitation names the selected item. Both participants validate the same stake and normal item, room, prerequisite and interaction permissions before accepting/starting. The loser equips the agreed item locally only if its slot is still empty and permission remains valid; existing items are never replaced. Item stakes replace the old Kneel result, including practice losses.
- Added English room action messages when the accepted duel starts, every 15 seconds of continued struggling and after confirmed item application. Only the initiator announces them, with duplicate result protection; keyboard, score and invitation events remain private. Initiation stays restricted to 12291. Protocol 3 requires both players to update.
- Verified 115 automated tests, TypeScript/build checks and rendered visual states. Stable remains 0.4.18.

## 0.4.31 — Beta

- Replaced the small Skirmish panel with a full club showdown scene: dark arena, red/turquoise spotlights, complete native BC characters, fighter headers and hit counts, dimensional VS, larger central letter bubbles and a smooth illuminated tug-of-war divider. Invitation, waiting, countdown and result screens share the same layout.
- Added a temporary participant-only focus view that hides the room behind the arena and conceals chat using one removable CSS rule. Closing restores chat, its draft/focus and the room view. The renderer reuses the existing native character-preview helper, preserves original characters/poses and respects filtered character visibility. No room positions or native focus lists are changed.
- ESC now exits from every phase: invitation, waiting, countdown, play, checkpoint and result. A visible ESC/Exit button is always available; acceptance and decline have matching hit areas. Local cleanup still completes when sending cancellation fails. Keyboard listeners and focus styles are released on cancellation, departure and disposal.
- Kept ordered completion-driven rows, bubble pops, red shaking mistakes, five-second checkpoints, reduced-motion feedback, initiation limited to 12291 and all duel events directed only to participants. The scene uses native Canvas 2D and a small CSS rule, with no additional framework, shader or image-asset dependency.
- Verified 108 tests, TypeScript/build checks and rendered all visual states. Stable remains 0.4.18.

## 0.4.30 — Beta

- Removed the experimental Echo bridge, all Test Echo activities, helper-object registration, partner handshakes/heartbeats and Echo-specific leash hooks. Normal GGC left/right positioning, triples and Step away remain available. A one-time migration only cleans unchanged tracked objects and owned pair state left by the retired test; personal replacements and edits are preserved.
- Skirmish letters must now be pressed strictly from left to right. Each four-letter row remains until completed, with no timed expiration or replacement. Unfinished rows carry across five-second checkpoints and extensions. Both players receive the same deterministic sequence regardless of their speed.
- Added glowing letter bubbles with the expected letter highlighted. A correct press pops its bubble into a fading ring and particles; an incorrect or out-of-order letter turns the expected bubble red and shakes it without changing the score. A completed row finishes its 300ms burst before the next appears. Reduced-motion preferences retain clear feedback with no shaking or expanding particles.
- Updated the practice rival to type ordered rows with reaction intervals and row transitions. The tug-of-war, five-second result checks, participant-only networking, chat restoration and 12291 initiation gate are preserved. Skirmish protocol 2 prevents clients using the previous expiring-wave rules from joining the new mode; both duel participants should update.
- Verified 103 automated tests, TypeScript/build checks and rendered invitation, countdown, ordered row, error, burst and result views. Stable remains 0.4.18.

## 0.4.29 — Beta

- Added experimental torso/arms activities `Test Echo · Stand left`, `Test Echo · Stand right` and `Test Echo · Step away`. Only 12291 can initiate; the other participant must also have this GGC beta. Supports the test combination of Echo + GGC on one client and GGC alone on the other. This experiment supports pairs, not triples.
- Each participant equips only its own required item in an empty, permitted slot and publishes its own authenticated `Luzi_XCharacterDrawState`. The left character uses native CollarLeash; the right uses Echo's invisible Pulled Leash helper, registered locally if absent. Existing items and Echo pairs are not overwritten. The helper is invisible; full concealment of the native CollarLeash on Echo-only clients is not claimed.
- Omitted Echo's lead/follow state, never added real leash relationships and never sent leash Beeps. While paired, partner-specific leash permission/Beep/ping guards prevent the experimental relationship from causing room following; unrelated leashes retain native behavior. Pair state and unchanged test-owned items are cleared before leaving, on separation, peer departure, handshake/heartbeat timeout and disposal, with interrupted-session recovery on reload.
- Reused GGC's layout and click positioning for the GGC-only client. Clients with Echo's room-order renderer use its native pair drawing to avoid double offsets. Pair changes and newcomer/late Echo introductions synchronize without periodic room broadcasts; handshake and heartbeat messages are private to the participant.
- Verified 105 automated tests and TypeScript/build checks. A separate read-only compatibility check executes Echo's original validator, reciprocal-pair lookup and asset modifier against states produced by the actual GGC handshake, confirming X=175/325 for left and X=325/175 for right with no lead/follow. Live two-account room validation remains the purpose of this experimental release. Stable remains 0.4.18.

## 0.4.28 — Beta

- Released left/right positioning and Step away for all GGC users, through activities and radial menus. Position announcements, newcomer synchronization and received positions now support every room member instead of only tester identities.
- Fixed the current lateral remaining available after positioning. Activities and radial menus now show only available sides; attempting the same position again is rejected without sending another position or action message. Switching to the opposite free side and stepping away remain available.
- Preserved the maximum of one person on each side, triple layouts and previews, walking/distance/ghost checks, Echo-pair compatibility guards and deterministic conflict handling. Other tester-only features retain their existing access rules.
- Verified 97 tests and TypeScript/build checks, including ordinary-user access, both lateral transitions, repeated actions, received positions, triples and synchronization. Stable remains 0.4.18.

## 0.4.27 — Beta

- Added the private Test skirmish activity on torso/arms and `/skirmish [member number]`, plus console command `testskirmish(memberNumber)`. Only 12291 can initiate. With no number, the command starts a completely local practice duel against an automatic rival on the player's own character.
- Added the room-centre 3–2–1 countdown, disappearing A–Z prompts and progressively faster waves. Both players receive the same letter opportunities and a full five seconds per round, using the actual typed letters for their keyboard layout; held keys, composition, accented and special keys do not score.
- Added a cumulative tug-of-war divider starting at 50%. Each correct letter shifts it by 5 points. Results are evaluated only after both five-second reports: 10% or 90% wins, otherwise another faster five-second round begins. The loser applies BC's native Kneel pose and normal pose synchronization where that pose is available.
- All duel invitations, progress, reports and decisions are directed exclusively to the opponent. Only participants render the overlay or capture input; practice sends no duel messages. There is no room broadcast or spectator mode. The final Kneel remains an ordinary BC pose visible in the room.
- Chat is suspended only during play and restored on completion, cancellation, Escape, focus loss, room changes, peer departure or timeout. Missing peers never award a default win. The initiator coordinates the current session; wrong senders, recipients, sessions and rounds are rejected.
- Verified 95 tests, TypeScript/build checks and rendered invitation/countdown/play/result views. Stable remains 0.4.18.

## 0.4.26 — Beta

- Replaced positioning activity arrows with complete character previews using BC's native DrawCharacter renderer, retaining appearance, pose, proportions and visibility effects rather than cropped portraits or custom body drawings.
- Left/right previews keep the selected player in the middle, show the local player on the intended side and include the existing opposite companion when forming a triple.
- Step away previews keep the current anchor and companion, shift the local player slightly outwards and fade that character to 18% opacity. Opacity is applied after native rendering so BC's internal alpha reset does not cancel the effect.
- Previews are generated locally when activity buttons are created, without moving characters or sending messages. Drawing context and character tracking are restored even on failure; original character state is preserved. All 87 tests and TypeScript/build checks pass.

## 0.4.25 — Beta

- Extended GGC side positioning to a maximum of three characters: one anchor, one on the left and one on the right. Occupied sides and chains are blocked; activities and radial shortcuts expose only available sides. Tester access remains limited to 12291 and 210509.
- Packed complete groups into five-character rows and ten-character pages, preserving left–centre–right order and normal server room order. Shared-centre offsets keep 150 units between adjacent characters; clicks select the nearest character. Filtered or off-page members are never revealed, and simultaneous conflicting claims converge on one occupant per side.
- Added Echo-style event-based addon announcements on loading/in-room synchronization and directed introductions to newcomers. One bounded directed response supports late loading; there is no periodic announcement loop. Announcements contain only version metadata and use the server sender identity.
- Preserved discovery queues, persistent backoff, presence/avatar caches and legacy PING/PONG fallback. Fresh announcements update presence and version immediately, and fresh cache entries restore room icons after reload without new probes or extending cache lifetime. Already discovered peers are skipped by fallback queries.
- Verified 83 tests and TypeScript/build checks, including triple layouts for rooms of 3–20 people, page boundaries, clicks, collision handling, announcement routing, repeated events, late loading, cache restoration, invalid data and disposal. Positioning remains GGC-only; no Echo compatibility bridge is enabled.

## 0.4.24 — Beta

- Fixed left/right positioning chat actions displaying literal SourceCharacter/DestinationCharacter placeholders. Messages now contain the players' display names, preferring nicknames, while retaining character metadata.
- Verified the actual outgoing action text; all 73 tests and TypeScript/build checks pass.

## 0.4.23 — Beta

- Added tester 210509 alongside 12291 through one shared access list. Both have the same experimental menu access, Chess invitations, solo play, rematches, preview and left/right positioning activities.
- Fixed Chess timeout authority: the player who initiated the current game is its clock authority, independently of tester identity, ID ordering or piece colour. Authority is bound to that game session and cleared on leaving; opponents reject timeout declarations from anyone else or another session. Solo games use the local initiator.
- Kept each tester's side positioning independent, including cancellation and room state, and kept both pairs together at row/page boundaries without sharing a character between pairs.
- All 73 tests and TypeScript/build checks pass, including invitations, clock authority with both initiating testers and either colour, invalid/stale flags, tester menu/preview access and simultaneous side positioning.

## 0.4.22 — Beta

- Moved Chess into the existing shared GGC phone shell with a nearly black screen. Reused the device frame, camera, home indicator, screen clipping and existing game controls; preserved avatars, clocks, palettes, premoves, draw offers, promotions, result dismissal, bets, hide, leave, help and rematches.
- Fitted the complete board and controls within the phone screen, kept viewport fitting and direct taps for both orientations, and adjusted text contrast for the dark screen. Verified the start, draw-offer and checkmate views visually.

- Added tester-only (12291) left/right self-positioning activities and Misc radial shortcuts, plus Step away. Uses a shared centre with ±75-unit offsets without equipping items, attaching a leash or following between rooms.
- Shared room positioning with updated GGC clients, including directed state for newcomers and late addon loading. Preserved normal room order, kept pairs within rows/pages and aligned overlapping-character clicks with their visual positions.
- Added ten regression tests for positioning permissions, state validation, geometry, interactions, synchronization and cleanup, plus phone layout and the reused screen clipping. All 68 tests and the TypeScript/build checks pass. Documented Echo's discovery/icon flow and invisible Cuddle leash behaviour in ECHO_RESEARCH.md; existing discovery is unchanged.

## 0.4.21 — Beta

- Added debuggame("chess") as an isolated tester preview with player avatars, clocks and the animated turn indicator; it does not start a game or send network/game actions.
- Enabled single-player Chess against a basic local computer opponent from the tester's own Casual menu, with the existing time-control choices. Solo games cannot carry bets.
- Added five experimental board palettes: Sage & Wood (current), Walnut & Cream, Tournament Green, Slate Blue and Classic Gray. Clicking or tapping either avatar cycles the local palette and shows its name.
- Added DRAW between the existing buttons. Multiplayer opponents can accept or decline; accepted draws stop the game, refund the local cash deposit and never apply win/loss stake effects. The computer accepts draw requests in solo mode.
- Validated peer, game and move sequence for draw offers/responses, cancelled stale offers and preserved the tester restriction for 12291.
- Verified 58 automated tests, both mobile board orientations, all five palette previews and the draw-offer dialog.

## 0.4.20 — Beta

- Enlarged player avatars and strengthened the active player's travelling gold border with a thicker glowing trail. Added depth and shading to VS while preserving its position.
- Removed names from clocks. White and Black clocks match the corresponding pieces, invert text contrast and turn the remaining time red at ten seconds.
- Rounded the Chess window corners to 8px. The final result banner can be dismissed with a click or tap to inspect the board without reopening play.
- Added viewport fitting and direct piece-then-destination taps, using the existing board and actions without additional mobile movement controls. Corrected coordinates for scaled canvases and suppressed duplicate, cancelled, multi-touch and swipe inputs.
- Verified 48 automated tests and simulated portrait/landscape mobile layouts in both board orientations.

## 0.4.19 — Beta

- Replaced the Chess board title with the two player avatars and VS, reusing live room portraits and cached avatar thumbnails. Only the active player has a subtle travelling gold border; reduced-motion preferences keep the border static.
- Removed interior square coordinates. Files and ranks appear only along the outer edges, rotate correctly for Black and use the opposite square color.
- Highlighted the origin and destination of the latest accepted move, replacing the previous highlight on each move and clearing it on reset.
- Fixed premoves onto friendly occupied squares to prepare recaptures, as well as empty squares and enemy pieces. Execution still validates the resulting position and cancels on check, checkmate, game over or an illegal move.
- Preserved the tester restriction for 12291. Verified 43 automated tests, build and both board orientations visually.

## 0.4.18 — Stable and Beta

- Published the same 0.4.18 build to both Stable and Beta.
- Verified that Chess is hidden from Casual and Gambling in both classic and radial menus for all players except tester 12291.
- Hidden Chess time-control submenus for non-testers, including stale menu states, and blocked direct menu actions from opening Chess bets or sending invitations.
- Kept game creation and rematches restricted to 12291; opponents invited by the tester can still accept and play.
- Verified 36 automated tests covering menu visibility, access restrictions and existing game/network behavior.

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
