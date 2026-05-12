import React from 'react';
import {
  ChevronsUpDown,
  Building2,
  User,
  Check,
  PlusCircle,
  ShieldCheck,
  UserPlus // <-- Added new icon for adding users/lines
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useAuth } from '@/context/AuthContext';

export function WorkspaceSwitcher({ className }: { className?: string }) {
  const {
    mode,
    activeBusiness,
    isLoading,
    switchToPersonal,
    switchToBusiness,
    availableBusinesses
  } = useWorkspace();

  const { user } = useAuth();

  const isBiz = mode === 'business';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={isLoading}
          className={cn(
            "w-[220px] justify-between transition-colors duration-300 bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {isBiz ? (
              <Building2 className="w-4 h-4 text-primary shrink-0" />
            ) : (
              <User className="w-4 h-4 text-primary shrink-0" />
            )}
            <span className="truncate">
              {isLoading ? 'Loading...' : isBiz ? (activeBusiness?.business_name || 'Select Business') : 'Personal AI'}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[220px] bg-popover border-border text-popover-foreground">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground">
            Personal
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={switchToPersonal}
            className={cn(
              "cursor-pointer focus:bg-accent focus:text-accent-foreground",
              !isBiz && "bg-primary/10 text-primary focus:bg-primary/10 focus:text-primary"
            )}
          >
            <User className="mr-2 h-4 w-4" />
            <span className="truncate">{user?.full_name || 'My AI'}</span>
            {!isBiz && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground">
            Businesses
          </DropdownMenuLabel>
          {availableBusinesses.map((biz) => (
            <DropdownMenuItem
                key={biz.id}
                onClick={() => switchToBusiness(biz.id)}
                className={cn(
                  "cursor-pointer focus:bg-accent focus:text-accent-foreground",
                  isBiz && activeBusiness?.id === biz.id && "bg-primary/10 text-primary focus:bg-primary/10 focus:text-primary"
                )}
              >
                <Building2 className="mr-2 h-4 w-4" />
                <span className="truncate">{biz.business_name}</span>
                {isBiz && activeBusiness?.id === biz.id && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-border" />

        {/* Contextual Action Button based on Mode */}
        {isBiz ? (
          <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Create Business</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Add Line / User</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
