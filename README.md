Bandsync is Webapp to control the bahptics tactosy components in a musical context with the goal of synchronising bandmembers.
Its part of a student project at HTW-Dresden.

## Getting Started
### Prerequisites

- a windows 7 or newer system with blutooth capability / an Android or iOS mobile Phone with bluetooth capability
- one or two bhaptics tactosy armbands
- the `bhaptics player` should be installed from `https://www.bhaptics.com/support/download/`
- `Node.js` should be installed (created and tested with v14.6.0)
- `npm` should be installed, is installed with `Node.js` by default (created and tested with v6.14.6)

### Installation

- Install the `bhaptics player`
- Connect your tactosy to your system via bluetooth
- Pair the tactosy with the `bhaptics player` in the settings tab
- Set tehm to the left forearm and right forearm position
- Clone the project then run a `npm install` inside the project folder

## Usage
### bhaptics player

- run the `bhaptics player` and make sure the tactosy is properly connected
- leave it running while using the bandsync app

### bandsync webapp

- in the project folder run a `npm run start:dev` (for now) to start serving the app on `localhost:9000`
- open a browser and go to `localhost:9000`
- go to `settings` to check the connection of the tactosy
- once your connection has been confirmed you can navigate to the `new project` page
- now use the top buttons to upload any song and its associated data for count ins
- you will see all count ins and outs for all instruments which you can modify and delete/create at will
- saving and loading projects is also possible with their respective buttons
- clicking `Start` now will start the song and count in the 2 instruments according to the data

## Project Details
### API

The webapp uses the tact-js API provided by bhaptics at `https://github.com/bhaptics/tact-js`.
Signals are sent via the `SubmitDot()` - function with predetermined parameters for actuator-index, position, timing, etc.
Multisignals are delivered on a timer using the `SetInterval()` and `SetTimeout()` - functions.
The Songtest calculates the timings for all instruments in ms from the uploaded JSON-file.
It will then use several `SetInterval()` functions to sync the count ins/outs to the audio file.

### Current State

As of now all main functionalities are implemented and ready for use.
The only problem lies with the inability to let multiple tactosy vibrate at exactly the same time.
Only the first called gadget will take precedence and actually vibrate.
This has to do with the js implementation of the bHaptics plugin, not allowing asynchronous signaling.