import path from "path"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-primevue",
    "@nuxtjs/supabase",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
    "@unlok-co/nuxt-stripe",
    "@vue-email/nuxt"
  ],
  css: ["primeicons/primeicons.css"],
  googleFonts: {
    base64: true,
    fontsDir: "assets/fonts",
    overwriting: true,
    families: {
      Inter: [300, 500, 800]
    }
  },
  primevue: {
    options: { unstyled: true },
    importPT: {
      as: "lara",
      from: path.resolve(__dirname, "./assets/presets/lara")
    }
  },
  imports: {
    dirs: [
      "./composables/useMarkdown", 
      "./composables/useServices",
      "./composables/useLogger"
    ]
  },
  runtimeConfig: {
    stripeProductId5BRL: process.env.STRIPE_PRODUCT_ID_5BRL,
    stripeProductId10BRL: process.env.STRIPE_PRODUCT_ID_10BRL,
    stripeProductId25BRL: process.env.STRIPE_PRODUCT_ID_25BRL,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    resendKey: process.env.RESEND_KEY,

    public: {
      siteUrl: process.env.SITE_URL,
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
  supabase: {
    redirect: false
  },
  ogImage: {
    fonts: [
      'Inter:400',
      'Inter:700'
    ]
  },
  site: {
    url: process.env.SITE_URL,
  },
  stripe: {
    client: {
      key: process.env.STRIPE_CLIENT_KEY,
    },
    server: {
      key: process.env.STRIPE_SERVER_KEY
    }
  }
})