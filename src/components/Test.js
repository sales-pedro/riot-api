import React, { useState, useEffect } from "react";
import axios from "axios";

const Test3 = () => {
  const [isLoading, setLoading] = useState(true);

  const [game, setGame] = useState([]);
  const [logSeconds, setSeconds] = useState(0);

  const [gameState, setGameState] = useState([]);
  const [redTeam, setRedTeam] = useState([]);

  const [liveGamesPlayersStats, setliveGamesPlayersStats] = useState([]);
  const [redTeamPlayersStats, setredTeamPlayersStats] = useState([]);
  const [liveGamesStats, setliveGamesStats] = useState([]);
  const [redTeamStats, setRedTeamStats] = useState([]);
  const [liveGamesComp, setliveGamesComp] = useState([]);
  const [redTeamComp, setRedTeamComp] = useState([]);

  const [liveGames, setLiveGames] = useState([]);
  //const [liveGamesId, setLiveGamesId] = useState();
  const [xd, setXd] = useState([]);

  console.log("xd", xd);
  console.log("live", liveGames);
  //console.log("liveId", liveGamesId);

  useEffect(() => {
    const fetchLiveGames = async () => {
      const response = await axios({
        url: "https://esports-api.lolesports.com/persisted/gw/getLive?hl=en-US",
        headers: {
          "X-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
        },
      });
      const xd = response;
      setXd(xd);
      const games = await response.json();
      //const liveTest = games;
      const liveGames = games.data.schedule.events;
      //const liveGamesId = liveGames[0].id;
      // se usar essa trocar os nomes
      setLiveGames(liveGames);
      //setLiveGamesId(liveGamesId);
      setLoading(false);
      //console.log(liveGames);
    };

    fetchLiveGames();
  }, []);

  return isLoading ? (
    <div className="container mx-auto">Loading</div>
  ) : (
    <>
      <span>
        <h2>Games: </h2>
      </span>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Liga
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Blue Side
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Red Side
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800">
              Horário
            </th>
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800 hidden md:table-cell">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          {liveGames.map((liveGames, liveGamesId) => {
            return (
              <tr key={liveGamesId} className="bg-gray-50">
                <td className="sm:p-3 py-2 px-1 bg-gray-100 border border-gray-300 dark:border-gray-800">
                  <div className="flex items-center">
                    {liveGames.league.name}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 bg-blue-50 border border-gray-300 dark:border-gray-800">
                  <div className=" px-3">{liveGames.match.teams[0].name} </div>
                </td>
                <td className="sm:p-3 py-2 px-1 bg-red-50 border border-gray-300 dark:border-gray-800 md:table-cell hidden">
                  <div className="flex items-center">
                    {liveGames.match.teams[1].name}
                  </div>
                </td>
                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
                  <div>{liveGames.startTime}</div>
                </td>

                <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                  <div className="sm:flex hidden flex-col">
                    {liveGames.state}
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
export default Test3;
