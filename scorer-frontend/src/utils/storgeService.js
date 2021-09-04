export const putData = (key, data) => {
  let payload;
  if (data) {
    payload = JSON.stringify(data);
  }
  return window.localStorage.setItem(key, payload);
};

export const getData = (key) => {
  let value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const getPlayerById = (id) => {
  let players = getData('players');
  if (!players) return null;
  let player = players.find((p) => p.id === id);
  return player || null;
};

export const getTeamById = (id) => {
  let teams = getData('teams');
  if (!teams) return null;
  let team = teams.find((p) => p.id === id);
  return team || null;
};

export const getMatchById = (id) => {
  let matches = getData('matches');
  if (!matches) return null;
  let match = matches.find((m) => m.id === id);
  return match || null;
};

export const updateTeamById = (id, data) => {
  let teams = getData('teams');
  if (!teams) return false;
  let teamIndex = teams.findIndex((t) => t.id === id);
  teams[teamIndex] = { ...data };
  let payload = JSON.stringify(teams);
  window.localStorage.setItem('teams', payload);
};

export const updateMatchById = (id, data) => {
  let matches = getData('matches');
  if (!matches) return false;
  let matchIndex = matches.findIndex((t) => t.id === id);
  matches[matchIndex] = { ...matches[matchIndex], ...data };
  let payload = JSON.stringify(matches);
  window.localStorage.setItem('matches', payload);
};

// export const getPlayerFromMatch = (id) => {
//   let players = getData('players');
//   if (!players) return null;
//   let player = players.find((p) => p.id === id);
//   return player || null;
// };

export const deepCopy = (data) => JSON.parse(JSON.stringify(data));
