import { MockMagazineRepository } from '../../../../infrastructure/repositories/MagazineRepository';
import { CreateMagazineUseCase } from './CreateMagazineUseCase';

jest.mock('mongodb');
const now = new Date('2020-02-23 12:00:00');
jest.useFakeTimers().setSystemTime(now);

const createMagazineUseCase = new CreateMagazineUseCase(
  new MockMagazineRepository(),
);

describe('CreateMagazineUseCase', (): void => {
  test('execute', async () => {
    const response = await createMagazineUseCase.execute({
      name: 'name',
      description: 'description',
      createdUserId: 'user1',
    });
    expect(response).toEqual({
      createdAt: now,
      createdUserId: 'user1',
      description: 'description',
      id: undefined,
      isDeleted: false,
      isPublic: false,
      name: 'name',
      updatedAt: now,
    });
  });
});
