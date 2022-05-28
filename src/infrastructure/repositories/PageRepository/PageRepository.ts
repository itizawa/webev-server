import {
  FilterQuery,
  model,
  models,
  Model,
  Schema,
  Types,
  Document,
  PaginateOptions,
} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { Page } from '~/domain/Page';
import { PaginationResult } from '~/domain/shared';
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
  PageModel: Model<Page & Document> & {
    paginate: (
      query: FilterQuery<Page>,
      options: PaginateOptions,
    ) => Promise<PaginationResult<PageForDB>>;
  };

  constructor() {
    PageSchema.plugin(paginate);
    this.PageModel =
      (models.Page as PageRepository['PageModel']) ||
      (model<Page & Document>(
        'Page',
        PageSchema,
      ) as PageRepository['PageModel']);
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

  private convertToDB(data: Page): PageForDB {
    return {
      ...data,
      _id: data.id,
    };
  }

  private convertFromDB(data: PageForDB): Page {
    return new Page({
      ...data,
      id: data._id.toString(),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }

  async create(page: Page): Promise<Page> {
    return this.convertFromDB(
      await this.PageModel.create(this.convertToDB(page)),
    );
  }

  async count(): Promise<number> {
    return this.PageModel.estimatedDocumentCount();
  }

  async findPagesByUserId(userId: string): Promise<PaginationResult<Page>> {
    const result = await this.PageModel.paginate({ userId }, {});
    return {
      ...result,
      docs: result.docs.map((doc: PageForDB) => {
        return this.convert(doc);
      }),
    };
  }

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
