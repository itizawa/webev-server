import { IOgpAdapter } from '~/application/adapters/IOgpAdapter';

export class FetchOgpUseCase {
  constructor(private readonly ogpAdapter: IOgpAdapter) {}
  /**
   * Ogp を取得する
   * @param url {string} 対象のurl
   */
  async execute(url: string): Promise<{ [key: string]: string }> {
    return await this.ogpAdapter.fetch(url);
  }
}
