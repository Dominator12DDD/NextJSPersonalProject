"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PlayerCard from "../../PlayerCard";

export default function RBPage() {
    const [players, setPlayers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function getPlayers() {
            const response = await fetch("/api/players/rb");
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

            <h1>Running Backs</h1>
            <input
                type="text"
                placeholder="Search running backs..."
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
                        rushingYds={player.rushingYds}
                        td={player.td}
                    />
                ))}
            </div>
        </main>
    );
}
