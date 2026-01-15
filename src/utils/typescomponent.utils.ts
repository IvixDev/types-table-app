import { EffectivenessItem } from "@/components/TypesComponent/types/typeslist.types";
import { DamageEffectivenessStatus, DamageEffectivenesses } from "./enums";

export const damageArray = [
  DamageEffectivenesses.UNEFFECTIVE,
  DamageEffectivenesses.VERYINEFFECTIVE,
  DamageEffectivenesses.INEFFECTIVE,
  DamageEffectivenesses.NORMAL,
  DamageEffectivenesses.EFFECTIVE,
  DamageEffectivenesses.SUPEREFFECTIVE,
]

export const effectivenessNames = [
  DamageEffectivenessStatus.UNEFFECTIVE,
  DamageEffectivenessStatus.VERYINEFFECTIVE,
  DamageEffectivenessStatus.INNEFECTIVE,
  DamageEffectivenessStatus.NORMAL,
  DamageEffectivenessStatus.EFFECTIVE,
  DamageEffectivenessStatus.SUPEREFFECTIVE,
]

export const typesIdsList = [
  { id: '1', color: '#A8A77A' },
  { id: '2', color: '#C22E28' },
  { id: '3', color: '#A98FF3' },
  { id: '4', color: '#A33EA1' },
  { id: '5', color: '#E2BF65' },
  { id: '6', color: '#B6A136' },
  { id: '7', color: '#A6B91A' },
  { id: '8', color: '#735797' },
  { id: '9', color: '#B7B7CE' },
  { id: '10', color: '#EE8130' },
  { id: '11', color: '#6390F0' },
  { id: '12', color: '#7AC74C' },
  { id: '13', color: '#F7D02C' },
  { id: '14', color: '#F95587' },
  { id: '15', color: '#96D9D6' },
  { id: '16', color: '#6F35FC' },
  { id: '17', color: '#705746' },
  { id: '18', color: '#D685AD' },
]

export const emptyEffectivenessList: EffectivenessItem[] = [
  {
    id: DamageEffectivenessStatus.UNEFFECTIVE,
    label: [{ lang: 'es', content: 'No Efectivo' }],
    list: [],
  },
  {
    id: DamageEffectivenessStatus.VERYINEFFECTIVE,
    label: [{ lang: 'es', content: 'Muy Poco Efectivo' }],
    list: [],
  },
  {
    id: DamageEffectivenessStatus.INNEFECTIVE,
    label: [{ lang: 'es', content: 'Poco Efectivo' }],
    list: [],
  },
  {
    id: DamageEffectivenessStatus.NORMAL,
    label: [{ lang: 'es', content: 'Normal' }],
    list: [],
  },
  {
    id: DamageEffectivenessStatus.EFFECTIVE,
    label: [{ lang: 'es', content: 'Efectivo' }],
    list: [],
  },
  {
    id: DamageEffectivenessStatus.SUPEREFFECTIVE,
    label: [{ lang: 'es', content: 'Super Efectivo' }],
    list: [],
  },
]