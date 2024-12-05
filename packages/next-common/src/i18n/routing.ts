import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

// Can be imported from a shared config
export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: locales[0],
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
