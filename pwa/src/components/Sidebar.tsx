import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, Users, LogOut, PlusCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const navigate = useNavigate();

    return (
        <div className={cn("pb-12 min-h-screen", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Recruiter Dashboard
                    </h2>
                    <div className="space-y-1">
                        <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <NavLink
                                to="/dashboard"
                                end
                                className={({ isActive }) => cn(isActive && "bg-secondary text-secondary-foreground")}
                            >
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Overview
                            </NavLink>
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <NavLink
                                to="/jobs"
                                className={({ isActive }) => cn(isActive && "bg-secondary text-secondary-foreground")}
                            >
                                <Briefcase className="mr-2 h-4 w-4" />
                                Jobs
                            </NavLink>
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <NavLink
                                to="/applications"
                                className={({ isActive }) => cn(isActive && "bg-secondary text-secondary-foreground")}
                            >
                                <Users className="mr-2 h-4 w-4" />
                                Applications
                            </NavLink>
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <NavLink
                                to="/jobs/create"
                                className={({ isActive }) => cn(isActive && "bg-secondary text-secondary-foreground")}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Post a Job
                            </NavLink>
                        </Button>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Account
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => navigate('/logout')}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
