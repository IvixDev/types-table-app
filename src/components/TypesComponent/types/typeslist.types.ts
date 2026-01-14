import { DroppableId } from "react-beautiful-dnd"

export interface IListProps {
  droppableId: DroppableId
  typesList: ITypeProps[]
  search?: string
  setSearch?: (search: string) => void
  onTypeClick?: (type: ITypeProps) => void
}

export interface IAttackTypeProps {
  droppableId: DroppableId
  attackType?: ITypeProps
  onTypeClick?: (type: ITypeProps) => void
}

export interface EffectivenessItem {
  id: string
  label: EffectivenessLabel[]
  list: ITypeProps[]
}

export interface EffectivenessLabel {
  lang: string
  content: string
}

export interface DamageRelations {
  double_damage_from: Type[]
  double_damage_to: Type[]
  half_damage_from: Type[]
  half_damage_to: Type[]
  no_damage_from: Type[]
  no_damage_to: Type[]
}

export interface Type {
  name: string
}

export interface GameIndex {
  game_index: number
  generation: Generation
}

export interface Generation {
  name: string
}

export interface MoveDamageClass {
  name: string
}

export interface Move {
  name: string
}

export interface Pokemon {
  pokemon: PokemonDetails
  slot: number
}

export interface PokemonDetails {
  name: string
}

export interface Name {
  name: string
  language: {
    name: string
  }
}

export interface ITypeProps {
  id: number
  name: string
  names: Name[]
  color: string
  damage_relations: DamageRelations
  game_indices: GameIndex[]
  generation: Generation
  move_damage_class: MoveDamageClass
  moves: Move[]
  pokemon: Pokemon[]
  onClick?: (type: ITypeProps) => void
}
