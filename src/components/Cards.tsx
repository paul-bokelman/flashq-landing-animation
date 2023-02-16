import { Stages } from "../Index";
import { useState } from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import cn from "classnames";
import { TbArrowRight } from "react-icons/tb";

type Props = {
  stage: Stages;
  setStage: (stage: Stages) => void;
};

export const Cards: React.FC<Props> = (props) => {
  const cards: Array<{ term: string; definition: string; placement: "front" | "left" | "right" }> = [
    {
      term: "Term 1",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      placement: "front",
    },
    {
      term: "Term 2",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      placement: "left",
    },
    {
      term: "Term 3",
      definition:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      placement: "right",
    },
  ];

  return (
    <AnimatePresence>
      {props.stage === "cards" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} className="absolute">
          <motion.div style={{ gridTemplateAreas: "inner-div" }} className="grid place-items-center">
            {cards.map((card, i) => (
              <Card key={i} {...card} />
            ))}
          </motion.div>
          <p className="font-medium text-lg mt-4 flex items-center gap-1 cursor-pointer">
            Start generating flashcards <TbArrowRight className="text-2xl animate-pulse" />
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Card: React.FC<{ term: string; definition: string; placement: "front" | "left" | "right" }> = ({
  term,
  definition,
  placement,
}) => {
  const [flipped, setFlipped] = useState(placement === "front");
  const [x, cycleX] = useCycle(0, 180);

  const handleFlipCard = () => {
    if (placement === "front") return cycleX();
    return;
  };

  return (
    <motion.div
      animate={{ rotateX: x, transition: { duration: 0.2 } }}
      onAnimationComplete={() => setFlipped((prev) => !prev)}
      onClick={handleFlipCard}
      style={{
        zIndex: placement === "front" ? 10 : 0,
        translateX: placement === "left" ? "2%" : placement === "right" ? "1%" : "0",
        translateY: placement === "left" ? "-4%" : placement === "right" ? "-2%" : "0",
        gridArea: "inner-div",
      }}
      className={cn(
        { "cursor-pointer": placement === "front" },
        "cursor-not-allowed drop-shadow-sm w-[45rem] justify-center items-center flex max-w-full text-wrap break-word px-6 py-4 border-2 bg-white border-slate-200 rounded-lg transition-all h-[22rem]"
      )}
    >
      <div className={cn({ "-scale-y-100": placement === "front" ? flipped : !flipped }, "transform text-xl")}>
        <p className="text-sm italic">{flipped ? "Definition" : "Term"}</p>
        <p>{flipped ? definition : term}</p>
      </div>
    </motion.div>
  );
};
