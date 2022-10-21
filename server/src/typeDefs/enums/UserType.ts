import { registerEnumType } from 'type-graphql';

export enum UserType {
    Registered = 'Registered',
    Temp = 'Temp'
}

registerEnumType(UserType, { name: 'UserType' });
