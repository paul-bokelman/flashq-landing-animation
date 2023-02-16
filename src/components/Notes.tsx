import type { Stages } from "../Index";
import { useEffect, useState } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import { TbCheck } from "react-icons/tb";
import { GoogleDocsLogo } from "./GoogleDocsLogo";

type Props = {
  stage: Stages;
  setStage: (stage: Stages) => void;
  text: string;
};

export const Notes: React.FC<Props> = ({ stage, setStage, text }) => {
  const [currentCharHighlight, setCurrentCharHighlight] = useState<number>(0);

  const chars = Array.from({ length: text.length }).map((_, i) => {
    return text.charAt(i);
  });

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const animateCopyTextButton = async () => {
    await sleep(1000);
    setStage("generator");
  };

  const highlightText = async () => {
    await sleep(1000);
    const controls = animate(0, text.length, {
      duration: 1,
      ease: "easeInOut",
      onUpdate: (value) => {
        setCurrentCharHighlight(Math.floor(value));
      },
      onComplete: animateCopyTextButton,
    });

    return () => controls.stop();
  };

  useEffect(() => {
    highlightText();
  }, []);

  return (
    <AnimatePresence>
      {stage === "notes" || stage === "generator" ? (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="bg-white w-[45%] h-3/4 rounded-lg overflow-scroll"
        >
          <div className="flex items-center justify-between w-full border-b border-black-20 py-4 px-6">
            <div className="flex items-center gap-4">
              <GoogleDocsLogo className="text-3xl" />
              <div className="flex flex-col gap-1">
                <h1 className="text-lg">Physics Lecture Notes</h1>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div className="w-6 h-2 rounded-sm bg-gray-200/50" />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="h-10 w-10 bg-gray-200/50 rounded-full" />
            </div>
          </div>
          <div className="relative px-16 py-8 flex flex-col items-center justify-center">
            <p className="overflow">
              {chars.map((char, i) => (
                <span className={cn({ "bg-blue-200": currentCharHighlight > i }, "py-1")}>{char}</span>
              ))}
            </p>
            <AnimatePresence>
              {currentCharHighlight === text.length && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="self-start mt-6 text-sm text-green-600 flex items-center gap-1"
                >
                  <TbCheck /> Notes Copied
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
