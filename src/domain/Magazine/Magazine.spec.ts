import { Magazine } from './Magazine';

jest.mock('mongodb');
const now = new Date('2020-02-23 12:00:00');
jest.useFakeTimers().setSystemTime(now);

describe('Magazine', (): void => {
  test('Magazine.create', (): void => {
    const response = Magazine.create({
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
