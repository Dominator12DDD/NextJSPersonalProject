"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PlayerCard from "../../PlayerCard";

export default function QBPage() {
    const [players, setPlayers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function getPlayers() {
            const response = await fetch("/api/players/qb");
            const data = await response.json();

            const quarterbacks = data.filter((player) => {
                return player.position === "Quarterback";
            })
            setPlayers(quarterbacks);
        }
        getPlayers();
    }, []);

    const filteredPlayers = players.filter((player) => {
        return player.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <main>
            <Link href="/">
                ← Back to Home
            </Link>
            <h1>Quarterbacks</h1>
            <input
                type="text"
                placeholder="Search quarterbacks..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <div>
                {filteredPlayers.map((player) => (
                    <PlayerCard
                        key={player.id}
                        name={player.name}
                        headshot={player.headshot}
                        team={player.team}
                        position={player.position}
                        passingYds={player.passingYds}
                        td={player.td}
                    />
                ))}

                {filteredPlayers.length === 0 && (
                    <p>No quarterbacks found.</p>
                )}
            </div>
        </main>
    );
}
