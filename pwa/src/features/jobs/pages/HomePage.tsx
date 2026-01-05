import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, MapPin, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden bg-primary/5">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        <div className="space-y-4 max-w-3xl">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                Find Your Dream Job Today
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Connecting talent with opportunity. Browse thousands of jobs from top companies and startups.
                            </p>
                        </div>

                        <div className="w-full max-w-2xl p-2 bg-background rounded-xl shadow-lg border flex flex-col sm:flex-row gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Job title, keywords..."
                                    className="pl-9 border-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                            <div className="relative flex-1 border-t sm:border-t-0 sm:border-l">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Location"
                                    className="pl-9 border-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                            <Button size="lg" className="w-full sm:w-auto">
                                Search Jobs
                            </Button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground pt-4">
                            <span className="font-medium text-foreground">Popular:</span>
                            <span className="cursor-pointer hover:text-primary transition-colors">Frontend Developer</span>
                            <span className="cursor-pointer hover:text-primary transition-colors">Product Manager</span>
                            <span className="cursor-pointer hover:text-primary transition-colors">Data Scientist</span>
                            <span className="cursor-pointer hover:text-primary transition-colors">DevOps</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / Stats */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <Briefcase className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Thousands of Jobs</h3>
                            <p className="text-muted-foreground">Fresh jobs added daily from top companies worldwide.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <Search className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Smart Search</h3>
                            <p className="text-muted-foreground">Find the perfect match with our meaningful search filters.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Remote Friendly</h3>
                            <p className="text-muted-foreground">Filter specifically for remote-first opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Ready to start your journey?</h2>
                        <p className="max-w-[600px] text-muted-foreground text-lg">
                            Create your profile today and let companies find you. It takes less than 5 minutes.
                        </p>
                        <div className="flex gap-4">
                            <Button asChild size="lg">
                                <Link to="/jobs">Browse All Jobs</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
