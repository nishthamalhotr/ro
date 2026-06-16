import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';

export function UserAvatar() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  if (!user) return null;

  // ✅ Create full name
  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

  // ✅ Get initials safely
  const initials = fullName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none transition-opacity hover:opacity-80">
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarFallback className="bg-blue-600 text-white font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <div className="flex flex-col space-y-1 p-2">
            {/* ✅ Fixed name */}
            <p className="text-sm font-semibold text-gray-900">
              {fullName || 'User'}
            </p>

            {/* ❌ user.phone removed (not in type) */}

            {/* ✅ email safe */}
            {user.email && (
              <p className="text-xs text-gray-500">{user.email}</p>
            )}
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}