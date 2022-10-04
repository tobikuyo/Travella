import { ObjectType } from 'type-graphql';
import { Entity } from 'typeorm';
import { Experience } from './Experience';

@Entity('hotels')
@ObjectType()
export class Hotel extends Experience {}
