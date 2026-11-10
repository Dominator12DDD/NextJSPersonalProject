"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import PlayerCard from "../../PlayerCard";

export default function FavoritesPage() {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const favoritesRef = collection(
                    db,
                    "users",
                    currentUser.uid,
                    "favorites"
                );

                const snapshot = await getDocs(favoritesRef);

                const favoritePlayers = snapshot.docs.map((document) => {
                    return document.data();
                });

                setFavorites(favoritePlayers);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading favorites...</p>;
    }

    if (!user) {
        return (
            <main>
                <h1>My Favorites</h1>
                <p>You must log in to view your favorites.</p>
                <Link href="/login" className="link-button">Login</Link>
            </main>
        );
    }

    return (
        <main>
            <h1>My Favorite Players</h1>

            <Link href="/" className="link-button">← Back to Home</Link>

            {favorites.length === 0 ? (
                <p>You haven't favorited any players yet.</p>
            ) : (
                favorites.map((player) => (
                    <PlayerCard
                        key={player.playerId}
                        id={player.playerId}
                        name={player.name}
                        headshot={player.headshot}
                        team={player.team}
                        position={player.position}
                    />
                ))
            )}
        </main>
    );
}