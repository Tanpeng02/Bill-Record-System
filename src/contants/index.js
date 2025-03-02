export const billListData = {
    pay: [
      {
        type: 'foods',
        name: 'Food & Dining',
        list: [
          { type: 'food', name: 'Meal' },
          { type: 'drinks', name: 'Beverages' },
          { type: 'dessert', name: 'Snacks & Desserts' },
        ],
      },
      {
        type: 'taxi',
        name: 'Transportation',
        list: [
          { type: 'taxi', name: 'Taxi & Rental' },
          { type: 'longdistance', name: 'Travel Tickets' },
        ],
      },
      {
        type: 'recreation',
        name: 'Entertainment & Leisure',
        list: [
          { type: 'bodybuilding', name: 'Sports & Fitness' },
          { type: 'game', name: 'Games & Fun' },
          { type: 'audio', name: 'Media & Music' },
          { type: 'travel', name: 'Travel & Vacation' },
        ],
      },
      {
        type: 'daily',
        name: 'Daily Expenses',
        list: [
          { type: 'clothes', name: 'Clothing' },
          { type: 'bag', name: 'Shoes & Bags' },
          { type: 'book', name: 'Education & Books' },
          { type: 'promote', name: 'Skill Development' },
          { type: 'home', name: 'Home & Decor' },
        ],
      },
      {
        type: 'other',
        name: 'Other Expenses',
        list: [{ type: 'community', name: 'Community Fees' }],
      },
    ],
    income: [
      {
        type: 'professional',
        name: 'Professional Income',
        list: [
          { type: 'salary', name: 'Salary' },
          { type: 'overtimepay', name: 'Overtime Pay' },
          { type: 'bonus', name: 'Bonus' },
        ],
      },
      {
        type: 'other',
        name: 'Other Income',
        list: [
          { type: 'financial', name: 'Investment Income' },
          { type: 'cashgift', name: 'Gift Money' },
        ],
      },
    ],
  }
  
  export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
    billListData[key].forEach(bill => {
      bill.list.forEach(item => {
        prev[item.type] = item.name
      })
    })
    return prev
  }, {})
  