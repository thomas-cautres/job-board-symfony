import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Sidebar({ className }: { className?: string }) {
    return (
        <aside className={cn("w-64 border-r bg-card/50 backdrop-blur-xl h-screen sticky top-0 flex flex-col pt-6 pb-4", className)}>
            <div className="px-6 mb-8 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                    <Briefcase className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">JobBoard</span>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group",
                            isActive
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )
                    }
                >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group",
                            isActive
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )
                    }
                >
                    <Briefcase className="h-4 w-4" />
                    Jobs
                </NavLink>

                <NavLink
                    to="/applications"
                    className={({ isActive }) =>
                        cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group",
                            isActive
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )
                    }
                >
                    <Users className="h-4 w-4" />
                    Applications
                </NavLink>
            </nav>

            <div className="px-4 mt-auto">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/10">
                    <h4 className="font-semibold text-sm mb-1 text-foreground">Need updates?</h4>
                    <p className="text-xs text-muted-foreground mb-3">Check the roadmap for new features.</p>
                    <NavLink to="/jobs/create">
                        <Button className="w-full shadow-lg shadow-primary/25 cursor-pointer" size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" /> Post a Job
                        </Button>
                    </NavLink>
                </div>
            </div>
        </aside>
    );
}
