const stores = {
  'coffee-shop' : {
    items: {
      'espresso': {
        amount: 10,
        price: { currency: 'yen', amount: '80' },
        response: {
          speaker: 'barista', text: "You like it dark, right?"
        }
      },
      'cappuccino': {
        price: { currency: 'yen', amount: '100' },
        response: {
          speaker: 'barista', text: "How convenient."
        }
      },
      'latte': {
        price: { currency: 'yen', amount: '120' },
        response: {
          speaker: 'barista', text: "I guess you are too young to appreciate the bitter sweetnes of coffee."
        }
      },
      'flat-white': {
        amount: 5,
        price: { currency: 'diamond', amount: '1' },
        response: {
          speaker: 'barista', text: "I guess you are too young to appreciate the bitter sweetnes of coffee."
        }
      }
    }
  }
}

export default stores
