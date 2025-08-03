import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className
      )}
    >
             <div className="flex items-center gap-3">
         <Avatar className="h-12 w-12 flex-shrink-0">
           <AvatarImage src={author.avatar} alt={author.name} />
         </Avatar>
         <div className="flex flex-col items-start min-w-0 flex-1">
           <h3 className="text-md font-semibold leading-none truncate" style={{ minHeight: '1.25rem' }}>
             {author.name || 'Developer'}
           </h3>
           <p className="text-sm text-muted-foreground truncate" style={{ minHeight: '1rem' }}>
             {author.handle || '@developer'}
           </p>
         </div>
       </div>
      <p className="sm:text-md mt-4 text-sm text-muted-foreground">
        {text}
      </p>
    </Card>
  )
} 