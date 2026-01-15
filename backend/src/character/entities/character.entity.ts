import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum Status {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Character status',
});

registerEnumType(Gender, {
  name: 'Gender',
  description: 'Character gender',
});

@ObjectType()
export class Character {
  @Field(() => Int)
  id: number;

  @Field()
  image: string;

  @Field()
  name: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Gender)
  gender: Gender;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
