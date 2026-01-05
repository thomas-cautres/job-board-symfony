import { Outlet, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export default function CandidateLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <NavLink to="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <Briefcase className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">JobBoard</span>
                        </NavLink>
                        <nav className="flex items-center gap-6 text-sm font-medium">
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/jobs"
                                className={({ isActive }) => isActive ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
                            >
                                Jobs
                            </NavLink>
                        </nav>
                    </div>
                    <div>
                        <Button variant="ghost" asChild>
                            <NavLink to="/login">Recruiter Access</NavLink>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="border-t py-6 md:py-0">
                <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by Antigravity.
                    </p>
                </div>
            </footer>
        </div>
    );
}
