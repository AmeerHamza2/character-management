import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Character } from './entities/character.entity';
import { CharacterFilterInput } from './dto/character-filter.input';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {}

  @Query(() => [Character], { name: 'characters' })
  findAll(
    @Args('filter', { type: () => CharacterFilterInput, nullable: true })
    filter?: CharacterFilterInput,
  ) {
    return this.characterService.findAll(filter);
  }

  @Query(() => Character, { name: 'character', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.characterService.findOne(id);
  }
}
