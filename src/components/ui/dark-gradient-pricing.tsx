import { Check, X } from "lucide-react"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

interface PricingCardProps {
  tier: string
  price: string
  bestFor: string
  CTA: string
  benefits: Array<{ text: string; checked: boolean }>
  onButtonClick?: (tier: string) => void
  isYearly?: boolean
}

export function PricingCard({ tier, price, bestFor, CTA, benefits, onButtonClick, isYearly }: PricingCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-background via-background to-muted/20 shadow-lg">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{tier}</CardTitle>
            <CardDescription className="text-muted-foreground">{bestFor}</CardDescription>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {tier !== "Enterprise" && (
            <span className="text-sm text-muted-foreground ml-1">
              /{isYearly ? 'year' : 'mo'}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center space-x-3">
              {benefit.checked ? (
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
              <span className="text-sm text-muted-foreground">{benefit.text}</span>
            </li>
          ))}
        </ul>
        <Button 
          className={`w-full transition-all duration-200 hover:scale-105 ${
            tier === "Pro" 
              ? "bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg hover:shadow-xl" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 hover:border-yellow-500/50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          }`}
          onClick={() => {
            if (onButtonClick) {
              onButtonClick(tier);
            }
          }}
        >
          {CTA}
        </Button>
      </CardContent>
    </Card>
  )
} 