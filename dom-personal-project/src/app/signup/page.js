"use client";

import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth } from "../firebase";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSignup(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <main>
            <Link href="/" className="link-button">← Back to Home</Link>
            <h1>Create an Account</h1>

            <form className="auth-form" onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={6}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />

                <button type="submit">Sign Up</button>
            </form>

            {error && <p>{error}</p>}
        </main>
    );
}
