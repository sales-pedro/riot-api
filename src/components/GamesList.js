import React, { useState, useEffect } from "react";

import GameIdRouter from "./GameIdRouter";

const GamesList = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      const headers = {
        "X-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
      };

      const response = await fetch(
        `https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US`,
        { headers }
      );

      const games = await response.json();

      const scheduleGames = games.data.schedule.events;
      setScheduleGames(scheduleGames);
      setLoading(false);
    };

    fetchSchedule();
  }, []);

  const [scheduleGames, setScheduleGames] = useState([]);

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
              Link do jogo
            </th>
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
            <th className="font-normal px-3 pt-0 pb-3 border border-gray-300 dark:border-gray-800 ">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-100">
          {scheduleGames.map((scheduleGames, scheduleGamesId) => {
            if (!scheduleGames.match) {
              return (
                <tr key={scheduleGamesId} className="bg-gray-50">
                  <td className="sm:p-3 py-2 px-1 bg-gray-100 border border-gray-300 dark:border-gray-800">
                    <div className="flex items-center">
                      {scheduleGames.type}
                    </div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 bg-gray-100 border border-gray-300 dark:border-gray-800">
                    <div className="flex items-center">
                      {scheduleGames.league.name}
                    </div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 bg-gray-100 border border-gray-300 dark:border-gray-800">
                    <div className="flex items-center">Not in game</div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 bg-gray-100 border border-gray-300 dark:border-gray-800">
                    <div className="flex items-center">Not in game</div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
                    <div>{scheduleGames.startTime}</div>
                  </td>

                  <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                    <div className="sm:flex hidden flex-col">
                      {scheduleGames.state}
                    </div>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={scheduleGamesId} className="bg-gray-50">
                  <td className="sm:p-3 py-2 px-1 bg-gray-100 border border-gray-300 dark:border-gray-800">
                    <GameIdRouter scheduleGames={scheduleGames} />
                  </td>
                  <td className="sm:p-3 py-2 px-1 bg-gray-100 border border-gray-300 dark:border-gray-800">
                    <div className="flex items-center">
                      {scheduleGames.league.name}
                    </div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 bg-gray-100 border border-gray-300 dark:border-gray-800">
                    <div className="flex items-center">
                      {scheduleGames.match.teams[0].name}
                    </div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 bg-gray-100 border border-gray-300 dark:border-gray-800">
                    <div className="flex items-center">
                      {scheduleGames.match.teams[1].name}
                    </div>
                  </td>
                  <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800 ">
                    <div>{scheduleGames.startTime}</div>
                  </td>

                  <td className="sm:p-3 py-2 px-1 border border-gray-300 dark:border-gray-800">
                    <div className="sm:flex hidden flex-col">
                      {scheduleGames.state}
                    </div>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};
export default GamesList;
