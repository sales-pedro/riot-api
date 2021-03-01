import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import gold from "./icons/gold.svg";
import inhibitor from "./icons/inhibitor.svg";
import tower from "./icons/tower.svg";
import baron from "./icons/baron.svg";
import kills from "./icons/kills.svg";
import cs from "./icons/cs.svg";

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
    const month = time.getUTCMonth().toString().padStart(2, "0");
    const days = time.getUTCDate().toString().padStart(2, "0");
    const hours = time.getUTCHours().toString().padStart(2, "0");
    const minutes = time.getUTCMinutes().toString().padStart(2, "0");
    const seconds =
      time.getSeconds() < 10
        ? "0".substring(0, 1).padEnd(2, "0")
        : time.getUTCSeconds().toString().substring(0, 1).padEnd(2, "0");

    const fetchGame = async () => {
      const response = await fetch(
        `https://feed.lolesports.com/livestats/v1/window/${linkDetails}?startingTime=2021-03-${days}T${hours}:${minutes}:${seconds}.00Z`
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
    <div className="container mx-auto">O jogo ainda não começou</div>
  ) : (
    <>
      <table className="w-full text-center">
        <thead>
          <tr className="text-gray-400">
            <th className="font-normal p-3  border border-gray-300 dark:border-gray-800">
              {gameState === "in_game" ? (
                <h2 className="bg-red-500 text-white m-auto w-16 h-auto p-3 rounded-lg">
                  Live
                </h2>
              ) : (
                <h2 className="bg-green-500 text-white m-auto w-24  h-auto p-3 rounded-lg">
                  Finished
                </h2>
              )}
            </th>

            <th className="font-normal p-3   border border-gray-300 dark:border-gray-800">
              <img src={gold} alt="Golds" className="w-6 m-auto" />
            </th>
            <th className="font-normal p-3   border border-gray-300 dark:border-gray-800">
              <img src={inhibitor} alt="Inhibitors" className="w-6 m-auto" />
            </th>
            <th className="font-normal p-3   border border-gray-300 dark:border-gray-800">
              <img src={tower} alt="Towers" className="w-6 m-auto " />
            </th>
            <th className="font-normal p-3 border border-gray-300 dark:border-gray-800">
              <img src={baron} alt="Barons" className="w-6 m-auto " />
            </th>
            <th className="font-normal p-3  border border-gray-300 dark:border-gray-800 ">
              <img src={kills} alt="Kills" className="w-6 m-auto " />
            </th>
            <th className="font-normal p-3   border border-gray-300 dark:border-gray-800">
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
              {blueTeamStats.totalGold}
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              {blueTeamStats.inhibitors}
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 md:table-cell ">
              {blueTeamStats.towers}
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
              <h2>{blueTeamStats.barons}</h2>
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              {blueTeamStats.totalKills}
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              <div className="flex items-center">
                {blueTeamStats.dragons.map((dragons, dragonsId) => {
                  return (
                    <div key={dragonsId} className="mr-3 w-4">
                      <img
                        src={`https://res.cloudinary.com/djylnv4hc/image/upload/v1614556029/icons/${dragons}.svg`}
                      />
                    </div>
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
              {redTeamStats.totalGold}
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              {redTeamStats.inhibitors}
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 md:table-cell ">
              {redTeamStats.towers}
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
              {redTeamStats.barons}
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              {redTeamStats.totalKills}
            </td>
            <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
              <div className="flex items-center">
                {redTeamStats.dragons.map((dragons, dragonsId) => {
                  return (
                    <div key={dragonsId} className="mr-3 w-4">
                      <img
                        src={`https://res.cloudinary.com/djylnv4hc/image/upload/v1614556029/icons/${dragons}.svg`}
                      />
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
            <th className="font-normal p-3 border border-gray-300 dark:border-gray-800">
              Player
            </th>
            <th className="font-normal p-3 border border-gray-300 dark:border-gray-800">
              Level
            </th>
            <th className="font-normal p-3 border border-gray-300 dark:border-gray-800 ">
              <img src={gold} alt="Gold" className="w-6 m-auto" />
            </th>
            <th className="font-normal p-3 border border-gray-300 dark:border-gray-800">
              <img src={kills} alt="KDA" className="w-6 m-auto" />
            </th>
            <th className="font-normal p-3 border border-gray-300 dark:border-gray-800 ">
              <img src={cs} alt="Creep Score" className="w-6 m-auto" />
            </th>
            <th className="font-normal p-3 border border-gray-300 dark:border-gray-800 ">
              Life
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          {blueTeamPlayersStats.map((blueTeam, blueTeamId) => {
            return (
              <tr key={blueTeamId} className="bg-blue-50">
                <td className="sm:p-3 py-2 px-1 bg-blue-100 border border-gray-300 dark:border-gray-800">
                  {blueTeamComp[blueTeamId].summonerName}
                </td>
                <td className="sm:p-3 py-2 px-1  border border-gray-300 dark:border-gray-800">
                  <div className="px-3 relative">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/11.3.1/img/champion/${blueTeamComp[blueTeamId].championId}.png`}
                      className="rounded-full w-12 h-12"
                    />
                    <h2 className="absolute bottom-0 left-0 bg-blue-100 rounded-full border border-gray-300">
                      {blueTeam.level}
                    </h2>
                  </div>
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
                    {redTeamComp[redTeamId].summonerName}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                  <div className="px-3 relative">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/11.3.1/img/champion/${redTeamComp[redTeamId].championId}.png`}
                      className="rounded-full w-12 h-12"
                    />
                    <h2 className="absolute bottom-0 left-0 bg-red-100 rounded-full border border-gray-300">
                      {redTeam.level}
                    </h2>
                  </div>
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
