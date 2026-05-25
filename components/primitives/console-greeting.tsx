"use client";

import { useEffect } from "react";

const SIG = String.raw`
                _                   ___    _
  _ __    ___  | |__    ___  _ __  ( _ )  | |__
 | '__|  / _ \ | '_ \  / _ \| '__| / _ \/\| '_ \
 | |    | (_) || |_) ||  __/| |   | (_>  <| |_) |
 |_|     \___/ |_.__/  \___||_|    \___/\/|_.__/
`;

/** Easter egg for devs who open DevTools. Fires once. */
export function ConsoleGreeting() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as unknown as { __rb_greeted?: boolean }).__rb_greeted) return;
    (window as unknown as { __rb_greeted: boolean }).__rb_greeted = true;

    const orange = "color:#ff6a2b;font-family:monospace;font-weight:700;";
    const dim = "color:#888;font-family:monospace;";
    const link = "color:#ff6a2b;font-family:monospace;text-decoration:underline;";

    /* eslint-disable no-console */
    console.log(`%c${SIG}`, orange);
    console.log("%c> robertino barbuto · freelance · buenos aires", orange);
    console.log("%c> stack:%c next.js · typescript · mastra · ai gateway", dim, "");
    console.log(
      "%c> looking for a dev?%c robertinobarbuto@gmail.com",
      dim,
      link,
    );
    console.log("%c> github:%c https://github.com/rober8b", dim, link);
    console.log("%c> you found the easter egg :)", dim);
    /* eslint-enable no-console */
  }, []);

  return null;
}
