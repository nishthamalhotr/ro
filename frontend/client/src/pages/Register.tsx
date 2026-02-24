import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "wouter";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-xl border shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join AquaShield for better RO care</p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
