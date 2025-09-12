import { FcGoogle } from "react-icons/fc";
import AllyBG from '../../public/combo.png'
import AllyLogo from '../../public/Allylogo.png'

export default function AuthPage() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-background">
            {/* Left Section (Hidden on mobile) */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-muted">
                {/* Replace with your image/illustration */}
                <img
                    src={AllyBG}
                    alt="Illustration"
                    className="max-w-md"
                />
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
                            style={{ fontFamily: '"Nunito Sans", serif', color: '#0a0a0a' }}
                        >
                            Sign in to Ally Solutions
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Continue with your favorite provider
                        </p>
                    </div>

                    {/* Buttons (providers) */}
                    <div className="flex flex-col gap-3">
                        <button className="w-full py-2 border rounded-lg hover:bg-accent/20 flex items-center justify-center gap-2">
                            <FcGoogle className="text-xl" />
                            <span className="text-sm text-gray-700" >Continue with Google</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-center text-gray-600 text-muted-foreground">
                        By signing up you agree to our{" "}
                        <a
                            href="#"
                            className="underline text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Privacy Policy
                        </a>
                    </p>

                    <div className="text-sm text-center text-gray-600 text-muted-foreground mt-2 flex items-center justify-center gap-1">
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
