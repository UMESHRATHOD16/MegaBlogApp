import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../Appwrite/Auth";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            await authService.forgotPassword(email);
            setMessage("If your account exists, a recovery email will be sent. Check your inbox.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl border p-8 shadow-sm">
                <h2 className="text-center text-2xl font-bold">
                    Forgot Password?
                </h2>

                <p className="mt-2 text-center text-gray-600">
                    Enter your email to receive a password reset link.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-600 p-3 text-white disabled:opacity-60"
                    >
                        {loading ? "Sending..." : "Send Recovery Email"}
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-green-600">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mt-4 text-center text-red-600">
                        {error}
                    </p>
                )}

                <p className="mt-5 text-center">
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
