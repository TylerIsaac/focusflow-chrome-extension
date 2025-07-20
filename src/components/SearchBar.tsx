import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const v = (e.target as HTMLInputElement).value.trim();
      window.location.href = v.startsWith("http") ? v : `https://google.com/search?q=${encodeURIComponent(v)}`;
    }
  };

  return (
    <div className="relative w-full mx-auto">
      <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white opacity-75 z-10 text-shadow" />
      <input
        id="search"
        type="text"
        placeholder="Search"
        onKeyDown={handleKeyDown}
        className="
          w-full
          pl-12 pr-4 py-3
          bg-white/20
          rounded-full
          placeholder-white placeholder-opacity-70
          focus:bg-white/40
          focus:outline-none
          backdrop-blur-sm
          hover:bg-white/30
          cursor-pointer
          transition-colors duration-200
          placeholder-text-shadow
        "
      />
    </div>
  );
}
