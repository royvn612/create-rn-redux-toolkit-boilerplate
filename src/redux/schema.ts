import {schema} from 'normalizr';

export const emptyEntity = new schema.Entity('empty');
export const authsEntity = new schema.Entity('auths');
export const usersEntity = new schema.Entity('users');

// export const sampleGetAccessorEntity = new schema.Entity(
//   'sampleGetAccessor',
//   {},
//   {
//     processStrategy: entity => {
//       entity.fullName = entity.firstName + ' ' + entity.lastName;
//       return entity;
//     },
//   },
// );
