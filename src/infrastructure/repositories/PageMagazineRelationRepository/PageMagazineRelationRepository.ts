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
import { PaginationResult } from '~/domain/shared';
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

  private convertFromDB(data: PageMagazineRelationForDB): PageMagazineRelation {
    return new PageMagazineRelation({
      ...data,
      id: data._id.toString(),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }

  async create(
    pageMagazineRelation: PageMagazineRelation,
  ): Promise<PageMagazineRelation> {
    return this.convertFromDB(
      await this.PageMagazineRelationModel.create(
        this.convertToDB(pageMagazineRelation),
      ),
    );
  }
}
