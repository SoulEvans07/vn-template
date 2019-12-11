const stores = {
  'coffee-shop' : {
    items: [
      {
        name: 'Expresso',
        price: { currency: 'yen', amount: '80' },
        response: {
          speaker: 'barista', text: "You like it dark, right?"
        }
      },
      {
        name: 'Cappuccino',
        price: { currency: 'yen', amount: '100' },
        response: {
          speaker: 'barista', text: "How convenient."
        }
      },
      {
        name: 'Latte',
        price: { currency: 'yen', amount: '120' },
        response: {
          speaker: 'barista', text: "I guess you are too young to appreciate the bitter sweetnes of coffee."
        }
      }
    ]
  }
}

export default stores
