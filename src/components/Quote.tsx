// Quote.js (or Quote.tsx)
import React, { useState, useEffect } from "react";

export default function Quote() {
  const [quote, setQuote] = useState({ text: "", author: null });

  useEffect(() => {
    fetch("./quotes.json")
      .then((r) => r.json())
      .then((list) => {
        const q = list[Math.floor(Math.random() * list.length)];
        setQuote(q);
      })
      .catch(() => setQuote({ text: "Stay focused and keep flowin'.", author: null }));
  }, []);

  return (
    <div id="quote" className="text-shadow">
      {quote.author ? `"${quote.text}" — ${quote.author}` : `"${quote.text}"`}
    </div>
  );
}
