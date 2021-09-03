import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Test = () => {
  const { tournamentId } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [rankings, setRankings] = useState([]);
  console.log(isLoading);

  useEffect(() => {
    const fetchSchedule = async () => {
      const headers = {
        "X-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
      };

      const response = await fetch(
        `https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=${tournamentId}`,
        { headers }
      );

      const games = await response.json();
      console.log(games);
      const matches = games.data.standings[0].stages[0].sections[0].matches;
      setMatches(matches);
      console.log(matches);
      const rankings = games.data.standings[0].stages[0].sections[0].rankings;
      setRankings(rankings);
      console.log("rankings", rankings);
      setLoading(false);
    };

    fetchSchedule();
  }, []);

  return isLoading ? (
    <div className="container w-full w-min-full mx-auto">Carregando...</div>
  ) : (
    <div>
      <div>{rankings[2].teams[0].code}</div>
      <div>
        {rankings.map((rankings, rankingId) => {
          return (
            <div key={rankingId}>
              <p>{rankings.teams[0].code}</p>
              <p>{rankings.teams[0].record.wins}</p>
              <p>{rankings.teams[0].record.losses}</p>
            </div>
          );
        })}
      </div>

      <div>
        {matches.map((matches, matchesId) => {
          return (
            <div key={matchesId}>
              <p>{matches.state}</p>
              <p>{matches.teams[0].name}</p>
              <p>{matches.teams[1].name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Test;
