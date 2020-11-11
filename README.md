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
- for now you should go to `settings` to find all working tests
- click test once to connect the tactosy to the webapp, after that you should feel a vibration in the right tactosy upon clicking test
- to test the song example, first use the left input to upload `pachelbel_test` from the project directory, then upload the songtest.json in the right input
- the left tactosy is set up for the piano voice, while the right one is set up for the percussion voice
- you can find the scores in the project folder as `piano_1.pdf` and `drum_1.pdf`
- clicking `Song-Test` now will start the song and count in the piano and percussion

## Project Details
### API

The webapp uses the tact-js API provided by bhaptics at `https://github.com/bhaptics/tact-js`.
Signals are sent via the `SubmitDot()` - function with predetermined parameters for actuator-index, position, timing, etc.
Multisignals are delivered on a timer using the `SetInterval()` and `SetTimeout()` - functions.
The Songtest calculates the timings for all instruments in ms from the uploaded JSON-file.
It will then use several `SetInterval()` functions to sync the count ins/outs to the audio file.

### Current State

The Songtest served with webpack does not represent the format and structure of the actual project as of yet.
The non-functional part of the webapp is developed much further already with loading and saving capabilities.
To view the further developed webapp without test functionality just open the `index.html` in a browser.

### Future plans

Many more Functions to control when and how the tactosy will be activated are planned.

#### This is a work in progress, which will evolve over many weeks with the endproduct planned to be finished in spring 2021.