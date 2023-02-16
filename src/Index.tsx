import { useState } from "react";
import { Cards, Generator, Notes } from "./components";

export type Stages = "notes" | "generator" | "cards";

export const Index: React.FC = () => {
  const [stage, setStage] = useState<Stages>("notes");

  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
  magna aliqua. Et netus et malesuada fames ac. Nisi vitae suscipit tellus mauris a diam maecenas sed. Enim
  lobortis scelerisque fermentum dui. Lacinia at quis risus sed vulputate odio ut enim. Augue mauris augue neque
  gravida in fermentum et. Risus commodo viverra maecenas accumsan lacus vel facilisis. Quisque non tellus orci
  ac auctor augue. Tortor condimentum lacinia quis vel eros donec. Non sodales neque sodales ut etiam sit.
  Placerat duis ultricies lacus sed turpis. Amet mattis vulputate enim nulla. In tellus integer feugiat
  scelerisque varius morbi enim nunc. Nisi scelerisque eu ultrices vitae auctor eu. Eu turpis egestas pretium
  aenean pharetra magna ac placerat. At auctor urna nunc id cursus metus aliquam eleifend mi. Aenean et tortor
  at risus viverra adipiscing. Lacus laoreet non curabitur gravida arcu ac tortor dignissim.Enim
  lobortis scelerisque fermentum dui. Lacinia at quis risus sed vulputate odio ut enim. Enim
  lobortis scelerisque fermentum dui. Lacinia at quis risus sed vulputate odio ut enim.`;

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F7F7F9] gap-4">
      <Notes stage={stage} setStage={setStage} text={text} />
      <Generator stage={stage} setStage={setStage} text={text} />
      <Cards stage={stage} setStage={setStage} />
    </div>
  );
};
