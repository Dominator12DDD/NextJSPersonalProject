"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PlayerCard from "../../PlayerCard";

export default function WRPage() {
    const [players, setPlayers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function getPlayers() {
            const response = await fetch("/api/players/wr");
            const data = await response.json();
            setPlayers(data);
        }

        getPlayers();
    }, []);

    const filteredPlayers = players.filter((player) => {
        return player.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <main>

            <Link href="/" className="link-button">
                ← Back to Home
            </Link>

            <h1>Wide Receivers</h1>
            <input
                type="text"
                placeholder="Search wide receivers..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <div>
                {filteredPlayers.map((player) => (
                    <PlayerCard
                        key={player.id}
                        id={player.id}
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