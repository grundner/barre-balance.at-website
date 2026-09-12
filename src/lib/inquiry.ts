/**
 * Anfrage über Kontakt-Links statt Buchung (docs/features/website.md, WEB-R1).
 * Reine Funktionen ohne Astro-Abhängigkeit, damit sie direkt getestet werden können.
 */
import { format } from './text.ts';

export interface ContactChannels {
  email: string;
  phone?: string;
  whatsapp?: string;
}

export interface InquiryTexts {
  email: string;
  phone: string;
  whatsapp: string;
  subjectGeneral: string;
  subjectCourse: string;
  bodyGeneral: string;
  bodyCourse: string;
  slot: string;
}

export interface InquiryContext {
  course?: string;
  weekday?: string;
  time?: string;
}

export type InquiryKind = 'email' | 'phone' | 'whatsapp';

export interface InquiryLink {
  kind: InquiryKind;
  label: string;
  href: string;
}

export function mailtoHref(email: string, subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams kodiert Leerzeichen als "+", Mail-Programme erwarten "%20".
  return `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function whatsappHref(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Baut den Anfragetext; mit Kurs und optional Wochentag und Uhrzeit. */
export function inquiryMessage(
  texts: InquiryTexts,
  context: InquiryContext = {},
): { subject: string; body: string } {
  if (!context.course) {
    return { subject: texts.subjectGeneral, body: texts.bodyGeneral };
  }
  const slot =
    context.weekday && context.time
      ? format(texts.slot, { weekday: context.weekday, time: context.time })
      : '';
  return {
    subject: format(texts.subjectCourse, { course: context.course }),
    body: format(texts.bodyCourse, { course: context.course, slot }),
  };
}

/** Alle konfigurierten Anfrage-Kanäle in fester Reihenfolge: E-Mail, Telefon, WhatsApp. */
export function inquiryLinks(
  channels: ContactChannels,
  texts: InquiryTexts,
  context: InquiryContext = {},
): InquiryLink[] {
  const { subject, body } = inquiryMessage(texts, context);
  const links: InquiryLink[] = [
    { kind: 'email', label: texts.email, href: mailtoHref(channels.email, subject, body) },
  ];
  if (channels.phone) {
    links.push({ kind: 'phone', label: texts.phone, href: telHref(channels.phone) });
  }
  if (channels.whatsapp) {
    links.push({
      kind: 'whatsapp',
      label: texts.whatsapp,
      href: whatsappHref(channels.whatsapp, body),
    });
  }
  return links;
}
