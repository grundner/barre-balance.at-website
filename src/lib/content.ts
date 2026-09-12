/** Zugriff auf die Content Collections für Seiten und Komponenten. */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { findPlaceholders } from './launch.ts';
import { sortSlots } from './schedule.ts';

async function required<C extends 'site' | 'ui' | 'pages'>(collection: C, id: string) {
  const entry = await getEntry(collection, id);
  if (!entry) {
    throw new Error(`Inhalt fehlt: content/${collection}/${id} (siehe docs/features/website.md)`);
  }
  return entry as CollectionEntry<C>;
}

export const getSite = async () => (await required('site', 'site')).data;
export const getUi = async () => (await required('ui', 'ui')).data;
export const getPage = (id: string) => required('pages', id);

export type Site = Awaited<ReturnType<typeof getSite>>;
export type Ui = Awaited<ReturnType<typeof getUi>>;

export async function getCourses() {
  const courses = await getCollection('courses');
  return courses.sort((a, b) => a.data.order - b.data.order);
}

export async function getLocations() {
  const locations = await getCollection('locations');
  return locations.sort((a, b) => a.data.order - b.data.order);
}

/** Stundenplan-Einträge mit aufgelöstem Kurs und Ort, sortiert nach Wochentag und Uhrzeit. */
export async function getSlots(filter?: { courseId?: string }) {
  const slots = await getCollection(
    'schedule',
    (slot) => !filter?.courseId || slot.data.course.id === filter.courseId,
  );
  const resolved = await Promise.all(
    slots.map(async (slot) => {
      const [course, location] = await Promise.all([
        getEntry(slot.data.course),
        getEntry(slot.data.location),
      ]);
      return {
        id: slot.id,
        day: slot.data.day,
        time: slot.data.time,
        duration: slot.data.duration ?? course.data.duration,
        note: slot.data.note,
        placeholder: slot.data.placeholder,
        course,
        location,
      };
    }),
  );
  return sortSlots(resolved);
}

export type Slot = Awaited<ReturnType<typeof getSlots>>[number];

export async function getNotices() {
  const notices = await getCollection('notices');
  return notices.sort((a, b) => a.data.from.getTime() - b.data.from.getTime());
}

export async function getFaq() {
  const faq = await getCollection('faq');
  return faq.sort((a, b) => a.data.order - b.data.order);
}

/** Nur Stimmen mit Einwilligung (WEB-R2). */
export async function getTestimonials() {
  const testimonials = await getCollection('testimonials', (t) => t.data.consent);
  return testimonials.sort((a, b) => a.data.order - b.data.order);
}

export async function getQualifications() {
  const qualifications = await getCollection('qualifications');
  return qualifications.sort((a, b) => a.data.order - b.data.order);
}

/** Veröffentlichte Beiträge, neueste zuerst. Entwürfe nur in der Entwicklung (WEB-R3). */
export async function getPosts() {
  const posts = await getCollection('blog', (post) => import.meta.env.DEV || !post.data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export type Post = CollectionEntry<'blog'>;

/** Alle Platzhalter-Inhalte, die im Produktions-Build erscheinen (WEB-R4). */
export async function getPlaceholders() {
  const [site, pages, courses, locations, schedule, notices, faq, qualifications, posts] =
    await Promise.all([
      getCollection('site'),
      getCollection('pages'),
      getCollection('courses'),
      getCollection('locations'),
      getCollection('schedule'),
      getCollection('notices'),
      getCollection('faq'),
      getCollection('qualifications'),
      getCollection('blog', (post) => !post.data.draft),
    ]);
  return findPlaceholders({
    site,
    pages,
    courses,
    locations,
    schedule,
    notices,
    faq,
    qualifications,
    blog: posts,
  });
}
