const weather = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return [
        ...state,
        {
          coords: action.coords
        }
      ]
  }
}

export default todos