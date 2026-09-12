/**
 * Content-Schemas der Website.
 *
 * Inhalte liegen ausschließlich in `content/` (ADR-0003). Jede Collection wird beim
 * Build gegen ihr Schema validiert; ungültige Inhalte brechen den Build.
 * Fachliche Beschreibung der Inhaltstypen: docs/features/website.md#inhaltstypen
 */
import { defineCollection, reference, type SchemaContext } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { WEEKDAYS } from './lib/schedule.ts';

const placeholder = z.boolean().default(false);

const link = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const section = z.object({
  overline: z.string().optional(),
  title: z.string().min(1),
  lead: z.string().optional(),
  cta: link.optional(),
});

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Uhrzeit im Format HH:MM');

/** Bild mit Pflicht-Alternativtext, oder ein beschrifteter Bildplatzhalter. */
const imageFields = (image: SchemaContext['image']) => ({
  image: image().optional(),
  imageAlt: z.string().min(1).optional(),
  /** Beschriftung des Bildplatzhalters, solange kein Foto vorliegt. */
  imageLabel: z.string().min(1).optional(),
});

const hasAltText = (data: { image?: unknown; imageAlt?: string }) =>
  !data.image || Boolean(data.imageAlt);
const altTextError = {
  message: 'imageAlt ist Pflicht, wenn image gesetzt ist',
  path: ['imageAlt'],
};

const site = defineCollection({
  loader: glob({ base: './content/settings', pattern: 'site.yaml' }),
  schema: z.object({
    brand: z.string().includes('&'),
    tagline: z.string().min(1),
    description: z.string().min(1),
    lang: z.string().default('de-AT'),
    indexing: z.boolean(),
    contact: z.object({
      email: z.email(),
      phone: z
        .string()
        .regex(/^\+[\d ]{8,20}$/, 'Telefon international, z. B. +43 664 1234567')
        .optional(),
      whatsapp: z
        .string()
        .regex(/^\d{8,15}$/, 'WhatsApp-Nummer nur Ziffern inkl. Ländervorwahl, z. B. 436641234567')
        .optional(),
      instagram: z.url().optional(),
    }),
    navigation: z.array(link).min(1),
    headerCta: link,
    footer: z.object({
      columns: z.array(z.object({ title: z.string().min(1), links: z.array(link).min(1) })),
    }),
    placeholder,
  }),
});

const weekdayLabels = z.object(
  Object.fromEntries(WEEKDAYS.map((day) => [day, z.string().min(1)])) as Record<
    (typeof WEEKDAYS)[number],
    z.ZodString
  >,
);

const ui = defineCollection({
  loader: glob({ base: './content/settings', pattern: 'ui.yaml' }),
  schema: z.object({
    skipLink: z.string(),
    menu: z.object({ label: z.string(), toggle: z.string(), home: z.string() }),
    footer: z.object({ label: z.string(), copyright: z.string() }),
    placeholder: z.object({ badge: z.string(), notice: z.string() }),
    inquiry: z.object({
      email: z.string(),
      phone: z.string(),
      whatsapp: z.string(),
      subjectGeneral: z.string(),
      subjectCourse: z.string(),
      bodyGeneral: z.string(),
      bodyCourse: z.string(),
      slot: z.string(),
    }),
    contact: z.object({
      email: z.string(),
      phone: z.string(),
      whatsapp: z.string(),
      instagram: z.string(),
      locations: z.string(),
    }),
    courses: z.object({
      more: z.string(),
      all: z.string(),
      minutes: z.string(),
      facts: z.object({
        duration: z.string(),
        intensity: z.string(),
        suitableFor: z.string(),
        bring: z.string(),
      }),
      scheduleTitle: z.string(),
      scheduleEmpty: z.string(),
      inquiryTitle: z.string(),
    }),
    schedule: z.object({
      inquire: z.string(),
      empty: z.string(),
      noticesTitle: z.string(),
      period: z.string(),
      weekdays: weekdayLabels,
      weekdaysShort: weekdayLabels,
    }),
    blog: z.object({
      readMore: z.string(),
      updated: z.string(),
      tags: z.string(),
      tagTitle: z.string(),
      tagDescription: z.string(),
      empty: z.string(),
      back: z.string(),
      rss: z.string(),
    }),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './content/pages', pattern: '*.md' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        /** Titel für <title>, falls die Überschrift dafür zu lang ist. */
        seoTitle: z.string().min(1).optional(),
        description: z.string().min(1),
        overline: z.string().optional(),
        lead: z.string().optional(),
        ctas: z.array(link).default([]),
        sections: z.record(z.string(), section).default({}),
        placeholder,
        ...imageFields(image),
      })
      .refine(hasAltText, altTextError),
});

const courses = defineCollection({
  loader: glob({ base: './content/courses', pattern: '*.md' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        summary: z.string().min(1),
        format: z.string().min(1),
        intensity: z.string().min(1),
        duration: z.number().int().positive(),
        suitableFor: z.string().min(1),
        bring: z.array(z.string().min(1)).default([]),
        order: z.number().int(),
        placeholder,
        ...imageFields(image),
      })
      .refine(hasAltText, altTextError),
});

const locations = defineCollection({
  loader: glob({ base: './content/locations', pattern: '*.yaml' }),
  schema: z.object({
    name: z.string().min(1),
    address: z.string().min(1).optional(),
    note: z.string().optional(),
    order: z.number().int(),
    placeholder,
  }),
});

const schedule = defineCollection({
  loader: file('./content/schedule/slots.yaml'),
  schema: z.object({
    day: z.enum(WEEKDAYS),
    time,
    course: reference('courses'),
    location: reference('locations'),
    duration: z.number().int().positive().optional(),
    note: z.string().optional(),
    placeholder,
  }),
});

const notices = defineCollection({
  loader: file('./content/schedule/notices.yaml'),
  schema: z
    .object({
      text: z.string().min(1),
      from: z.coerce.date(),
      to: z.coerce.date(),
      placeholder,
    })
    .refine((n) => n.from <= n.to, { message: '"from" muss vor "to" liegen', path: ['to'] }),
});

const faq = defineCollection({
  loader: glob({ base: './content/faq', pattern: '*.md' }),
  schema: z.object({
    question: z.string().min(1),
    order: z.number().int(),
    placeholder,
  }),
});

const testimonials = defineCollection({
  loader: file('./content/testimonials.yaml'),
  schema: z.object({
    quote: z.string().min(1),
    attribution: z.string().min(1),
    consent: z.boolean(),
    order: z.number().int(),
  }),
});

const qualifications = defineCollection({
  loader: file('./content/about/qualifications.yaml'),
  schema: z.object({
    year: z.string().min(1),
    title: z.string().min(1),
    meta: z.string().optional(),
    state: z.enum(['done', 'ongoing']),
    order: z.number().int(),
    placeholder,
  }),
});

const blog = defineCollection({
  loader: glob({ base: './content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        description: z.string().min(1),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string().min(1)).default([]),
        draft: z.boolean().default(false),
        placeholder,
        ...imageFields(image),
      })
      .refine(hasAltText, altTextError),
});

export const collections = {
  site,
  ui,
  pages,
  courses,
  locations,
  schedule,
  notices,
  faq,
  testimonials,
  qualifications,
  blog,
};
