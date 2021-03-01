import React, { useState, useEffect } from "react";

const BlueTeamHeader = ({ eventDetails }) => {
  //const [eventDetails, setEventDetails] = useState();
  const [blueTeam, setBlueTeam] = useState([]);

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

      const blueTeam = event.data.event.match.teams[0];
      setBlueTeam(blueTeam);
    };

    fetchEvent();
  }, []);

  //<img src={`${blueTeam.image}`} className="w-12 h-12 m-auto" />

  return (
    <>
      <h2>{blueTeam.name}</h2>
    </>
  );
};
export default BlueTeamHeader;
