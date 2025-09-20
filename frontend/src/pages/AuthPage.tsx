import { FcGoogle } from "react-icons/fc";
import AllyBG from "../../public/combo.png";
import AllyLogo from "../../public/AllyBlack.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const session = useSession();

  // 👇 redirect if already logged in
  useEffect(() => {
    if (session) {
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          import.meta.env.MODE === "development"
            ? "http://localhost:8080/"
            : "https://purple-desert-09831a80f.2.azurestaticapps.net/",
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Section (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted">
        <img src={AllyBG} alt="Illustration" className="max-w-md" />
      </div>

      {/* Right Section (Sign In Panel) */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 bg-card border border-border rounded-xl shadow-md p-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={AllyLogo} alt="Logo" className="h-10" />
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h2
              className="text-[20px] font-medium"
              style={{ fontFamily: '"Nunito Sans", serif', color: "#0a0a0a" }}
            >
              Sign in to Ally Solutions
            </h2>
            <p className="text-sm text-muted-foreground">
              Continue with your favorite provider
            </p>
          </div>

          {/* Buttons (providers) */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 border border-border rounded-lg py-2 px-4 bg-white shadow hover:shadow-md transition"
            >
              <FcGoogle className="text-xl" />
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>

          {/* Footer */}
          <p className="text-sm text-center text-muted-foreground">
            By signing up you agree to our{" "}
            <a
              href="#"
              className="underline text-blue-600 hover:text-blue-700 hover:underline"
            >
              Privacy Policy
            </a>
          </p>

          <div className="text-sm text-center text-muted-foreground mt-2 flex items-center justify-center gap-1">
            <span>Need help?</span>
            <a
              href="#"
              className="underline text-blue-600 hover:text-blue-700 hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
