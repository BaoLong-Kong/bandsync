Bandsync is Webapp to control the bahptics tactosy components in a musical context with the goal of synchronising bandmembers.
Its part of a student project at HTW-Dresden.

## Getting Started
### Prerequisites

- a windows 7 or newer system with blutooth capability / an Android or iOS mobile Phone with bluetooth capability
- a bhaptics tactosy armband
- the `bhaptics player` should be installed from `https://www.bhaptics.com/support/download/`
- `Node.js` should be installed (created and tested with v14.6.0)
- `npm` should be installed, is installed with `Node.js` by default (created and tested with v6.14.6)

### Installation

- Install the `bhaptics player`
- Connect your tactosy to your system via bluetooth
- Pair the tactosy with the `bhaptics player` in the settings tab
- Set it to the left forearm position
- Clone the project then run a `npm install` inside the project folder

## Usage
### bhaptics player

- run the `bhaptics player` and make sure the tactosy is properly connected
- leave it running while using the bandsync app

### bandsync webapp

- in the project folder run a `npm run start:dev` (for now) to start serving the app on `localhost:9000`
- open a browser and go to `localhost:9000`
- for now you should be able to click either the test or multitest buttons to send a single signal or 4 signals to your tactosy
- on the first buttonclick you will not actually feel a vibration as the tactosy has to connect first

## Project Details
### API

The webapp uses the tact-js API provided by bhaptics at `https://github.com/bhaptics/tact-js`.
Signals are sent via the `SubmitDot()` - function with predetermined parameters for actuator-index, position, timing, etc.
Multisignals are delivered on a timer using the `SetInterval()` and `SetTimeout()` - functions.

### Future plans

Many more Functions to control when and how the tactosy will be activated are planned.
Also in progress is a function to upload a media-file with a tune and seperate information on count-in / count-out timings for multiple (2 for now) players.
This is meant to provide an easy way to use the app with premade settings for a specific song.

#### This is a work in project, which will evolve over many weeks with the endproduct planned to be finished in spring 2021.