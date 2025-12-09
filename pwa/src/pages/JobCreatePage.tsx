import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function JobCreatePage() {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Post a New Job</CardTitle>
                    <CardDescription>
                        Fill out the form below to publish a new job opening.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input id="title" placeholder="e.g. Senior Frontend Developer" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="e.g. Remote, Paris, etc." required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Employment Type</Label>
                                <Input id="type" placeholder="e.g. Full-time" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">Salary Range</Label>
                                <Input id="salary" placeholder="e.g. €50k - €70k" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the role, responsibilities, and requirements..."
                                className="min-h-[150px]"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button">Cancel</Button>
                            <Button type="submit">Create Job</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
