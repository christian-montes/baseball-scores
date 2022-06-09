export default function wcCorrectGB(teams, tiedDivisions) {
  const [{ value: refWins }, { value: refLosses }] = teams[2]['stats'].filter(
    (stat) => {
      const { name } = stat;
      return ['wins', 'losses'].includes(name);
    }
  );

  const adjustedGB = teams.map((tm, index) => {
    const { team, stats } = tm;
    let GBStat;
    let GBIndex;
    const [{ value: wins }, { value: losses }] = stats.filter((stat, index) => {
      const { name } = stat;
      name === 'divisionGamesBehind' &&
        ((GBStat = { ...stat }), (GBIndex = index));
      return ['wins', 'losses'].includes(name);
    });

    const GB = (
      Math.round(
        (Math.abs(wins - refWins) + Math.abs(losses - refLosses)) * 10
      ) / 20
    ).toFixed(1);

    if (!tiedDivisions) {
      if (index === 2) {
        GBStat['value'] = '-';
        GBStat['displayValue'] = '-';
      } else if (index > 1) {
        GB === 0.0
          ? ((GBStat['value'] = '-'), (GBStat['displayValue'] = '-'))
          : ((GBStat['value'] = GB), (GBStat['displayValue'] = `${GB}`));
      } else {
        GBStat['value'] = `+${GB}`;
        GBStat['displayValue'] = `+${GB}`;
      }
    } else {
      if (tiedDivisions.includes(team.division)) {
        GBStat['value'] = GB;
        GBStat['displayValue'] = `${GB}`;
      }
    }

    let newCalcStats = stats
      .slice(0, GBIndex)
      .concat(GBStat, stats.slice(GBIndex + 1));

    return { team, stats: newCalcStats };
  });

  return adjustedGB;
}