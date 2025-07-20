import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Bookmark {
  title: string;
  url: string;
}

const DEFAULT_BOOKMARKS: Bookmark[] = [
  { title: "YouTube", url: "https://youtube.com" },
  { title: "GitHub", url: "https://github.com" },
  { title: "StackOverflow", url: "https://stackoverflow.com" },
  // add any defaults you like here
];

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : DEFAULT_BOOKMARKS;
  });

  // persist on change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // add a new bookmark via prompt
  const addBookmark = () => {
    const url = window.prompt("Enter the site URL (including https://)");
    if (!url) return;
    let title = window.prompt("Enter a display name for this bookmark");
    if (!title) {
      // default to hostname if user cancels or leaves blank
      try {
        title = new URL(url).hostname;
      } catch {
        title = url;
      }
    }
    setBookmarks([...bookmarks, { title, url }]);
  };

  // remove a bookmark
  const removeBookmark = (idx: number) => {
    const ok = window.confirm(`Remove “${bookmarks[idx].title}”?`);
    if (!ok) return;
    setBookmarks(bookmarks.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex items-start justify-center space-x-4 mt-6">
      {bookmarks.map((b, i) => {
        const host = (() => {
          try {
            return new URL(b.url).hostname;
          } catch {
            return b.url;
          }
        })();
        const favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
        return (
          <div key={b.url} className="relative group flex flex-col items-center">
            <a
              href={b.url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center text-xs text-white hover:bg-white/20 rounded-md w-16 py-1 transition-colors duration-200 text-shadow group-hover:opacity-100 "
            >
              <img src={favicon} alt={b.title} className="w-10 h-10 rounded-full shadow-lg bg-white" />
              <span className="mt-1 max-w-16 truncate px-2">{b.title}</span>
            </a>
            <button
              onClick={() => removeBookmark(i)}
              className="
                absolute -top-2 -right-2
                bg-red-500 text-white
                w-4 h-4
                flex items-center justify-center
                rounded-full
                opacity-0 group-hover:opacity-100
                transition-opacity duration-150
              "
              aria-label={`Delete ${b.title}`}
            >
              ×
            </button>
          </div>
        );
      })}

      {/* Wrap the + button in the same flex-col container */}
      <div className="flex flex-col items-center">
        <button
          onClick={addBookmark}
          className="
            w-10 h-10
            flex items-center justify-center
            bg-white/10 backdrop-blur-sm rounded-full
            text-white hover:bg-white/20
            transition-colors duration-200
            text-shadow
          "
          aria-label="Add bookmark"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {/* optional label under the plus if you want it */}
        {/* <span className="mt-1 text-xs text-white">Add</span> */}
      </div>
    </div>
  );
}
