import React, { useState, useEffect } from "react";

export default function Greeting() {
  const [greet, setGreet] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    let text = "Hello";
    if (hour < 12) text = "Good morning";
    else if (hour < 18) text = "Good afternoon";
    else text = "Good evening";
    setGreet(text + "!");
  }, []);

  return (
    <div id="greeting" className="text-2xl text-shadow">
      {greet}
    </div>
  );
}
