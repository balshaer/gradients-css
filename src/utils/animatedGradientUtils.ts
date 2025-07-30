export interface AnimatedGradientOptions {
  colors: string[];
  angle: number;
  isAnimated: boolean;
  animationSpeed: number;
  gradientType?: "background" | "text";
}

export const animatedGradientUtils = {
  // Generate CSS for animated gradient
  generateAnimatedCSS: (options: AnimatedGradientOptions): string => {
    const { colors, angle, isAnimated, animationSpeed, gradientType = "background" } = options;

    const gradientStyle = `linear-gradient(${angle}deg, ${colors.join(", ")})`;

    if (!isAnimated) {
      if (gradientType === "text") {
        return `color: transparent;
background-image: ${gradientStyle};
-webkit-background-clip: text;
background-clip: text;`;
      } else {
        return `background: ${gradientStyle};`;
      }
    }

    const animationDuration = `${4 / animationSpeed}s`;
    const keyframeName = `gradientAnimation${Math.random().toString(36).substr(2, 9)}`;

    if (gradientType === "text") {
      return `
color: transparent;
background-image: ${gradientStyle};
background-size: 400% 400%;
-webkit-background-clip: text;
background-clip: text;
animation: ${keyframeName} ${animationDuration} ease infinite;

@keyframes ${keyframeName} {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}`;
    } else {
      return `
background: ${gradientStyle};
background-size: 400% 400%;
animation: ${keyframeName} ${animationDuration} ease infinite;

@keyframes ${keyframeName} {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}`;
    }
  },

  // Generate Tailwind CSS for animated gradient
  generateAnimatedTailwind: (options: AnimatedGradientOptions): string => {
    const { colors, angle, isAnimated, animationSpeed, gradientType = "background" } = options;

    // Determine gradient direction based on angle
    const getGradientDirection = (angle: number) => {
      const normalizedAngle = ((angle % 360) + 360) % 360;
      if (normalizedAngle >= 315 || normalizedAngle < 45) return "to-r";
      if (normalizedAngle >= 45 && normalizedAngle < 135) return "to-br";
      if (normalizedAngle >= 135 && normalizedAngle < 225) return "to-b";
      if (normalizedAngle >= 225 && normalizedAngle < 315) return "to-bl";
      return "to-r";
    };

    const direction = getGradientDirection(angle);
    const hasMiddleColor = colors.length > 2;

    if (!isAnimated) {
      if (gradientType === "text") {
        return hasMiddleColor
          ? `text-transparent bg-clip-text bg-gradient-${direction} from-[${colors[0]}] via-[${colors[1]}] to-[${colors[colors.length - 1]}]`
          : `text-transparent bg-clip-text bg-gradient-${direction} from-[${colors[0]}] to-[${colors[colors.length - 1]}]`;
      } else {
        return hasMiddleColor
          ? `bg-gradient-${direction} from-[${colors[0]}] via-[${colors[1]}] to-[${colors[colors.length - 1]}]`
          : `bg-gradient-${direction} from-[${colors[0]}] to-[${colors[colors.length - 1]}]`;
      }
    }

    // For animated gradients, use predefined animation classes
    const getAnimationClass = (speed: number) => {
      if (speed <= 0.5) return "animate-gradient-slow";
      if (speed <= 1) return "animate-gradient-normal";
      if (speed <= 2) return "animate-gradient-fast";
      return "animate-gradient-very-fast";
    };

    const animationClass = getAnimationClass(animationSpeed);
    const baseClasses = gradientType === "text"
      ? "text-transparent bg-clip-text"
      : "";

    return `${baseClasses} bg-gradient-${direction} from-[${colors[0]}] ${hasMiddleColor ? `via-[${colors[1]}] ` : ""}to-[${colors[colors.length - 1]}] bg-[length:400%_400%] ${animationClass}`;
  },

  // Generate SASS/SCSS for animated gradient
  generateAnimatedSass: (options: AnimatedGradientOptions): string => {
    const { colors, angle, isAnimated, animationSpeed, gradientType = "background" } = options;

    const gradientStyle = `linear-gradient(${angle}deg, ${colors.join(", ")})`;

    if (!isAnimated) {
      if (gradientType === "text") {
        return `// Text gradient using SASS/SCSS
$gradient-colors: (${colors.map(color => `"${color}"`).join(", ")});
$gradient-angle: ${angle}deg;

color: transparent;
background-image: ${gradientStyle};
-webkit-background-clip: text;
background-clip: text;`;
      } else {
        return `// Background gradient using SASS/SCSS
$gradient-colors: (${colors.map(color => `"${color}"`).join(", ")});
$gradient-angle: ${angle}deg;

background: ${gradientStyle};`;
      }
    }

    const animationDuration = `${4 / animationSpeed}s`;

    if (gradientType === "text") {
      return `// Animated text gradient using SASS/SCSS
$gradient-colors: (${colors.map(color => `"${color}"`).join(", ")});
$animation-duration: ${animationDuration};
$gradient-angle: ${angle}deg;

color: transparent;
background-image: ${gradientStyle};
background-size: 400% 400%;
-webkit-background-clip: text;
background-clip: text;
animation: gradientShift $animation-duration ease infinite;

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}`;
    } else {
      return `// Animated background gradient using SASS/SCSS
$gradient-colors: (${colors.map(color => `"${color}"`).join(", ")});
$animation-duration: ${animationDuration};
$gradient-angle: ${angle}deg;

background: ${gradientStyle};
background-size: 400% 400%;
animation: gradientShift $animation-duration ease infinite;

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}`;
    }
  },

  // Generate Bootstrap CSS for animated gradient
  generateAnimatedBootstrap: (options: AnimatedGradientOptions): string => {
    const { colors, angle, isAnimated, animationSpeed, gradientType = "background" } = options;

    const gradientStyle = `linear-gradient(${angle}deg, ${colors.join(", ")})`;

    if (!isAnimated) {
      if (gradientType === "text") {
        return `/* Bootstrap Text Gradient */
.text-gradient {
  color: transparent;
  background-image: ${gradientStyle};
  -webkit-background-clip: text;
  background-clip: text;
}`;
      } else {
        return `/* Bootstrap Background Gradient */
.bg-gradient {
  background: ${gradientStyle};
}`;
      }
    }

    const animationDuration = `${4 / animationSpeed}s`;

    if (gradientType === "text") {
      return `/* Bootstrap Animated Text Gradient */
.animated-text-gradient {
  color: transparent;
  background-image: ${gradientStyle};
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: gradient-animation ${animationDuration} ease infinite;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}`;
    } else {
      return `/* Bootstrap Animated Background Gradient */
.animated-bg-gradient {
  background: ${gradientStyle};
  background-size: 400% 400%;
  animation: gradient-animation ${animationDuration} ease infinite;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}`;
    }
  },

  // Generate SVG for animated gradient
  generateAnimatedSVG: (options: AnimatedGradientOptions): string => {
    const { colors, isAnimated, animationSpeed } = options;
    
    const gradientStops = colors.map((color, index) => 
      `<stop offset="${(index / (colors.length - 1)) * 100}%" stop-color="${color}"/>`
    ).join('\n    ');

    if (!isAnimated) {
      return `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${gradientStops}
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#gradient)"/>
</svg>
      `;
    }

    const animationDuration = `${4 / animationSpeed}s`;
    
    return `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${gradientStops}
      <animateTransform
        attributeName="gradientTransform"
        type="rotate"
        values="0 200 200;360 200 200"
        dur="${animationDuration}"
        repeatCount="indefinite"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#animatedGradient)"/>
</svg>
    `;
  },

  // Generate JSON for animated gradient
  generateAnimatedJSON: (options: AnimatedGradientOptions): string => {
    const { colors, angle, isAnimated, animationSpeed, gradientType = "background" } = options;

    return JSON.stringify({
      type: "linear-gradient",
      gradientType: gradientType,
      angle: angle,
      colors: colors,
      animated: isAnimated,
      animationSpeed: animationSpeed,
      animationDuration: isAnimated ? `${4 / animationSpeed}s` : null,
      css: animatedGradientUtils.generateAnimatedCSS(options),
      tailwind: animatedGradientUtils.generateAnimatedTailwind(options)
    }, null, 2);
  },

  // Generate Android XML for animated gradient
  generateAnimatedXML: (options: AnimatedGradientOptions): string => {
    const { colors, angle, isAnimated } = options;
    
    const androidAngle = ((angle + 90) % 360);
    
    if (!isAnimated) {
      return `
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient
        android:type="linear"
        android:angle="${androidAngle}"
        android:startColor="${colors[0]}"
        android:endColor="${colors[colors.length - 1]}" />
</shape>
      `;
    }

    return `
<!-- Animated gradient for Android (requires custom implementation) -->
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient
        android:type="linear"
        android:angle="${androidAngle}"
        android:startColor="${colors[0]}"
        android:centerColor="${colors[1] || colors[0]}"
        android:endColor="${colors[colors.length - 1]}" />
</shape>

<!-- Note: For animation, use ValueAnimator in your Java/Kotlin code -->
    `;
  }
};
