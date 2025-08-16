import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeleton() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[225px] w-[350px] rounded-xl bg-accent-foreground" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-accent-foreground" />
                <Skeleton className="h-4 w-[200px] bg-accent-foreground" />
            </div>
        </div>
    )
}
