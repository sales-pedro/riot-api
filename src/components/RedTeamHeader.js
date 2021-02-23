import React, { useState, useEffect } from "react";

const RedTeamHeader = ({ eventDetails }) => {
  const [redTeam, setRedTeam] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const headers = {
        "X-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
      };
      const response = await fetch(
        `https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=pt-BR&id=${eventDetails}`,
        { headers }
      );

      const event = await response.json();

      const redTeam = event.data.event.match.teams[1];
      setRedTeam(redTeam);
    };

    fetchEvent();
  }, []);
  return (
    <>
      <h2>{redTeam.name}</h2>
    </>
  );
};
export default RedTeamHeader;
