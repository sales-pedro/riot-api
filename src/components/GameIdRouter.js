import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GameIdRouter = ({ scheduleGames, isLoading }) => {
  const [liveDetails, setLiveDetails] = useState([]);

  useEffect(() => {
    const fetchLiveDetails = async () => {
      const headers = {
        "X-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
      };

      const response = await fetch(
        `https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=en-US&id=${scheduleGames.match.id}`,
        { headers }
      );

      const details = await response.json();

      const liveDetails = details.data.event.match.games[0].id;
      setLiveDetails(liveDetails);
    };

    fetchLiveDetails();
  }, []);
  return isLoading ? (
    <div className="container mx-auto">Loading</div>
  ) : (
    <>
      <h2 className="text-blue-300">
        <Link to={`${liveDetails}`}>{liveDetails}</Link>
      </h2>
    </>
  );
};
export default GameIdRouter;
