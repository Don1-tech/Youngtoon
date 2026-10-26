export const languages = ["en", "ko", "ja", "zh"] as const;
export type Language = (typeof languages)[number];
