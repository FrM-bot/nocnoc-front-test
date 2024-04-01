import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (
  date: number | Date | undefined,
  {
    locales = 'es-ES',
    option = { dateStyle: 'long' }
  }: {
    locales?: string | string[] | undefined
    option?: Intl.DateTimeFormatOptions | undefined
  } = {}
) => {
  try {
    return new Intl.DateTimeFormat(locales, option).format(date)
  } catch (error) {
    console.error(error)
  }
}

export const formatNumber = (
  value: number | bigint,
  {
    locales = 'de-DE',
    option = { currency: 'USD', style: 'currency' }
  }: { locales?: string | string[] | undefined; option?: Intl.NumberFormatOptions | undefined } = {}
) => {
  try {
    return new Intl.NumberFormat(locales, option).format(value)
  } catch (error) {
    console.error(error)
  }
}

const getCookieValue = ({ key, cookie }: { key: string, cookie: string | undefined }) => {
  if (!cookie) return null
  
  const decodedCookie = decodeURIComponent(cookie)
  const listOfCookies = decodedCookie.split(';')
  const cookieKeyValue = listOfCookies.find(cookie => cookie.startsWith(key))
  return cookieKeyValue?.split('=')[1]
}
export const getCookie = (name: string) => {
  return getCookieValue({ key: name, cookie: globalThis.document.cookie })
}

// In days
const DEFAULT_MAX_AGE = 400

export const setCookie = ({ name, value, maxAge = DEFAULT_MAX_AGE, expires, path }: { name: string, value?: string | null, expires?: string | Date, maxAge?: number, path?: string, secure?: boolean, httpOnly?: boolean, }) => {
  const day = 60 * 60 * 24
  const baseCookie = {
    value: `${name}=${value};SameSite=strict;Secure;path=${path}`
  }
  if (maxAge >= 0) {
    baseCookie.value += `;max-age=${day * maxAge}`  
  }
  if (expires) {
    baseCookie.value += `;expires=${expires}`
  }

  if (path) {
    baseCookie.value += `;path=${path}`
  }
  document.cookie = baseCookie.value
}