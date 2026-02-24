import { LoginForm } from "@/components/auth/LoginForm";
import { Link } from "wouter";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-xl border shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Login to manage your RO services</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
