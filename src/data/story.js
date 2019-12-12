export const storyStart = 'store-2'

const story = {
  'street-day-0': {
    speaker: 'player', text: "...",
    next: [ 'street-day-1' ], isSkippable: true,
    scene: { location: 'street-day', characters: [] }
  },
  'street-day-1': {
    speaker: 'player', text: "Oh a convenience store!",
    next: [ 'street-day-2' ], isSkippable: true,
    scene: { location: 'street-day', characters: [ ] }
  },
  'street-day-2': {
    speaker: 'player', text: "How convenient.",
    next: [ 'street-day-2-1', 'street-day-2-2' ], isSkippable: true,
    scene: { location: 'street-day', characters: [ ] }
  },
  'street-day-2-1': {
    speaker: 'player', text: "Go to the store",
    next: [ 'store-1' ], isSkippable: true,
    scene: { location: 'street-day', characters: [ ] }
  },




  'store-1': {
    speaker: 'barista', text: "Come in! Don't be shy!",
    next: [ 'store-2' ], isSkippable: true,
    scene: { location: 'coffe-shop', characters: [ 'barista' ] }
  },
  'store-2': {
    speaker: 'barista', text: "How can I help you?",
    next: [ 'store-exit' ], isSkippable: true,
    scene: {
      location: 'coffe-shop',
      characters: [ 'barista' ],
      store: 'coffee-shop'
    }
  },
  'store-exit': {
    speaker: 'player', text: "Thank you! Bye!",
    next: [ 'street-day-0' ], isSkippable: true,
    scene: { location: 'coffe-shop', characters: [ 'barista' ] }
  },




  'street-day-2-2': {
    speaker: 'player', text: "Go to school",
    next: [ 'school-1' ], isSkippable: true,
    scene: { location: 'street-day', characters: [ ] }
  },




  'school-1': {
    speaker: 'player', text: "Hello Emma!",
    next: [ 'school-2' ], isSkippable: true,
    scene: { location: 'school', characters: [ 'emma' ] }
  },
  'school-2': {
    speaker: 'emma', text: "Hi %characters.player.name%!",
    next: [ 'school-3' ], isSkippable: true,
    scene: { location: 'school', characters: [ 'emma' ] }
  },
  'school-3': {
    speaker: 'lucy', text: "Hey %characters.player.name%! Don't leave without me! %characters.emma.name%!",
    next: [ 'school-3-1', 'school-3-2' ], isSkippable: false,
    scene: { location: 'school', characters: [ 'emma' ] }
  },
  'school-3-1': {
    speaker: 'player', text: "(Leave)",
    next: [ 'school-3-1-1' ], isSkippable: true,
    condition: {
      typeField: 'stats',
      itemField: 'cha',
      displayNameField: 'name',
      value: 9
    },
    scene: { location: 'school', characters: [ 'emma' ] }
  },
  'school-3-1-1': {
    speaker: 'player', text: "Let's go Emma",
    next: [ 'end' ], isSkippable: true,
    scene: { location: 'school', characters: [ 'emma' ] }
  },
  'school-3-2': {
    speaker: 'player', text: "(Wait for her)",
    next: [ 'school-3-2-1' ], isSkippable: true,
    scene: { location: 'school', characters: [ 'emma' ] }
  },
  'school-3-2-1': {
    speaker: 'player', text: "Quick, we ain't got all day to do this.",
    next: [ 'school-3-2-2' ], isSkippable: true,
    scene: { location: 'school', characters: [ 'emma' ] }
  },
  'school-3-2-2': {
    speaker: 'emma', text: "Actually we do...",
    next: [ 'school-3-2-3' ], isSkippable: true,
    scene: { location: 'school', characters: [ 'emma' ] }
  },
  'school-3-2-3': {
    speaker: 'lucy', text: "Thanks for waiting!",
    next: [ 'school-3-2-4' ], isSkippable: true,
    scene: { location: 'school', characters: [ 'emma', 'lucy' ] }
  },
  'school-3-2-4': {
    speaker: 'lucy', text: "Could you hold this for me?",
    next: [ 'school-3-2-4-1', 'school-3-2-4-2', 'school-3-2-4-3' ], isSkippable: false,
    condition: null,
    scene: { location: 'school', characters: [ 'emma', 'lucy' ] }
  },
  'school-3-2-4-1': {
    speaker: 'player', text: "Why would I?",
    next: [ 'school-3-2-4-1-1' ], isSkippable: false,
    condition: {
      typeField: 'stats',
      itemField: 'cha',
      displayNameField: 'name',
      value: 9
    },
    scene: { location: 'school', characters: [ 'emma', 'lucy' ] }
  },
  'school-3-2-4-1-1': {
    speaker: 'lucy', text: "You are terrible! Fine, I'll do it myself!",
    next: [ 'school-3-2-4-1-2' ], isSkippable: false,
    scene: { location: 'school', characters: [ 'emma', 'lucy' ] }
  },
  'school-3-2-4-1-2': {
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
    scene: { location: 'school', characters: [ 'emma' ] }
  },
  'school-3-2-4-2': {
    speaker: 'player', text: "Sorry, I can't...",
    next: [ 'school-3-2-4-2-1' ], isSkippable: false,
    scene: { location: 'school', characters: [ 'emma', 'lucy' ] }
  },
  'school-3-2-4-2-1': {
    speaker: 'lucy', text: "Really!? Fine, I'll do it myself...",
    next: [ 'end' ], isSkippable: false,
    scene: { location: 'school', characters: [ 'emma', 'lucy' ] }
  },
  'school-3-2-4-3': {
    speaker: 'player', text: "Of course!",
    next: [ 'school-3-2-4-3-1' ], isSkippable: false,
    condition: {
      typeField: 'stats',
      itemField: 'str',
      displayNameField: 'name',
      value: 5
    },
    scene: { location: 'school', characters: [ 'emma', 'lucy' ] }
  },
  'school-3-2-4-3-1': {
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
    scene: { location: 'school', characters: [ 'emma', 'lucy' ] }
  },




  'end': {
    speaker: 'player', text: "The End",
    next: [ 'school-1' ], isSkippable: true,
    scene: { location: 'school', characters: [] }
  },
}

export default story
