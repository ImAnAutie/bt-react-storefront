import { GetStaticPropsContext } from "next";

import { LanguageCodeEnum } from "../saleor/api";

export const LOCALES = [
  {
    slug: "en-GB",
    code: "EN_GB" as LanguageCodeEnum,
    name: "British English",
  },
];
export const DEFAULT_LOCALE = "en-GB";

export const CHANNEL_SLUG_KEY = "web";

export interface Channel {
  slug: string;
  name: string;
  currencyCode: string;
}

export const DEFAULT_CHANNEL: Channel = {
  slug: "web",
  name: "BadgeTracker web",
  currencyCode: "GBP",
};

export const CHANNELS: Channel[] = [
  DEFAULT_CHANNEL,
];

export interface RegionCombination {
  channelSlug: string;
  localeSlug: string;
}

export const regionCombinations = () => {
  const combinations: RegionCombination[] = [];
  CHANNELS.forEach((channel) => {
    LOCALES.forEach((locale) => {
      combinations.push({ channelSlug: channel.slug, localeSlug: locale.slug });
    });
  });
  return combinations;
};

export interface Path<T> {
  params: T;
}

export const localeToEnum = (localeSlug: string): LanguageCodeEnum => {
  const chosenLocale = LOCALES.find(({ slug }) => slug === localeSlug)?.code;
  if (chosenLocale) {
    return chosenLocale;
  }
  return LOCALES.find(({ slug }) => slug === DEFAULT_LOCALE)?.code || "EN_US";
};

export const contextToRegionQuery = (context: GetStaticPropsContext) => ({
  channel: context.params?.channel?.toString() || DEFAULT_CHANNEL.slug,
  locale: localeToEnum(context.params?.locale?.toString() || DEFAULT_LOCALE),
});

export const languageCodeToLocale = (locale: string) => {
  // Converts locale from EN_US to en-US
  const splitted = locale.split("_");
  splitted[0] = splitted[0].toLowerCase();
  return splitted.join("-");
};
