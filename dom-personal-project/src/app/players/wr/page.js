"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
                    <div key={player.id}>
                        <img
                            src={player.headshot}
                            alt={player.name}
                            width="100"
                        />

                        <h2>{player.name}</h2>
                        <p>{player.team}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}