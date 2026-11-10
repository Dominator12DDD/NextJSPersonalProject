"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export default function PlayerCard({id, headshot, name, team, position, passingYds, receivingYds, rushingYds, td}) {
    const [user, setUser] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    console.log(headshot);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const favoriteRef = doc(db, "users", currentUser.uid, "favorites", String(id));
                const favoriteSnapshot = await getDoc(favoriteRef);

                setIsFavorite(favoriteSnapshot.exists());
            } else {
                setIsFavorite(false);
            }
        });

        return () => unsubscribe();
    }, [id]);

    async function handleFavorite() {
        if (!user) {
            return;
        }
        const favoriteRef = doc(db, "users", user.uid, "favorites", String(id));

        if (isFavorite) {
            await deleteDoc(favoriteRef);
            setIsFavorite(false);
        } else {
            await setDoc(favoriteRef, {
                playerId: String(id),
                name: name,
                team: team,
                position: position,
                headshot: headshot
            });

            setIsFavorite(true);
        }
    }

    return(
        <div className = "player-card">
            <div className = "player-card-image">
                <img src={headshot} alt={name} width="100" />
            </div>
            <div className = "player-card-info">
                <h2>{name}</h2>
                <p>Team: {team}</p>

                {position === "Quarterback" && passingYds != null && (
                    <p>Passing Yards: {passingYds} <br/>Passing Touchdowns: {td}</p>
                )}

                {position === "Wide Receiver" && receivingYds != null && (
                    <p>Receiving Yards: {receivingYds} <br/>Receiving Touchdowns: {td}</p>
                )}

                {position === "Running Back" && rushingYds != null && (
                    <p>Rushing Yards: {rushingYds} <br/>Rushing Touchdowns: {td}</p>
                )}

                {user ? (
                    <button onClick={handleFavorite}>
                        {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                    </button>
                ): (
                    <Link href="/login" className="link-button">Log in to favorite players</Link>
                )}

            </div>
        </div>
    )
}
