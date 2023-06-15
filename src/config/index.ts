export const DEVELOPMENT_ENVIRONMENT = Boolean(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_KEY_64 = btoa(API_KEY);
export const METER_MPAN = import.meta.env.VITE_METER_MPAN;
export const METER_SERIAL = import.meta.env.VITE_METER_SERIAL;
export const PRODUCT_CODE = import.meta.env.VITE_PRODUCT_CODE;
export const TARIFF = import.meta.env.VITE_TARIFF;
