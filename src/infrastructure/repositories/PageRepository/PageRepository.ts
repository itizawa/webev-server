import { model, models, Model, Schema, Types, Document } from 'mongoose';
import { Page } from '~/domain/Page';
import { IPageRepository } from './IPageRepository';

const PageSchema: Schema = new Schema(
  {
    url: String,
    image: String,
    favicon: String,
    description: { type: String, index: true },
    title: { type: String, index: true },
    customizedTitle: String,
    body: { type: String },
    siteName: { type: String, index: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdUser: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    archivedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

type PageForDB = Omit<Page, 'id'> & {
  _id: string;
};

export class PageRepository implements IPageRepository {
  PageModel: Model<Page & Document>;

  constructor() {
    this.PageModel = models.Page || model<Page & Document>('Page', PageSchema);
  }

  private convert(page: PageForDB): Page {
    return new Page({
      id: page._id.toString(),
      url: page.url,
      image: page.image,
      favicon: page.favicon,
      description: page.description,
      title: page.title,
      body: page.body,
      siteName: page.siteName,
      isDeleted: page.isDeleted,
      createdUser: page.createdUser.toString(),
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      archivedAt: page.archivedAt,
    });
  }

  async create(pages: Partial<Page>): Promise<Page> {
    const result = await this.PageModel.create(pages);

    return this.convert(result);
  }

  async count(): Promise<number> {
    return this.PageModel.estimatedDocumentCount();
  }

  //   async find(
  //     query: FilterQuery<Page>,
  //     options: PaginationOptions,
  //   ): Promise<PaginationResult<Page>> {
  //     const result: PaginationResult<Page> = await this.PageModel.paginate(
  //       query,
  //       options,
  //     );
  //     return {
  //       ...result,
  //       docs: result.docs.map((doc) => {
  //         return this.convert(doc);
  //       }),
  //     };
  //   }

  async findById(id: string): Promise<Page | null> {
    const page = await this.PageModel.findById(id);

    if (!page) {
      return null;
    }

    return this.convert(page);
  }

  async update(id: string, newObject: Partial<Page>): Promise<Page | null> {
    const page = await this.PageModel.findByIdAndUpdate(id, newObject, {
      new: true,
    });

    if (!page) {
      return null;
    }

    return this.convert(page);
  }
}
