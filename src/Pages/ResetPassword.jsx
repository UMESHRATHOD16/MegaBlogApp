import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import authService from "../Appwrite/Auth";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!userId || !secret) {
            setError("Invalid or incomplete recovery link. Request a new one.");
            return;
        }

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await authService.resetPassword({
                userId,
                secret,
                password
            });

            setMessage("Password reset successfully! You can now log in.");
            setPassword("");
            setConfirmPassword("");
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
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New password"
                        minLength={8}
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        minLength={8}
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-600 p-3 text-white disabled:opacity-60"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
