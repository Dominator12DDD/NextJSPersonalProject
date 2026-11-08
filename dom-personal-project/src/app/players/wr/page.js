"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PlayerCard from "../../PlayerCard";

export default function WRPage() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function getPlayers() {
            const response = await fetch("/api/players/wr");
            const data = await response.json();
            setPlayers(data);
        }

        getPlayers();
    }, []);

    return (
        <main>

            <Link href="/">
                ← Back to Home
            </Link>

            <h1>Wide Receivers</h1>

            <div>
                {players.map((player) => (
                    <PlayerCard
                        key={player.id}
                        name={player.name}
                        headshot={player.headshot}
                        team={player.team}
                        position={player.position}
                        receivingYds={player.receivingYds}
                        td={player.td}
                    />
                ))}
            </div>
        </main>
    );
}