export abstract class IOgpAdapter {
  abstract fetch(url: string): Promise<{
    url?: string;
    favicon?: string;
    title?: string;
    image?: string;
    description?: string;
    siteName?: string;
  }>;
}
