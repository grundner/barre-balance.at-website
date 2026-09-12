import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPage, getPosts, getSite } from '../lib/content.ts';

export async function GET(context: APIContext) {
  const [site, page, posts] = await Promise.all([getSite(), getPage('blog'), getPosts()]);
  return rss({
    title: `${page.data.title} · ${site.brand}`,
    description: page.data.description,
    site: context.site ?? 'https://barre-balance.at',
    customData: `<language>${site.lang}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
