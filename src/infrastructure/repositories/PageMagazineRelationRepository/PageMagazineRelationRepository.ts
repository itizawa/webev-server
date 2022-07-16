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

import { PageMagazineRelation } from '~/domain/PageMagazineRelation';
import { PaginationOptions, PaginationResult } from '~/domain/shared';
import { IPageMagazineRelationRepository } from './IPageMagazineRelationRepository';

const PageMagazineRelationRepositorySchema: Schema = new Schema(
  {
    pageId: {
      type: Types.ObjectId,
      ref: 'Page',
      required: true,
    },
    magazineId: {
      type: Types.ObjectId,
      ref: 'Magazine',
      required: true,
    },
    createdUserId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

type PageMagazineRelationForDB = Omit<PageMagazineRelation, 'id'> & {
  _id: string;
};

export class PageMagazineRelationRepository
  implements IPageMagazineRelationRepository
{
  PageMagazineRelationModel: Model<PageMagazineRelation & Document> & {
    paginate: (
      query: FilterQuery<PageMagazineRelation>,
      options: PaginateOptions,
    ) => Promise<PaginationResult<PageMagazineRelationForDB>>;
  };

  constructor() {
    PageMagazineRelationRepositorySchema.plugin(paginate);
    this.PageMagazineRelationModel =
      (models.PageMagazineRelationRepository as PageMagazineRelationRepository['PageMagazineRelationModel']) ||
      (model<PageMagazineRelation & Document>(
        'PageMagazineRelationRepository',
        PageMagazineRelationRepositorySchema,
      ) as PageMagazineRelationRepository['PageMagazineRelationModel']);
  }

  private convertToDB(data: PageMagazineRelation): PageMagazineRelationForDB {
    return {
      ...data,
      _id: data.id,
    };
  }

  async create(data: PageMagazineRelation): Promise<PageMagazineRelation> {
    return this.convertFromDB(
      await this.PageMagazineRelationModel.create(this.convertToDB(data)),
    );
  }

  private convertFromDB(data: PageMagazineRelationForDB): PageMagazineRelation {
    return new PageMagazineRelation({
      id: data._id.toString(),
      pageId: data.pageId.toString(),
      magazineId: data.magazineId.toString(),
      createdUserId: data.createdUserId.toString(),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }

  async deleteMany(query: FilterQuery<PageMagazineRelation>): Promise<void> {
    await this.PageMagazineRelationModel.deleteMany(query);
  }

  async find(
    query: FilterQuery<PageMagazineRelation>,
    option: PaginationOptions,
  ): Promise<PaginationResult<PageMagazineRelation>> {
    const result = await this.PageMagazineRelationModel.paginate(query, option);
    return {
      ...result,
      docs: result.docs.map((doc: PageMagazineRelationForDB) => {
        return this.convertFromDB(doc);
      }),
    };
  }
}
