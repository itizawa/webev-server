import request from 'superagent';
import cheerio from 'cheerio';
import { IOgpAdapter } from 'src/application/adapters/IOgpAdapter';
import { extract } from 'article-parser';

export class OgpAdapter implements IOgpAdapter {
  async fetch(url: string): Promise<{
    url?: string;
    favicon?: string;
    title?: string;
    image?: string;
    description?: string;
    siteName?: string;
    body?: string;
  }> {
    const [result, data] = await Promise.all([request(url), extract(url)]);
    const $ = cheerio.load(result.text);

    return {
      url,
      favicon:
        $("link[rel='icon']").attr('href') ||
        $("link[rel='shortcut icon']").attr('href'),
      image: $("meta[property='og:image']").attr('content'),
      description: $("meta[property='og:description']").attr('content'),
      title: $("meta[property='og:title']").attr('content'),
      siteName: $("meta[property='og:site_name']").attr('content'),
      body: data?.content,
    };
  }
}
