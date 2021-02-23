import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GameHeader = ({ eventDetails }) => {
  //const [eventDetails, setEventDetails] = useState();
  //const [redTeam, setRedTeam] = useState([]);
  const [blueTeam, setBlueTeam] = useState([]);

  const [xc, setXc] = useState([]);

  console.log("xc", xc);
  console.log("eventDetails", eventDetails);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(
        `https://esports-api.lolesports.com/persisted/gw/getEventDetails?hl=pt-BR&id=${eventDetails}`
      );

      const xc = response;
      setXc(xc); // pode apagar depois só setei pra ver o log
      const event = await response.json();
      const eventJson = event;
      console.log("eventJson", eventJson);
      const blueTeam = event.data.event.match.teams[0];
      //const redTeam = event.data.event.match.teams[1];
      setBlueTeam(blueTeam);
      //setRedTeam(redTeam);
    };

    fetchEvent();
  }, []);
  return (
    <>
      <h2>{blueTeam.name}</h2>
    </>
  );
};
export default GameHeader;
