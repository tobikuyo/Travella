import { registerEnumType } from 'type-graphql';

export enum UserType {
    Registered = 'registered',
    Temp = 'temporary'
}

registerEnumType(UserType, { name: 'UserType' });
