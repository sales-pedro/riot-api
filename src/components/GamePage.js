import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import gold from "./icons/gold.svg";
import inhibitor from "./icons/inhibitor.svg";
import tower from "./icons/tower.svg";
import baron from "./icons/baron.svg";
import kills from "./icons/kills.svg";
import cs from "./icons/cs.svg";
import percent from "./icons/percent.svg";

import BlueTeamHeader from "./BlueTeamHeader";
import RedTeamHeader from "./RedTeamHeader";

const GamePage = () => {
  const { linkDetails } = useParams();

  const [logSeconds, setSeconds] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingItems, setLoadingItems] = useState(true);

  const [gameState, setGameState] = useState([]);

  const [blueTeamPlayersStats, setblueTeamPlayersStats] = useState([]);
  const [redTeamPlayersStats, setredTeamPlayersStats] = useState([]);
  const [blueTeamStats, setBlueTeamStats] = useState([]);
  const [redTeamStats, setRedTeamStats] = useState([]);

  const [playerItems, setPlayerItems] = useState([]);

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
    }, 800);
    return () => clearInterval(timer);
  });

  function DateOffset(offset) {
    return new Date(+new Date() + offset);
  }

  useEffect(() => {
    const time = DateOffset(-55000);
    const year = time.getFullYear().toString();
    const month = (time.getMonth() + 1).toString().padStart(2, "0");
    const days = time.getUTCDate().toString().padStart(2, "0");
    const hours = time.getUTCHours().toString().padStart(2, "0");
    const minutes = time.getUTCMinutes().toString().padStart(2, "0");
    const seconds =
      time.getSeconds() < 10
        ? "0".substring(0, 1).padEnd(2, "0")
        : time.getUTCSeconds().toString().substring(0, 1).padEnd(2, "0");

    if (time.getUTCSeconds().toString().slice(-1) === "0") {
      const fetchGame = async () => {
        const items = await fetch(
          `https://feed.lolesports.com/livestats/v1/details/${linkDetails}?startingTime=${year}-${month}-${days}T${hours}:${minutes}:${seconds}.00Z`
        );
        const gameItems = await items.json();
        const playerItems = gameItems.frames[9].participants;
        setPlayerItems(playerItems);
        const response = await fetch(
          `https://feed.lolesports.com/livestats/v1/window/${linkDetails}?startingTime=${year}-${month}-${days}T${hours}:${minutes}:${seconds}.00Z`
        );
        const game = await response.json();

        const blueTeamComp =
          game.gameMetadata.blueTeamMetadata.participantMetadata;
        const redTeamComp =
          game.gameMetadata.redTeamMetadata.participantMetadata;
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
    } else {
    }
  }, [logSeconds]);

  return isLoading ? (
    <div className="container w-full w-min-full mx-auto">Carregando...</div>
  ) : (
    <div className="w-9/12 min-w-max max-w-max text-xs font-mono text-xxs m-auto">
      <table className="w-full min-w-full text-center">
        <thead>
          <tr className="text-gray-400">
            <th className="font-normal font-mono text-xxs p-2 border border-gray-500">
              {gameState === "in_game" ? (
                <h2 className="bg-red-500 text-white m-auto w-auto h-auto p-2 rounded-lg">
                  LIVE
                </h2>
              ) : gameState === "paused" ? (
                <h2 className="bg-yellow-500 text-white m-auto w-auto  h-auto p-2 rounded-lg"></h2>
              ) : gameState === "finished" ? (
                <h2 className="bg-green-500 text-white m-auto w-auto  h-auto p-2 rounded-lg"></h2>
              ) : (
                <h2 className="bg-purple-500 text-white m-auto w-auto  h-auto p-2 rounded-lg"></h2>
              )}
            </th>

            <th className="font-normal font-mono text-xxs p-2 border border-gray-500">
              <img src={gold} alt="Golds" className="w-2 m-auto" />
            </th>
            <th className="font-normal font-mono text-xxs p-2 border border-gray-500">
              <img src={inhibitor} alt="Inhibitors" className="w-2 m-auto" />
            </th>
            <th className="font-normal font-mono text-xxs p-2 border border-gray-500">
              <img src={tower} alt="Towers" className="w-2 m-auto " />
            </th>
            <th className="font-normal font-mono text-xxs p-2 border border-gray-500">
              <img src={baron} alt="Barons" className="w-2 m-auto " />
            </th>
            <th className="font-normal font-mono text-xxs p-2  border border-gray-500 ">
              <img src={kills} alt="Kills" className="w-2 m-auto " />
            </th>
            <th className="font-normal font-mono text-xxs p-2 border border-gray-500">
              Dragons
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-100 ">
          <tr className="bg-blue-900">
            <td className=" py-1 px-1">
              <BlueTeamHeader eventDetails={eventDetails} />
            </td>

            <td className=" py-1 px-1   border border-gray-500">
              {blueTeamStats.totalGold}
            </td>
            <td className=" py-1 px-1 border border-gray-500">
              {blueTeamStats.inhibitors}
            </td>
            <td className=" py-1 px-1 border border-gray-500 ">
              {blueTeamStats.towers}
            </td>
            <td className=" py-1 px-1 border border-gray-500 ">
              <h2>{blueTeamStats.barons}</h2>
            </td>
            <td className=" py-1 px-1 border border-gray-500">
              {blueTeamStats.totalKills}
            </td>
            <td className=" py-1 px-1 border border-gray-500">
              <div className="flex items-center">
                {blueTeamStats.dragons.map((dragons, dragonsId) => {
                  return (
                    <div key={dragonsId} className="mr-3 w-2">
                      <img
                        src={`https://res.cloudinary.com/djylnv4hc/image/upload/v1614556029/icons/${dragons}.svg`}
                      />
                    </div>
                  );
                })}
              </div>
            </td>
          </tr>

          <tr className="bg-red-900 text-gray-200">
            <td className=" py-1 px-1  border border-gray-500">
              <RedTeamHeader eventDetails={eventDetails} />
            </td>

            <td className=" py-1 px-1  border border-gray-500">
              {redTeamStats.totalGold}
            </td>
            <td className=" py-1 px-1 border border-gray-500">
              {redTeamStats.inhibitors}
            </td>
            <td className=" py-1 px-1 border border-gray-500 ">
              {redTeamStats.towers}
            </td>
            <td className=" py-1 px-1 border border-gray-500 ">
              {redTeamStats.barons}
            </td>
            <td className=" py-1 px-1 border border-gray-500">
              {redTeamStats.totalKills}
            </td>
            <td className=" py-1 px-1 border border-gray-500">
              <div className="flex items-center">
                {redTeamStats.dragons.map((dragons, dragonsId) => {
                  return (
                    <div key={dragonsId} className="mr-3 w-2">
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
      <div className="flex m-auto min-w-full ">
        <div>
          <table className="text-left">
            <tbody className="text-gray-200">
              {blueTeamPlayersStats.map((blueTeam, blueTeamId) => {
                const healthBar =
                  (blueTeam.currentHealth / blueTeam.maxHealth) * 100;

                const blueDamage =
                  playerItems[blueTeamId].championDamageShare * 100;

                return (
                  <tr
                    key={blueTeamId}
                    className="bg-gradient-to-l from-blue-900 via-gray-800 to-gray-700"
                  >
                    <td className="py-1 px-1 w-24 border border-gray-500">
                      <div className="w-auto flex flex-wrap">
                        {playerItems[blueTeamId].items.map((value, id) => {
                          return (
                            <div key={id} className="m-0">
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/11.4.1/img/item/${value}.png`}
                                className="w-5 h-5"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    <td className=" py-1 px-1 border border-gray-500 ">
                      <div className="w-full rounded-md bg-gray-300">
                        <div
                          className="flex-col rounded-md text-center text-gray-500 bg-green-500"
                          style={{ width: `${healthBar}%` }}
                        >
                          <div className="py-1 text-center rounded-md">
                            {blueTeam.currentHealth}
                          </div>
                          <div className="py-1 rounded-md">
                            {blueTeam.maxHealth}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className=" py-1 px-1 w-28 text-right border border-gray-500 ">
                      <h2 className="text-center p-2">
                        {blueTeamComp[blueTeamId].summonerName}
                      </h2>
                      <div className="grid grid-cols-2">
                        <div className="px-3 w-auto h-auto relative">
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/11.17.1/img/champion/${blueTeamComp[blueTeamId].championId}.png`}
                            className="rounded-full w-8 h-8 m-auto"
                          />
                          <h2 className="absolute bottom-7 right-6 m-auto bg-blue-900 text-gray-200 rounded-full border border-gray-500">
                            {blueTeam.level}
                          </h2>
                        </div>

                        <div>
                          <span className="flex justify-evenly ">
                            <img src={kills} alt="Gold" className="w-2" />
                            {blueTeam.kills}/{blueTeam.deaths}/
                            {blueTeam.assists}
                          </span>
                          <span className="flex justify-evenly ">
                            <img src={cs} alt="Gold" className="w-2" />
                            {blueTeam.creepScore}
                          </span>
                          <span className="flex justify-evenly ">
                            <img src={gold} alt="Gold" className="w-2" />
                            {blueTeam.totalGold}
                          </span>
                          <span className="flex justify-evenly ">
                            <img
                              src={percent}
                              alt="Damage Share"
                              className="w-2"
                            />
                            {blueDamage.toString().slice(0, 4)}%
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <table className=" text-left">
            <tbody className="text-gray-300 ">
              {redTeamPlayersStats.map((redTeam, redTeamId) => {
                const healthBar =
                  (redTeam.currentHealth / redTeam.maxHealth) * 100;

                const redDamage =
                  playerItems[redTeamId + 5].championDamageShare * 100;

                return (
                  <tr
                    key={redTeamId}
                    className="bg-gradient-to-r from-red-900 via-gray-800 to-gray-700"
                  >
                    <td className=" py-1 px-1 text-right border border-gray-500">
                      <h2 className="text-center p-2">
                        {redTeamComp[redTeamId].summonerName}
                      </h2>
                      <div className="grid grid-cols-2">
                        <div>
                          <span className="flex justify-evenly ">
                            {redTeam.kills}/{redTeam.deaths}/{redTeam.assists}
                            <img src={kills} alt="KDA" className="w-2 ml-2" />
                          </span>
                          <span className="flex justify-evenly ">
                            {redTeam.creepScore}
                            <img
                              src={cs}
                              alt="Creep Score"
                              className="w-2 ml-2"
                            />
                          </span>
                          <span className="flex justify-evenly ">
                            {redTeam.totalGold}
                            <img src={gold} alt="Gold" className="w-2 ml-2" />
                          </span>
                          <span className="flex justify-evenly ">
                            {redDamage.toString().slice(0, 4)}%
                            <img
                              src={percent}
                              alt="Damage Share"
                              className="w-2 ml-2"
                            />
                          </span>
                        </div>

                        <div className="px-3 w-auto h-auto relative">
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${redTeamComp[redTeamId].championId}.png`}
                            className="rounded-full w-8 h-8 m-auto"
                          />
                          <h2 className="absolute bottom-7 right-2 m-auto bg-red-900 text-gray-200 rounded-full border border-gray-500">
                            {redTeam.level}
                          </h2>
                        </div>
                      </div>
                    </td>

                    <td className=" py-1 px-1 border border-gray-500">
                      <div className="w-full h-full rounded-md bg-gray-300">
                        <div
                          className="flex-col rounded-md text-center text-gray-500 bg-green-500"
                          style={{ width: `${healthBar}%` }}
                        >
                          <div className="py-1 rounded-md">
                            {redTeam.currentHealth}
                          </div>
                          <div className="py-1 rounded-md">
                            {redTeam.maxHealth}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-1 px-1 w-24 border border-gray-500">
                      <div className="w-auto flex flex-wrap">
                        {playerItems[redTeamId + 5].items.map((value, id) => {
                          return (
                            <div key={id} className="m-0">
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/11.4.1/img/item/${value}.png`}
                                className="w-5 h-5"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default GamePage;
