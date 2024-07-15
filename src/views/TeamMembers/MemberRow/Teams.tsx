import React, { FC } from "react";
import { Member } from "../types";
import Chip from "../../../components/Chip";

interface Props {
  teams: Member["teams"];
}

const Teams: FC<Props> = ({ teams }) => {
  const visibleTeams = teams.slice(0, 3);

  const hiddenTeamsLength = teams.length - visibleTeams.length;

  // ideally would be stored on a separate team Object in the BE
  const chipColors = [
    "bg-purple-200 text-purple-800",
    "bg-blue-200 text-blue-800",
    "bg-indigo-200 text-indigo-800",
  ];

  return (
    <div className="flex gap-1">
      {visibleTeams.map((team, index) => (
        <Chip key={team} className={`capitalize ${chipColors[index]} `}>
          {team}
        </Chip>
      ))}
      {hiddenTeamsLength > 0 && (
        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-2xl  text-sm">
          +{hiddenTeamsLength}
        </span>
      )}
    </div>
  );
};

export default Teams;
