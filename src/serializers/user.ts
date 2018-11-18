import { Serializer } from 'ts-jsonapi';

export class UserSerializer extends Serializer {
  constructor() {
    super('users', {
      id: 'id',
      email: { ref: 'id', attributes: ['email'] },
      attributes: ['firstName', 'lastName', 'email'] })
  }
}