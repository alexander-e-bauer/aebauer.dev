import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Phone,
  Settings,
  LogOut,
  Shield,
  CreditCard,
  Key,
  Building2,
  Loader2,
  Zap,
  Plus,
  ArrowUpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useAuth } from '@/context/AuthContext';
import { useEntitlements } from '@/context/EntitlementsContext';
import { Button } from '@/components/ui/button';
import { SemanticSearchDropdown } from '@/components/search/SemanticSearchDropdown';
import { WorkspaceSwitcher } from '@/components/navigation/WorkspaceSwitcher';
import { CallDirectionFilter } from '@/components/navigation/CallDirectionFilter';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

export interface TopBarProps {
  pageTitle?: string;
  onMenuClick?: () => void;
  rightSlot?: React.ReactNode;
  compactTitle?: boolean;
  onOpenAccount?: () => void;
  showBusinessInput?: boolean;
  onOpenSemanticExplorer?: (query: string) => void;
  onSelectConversation?: (sid: string) => void;
  onChangeView?: (view: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  pageTitle,
  onMenuClick,
  rightSlot,
  compactTitle = false,
  onOpenAccount,
  showBusinessInput = true,
  onOpenSemanticExplorer,
  onSelectConversation,
  onChangeView,
}) => {
  const { mode } = useWorkspace();
  const { user, loading: authLoading, logout } = useAuth();
  const { usage } = useEntitlements() || {};

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const isBiz = mode === 'business';

  useOnClickOutside(accountRef, () => setAccountOpen(false));

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.full_name) {
      const names = user.full_name.trim().split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return user.full_name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  // Get display name
  const getDisplayName = () => {
    return user?.full_name || user?.email?.split('@')[0] || 'User';
  };

  // Get role display
  const getRoleDisplay = () => {
    if (user?.is_superuser) return 'Administrator';
    return 'User';
  };

  const handleAccountSettings = () => {
    setAccountOpen(false);
    onOpenAccount?.();
  };

  const handleChangePassword = () => {
    setAccountOpen(false);
    console.log('Change password');
  };

  const handleBilling = () => {
    setAccountOpen(false);
    console.log('Billing');
  };

  const handleSignOut = () => {
    setAccountOpen(false);
    logout();
  };

  // Calculate Battery State
  const isUnlimited = user?.is_superuser || usage?.monthly_minutes_limit === null;
  const limit = usage?.monthly_minutes_limit ?? 500;
  const used = usage?.monthly_minutes_used ?? 0;
  const remaining = Math.max(0, limit - used);

  // Percentages for UI
  const remainingPercentage = isUnlimited ? 100 : Math.min(100, Math.max(0, ((limit - used) / limit) * 100));
  const usedPercentage = isUnlimited ? 0 : Math.min(100, Math.max(0, (used / limit) * 100));

  // Determine battery colors based on remaining percentage
  let useImageFill = true;
  let fallbackColor = "bg-cyan-500";
  let progressColor = isBiz ? "bg-cyan-500" : "bg-blue-500";

  if (!isUnlimited) {
    if (remainingPercentage <= 20) {
      useImageFill = false;
      fallbackColor = "bg-red-500"; // Solid red for critical
      progressColor = "bg-red-500";
    } else if (remainingPercentage <= 50) {
      useImageFill = false;
      fallbackColor = "bg-amber-500"; // Solid amber for warning
      progressColor = "bg-amber-500";
    }
  }

  const MenuItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    variant?: 'default' | 'danger'
  }> = ({
    icon,
    label,
    onClick,
    variant = 'default'
  }) => (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left',
        variant === 'danger'
          ? 'text-destructive hover:bg-destructive/10'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
    >
      <span className={cn('flex-shrink-0', variant === 'danger' ? 'text-destructive' : 'text-muted-foreground')}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="sticky top-0 z-40 w-full border-b transition-colors duration-300 bg-background/80 backdrop-blur-md border-border text-foreground supports-[backdrop-filter]:bg-background/60">
      <div className="h-14 px-4 flex items-center gap-3">
        {/* Hamburger Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 transition-colors shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent"
          aria-label="Toggle navigation menu"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </Button>

        {/* Workspace switcher */}
        <div className="hidden sm:block shrink-0">
          <WorkspaceSwitcher />
        </div>

        {/* Header searches */}
        <div className="flex-1 flex items-center px-2 md:px-6">
          {showBusinessInput && (
            <SemanticSearchDropdown
              className="hidden md:block w-full max-w-2xl"
              onOpenExplorer={(query) => onOpenSemanticExplorer?.(query)}
              onSelectConversation={onSelectConversation}
            />
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 pl-2 shrink-0">
          {/* Global call-direction filter — applied across all conversation views */}
          <CallDirectionFilter />

          {/* Unified Battery + Account pill */}
          <div
            ref={accountRef}
            className={cn(
              "flex items-center h-8 rounded-full border overflow-visible transition-colors",
              isBiz
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200"
            )}
          >
            {/* Battery section with hover stats */}
            <div className="relative group/battery hidden sm:flex items-center h-full">
              <div
                className={cn(
                  "flex items-center gap-1.5 pl-2.5 pr-2 h-full cursor-default",
                  isBiz ? "text-slate-200" : "text-slate-700"
                )}
              >
                {/* Battery Icon */}
                <div className="flex items-center drop-shadow-sm">
                  <div className={cn(
                    "w-7 h-3.5 rounded-sm border p-0.5 flex items-center relative overflow-hidden",
                    isBiz ? "border-slate-600 bg-slate-950" : "border-slate-300 bg-slate-100"
                  )}>
                    <div
                      className={cn(
                        "h-full rounded-[1px] transition-all duration-1000 ease-out relative overflow-hidden",
                        !useImageFill && fallbackColor
                      )}
                      style={{
                        width: `${remainingPercentage}%`,
                        ...(useImageFill ? {
                          backgroundImage: `url('/assets/landing/abstract-mesh-cyan-royalblue.svg')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        } : {})
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                    </div>
                  </div>
                  <div className={cn(
                    "w-0.5 h-1.5 rounded-r-sm",
                    isBiz ? "bg-slate-600" : "bg-slate-300"
                  )} />
                </div>

                {/* Text & Icon */}
                <div className={cn(
                  "flex items-center text-xs font-bold tracking-tight",
                  isBiz ? "text-cyan-400" : "text-blue-600"
                )}>
                  <Zap
                    size={12}
                    className={cn(
                      "mr-0.5",
                      isUnlimited ? "animate-pulse" : "",
                      isBiz ? "fill-cyan-400 text-cyan-400" : "fill-blue-600 text-blue-600"
                    )}
                  />
                  {isUnlimited ? (
                    <span className="text-base leading-none -mt-0.5">∞</span>
                  ) : (
                    remaining
                  )}
                </div>
              </div>

              {/* Hover Dropdown Panel */}
              <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover/battery:opacity-100 group-hover/battery:visible transition-all duration-200 z-50 w-72">
                <div className={cn(
                  "rounded-xl border shadow-2xl p-4 flex flex-col gap-4",
                  isBiz ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-white border-slate-200 text-slate-700"
                )}>
                  <div className="flex items-center justify-between">
                    <h4 className={cn("font-bold text-sm", isBiz ? "text-white" : "text-slate-900")}>Usage Stats</h4>
                    <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full", isBiz ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500")}>
                      Current Cycle
                    </span>
                  </div>

                  {!isUnlimited ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className={isBiz ? "text-slate-400" : "text-slate-500"}>Minutes Used</span>
                        <span className="font-semibold">{used} <span className={isBiz ? "text-slate-500 font-normal" : "text-slate-400 font-normal"}>/ {limit}</span></span>
                      </div>

                      <div className={cn("h-2.5 w-full rounded-full overflow-hidden", isBiz ? "bg-slate-800" : "bg-slate-100")}>
                        <div
                          className={cn("h-full rounded-full transition-all duration-1000 ease-out", progressColor)}
                          style={{ width: `${usedPercentage}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className={cn("font-medium", fallbackColor.replace('bg-', 'text-'))}>
                          {remaining} min remaining
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className={cn("text-sm py-3 text-center rounded-lg", isBiz ? "bg-slate-900 text-slate-400" : "bg-slate-50 text-slate-500")}>
                      You are on the <strong className={isBiz ? "text-cyan-400" : "text-blue-600"}>Unlimited</strong> plan.
                    </div>
                  )}

                  <div className={cn("flex flex-col gap-2 pt-3 border-t", isBiz ? "border-slate-800" : "border-slate-100")}>
                    {!isUnlimited && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-full justify-start font-semibold",
                          isBiz ? "border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white" : ""
                        )}
                      >
                        <Plus size={16} className="mr-2" />
                        Add Minutes
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className={cn(
                        "w-full justify-start font-semibold border-0",
                        isBiz
                          ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-900/20"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20"
                      )}
                    >
                      <ArrowUpCircle size={16} className="mr-2" />
                      Upgrade Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={cn(
              "hidden sm:block w-px h-5",
              isBiz ? "bg-slate-800" : "bg-slate-200"
            )} />

            {/* Account avatar trigger */}
            <div className="relative h-full">
              <button
                type="button"
                aria-label="User account menu"
                onClick={() => setAccountOpen(!accountOpen)}
                disabled={authLoading}
                className={cn(
                  "h-full w-8 flex items-center justify-center rounded-r-full transition-colors disabled:opacity-50",
                  isBiz ? "hover:bg-slate-800" : "hover:bg-slate-100"
                )}
              >
                {authLoading ? (
                  <Loader2 size={16} className={cn("animate-spin", isBiz ? "text-slate-400" : "text-slate-600")} />
                ) : (
                  <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-semibold",
                    isBiz
                      ? "bg-slate-800 text-cyan-400"
                      : "bg-gradient-to-br from-slate-700 to-slate-600 text-white"
                  )}>
                    {getUserInitials()}
                  </div>
                )}
              </button>

              {accountOpen && user && (
                <div
                  className={cn(
                    "absolute right-0 mt-2 w-72 rounded-lg border shadow-xl transition-colors",
                    isBiz ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  )}
                  role="dialog"
                >
                {/* User Info Header */}
                <div className={cn("px-4 py-3 border-b", isBiz ? "border-slate-800" : "border-slate-200")}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center font-semibold",
                      isBiz
                        ? "bg-slate-800 text-cyan-400 border border-slate-700"
                        : "bg-gradient-to-br from-slate-700 to-slate-600 text-white"
                    )}>
                      {getUserInitials()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={cn("text-sm font-semibold truncate", isBiz ? "text-white" : "text-slate-900")} title={getDisplayName()}>
                        {getDisplayName()}
                      </div>
                      <div className={cn("text-xs truncate", isBiz ? "text-slate-400" : "text-slate-500")} title={user.email}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className={cn("mt-2 flex items-center gap-2 text-xs", isBiz ? "text-slate-400" : "text-slate-500")}>
                    <Shield size={12} />
                    <span>{getRoleDisplay()}</span>
                    {user.company_name && (
                      <>
                        <span>•</span>
                        <Building2 size={12} />
                        <span className="truncate" title={user.company_name}>
                          {user.company_name}
                        </span>
                      </>
                    )}
                  </div>
                  {user.phone_number && (
                    <div className={cn("mt-1 flex items-center gap-2 text-xs", isBiz ? "text-slate-400" : "text-slate-500")}>
                      <Phone size={12} />
                      <span>{user.phone_number}</span>
                    </div>
                  )}
                  {!user.is_active && (
                    <div className={cn(
                      "mt-2 px-2 py-1 border rounded text-xs",
                      isBiz ? "bg-red-950/30 border-red-900/50 text-red-400" : "bg-red-50 border-red-200 text-red-600"
                    )}>
                      Account Inactive
                    </div>
                  )}
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <MenuItem
                    icon={<Settings size={16} />}
                    label="Account Settings"
                    onClick={handleAccountSettings}
                  />
                  <MenuItem
                    icon={<Key size={16} />}
                    label="Change Password"
                    onClick={handleChangePassword}
                  />
                  <MenuItem
                    icon={<CreditCard size={16} />}
                    label="Billing & Plans"
                    onClick={handleBilling}
                  />
                </div>

                {/* Divider */}
                <div className={cn("border-t", isBiz ? "border-slate-800" : "border-slate-200")} />

                {/* Danger Zone */}
                <div className="p-2">
                  <MenuItem
                    icon={<LogOut size={16} />}
                    label="Sign Out"
                    onClick={handleSignOut}
                    variant="danger"
                  />
                </div>
              </div>
            )}
            </div>
          </div>

          {rightSlot}
        </div>
      </div>
    </div>
  );
};

export default TopBar;