const story = {
  '1': {
    speaker: 'player', text: "Hello Emma!",
    next: [ '2' ], isSkippable: true,
    condition: null,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '2': {
    speaker: 'emma', text: "Hi %characters.player.name%!",
    next: [ '3' ], isSkippable: true,
    condition: null,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3': {
    speaker: 'lucy', text: "Hey %characters.player.name%! Don't leave without me! %characters.emma.name%!",
    next: [ '3-1', '3-2' ], isSkippable: false,
    condition: null,
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
      valueField: "value",
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
    condition: null,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-2': {
    speaker: 'player', text: "(Wait for her)",
    next: [ '3-2-1' ], isSkippable: true,
    condition: null,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-2-1': {
    speaker: 'player', text: "Quick, we ain't got all day to do this.",
    next: [ '3-2-2' ], isSkippable: true,
    condition: null,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-2-2': {
    speaker: 'emma', text: "Actually we do...",
    next: [ '3-2-3' ], isSkippable: true,
    condition: null,
    scene: {
      location: 'school',
      characters: [ 'emma' ]
    }
  },
  '3-2-3': {
    speaker: 'lucy', text: "Thanks for waiting!",
    next: [ 'end' ], isSkippable: true,
    condition: null,
    scene: {
      location: 'school',
      characters: [ 'emma', 'lucy' ]
    }
  },
  'end': {
    speaker: 'player', text: "The End",
    next: null, isSkippable: true,
    condition: null,
    scene: {
      location: 'school',
      characters: []
    }
  },
}

export default story
