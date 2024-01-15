import { Inject, Injectable } from '@nestjs/common';
import { Op } from '@sequelize/core';
import { MiceService } from 'src/mice/mice.service';
import { Mouse } from 'src/mice/mouse.entity';
import type { ICat } from './cats.types';
import { Cat } from './cat.entity';
import { CAT_REPOSITORY } from './cats.constants';

@Injectable()
export class CatsService {
  private readonly includeMiceConfig = [
    {
      model: Mouse,
      as: 'mice',
      attributes: { exclude: ['catId'] },
    },
  ];
  constructor(
    @Inject(MiceService) private readonly miceService: MiceService,
    @Inject(CAT_REPOSITORY) private catsRepository: typeof Cat,
  ) {}

  async create(cat: Partial<ICat>): Promise<Cat> {
    const { mouseId } = cat;
    const createdCat: Cat = await this.catsRepository.create<Cat>(cat);
    await this.miceService.linkToCat(mouseId, createdCat.id);
    const createdCatWithMice: Cat = await this.catsRepository.findByPk<Cat>(
      createdCat.id,
      { include: ['mice'] },
    );
    return createdCatWithMice;
  }
  async findAll(searchText: string): Promise<Cat[]> {
    if (searchText) {
      return this.catsRepository.findAll<Cat>({
        where: {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchText}%` } },
            { lastName: { [Op.iLike]: `%${searchText}%` } },
            // COMMENT: this is an inefficient way to query on the mice & include the mice, you should include them with seperate
            //          its ok for small dataset but given a large one what you are doing is better to use a subquery which will return all the cat ids for the matching mice
            //          (its actualy ok here because mouse has a single cat but if the model become more complicated it may cause degrading performance
            { '$mice.name$': { [Op.iLike]: `%${searchText}%` } },
          ],
        },
        include: this.includeMiceConfig,
      });
    }
    return this.catsRepository.findAll<Cat>({
      include: this.includeMiceConfig,
    });
  }
  async findOne(id: string): Promise<Cat> {
    return this.catsRepository.findByPk<Cat>(id, {
      include: this.includeMiceConfig,
    });
  }
}
