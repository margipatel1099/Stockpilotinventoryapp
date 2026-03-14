import { useState } from "react";
import { useNavigate } from "react-router";
import { Package, Mail, Lock, KeyRound } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtpReset, setShowOtpReset] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate("/dashboard");
  };

  const handleOtpReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock OTP reset
    alert(`OTP reset link sent to ${otpEmail}`);
    setShowOtpReset(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <Package className="h-8 w-8 text-[#4F46E5]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">StockPilot</h1>
          <p className="text-indigo-100">Inventory Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!showOtpReset ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome Back</h2>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#4F46E5] hover:bg-[#4338CA]"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowOtpReset(true)}
                  className="text-sm text-[#4F46E5] hover:text-[#4338CA] font-medium"
                >
                  Forgot your password? Reset with OTP
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Demo credentials: any email and password
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Reset Password</h2>
              <p className="text-sm text-gray-600 mb-6">
                Enter your email to receive an OTP for password reset
              </p>

              <form onSubmit={handleOtpReset} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="otp-email">Email Address</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="otp-email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={otpEmail}
                      onChange={(e) => setOtpEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#4F46E5] hover:bg-[#4338CA]"
                >
                  Send OTP
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowOtpReset(false)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to login
                </button>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-indigo-100 text-sm mt-6">
          © 2026 StockPilot. All rights reserved.
        </p>
      </div>
    </div>
  );
}
