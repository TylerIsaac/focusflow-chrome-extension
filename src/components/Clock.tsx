import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? 'PM' : 'AM';

      // Convert to 12-hour clock
      h = h % 12;
      if (h === 0) h = 12;

      // Pad minutes to two digits
      const minStr = m < 10 ? '0' + m : m.toString();

      setTime(`${h}:${minStr} ${ampm}`);
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div id="clock" className="text-8xl font-sans font-semibold">
      {time}
    </div>
  );
}
