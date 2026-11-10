"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";
import {signOut} from "firebase/auth";

export default function PlayersHomePage() {
  const [players, setPlayers] = useState({
        qbs: [],
        rbs: [],
        wrs: []
    });

  const [user, setUser] = useState(null);

  async function handleLogout() {
    await signOut(auth);
  }

  useEffect(() => {
      async function getPlayers() {
          const response = await fetch("/api/top-players");
          const data = await response.json();
          setPlayers(data);
      }
      getPlayers();

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

      return () => unsubscribe();
  }, []);

  return(
    <main>
      <h1>NFL Player Stats</h1>
      <br></br>
      {user ? (
        <div className="home-auth">
          <p>Welcome, {user.email}</p>
            <Link href="/players/favorites" className="link-button">
              My Favorites
            </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ): (
        <div className="home-auth">
          <Link href="/login" className="link-button">Login</Link>
          <Link href="/signup" className="link-button">Sign Up</Link>
        </div>
      )}

      <div className ="player-sections">
        <section>
            <h2>Top Quarterbacks</h2>

          <Link href="/players/qb">
            View All QBs →
          </Link>

          {players.qbs.map((player, index) => (
            <p key={index}>{player.name} - {player.passingYds} passing yards</p>
          ))}
        </section>

        <section>
            <h2>Top Runningbacks</h2>

          <Link href="/players/rb">
            View All RBs →
          </Link>

          {players.rbs.map((player, index) => (
            <p key={index}>{player.name} - {player.rushingYds} rushing yards</p>
          ))}
        </section>

        <section>
            <h2>Top Wide Receivers</h2>

          <Link href="/players/wr">
            View All WRs →
          </Link>

            {players.wrs.map((player, index) => (
              <p key={index}>{player.name} - {player.receivingYds} receiving yards</p>
            ))}
        </section>
      </div>

    </main>
  )
}
