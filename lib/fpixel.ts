export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
export const FB_DESINFLAMA_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_DESINFLAMA_ID || "1812713553212107";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Dispara visualização de página no Meta Pixel
 */
export const pageview = () => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
};

/**
 * Dispara eventos personalizados ou padrões no Meta Pixel
 */
export const trackEvent = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, options);
  }
};

/**
 * Dispara evento de conversão 'Lead'
 */
export const trackLead = (options: Record<string, any> = {}) => {
  trackEvent("Lead", options);
};

/**
 * Dispara evento de conversão 'InitiateCheckout'
 */
export const trackInitiateCheckout = (options: Record<string, any> = {}) => {
  trackEvent("InitiateCheckout", options);
};
