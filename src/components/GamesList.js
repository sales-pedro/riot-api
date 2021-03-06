import React, { useState, useEffect } from "react";
import GameIdRouter from "./GameIdRouter";
import Select from "react-select";

const GamesList = () => {
  const [isLoading, setLoading] = useState(true);
  const [scheduleGames, setScheduleGames] = useState([]);
  const [fetchedGames, setFetchedGames] = useState([]);

  const selectValues = [
    { value: "completed", label: "Completed" },
    { value: "inProgress", label: "In Progress" },
    { value: "unstarted", label: "Unstarted" },
  ];

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
      setFetchedGames(scheduleGames);
      setLoading(false);
    };

    fetchSchedule();
  }, []);

  const formatLocaleTime = (date) => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
      hour12: false,
    };

    return Intl.DateTimeFormat("default", options).format(new Date(date));
  };

  const handleSelectChange = (selectedValues) => {
    if (!selectedValues.length) {
      setScheduleGames(fetchedGames);
    } else {
      const selectedOptionValues = selectedValues.map(({ value }) => value);
      const filteredGames = fetchedGames.filter(({ state }) =>
        selectedOptionValues.includes(state)
      );

      setScheduleGames(filteredGames);
    }
  };

  return isLoading ? (
    <div className="container mx-auto">Loading</div>
  ) : (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2>Games: </h2>
        <div className="w-1/3 mr-4">
          <Select
            defaultValue={selectValues}
            options={selectValues}
            isMulti
            onChange={handleSelectChange}
          />
        </div>
      </div>

      <table className="w-full bg-gray-500 text-left">
        <thead>
          <tr className="text-gray-200">
            <th className="font-normal py-2 px-3 border border-gray-300 ">
              Link do jogo
            </th>
            <th className="font-normal py-2 px-3 border border-gray-300 ">
              Liga
            </th>
            <th className="font-normal py-2 px-3 border border-gray-300 ">
              Blue Side
            </th>
            <th className="font-normal py-2 px-3 border border-gray-300 ">
              Red Side
            </th>
            <th className="font-normal py-2 px-3 border border-gray-300 ">
              Horário
            </th>
            <th className="font-normal py-2 px-3 border border-gray-300  ">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-200 ">
          {scheduleGames.map((scheduleGames, scheduleGamesId) => {
            if (!scheduleGames.match) {
              return (
                <tr key={scheduleGamesId} className="bg-gray-500">
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300 ">
                    <div className="flex items-center">
                      {scheduleGames.type}
                    </div>
                  </td>
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300 ">
                    <div className="flex items-center">
                      {scheduleGames.league.name}
                    </div>
                  </td>
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300 ">
                    <div className="flex items-center">Not in game</div>
                  </td>
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300 ">
                    <div className="flex items-center">Not in game</div>
                  </td>
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300  ">
                    <div>{scheduleGames.startTime}</div>
                  </td>

                  <td className=" py-2 px-1 border border-gray-300 ">
                    <div className="sm:flex hidden flex-col">
                      {scheduleGames.state}
                    </div>
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={scheduleGamesId} className="bg-gray-700">
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300 ">
                    <GameIdRouter scheduleGames={scheduleGames} />
                  </td>
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300 ">
                    <div className="flex items-center">
                      {scheduleGames.league.name}
                    </div>
                  </td>
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300 ">
                    <div className="flex items-center">
                      {scheduleGames.match.teams[0].name}
                    </div>
                  </td>
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300 ">
                    <div className="flex items-center">
                      {scheduleGames.match.teams[1].name}
                    </div>
                  </td>
                  <td className=" py-2 px-1 bg-gray-500 border border-gray-300  ">
                    <div>{formatLocaleTime(scheduleGames.startTime)}</div>
                  </td>

                  <td className=" py-2 px-1  bg-gray-500 border border-gray-300 ">
                    <div className="sm:flex  flex-col">
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
