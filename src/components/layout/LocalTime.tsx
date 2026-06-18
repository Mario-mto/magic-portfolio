"use client";
import { useEffect, useState } from "react";

// Mario is based in Montréal — Eastern Time.
const TZ = "America/Toronto";

function format() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

/** Live local time at Mario's location, rendered with a leading separator (" · HH:MM"). */
export function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(format());
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);
  if (!time) return null; // nothing until mounted (avoids SSR/locale mismatch)
  return <span suppressHydrationWarning>{` · ${time}`}</span>;
}
