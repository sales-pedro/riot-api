import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlueTeamHeader from "./BlueTeamHeader";

import RedTeamHeader from "./RedTeamHeader";

const GamePage = () => {
  const { linkDetails } = useParams();

  const [logSeconds, setSeconds] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const [gameState, setGameState] = useState([]);

  const [blueTeamPlayersStats, setblueTeamPlayersStats] = useState([]);
  const [redTeamPlayersStats, setredTeamPlayersStats] = useState([]);
  const [blueTeamStats, setBlueTeamStats] = useState([]);
  const [redTeamStats, setRedTeamStats] = useState([]);

  const [eventDetails, setEventDetails] = useState();
  const [blueTeamComp, setBlueTeamComp] = useState([]);
  const [redTeamComp, setRedTeamComp] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      //setSeconds(logSeconds + 1);
      function functionSeconds() {
        if (logSeconds < 5) {
          setSeconds(logSeconds + 1);
        } else {
          setSeconds(0);
        }
      }
      functionSeconds();
    }, 10000);
    return () => clearInterval(timer);
  });

  function DateOffset(offset) {
    return new Date(+new Date() + offset);
  }

  useEffect(() => {
    const time = DateOffset(-20000);

    const hours = time.getUTCHours().toString().padStart(2, "0");
    const minutes = time.getUTCMinutes().toString().padStart(2, "0");
    const seconds =
      time.getSeconds() < 10
        ? "0".substring(0, 1).padEnd(2, "0")
        : time.getUTCSeconds().toString().substring(0, 1).padEnd(2, "0");

    const fetchGame = async () => {
      const response = await fetch(
        `https://feed.lolesports.com/livestats/v1/window/${linkDetails}?startingTime=2021-02-${time.getUTCDate()}T${hours}:${minutes}:${seconds}.00Z`
      );
      const game = await response.json();
      const blueTeamComp =
        game.gameMetadata.blueTeamMetadata.participantMetadata;
      const redTeamComp = game.gameMetadata.redTeamMetadata.participantMetadata;
      setBlueTeamComp(blueTeamComp);
      setRedTeamComp(redTeamComp);
      const gameState = game.frames[9].gameState;
      setGameState(gameState);
      const blueTeamStats = game.frames[9].blueTeam;
      const redTeamStats = game.frames[9].redTeam;
      setBlueTeamStats(blueTeamStats);
      setRedTeamStats(redTeamStats);
      const blueTeamPlayersStats = game.frames[9].blueTeam.participants;
      const redTeamPlayersStats = game.frames[9].redTeam.participants;
      setblueTeamPlayersStats(blueTeamPlayersStats);
      setredTeamPlayersStats(redTeamPlayersStats);
      const eventDetails = game.esportsMatchId;

      setEventDetails(eventDetails);
      setLoading(false);
    };

    fetchGame();
  }, [logSeconds]);

  return isLoading ? (
    <div className="container mx-auto">Loading</div>
  ) : (
    <>
      <span>
        <h2>Game state: {gameState}</h2>
      </span>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Teams
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Winner
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Gold
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Inhibitors
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Towers
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Barons
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800 ">
              Kills
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Dragons
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          <tr className="bg-blue-50">
            <td className="sm:p-3 py-2 px-1 bg-blue-100 border border-gray-300 dark:border-gray-800">
              <BlueTeamHeader eventDetails={eventDetails} />
            </td>
            <td className="sm:p-3 py-2 px-1 bg-blue-50 border border-gray-300 dark:border-gray-800">
              <div>!</div>
            </td>
            <td className="sm:p-3 py-2 px-1 bg-blue-50 border border-gray-300 dark:border-gray-800">
              <div>{blueTeamStats.totalGold}</div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              <div className=" px-3">{blueTeamStats.inhibitors} </div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 md:table-cell ">
              <div className="flex items-center">{blueTeamStats.towers}</div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
              <div>{blueTeamStats.barons}</div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              <div className="flex items-center">
                {blueTeamStats.totalKills}
              </div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              <div className="flex items-center">
                {blueTeamStats.dragons.map((dragons, dragonsId) => {
                  return (
                    <h2 key={dragonsId} className="mr-3 ">
                      {dragons}
                    </h2>
                  );
                })}
              </div>
            </td>
          </tr>

          <tr className="bg-red-50">
            <td className="sm:p-3 py-2 px-1 bg-red-100 border border-gray-300 dark:border-gray-800">
              <RedTeamHeader eventDetails={eventDetails} />
            </td>
            <td className="sm:p-3 py-2 px-1 bg-red-50 border border-gray-300 dark:border-gray-800">
              <div>!</div>
            </td>
            <td className="sm:p-3 py-2 px-1 bg-red-50 border border-gray-300 dark:border-gray-800">
              <div>{redTeamStats.totalGold}</div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              <div className=" px-3">{redTeamStats.inhibitors} </div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 md:table-cell ">
              <div className="flex items-center">{redTeamStats.towers}</div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
              <div>{redTeamStats.barons}</div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              <div className="flex items-center">{redTeamStats.totalKills}</div>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              <div className="flex items-center">
                {redTeamStats.dragons.map((dragons, dragonsId) => {
                  return (
                    <div key={dragonsId} className="mr-3 ">
                      {dragons}{" "}
                    </div>
                  );
                })}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Player
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Level
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800 ">
              Gold
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              KDA
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800 ">
              CS
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800 ">
              Life
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          {blueTeamPlayersStats.map((blueTeam, blueTeamId) => {
            return (
              <tr key={blueTeamId} className="bg-blue-50">
                <td className="sm:p-3 py-2 px-1 bg-blue-100 border border-gray-300 dark:border-gray-800">
                  <div className="flex items-center">
                    {blueTeamComp[blueTeamId].summonerName} (
                    {blueTeamComp[blueTeamId].championId})
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                  <div className=" px-3">{blueTeam.level} </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
                  <div className="flex items-center">{blueTeam.totalGold}</div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
                  <div>
                    {" "}
                    {blueTeam.kills}/{blueTeam.deaths}/{blueTeam.assists}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                  <div className="sm:flex  flex-col">{blueTeam.creepScore}</div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                  <div className="sm:flex  flex-col">
                    {blueTeam.currentHealth}/{blueTeam.maxHealth}
                  </div>
                </td>
              </tr>
            );
          })}

          {redTeamPlayersStats.map((redTeam, redTeamId) => {
            return (
              <tr key={redTeamId} className=" bg-red-50">
                <td className="sm:p-3 py-2 px-1 border border-gray-300 bg-red-100 dark:border-gray-800">
                  <div className="flex items-center">
                    {redTeamComp[redTeamId].summonerName} (
                    {redTeamComp[redTeamId].championId})
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                  <div className=" px-3">{redTeam.level} </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
                  <div className="flex items-center">{redTeam.totalGold}</div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
                  <div>
                    {redTeam.kills}/{redTeam.deaths}/{redTeam.assists}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                  <div className="sm:flex  flex-col">{redTeam.creepScore}</div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                  <div className="sm:flex  flex-col">
                    {redTeam.currentHealth}/{redTeam.maxHealth}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default GamePage;
