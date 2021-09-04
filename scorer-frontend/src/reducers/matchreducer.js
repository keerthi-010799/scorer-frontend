const matchstate = [];

const matchreducers = (state = matchstate, action) => {
  switch (action.type) {
    case "addingmatch":
      return [
        ...state,
        {
          matchData: action.state,
        },
      ];
    default:
      return state;
  }
};

export default matchreducers;
