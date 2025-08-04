import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_COLORS, getColorClasses } from '@/lib/colors';

/**
 * Example component demonstrating how to use the centralized color system
 * This component shows different ways to apply the brand colors
 */
const ColorExample: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Color System Examples</h2>
        <p className="text-muted-foreground">
          This demonstrates how the centralized color system works
        </p>
      </div>

      {/* Button Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Button Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button className={getColorClasses('button', 'primary')}>
              Primary Button
            </Button>
            <Button variant="outline" className={getColorClasses('button', 'outline')}>
              Outline Button
            </Button>
            <Button variant="ghost" className={getColorClasses('button', 'ghost')}>
              Ghost Button
            </Button>
            <Button variant="link" className={getColorClasses('button', 'link')}>
              Link Button
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Border Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Border Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg ${getColorClasses('border', 'primary')}`}>
            Light border example
          </div>
          <div className={`p-4 rounded-lg ${getColorClasses('border', 'thick')}`}>
            Thick border example
          </div>
        </CardContent>
      </Card>

      {/* Background Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Background Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg ${getColorClasses('background', 'primary')}`}>
            Primary background
          </div>
          <div className={`p-4 rounded-lg ${getColorClasses('background', 'secondary')}`}>
            Secondary background
          </div>
          <div className={`p-4 rounded-lg ${getColorClasses('background', 'gradient')}`}>
            Gradient background
          </div>
        </CardContent>
      </Card>

      {/* Text Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Text Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={`text-lg ${getColorClasses('text', 'primary')}`}>
            Primary text color
          </p>
          <p className={`text-lg ${getColorClasses('text', 'hover')} cursor-pointer`}>
            Hover text color (hover over me)
          </p>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>How to Change Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            To change the entire app's color scheme:
          </p>
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li>Open <code className="bg-background px-1 rounded">src/lib/colors.ts</code></li>
            <li>Change <code className="bg-background px-1 rounded">BRAND_COLOR = 'yellow'</code> to your desired color</li>
            <li>Save the file - all components will automatically update</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-4">
            Available colors: blue, green, purple, red, orange, pink, indigo, teal, cyan, emerald, violet, fuchsia, rose, amber, lime, sky, slate, gray, zinc, neutral, stone
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorExample; 