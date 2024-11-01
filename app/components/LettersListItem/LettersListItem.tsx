"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

const LettersListItem = ({
  letter,
}: {
  letter: {
    letter: string;
    smallLetter: string;
    tailwindColor: string;
    color: string;
    model: string;
    text: string;
  };
}) => {
  return (
    <MotionLink
      whileHover={{ scale: 1.1 }}
      href={`/letter-details/${letter.letter}`}
      className="items-center text-center"
    >
      <span
        className={`flex h-[70px] text-8xl font-luckyguy text-outline ${letter.tailwindColor}`}
      >
        {letter.letter}
      </span>
    </MotionLink>
  );
};

export default dynamic(() => Promise.resolve(LettersListItem), {
  ssr: false,
});
