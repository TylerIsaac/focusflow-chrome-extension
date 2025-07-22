# FocusFlow

A clean, focused homepage Chrome extension for your new tab.

![FocusFlow Preview](https://i.ibb.co/994Sxk9P/Zight-2025-7-20-at-7-11-01-PM.png)

---

## Features

- **Daily rotating background** — auto-updates each day, with a “Skip this background” button  
- **Clock & greeting** — large, centered time display with a friendly “Good morning/afternoon/evening”  
- **Search bar** — ultra-transparent, pill-shaped search field with icon and glass blur effect  
- **Bookmarks** — quick-access site icons, persisted in `localStorage` and fully customizable  
- **To-do list** — collapsible task list with glass effect, plus-icon add button and persisting tasks  
- **Weather widget** — frosted-glass card showing current temperature and location, positioned top-right  
- **Pomodoro timer** — top-left toggle between focus and breaks, full-screen overlay with start/stop controls  

---

## Developer Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/TylerIsaac/focusflow-chrome-extension.git
   cd focusflow
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run in development**  
   ```bash
   npm start
   ```
   Dev server with live-reload. Build output goes to `build/`.

4. **Load in Chrome**  
   - Open `chrome://extensions`  
   - Enable **Developer mode**  
   - Click **Load unpacked** and select the `build/` folder.

5. **Build for production**  
   ```bash
   npm run build
   ```
   This outputs a production-ready extension zip in `build/`.

---

## Contributing

1. Fork the repo  
2. Create a branch (`git checkout -b feature/my-feature`)  
3. Commit your changes (`git commit -am 'Add feature'`)  
4. Push (`git push origin feature/my-feature`)  
5. Open a Pull Request

Remember to bump the `"version"` in `manifest.json` and update this README accordingly.

---

## License

MIT © [Your Name](https://github.com/TylerIsaac)
