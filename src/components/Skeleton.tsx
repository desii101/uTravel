export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`bg-zinc-200 dark:bg-zinc-700 animate-pulse ${className}`} {...props} />
    )
};