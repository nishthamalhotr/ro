import { useEffect, useState } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { X } from "lucide-react";

export default function LeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000); // Opens after 1 second

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setOpen(false);
  };

if (!open) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

      {/* Close Button */}
      <button
        onClick={closePopup}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
      >
        <X size={20} />
      </button>

      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Get Free RO Checkup
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Register now for exclusive RO service benefits.
        </p>
      </div>

      {/* Benefits */}
      <div className="mb-4 text-sm text-gray-700 space-y-1">
        <p>✓ Free maintenance reminders</p>
        <p>✓ Special service discounts</p>
        <p>✓ Priority technician support</p>
      </div>

      {/* Form */}
      <RegisterForm />
    </div>
  </div>
  );
}