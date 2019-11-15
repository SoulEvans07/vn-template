const story = {
  '1': {
    speaker: 'player', text: "Hello Emma!",
    next: [ '2' ], isSkippable: true,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '2': {
    speaker: 'emma', text: "Hi %characters.player.name%!",
    next: [ '3' ], isSkippable: true,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3': {
    speaker: 'lucy', text: "Hey %characters.player.name%! Don't leave without me! %characters.emma.name%!",
    next: [ '3-1', '3-2' ], isSkippable: false,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-1': {
    speaker: 'player', text: "(Leave)",
    next: [ '3-1-1' ], isSkippable: true,
    condition: {
      typeField: 'stats',
      itemField: 'cha',
      displayNameField: 'name',
      value: 9
    },
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-1-1': {
    speaker: 'player', text: "Let's go Emma",
    next: [ 'end' ], isSkippable: true,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-2': {
    speaker: 'player', text: "(Wait for her)",
    next: [ '3-2-1' ], isSkippable: true,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-2-1': {
    speaker: 'player', text: "Quick, we ain't got all day to do this.",
    next: [ '3-2-2' ], isSkippable: true,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-2-2': {
    speaker: 'emma', text: "Actually we do...",
    next: [ '3-2-3' ], isSkippable: true,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-2-3': {
    speaker: 'lucy', text: "Thanks for waiting!",
    next: [ '3-2-4' ], isSkippable: true,
    scene: {
      location: 'school',
      characters: [ 'emma', 'lucy' ]
    }
  },
  '3-2-4': {
    speaker: 'lucy', text: "Could you hold this for me?",
    next: [ '3-2-4-1', '3-2-4-2', '3-2-4-3' ], isSkippable: false,
    condition: null,
    scene: {
      location: 'school',
      characters: [ 'emma', 'lucy' ]
    }
  },
  '3-2-4-1': {
    speaker: 'player', text: "Why would I?",
    next: [ '3-2-4-1-1' ], isSkippable: false,
    condition: {
      typeField: 'stats',
      itemField: 'cha',
      displayNameField: 'name',
      value: 9
    },
    scene: {
      location: 'school',
      characters: [ 'emma', 'lucy' ]
    }
  },
  '3-2-4-1-1': {
    speaker: 'lucy', text: "You are terrible! Fine, I'll do it myself!",
    next: [ '3-2-4-1-2' ], isSkippable: false,
    scene: {
      location: 'school',
      characters: [ 'emma', 'lucy' ]
    }
  },
  '3-2-4-1-2': {
    speaker: 'emma', text: "There was no need for this!",
    next: [ 'end' ], isSkippable: false,
    actions: [
      {
        type: 'DECREASE',
        target: 'player',
        typeField: 'stats',
        itemField: 'cha',
        amount: 2
      }
    ],
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-2-4-2': {
    speaker: 'player', text: "Sorry, I can't...",
    next: [ '3-2-4-2-1' ], isSkippable: false,
    scene: {
      location: 'school',
      characters: [ 'emma', 'lucy' ]
    }
  },
  '3-2-4-2-1': {
    speaker: 'lucy', text: "Really!? Fine, I'll do it myself...",
    next: [ 'end' ], isSkippable: false,
    scene: {
      location: 'school',
      characters: [ 'emma', 'lucy' ]
    }
  },
  '3-2-4-3': {
    speaker: 'player', text: "Of course!",
    next: [ '3-2-4-3-1' ], isSkippable: false,
    condition: {
      typeField: 'stats',
      itemField: 'str',
      displayNameField: 'name',
      value: 5
    },
    scene: {
      location: 'school',
      characters: [ 'emma', 'lucy' ]
    }
  },
  '3-2-4-3-1': {
    speaker: 'lucy', text: "Thank you!",
    next: [ 'end' ], isSkippable: false,
    actions: [
      {
        type: 'INCREASE',
        target: 'player',
        typeField: 'stats',
        itemField: 'cha',
        amount: 1
      }
    ],
    scene: {
      location: 'school',
      characters: [ 'emma', 'lucy' ]
    }
  },
  'end': {
    speaker: 'player', text: "The End",
    next: [ '1' ], isSkippable: true,
    scene: {
      location: 'school',
      characters: []
    }
  },
}

export default story
