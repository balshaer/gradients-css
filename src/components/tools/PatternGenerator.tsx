import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Download, Grid, Layers, Zap, Settings, Code2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface PatternGeneratorProps {
  gradient: {
    name: string;
    colors: string[];
  };
  onClose: () => void;
}

const patternTypes = {
  diagonal: {
    name: "Diagonal Stripes",
    icon: Grid,
    generate: (colors: string[], size: number, opacity: number) => ({
      background: `repeating-linear-gradient(
        45deg,
        ${colors[0]} 0px,
        ${colors[0]} ${size}px,
        ${colors[1] || colors[0]} ${size}px,
        ${colors[1] || colors[0]} ${size * 2}px
      )`,
      opacity: opacity / 100
    })
  },
  dots: {
    name: "Dot Pattern",
    icon: Layers,
    generate: (colors: string[], size: number, opacity: number) => ({
      background: `radial-gradient(circle at 50% 50%, ${colors[0]} ${size}%, transparent ${size + 10}%)`,
      backgroundSize: `${size * 2}px ${size * 2}px`,
      opacity: opacity / 100,
      position: 'relative' as const,
      '&::before': {
        content: '""',
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(45deg, ${colors.join(', ')})`,
        zIndex: -1
      }
    })
  },
  waves: {
    name: "Wave Pattern",
    icon: Zap,
    generate: (colors: string[], size: number, opacity: number) => ({
      background: `linear-gradient(45deg, ${colors.join(', ')}), url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,${size/2} Q${size/4},0 ${size/2},${size/2} T${size},${size/2}' stroke='white' stroke-width='2' fill='none' opacity='${opacity/100}'/%3E%3C/svg%3E")`,
      backgroundBlendMode: 'overlay' as const
    })
  },
  hexagon: {
    name: "Hexagon Grid",
    icon: Grid,
    generate: (colors: string[], size: number, opacity: number) => ({
      background: `linear-gradient(45deg, ${colors.join(', ')}), url("data:image/svg+xml,%3Csvg width='${size}' height='${size * 0.866}' viewBox='0 0 ${size} ${size * 0.866}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='${size/2},0 ${size},${size/4} ${size},${size*3/4} ${size/2},${size} 0,${size*3/4} 0,${size/4}' fill='none' stroke='white' stroke-width='1' opacity='${opacity/100}'/%3E%3C/svg%3E")`,
      backgroundBlendMode: 'overlay' as const
    })
  },
  mesh: {
    name: "Mesh Gradient",
    icon: Layers,
    generate: (colors: string[], size: number, opacity: number) => ({
      background: `
        radial-gradient(circle at 20% 20%, ${colors[0]} 0%, transparent ${size}%),
        radial-gradient(circle at 80% 20%, ${colors[1] || colors[0]} 0%, transparent ${size}%),
        radial-gradient(circle at 20% 80%, ${colors[2] || colors[1] || colors[0]} 0%, transparent ${size}%),
        radial-gradient(circle at 80% 80%, ${colors[3] || colors[2] || colors[1] || colors[0]} 0%, transparent ${size}%),
        linear-gradient(45deg, ${colors.join(', ')})
      `,
      opacity: opacity / 100
    })
  },
  noise: {
    name: "Noise Texture",
    icon: Zap,
    generate: (colors: string[], size: number, opacity: number) => ({
      background: `linear-gradient(45deg, ${colors.join(', ')}), url("data:image/svg+xml,%3Csvg viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='${opacity/100}'/%3E%3C/svg%3E")`,
      backgroundBlendMode: 'multiply' as const
    })
  }
};

export function PatternGenerator({ gradient, onClose }: PatternGeneratorProps) {
  const [selectedPattern, setSelectedPattern] = useState<keyof typeof patternTypes>('diagonal');
  const [size, setSize] = useState([20]);
  const [opacity, setOpacity] = useState([30]);
  const [copied, setCopied] = useState<string | null>(null);

  const currentPattern = patternTypes[selectedPattern];
  const patternStyle = currentPattern.generate(gradient.colors, size[0], opacity[0]);

  const copyCSS = (css: string, type: string) => {
    navigator.clipboard.writeText(css);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateCSS = () => {
    const style = currentPattern.generate(gradient.colors, size[0], opacity[0]);
    return `/* ${currentPattern.name} Pattern - Generated from ${gradient.name} */
.pattern {
  ${Object.entries(style)
    .filter(([key]) => typeof key === 'string' && !key.startsWith('&'))
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
    .join('\n  ')}
}`;
  };

  const generateSCSS = () => {
    const css = generateCSS();
    return css.replace('.pattern', '%pattern-mixin').replace(/\/\* .+ \*\/\n/, '') + 
    `\n\n// Usage: @extend %pattern-mixin;`;
  };

  const generateTailwind = () => {
    return `/* Add to tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'pattern-${selectedPattern}': \`${patternStyle.background}\`
      }
    }
  }
}

// Usage: bg-pattern-${selectedPattern}`;
  };

  const downloadPattern = () => {
    // Create a download link for the CSS pattern
    const cssContent = generateCSS();
    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${gradient.name}-${selectedPattern}-pattern.css`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-background border border-border">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Grid className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-foreground text-2xl">Pattern Generator</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  Transform
                  <Badge variant="secondary" className="px-2 py-1 font-medium">{gradient.name}</Badge>
                  into stunning patterns
                </p>
              </div>
            </div>
            <Button variant="ghost" size="lg" onClick={onClose}>
              ✕
            </Button>
          </div>

          {/* Large Preview Section */}
          <div className="p-6 space-y-4">
            <div className="relative">
              <div 
                className="relative shadow-2xl border-2 border-border rounded-2xl w-full h-80 overflow-hidden transition-all duration-300 hover:shadow-3xl"
                style={patternStyle}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
                <div className="absolute top-4 left-4 right-4">
                  <div className="bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white text-lg">{currentPattern.name}</p>
                        <p className="text-white/80 text-sm">Live Preview</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm font-medium">Size: {size[0]}px</p>
                        <p className="text-white/80 text-sm">Opacity: {opacity[0]}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Interface */}
          <div className="px-6 pb-6">
            <Tabs defaultValue="patterns" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="patterns" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Patterns
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  Export
                </TabsTrigger>
              </TabsList>

              <TabsContent value="patterns" className="space-y-4">
                <div className="space-y-4">
                  <Label className="font-semibold text-foreground text-lg">Choose Pattern Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(patternTypes).map(([key, pattern]) => {
                      const Icon = pattern.icon;
                      return (
                        <motion.div
                          key={key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={selectedPattern === key ? "default" : "outline"}
                            className={`flex flex-col items-center gap-3 p-6 h-auto w-full transition-all duration-200 ${
                              selectedPattern === key 
                                ? 'ring-2 ring-primary ring-offset-2 shadow-lg' 
                                : 'hover:shadow-md'
                            }`}
                            onClick={() => setSelectedPattern(key as keyof typeof patternTypes)}
                          >
                            <Icon className="w-8 h-8" />
                            <span className="font-medium">{pattern.name}</span>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="font-semibold text-foreground text-lg">Pattern Size</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-foreground">Size</Label>
                        <Badge variant="outline" className="font-mono">{size[0]}px</Badge>
                      </div>
                      <Slider
                        value={size}
                        onValueChange={setSize}
                        min={5}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5px</span>
                        <span>100px</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-semibold text-foreground text-lg">Pattern Opacity</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-foreground">Opacity</Label>
                        <Badge variant="outline" className="font-mono">{opacity[0]}%</Badge>
                      </div>
                      <Slider
                        value={opacity}
                        onValueChange={setOpacity}
                        min={10}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>10%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="export" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="font-semibold text-foreground text-lg">Quick Export</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 h-12"
                        onClick={() => copyCSS(generateCSS(), 'css')}
                      >
                        <Copy className="w-4 h-4" />
                        {copied === 'css' ? 'Copied!' : 'Copy CSS'}
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center gap-2 h-12"
                        onClick={() => copyCSS(generateSCSS(), 'scss')}
                      >
                        <Copy className="w-4 h-4" />
                        {copied === 'scss' ? 'Copied!' : 'Copy SCSS'}
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center gap-2 h-12"
                        onClick={() => copyCSS(generateTailwind(), 'tailwind')}
                      >
                        <Copy className="w-4 h-4" />
                        {copied === 'tailwind' ? 'Copied!' : 'Copy Tailwind'}
                      </Button>

                      <Button
                        variant="default"
                        className="flex items-center gap-2 h-12"
                        onClick={downloadPattern}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-semibold text-foreground text-lg">Generated Code</Label>
                    <div className="bg-muted/50 border border-border rounded-lg overflow-hidden">
                      <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between">
                        <span className="font-mono text-sm text-foreground">CSS</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCSS(generateCSS(), 'css')}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <pre className="p-4 text-xs max-h-40 overflow-y-auto">
                        <code className="text-foreground">{generateCSS()}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}