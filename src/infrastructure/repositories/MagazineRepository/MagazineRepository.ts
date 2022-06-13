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
import { Magazine } from '~/domain/Magazine';

import { PaginationResult } from '~/domain/shared';
import { IMagazineRepository } from './IMagazineRepository';

const MagazineSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    createdUserId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

type MagazineForDB = Omit<Magazine, 'id'> & {
  _id: string;
};

export class MagazineRepository implements IMagazineRepository {
  MagazineModel: Model<Magazine & Document> & {
    paginate: (
      query: FilterQuery<Magazine>,
      options: PaginateOptions,
    ) => Promise<PaginationResult<MagazineForDB>>;
  };

  constructor() {
    MagazineSchema.plugin(paginate);
    this.MagazineModel =
      (models.Magazine as MagazineRepository['MagazineModel']) ||
      (model<Magazine & Document>(
        'Magazine',
        MagazineSchema,
      ) as MagazineRepository['MagazineModel']);
  }

  // private convert(magazine: MagazineForDB): Magazine {
  //   return new Magazine({
  //     id: magazine._id.toString(),
  //     name: magazine.name,
  //     description: magazine.description,
  //     isDeleted: magazine.isDeleted,
  //     isPublic: magazine.isPublic,
  //     createdUserId: magazine.createdUserId.toString(),
  //     createdAt: magazine.createdAt,
  //     updatedAt: magazine.updatedAt,
  //   });
  // }

  private convertToDB(data: Magazine): MagazineForDB {
    return {
      ...data,
      _id: data.id,
    };
  }

  private convertFromDB(data: MagazineForDB): Magazine {
    return new Magazine({
      ...data,
      id: data._id.toString(),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }

  async create(magazine: Magazine): Promise<Magazine> {
    return this.convertFromDB(
      await this.MagazineModel.create(this.convertToDB(magazine)),
    );
  }
}
