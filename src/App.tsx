import React, { useState } from "react";
import Clock from "./components/Clock";
import Greeting from "./components/Greeting";
import SearchBar from "./components/SearchBar";
import Bookmarks from "./components/Bookmarks";
import Quote from "./components/Quote";
import TodoList from "./components/TodoList";
import Weather from "./components/Weather";
import Background from "./components/Background";
import Pomodoro from "./components/Pomodoro";

function App() {
  const [pomodoroOpen, setPomodoroOpen] = useState(false);

  return (
    <Background>
      {/* 2) Pomodoro now controlled by App */}
      <Pomodoro isOpen={pomodoroOpen} onOpen={() => setPomodoroOpen(true)} onClose={() => setPomodoroOpen(false)} />

      {/* 3) Only render your normal UI when timer is closed */}
      {!pomodoroOpen && (
        <>
          <div className="absolute top-4 right-4 text-shadow">
            <Weather />
          </div>

          <header className="text-white max-w-xl w-full p-6 space-y-1 text-center mb-8 text-shadow">
            <Clock />
            <Greeting />
            <Quote />
          </header>

          <main className="w-full max-w-xl space-y-4">
            <SearchBar />
            <Bookmarks />
          </main>

          <TodoList />
        </>
      )}
    </Background>
  );
}

export default App;
