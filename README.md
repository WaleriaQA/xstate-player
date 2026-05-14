# XState Video Player

Mini video player application built with React and XState.

The project demonstrates UI state management using finite state machines.

## Features

- XState finite state machine
- Full / Mini player modes
- Open / Close player
- Play / Pause states
- Video state synchronization
- Ant Design modal window
- HTML5 video player integration

## Tech Stack

- React
- Vite
- XState
- Ant Design

## Installation

```bash
npm install
npm run dev

State Machine

The player behavior is controlled through XState.

Main states:

closed
mini
full

Nested states inside full:

playing
paused

Example transitions:

OPEN
CLOSE
PLAY
PAUSE
MINIMIZE
EXPAND

Technical Notes

Initially the project used react-player for video playback.

During development I encountered compatibility issues between:

React 19
Vite
react-player

Symptoms:

white screen after rendering player
runtime error:
"Element type is invalid"

What was tested:

reinstalling react-player
downgrading react-player version
testing mp4 and YouTube sources
isolating player from Modal and XState logic

Result:

Native HTML5 <video> element was chosen instead of react-player.

Reasons:

simpler integration with XState
stable behavior with React 19
easier playback state management

Future Improvements
draggable mini-player
playback progress persistence
keyboard shortcuts
animations and transitions
custom player controls

