const teamData = {
  CHW: {
    filecode: 'cws',
    abbrev: 'CWS',
  },
  BOS: {
    filecode: 'bos',
    abbrev: 'BOS',
  },
  HOU: {
    filecode: 'hou',
    abbrev: 'HOU',
  },
  OAK: {
    filecode: 'oak',
    abbrev: 'OAK',
  },
  TB: {
    filecode: 'tb',
    abbrev: 'TB',
  },
  NYY: {
    filecode: 'nyy',
    abbrev: 'NYY',
  },
  CLE: {
    filecode: 'cle',
    abbrev: 'CLE',
  },
  TOR: {
    filecode: 'tor',
    abbrev: 'TOR',
  },
  SEA: {
    filecode: 'sea',
    abbrev: 'SEA',
  },
  KC: {
    filecode: 'kc',
    abbrev: 'KC',
  },
  LAA: {
    filecode: 'ana',
    abbrev: 'LAA',
  },
  TEX: {
    filecode: 'tex',
    abbrev: 'TEX',
  },
  DET: {
    filecode: 'det',
    abbrev: 'DET',
  },
  BAL: {
    filecode: 'bal',
    abbrev: 'BAL',
  },
  MIN: {
    filecode: 'min',
    abbrev: 'MIN',
  },
  SF: {
    filecode: 'sf',
    abbrev: 'SF',
  },
  SD: {
    filecode: 'sd',
    abbrev: 'SD',
  },
  LAD: {
    filecode: 'la',
    abbrev: 'LAD',
  },
  STL: {
    filecode: 'stl',
    abbrev: 'STL',
  },
  NYM: {
    filecode: 'nym',
    abbrev: 'NYM',
  },
  CHC: {
    filecode: 'chc',
    abbrev: 'CHC',
  },
  PHI: {
    filecode: 'phi',
    abbrev: 'PHI',
  },
  MIL: {
    filecode: 'mil',
    abbrev: 'MIL',
  },
  MIA: {
    filecode: 'mia',
    abbrev: 'MIA',
  },
  ATL: {
    filecode: 'atl',
    abbrev: 'ATL',
  },
  CIN: {
    filecode: 'cin',
    abbrev: 'CIN',
  },
  WSH: {
    filecode: 'was',
    abbrev: 'WSH',
  },
  PIT: {
    filecode: 'pit',
    abbrev: 'PIT',
  },
  ARI: {
    filecode: 'ari',
    abbrev: 'ARI',
  },
  COL: {
    filecode: 'col',
    abbrev: 'COL',
  },
};

const changeAbbr = (abbreviation) => {
  return teamData[abbreviation]['abbrev'];
};

const code = (abbreviation) => {
  return teamData[abbreviation]['filecode'];
};

export {changeAbbr as changeAbbreviation, code as getFileCode};
