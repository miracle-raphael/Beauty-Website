tailwind.config = {
  theme: {
    extend: {
      /* =========================
         COLORS
      ========================= */

      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: "#2563EB",
          light: "#60A5FA",
          dark: "#1D4ED8",
          soft: "#DBEAFE",
          subtle: "#EFF6FF",
        },

        // Secondary colors
        secondary: {
          DEFAULT: "#7C3AED",
          light: "#C084FC",
          dark: "#5B21B6",
          soft: "#EDE9FE",
          subtle: "#F5F3FF",
        },

        // Accent colors
        accent: {
          DEFAULT: "#06B6D4",
          light: "#67E8F9",
          dark: "#0E7490",
          soft: "#CFFAFE",
        },

        // Dark colors
        dark: {
          DEFAULT: "#0F172A",
          background: "#020617",
          surface: "#0F172A",
          elevated: "#1E293B",
          muted: "#334155",
        },

        // General backgrounds
        background: "#F8FAFC",
        soft: "#F1F5F9",
        surface: "#FFFFFF",
        canvas: "#F8FAFC",
        subtle: "#F9FAFB",
        paper: "#FFFFFF",

        // Text colors
        heading: "#0F172A",
        body: "#334155",
        muted: "#64748B",
        subtleText: "#94A3B8",
        disabled: "#CBD5E1",
        inverse: "#FFFFFF",

        // Borders
        border: "#E2E8F0",
        "border-light": "#F1F5F9",
        "border-dark": "#CBD5E1",

        // Gray palette
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },

        // Slate palette
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },

        // Blue palette
        blue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },

        // Violet palette
        violet: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          950: "#2E1065",
        },

        // Purple palette
        purple: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A855F7",
          600: "#9333EA",
          700: "#7E22CE",
          800: "#6B21A8",
          900: "#581C87",
          950: "#3B0764",
        },

        // Green palette
        green: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052E16",
        },

        // Red palette
        red: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A",
        },

        // Yellow palette
        yellow: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
          950: "#422006",
        },

        // Amber palette
        amber: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451A03",
        },

        // Orange palette
        orange: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          950: "#431407",
        },

        // Pink palette
        pink: {
          50: "#FDF2F8",
          100: "#FCE7F3",
          200: "#FBCFE8",
          300: "#F9A8D4",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777",
          700: "#BE185D",
          800: "#9D174D",
          900: "#831843",
          950: "#500724",
        },

        // Cyan palette
        cyan: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
          950: "#083344",
        },

        // Indigo palette
        indigo: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          950: "#1E1B4B",
        },

        // Status colors
        success: {
          DEFAULT: "#16A34A",
          light: "#4ADE80",
          soft: "#DCFCE7",
          dark: "#166534",
        },

        warning: {
          DEFAULT: "#D97706",
          light: "#FBBF24",
          soft: "#FEF3C7",
          dark: "#92400E",
        },

        danger: {
          DEFAULT: "#DC2626",
          light: "#F87171",
          soft: "#FEE2E2",
          dark: "#991B1B",
        },

        info: {
          DEFAULT: "#2563EB",
          light: "#60A5FA",
          soft: "#DBEAFE",
          dark: "#1E40AF",
        },

        pending: {
          DEFAULT: "#9333EA",
          light: "#C084FC",
          soft: "#F3E8FF",
          dark: "#6B21A8",
        },

        // Glassmorphism colors
        glass: {
          white: "rgba(255, 255, 255, 0.15)",
          soft: "rgba(255, 255, 255, 0.25)",
          medium: "rgba(255, 255, 255, 0.45)",
          strong: "rgba(255, 255, 255, 0.70)",
          blue: "rgba(37, 99, 235, 0.10)",
          purple: "rgba(124, 58, 237, 0.12)",
          cyan: "rgba(6, 182, 212, 0.12)",
          dark: "rgba(15, 23, 42, 0.65)",
          black: "rgba(0, 0, 0, 0.25)",
          border: "rgba(255, 255, 255, 0.25)",
        },
      },

      /* =========================
         FONTS
      ========================= */

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
        marker: ['"Permanent Marker"', 'cursive'],
        body: ['Poppins', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        signature: ['"Great Vibes"', 'cursive'],
        script: ['"Allura"', 'cursive'],

         // elegant script (Forever, Divine, Loyal, Infinity)
  signature: ['"Great Vibes"', 'cursive'],
  allura: ['"Allura"', 'cursive'],
  pinyon: ['"Pinyon Script"', 'cursive'],
  sacramento: ['"Sacramento"', 'cursive'],

  // bold script (Luxury, Mystic, Vintage, Phantom, Defiant, Premium)
  pacifico: ['"Pacifico"', 'cursive'],
  lobster: ['"Lobster"', 'cursive'],
  yellowtail: ['"Yellowtail"', 'cursive'],
  kaushan: ['"Kaushan Script"', 'cursive'],
  oleo: ['"Oleo Script"', 'cursive'],
  damion: ['"Damion"', 'cursive'],

  // bold display (Chiller, Rebel, Unique, Classic, Majesty)
  anton: ['"Anton"', 'sans-serif'],
  alfa: ['"Alfa Slab One"', 'serif'],
  bungee: ['"Bungee"', 'sans-serif'],
   bebas: ['"Bebas Neue"', 'sans-serif'],

  // blackletter (Classic, Sapphire)
  fraktur: ['"UnifrakturCook"', 'cursive'],
  pirata: ['"Pirata One"', 'cursive'],

  // art deco, neon, glitch (Deco, Neon Color, Glitch)
  deco: ['"Poiret One"', 'sans-serif'],
  neon: ['"Tilt Neon"', 'sans-serif'],
  glitch: ['"Rubik Glitch"', 'sans-serif'],
      },

      /* =========================
         FONT SIZES
      ========================= */

      fontSize: {
        tiny: ["0.625rem", { lineHeight: "1rem" }],
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        "display-sm": ["3rem", { lineHeight: "1.1" }],
        "display-lg": ["4.5rem", { lineHeight: "1.05" }],
      },

      /* =========================
         SPACING
      ========================= */

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },

      /* =========================
         BORDER RADIUS
      ========================= */

      borderRadius: {
        card: "1rem",
        button: "0.625rem",
        glass: "1.25rem",
      },

      /* =========================
         BOX SHADOWS
      ========================= */

      boxShadow: {
        soft: "0 2px 8px rgba(15, 23, 42, 0.05)",
        card: "0 4px 20px rgba(15, 23, 42, 0.06)",
        elevated: "0 10px 30px rgba(15, 23, 42, 0.10)",
        floating: "0 20px 50px rgba(15, 23, 42, 0.15)",
        glass: "0 8px 32px rgba(31, 38, 135, 0.12)",
        "blue-glow": "0 0 30px rgba(37, 99, 235, 0.25)",
        "purple-glow": "0 0 30px rgba(124, 58, 237, 0.25)",
      },

      /* =========================
         BACKGROUND GRADIENTS
      ========================= */

      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #2563EB, #7C3AED)",

        "gradient-ocean":
          "linear-gradient(135deg, #0F172A, #1D4ED8)",

        "gradient-space":
          "linear-gradient(135deg, #020617, #172554)",

        "gradient-soft":
          "linear-gradient(135deg, #EFF6FF, #F5F3FF)",

        "gradient-sunset":
          "linear-gradient(135deg, #F97316, #EC4899)",

        "gradient-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
      },

      /* =========================
         KEYFRAMES
      ========================= */

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        slideLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },

        slideRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },

        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },

        glow: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(37,99,235,0.15)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(37,99,235,0.4)",
          },
        },

        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },

        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },

        zoomIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },

        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },

        pulseSoft: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.75",
            transform: "scale(1.03)",
          },
        },

        reveal: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
            filter: "blur(5px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
      },

      /* =========================
         ANIMATIONS
      ========================= */

      animation: {
        "fade-in": "fadeIn 0.5s ease-out both",
        "slide-up": "slideUp 0.6s ease-out both",
        "slide-down": "slideDown 0.6s ease-out both",
        "slide-left": "slideLeft 0.5s ease-out both",
        "slide-right": "slideRight 0.5s ease-out both",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        marquee: "marquee 25s linear infinite",
        "zoom-in": "zoomIn 0.4s ease-out both",
        "rotate-slow": "rotateSlow 12s linear infinite",
        wiggle: "wiggle 0.5s ease-in-out",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        reveal: "reveal 0.8s ease-out both",
      },

      /* =========================
         TRANSITIONS
      ========================= */

      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      /* =========================
         RESPONSIVE WIDTHS
      ========================= */

      maxWidth: {
        container: "1200px",
        content: "720px",
      },

      /* =========================
         BACKDROP BLUR
      ========================= */

      backdropBlur: {
        glass: "20px",
      },
    },
  },

  plugins: [],
};

