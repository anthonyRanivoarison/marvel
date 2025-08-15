import { Link } from "react-router-dom";
import {Heart, PlusIcon} from "lucide-react";
import MarvelCardsTemplate from "@/components/templates/MarvelCardsTemplate";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center text-white"
      style={{
        background: "linear-gradient(to bottom right, #3b82f6, #faf5ff, #1f2937)",
      }}

    >
      <h1
        className="text-6xl font-bold mb-4 drop-shadow-lg"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Welcome to the Marvel Universe
      </h1>

      <p className="text-lg mb-10 max-w-2xl opacity-90">
        Explore the legendary characters, epic battles, and timeless stories of the Marvel Universe.
      </p>

      <Link
        to="/form"
        className="mb-10 bg-transparent flex items-center text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <PlusIcon /> Create your own
      </Link>

      <MarvelCardsTemplate />

      <footer className="mt-12 text-sm opacity-80 flex items-center">
        Made with <Heart size={16} className="mx-1" color="red" /> for Marvel fans
      </footer>
    </div>
  );
}
