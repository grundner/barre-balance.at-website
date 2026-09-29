/**
 * Unit-Tests der reinen Funktionen in src/lib (ohne Astro-Laufzeit).
 * Ausführen: npm run test:unit
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  inquiryLinks,
  inquiryMessage,
  mailtoHref,
  telHref,
  whatsappHref,
} from '../../src/lib/inquiry.ts';
import { assertLaunchReady, findPlaceholders } from '../../src/lib/launch.ts';
import { groupByWeekday, sortSlots } from '../../src/lib/schedule.ts';
import { format, slugify } from '../../src/lib/text.ts';
import { isPast, upcoming, zonedDateTime } from '../../src/lib/timing.ts';

const texts = {
  email: 'Per E-Mail anfragen',
  phone: 'Anrufen',
  whatsapp: 'Per WhatsApp anfragen',
  subjectGeneral: 'Anfrage',
  subjectCourse: 'Anfrage: {course}',
  bodyGeneral: 'Hallo Isabell,\n\n',
  bodyCourse: 'Hallo Isabell,\n\nich interessiere mich für {course}{slot}.\n',
  slot: ' am {weekday} um {time}',
  session: ' am {date} um {time} Uhr',
};

describe('text', () => {
  it('ersetzt bekannte Platzhalter und lässt unbekannte stehen', () => {
    assert.equal(format('{a} und {b}', { a: 1 }), '1 und {b}');
  });

  it('erzeugt URL-taugliche Bezeichner inkl. Umlaute', () => {
    assert.equal(slugify('Übungen für Zuhause'), 'uebungen-fuer-zuhause');
    assert.equal(slugify('  Barre & Balance '), 'barre-balance');
  });
});

describe('inquiry (WEB-R1)', () => {
  it('kodiert mailto-Links mit %20 statt +', () => {
    assert.equal(
      mailtoHref('a@b.at', 'Anfrage: Barre', 'Hallo Isabell'),
      'mailto:a@b.at?subject=Anfrage%3A%20Barre&body=Hallo%20Isabell',
    );
  });

  it('normalisiert Telefonnummern und baut WhatsApp-Links', () => {
    assert.equal(telHref('+43 664 123 45 67'), 'tel:+436641234567');
    assert.equal(
      whatsappHref('436641234567', 'Hallo du'),
      'https://wa.me/436641234567?text=Hallo%20du',
    );
  });

  it('baut Kurs- und Terminbezug in den Text ein', () => {
    assert.deepEqual(
      inquiryMessage(texts, { course: 'Barre', weekday: 'Mittwoch', time: '18:30' }),
      {
        subject: 'Anfrage: Barre',
        body: 'Hallo Isabell,\n\nich interessiere mich für Barre am Mittwoch um 18:30.\n',
      },
    );
    assert.equal(
      inquiryMessage(texts, { course: 'Barre' }).body,
      'Hallo Isabell,\n\nich interessiere mich für Barre.\n',
    );
    assert.equal(inquiryMessage(texts).subject, 'Anfrage');
  });

  it('nennt bei einem konkreten Termin das Datum statt des Wochentags', () => {
    assert.equal(
      inquiryMessage(texts, {
        course: 'Barre',
        date: 'Mittwoch, 7. Oktober',
        weekday: 'Mittwoch',
        time: '18:30',
      }).body,
      'Hallo Isabell,\n\nich interessiere mich für Barre am Mittwoch, 7. Oktober um 18:30 Uhr.\n',
    );
  });

  it('bietet nur konfigurierte Kanäle an', () => {
    assert.deepEqual(
      inquiryLinks({ email: 'a@b.at' }, texts).map((l) => l.kind),
      ['email'],
    );
    assert.deepEqual(
      inquiryLinks({ email: 'a@b.at', phone: '+43 1', whatsapp: '431' }, texts).map((l) => l.kind),
      ['email', 'phone', 'whatsapp'],
    );
  });
});

describe('schedule', () => {
  const slots = [
    { day: 'fr', time: '19:30' },
    { day: 'mi', time: '18:30' },
    { day: 'mi', time: '09:00' },
  ] as const;

  it('sortiert nach Wochentag und Uhrzeit', () => {
    assert.deepEqual(
      sortSlots(slots).map((s) => `${s.day} ${s.time}`),
      ['mi 09:00', 'mi 18:30', 'fr 19:30'],
    );
  });

  it('gruppiert nur Tage mit Terminen', () => {
    assert.deepEqual(
      groupByWeekday(slots).map((g) => [g.day, g.slots.length]),
      [
        ['mi', 2],
        ['fr', 1],
      ],
    );
  });
});

describe('launch (WEB-R4)', () => {
  const collections = {
    pages: [
      { id: 'home', data: { placeholder: true } },
      { id: 'kontakt', data: { placeholder: false } },
    ],
    faq: [{ id: 'eins', data: {} }],
  };

  it('findet Platzhalter über alle Collections', () => {
    assert.deepEqual(findPlaceholders(collections), ['pages/home']);
  });

  it('bricht bei indexing: true mit Platzhaltern ab', () => {
    assert.throws(() => assertLaunchReady(true, ['pages/home']), /Platzhalter/);
    assert.doesNotThrow(() => assertLaunchReady(false, ['pages/home']));
    assert.doesNotThrow(() => assertLaunchReady(true, []));
  });
});

describe('timing (WEB-R7)', () => {
  it('rechnet Tiroler Ortszeit in Sommer- und Winterzeit korrekt um', () => {
    assert.equal(zonedDateTime('2026-07-01', '18:30').toISOString(), '2026-07-01T16:30:00.000Z');
    assert.equal(zonedDateTime('2026-12-01', '18:30').toISOString(), '2026-12-01T17:30:00.000Z');
    // Tag der Umstellung auf Winterzeit (25.10.2026, 03:00 → 02:00)
    assert.equal(zonedDateTime('2026-10-25', '18:00').toISOString(), '2026-10-25T17:00:00.000Z');
  });

  it('gilt ab Beginn als vergangen', () => {
    const start = zonedDateTime('2026-10-07', '18:30');
    assert.equal(isPast(start, new Date('2026-10-07T16:29:59Z')), false);
    assert.equal(isPast(start, new Date('2026-10-07T16:30:00Z')), false);
    assert.equal(isPast(start, new Date('2026-10-07T16:30:01Z')), true);
  });

  it('liefert nur Kommendes, aufsteigend sortiert', () => {
    const items = [
      { id: 'c', start: zonedDateTime('2026-10-12', '18:00') },
      { id: 'a', start: zonedDateTime('2026-09-01', '18:00') },
      { id: 'b', start: zonedDateTime('2026-10-08', '19:00') },
    ];
    const now = new Date('2026-09-29T12:00:00Z');
    assert.deepEqual(
      upcoming(items, (item) => item.start, now).map((item) => item.id),
      ['b', 'c'],
    );
  });
});
