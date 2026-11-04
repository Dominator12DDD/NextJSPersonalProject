"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PlayersHomePage() {
  const [players, setPlayers] = useState({
        qbs: [],
        rbs: [],
        wrs: []
    });


    useEffect(() => {
        async function getPlayers() {
            const response = await fetch("/api/top-players");
            const data = await response.json();
            setPlayers(data);
        }
        getPlayers();
    }, []);

  return(
    <main>
      <h1>NFL Player Stats</h1>
      <br></br>

      <div className ="player-sections">
        <section>
            <h2>Top Quarterbacks</h2>

          <Link href="/players/qb">
            View All QBs →
          </Link>

          {players.qbs.map((player, index) => (
            <p key={index}>{player}</p>
          ))}
        </section>

        <section>
            <h2>Top Runningbacks</h2>

          <Link href="/players/rb">
            View All RBs →
          </Link>

          {players.rbs.map((player, index) => (
            <p key={index}>{player}</p>
          ))}
        </section>

        <section>
            <h2>Top Wide Receivers</h2>

          <Link href="/players/wr">
            View All WRs →
          </Link>

            {players.wrs.map((player, index) => (
              <p key={index}>{player}</p>
            ))}
        </section>
      </div>

    </main>
  )
}
