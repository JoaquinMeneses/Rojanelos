import React from "react";
import { Tabs, Tab, Card, CardBody, Image } from "@nextui-org/react";
import { TableAllSkills } from "./TableAllSkills";
import { TableIndividual } from "./TableIndividual";

const Leaderboards = ({ users }) => {
  let tabs = [
    {
      id: "all-skills",
      label: "All Skills",
      src: "",
      content: <TableAllSkills users={users} />,
    },
    {
      id: "aviculture",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_aviculture.png?v2",
      content: <TableIndividual users={users} filter={"aviculture"} />,
    },
    {
      id: "beekeeping",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_beekeeping.png?v2",
      content: <TableIndividual users={users} filter={"beekeeping"} />,
    },
    {
      id: "farming",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_farming.png?v2",
      content: <TableIndividual users={users} filter={"farming"} />,
    },
    {
      id: "forestry",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_forestry.png?v2",
      content: <TableIndividual users={users} filter={"forestry"} />,
    },
    {
      id: "mining",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_mining.png?v2",
      content: <TableIndividual users={users} filter={"mining"} />,
    },
    {
      id: "ceramicist",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_ceramicist.png?v2",
      content: <TableIndividual users={users} filter={"ceramicist"} />,
    },
    {
      id: "cooking",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_cooking.png?v2",
      content: <TableIndividual users={users} filter={"cooking"} />,
    },
    {
      id: "granger",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_granger.png?v2",
      content: <TableIndividual users={users} filter={"granger"} />,
    },
    {
      id: "textiler",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_textiler.png?v2",
      content: <TableIndividual users={users} filter={"textiler"} />,
    },
    {
      id: "winemaking",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_winemaking.png?v2",
      content: <TableIndividual users={users} filter={"winemaking"} />,
    },
    {
      id: "woodwork",
      label: "",
      src: "https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_woodwork.png?v2",
      content: <TableIndividual users={users} filter={"woodwork"} />,
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs} color="primary">
        {(item) => (
          <Tab
            key={item.id}
            title={
              <div className="flex items-center space-x-2">
                <Image width={24} alt={item.label} src={item.src} />
                <span>{item.label}</span>
              </div>
            }
          >
            <Card>
              <CardBody className="p-0">{item.content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default Leaderboards;
