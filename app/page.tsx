import LettersListItem from "@/app/components/LettersListItem/LettersListItem";
import { capitalLetters } from "./data";

const Home = () => {
  return (
    <div className="min-h-screen">
      <main className="flex flex-col">
        <header className="flex justify-center text-center p-8">
          <h1 className="font-luckyguy text-6xl tracking-widest text-outline">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LEARN
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ALPHABETS
            </span>
          </h1>
        </header>
        <section className="flex justify-center p-8">
          <div className="flex flex-wrap gap-10 justify-center w-full lg:w-[1000px]">
            {capitalLetters.map((letter, index) => (
              <LettersListItem letter={letter} key={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
