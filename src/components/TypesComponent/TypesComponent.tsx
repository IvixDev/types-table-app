import { getTypeEffectiveness } from '@/helpers/typescomponent.helper'
import { DroppableLists } from '@/utils/enums'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd'
import AttackType from './AttackType'
import DamageIndicator from './DamageIndicator'
import EnemyTypesList from './EnemyTypesList'
import TypesEffectiveStatus from './TypesEffectiveStatus'
import TypesList from './TypesList'
import { ITypeProps } from './types/typeslist.types'

const TypesComponent = ({ allTypesList }: { allTypesList: ITypeProps[] }) => {
  const [typesList, setTypeList] = useState<ITypeProps[]>(allTypesList)
  const [enemyTypesList, setEnemyTypesList] = useState<ITypeProps[]>([])
  const [attackType, setAttackType] = useState<ITypeProps>()
  const [damage, setDamage] = useState<number>(-1)

  useEffect(() => {
    const effectiveness = getTypeEffectiveness(enemyTypesList, attackType)
    setDamage(effectiveness)
  }, [attackType, enemyTypesList])

  const onDragEnd = (result: DropResult) =>
    onDragEndHandler(result, typesList, enemyTypesList, setTypeList, setEnemyTypesList, setAttackType)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        width={{ xs: 1, md: 'auto' }}
        direction={{ md: 'row', sm: 'column' }}
        justifyContent='center'
        alignItems='center'
      >
        <TypesList droppableId={DroppableLists.TYPESLIST} typesList={typesList} />
        <Stack alignItems='center' direction='column' width={{ sm: 600, xs: 1 }} gap={2}>
          <Stack
            direction={{ sm: 'row', xs: 'column' }}
            justifyContent='center'
            alignItems={{ xs: 'center', sm: 'flex-start' }}
            gap={2}
            width={1}
          >
            <AttackType droppableId={DroppableLists.ATTACKTYPE} attackType={attackType} />
            <EnemyTypesList droppableId={DroppableLists.ENEMYTYPELIST} typesList={enemyTypesList} />
          </Stack>
          <DamageIndicator damage={damage} />
          <TypesEffectiveStatus enemyTypesList={enemyTypesList} typesList={typesList} />
        </Stack>
      </Stack>
    </DragDropContext>
  )
}

export const TypeItem = ({
  id,
  name,
  names,
  color,
  index,
  listType,
}: ITypeProps & { index: number; listType?: string }) => {
  const dragId = listType ? `${listType}-${name}` : name
  const typeName = names.find(name => name.language.name === 'es')?.name

  return (
    <Draggable draggableId={dragId} index={index} key={id}>
      {provided => (
        <Box
          data-react-beautiful-dnd-draggable='0'
          data-react-beautiful-dnd-drag-handle='0'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            color: 'white',
            borderRadius: '30px',
            background: color,
            boxShadow: '0 4px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.4)',
            textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
            width: 140,
            height: 36,
            minHeight: 36,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'uppercase',
            cursor: 'grab',
            fontWeight: 'bold',
            letterSpacing: '1px',
            // styles we need to apply on draggables
            ...provided.draggableProps.style,
            transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 8px rgba(0,0,0,0.3)',
            },
            '&:active': {
              cursor: 'grabbing',
              transform: 'translateY(0)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }
          }}
        >
          <Typography fontWeight="bold">{typeName}</Typography>
        </Box>
      )}
    </Draggable>
  )
}

const reorder = (list: ITypeProps[], startIndex: number, endIndex: number) => {
  const [removed] = list.splice(startIndex, 1)
  list.splice(endIndex, 0, removed)
  return list
}

const addEnemyTypes = (typeList: ITypeProps[], selectedList: ITypeProps[], index: number) => {
  selectedList.push(typeList[index])
  return selectedList
}

const removeEnemyType = (enemyTypeList: ITypeProps[], index: number) => {
  enemyTypeList.splice(index, 1)
  return enemyTypeList
}

const changeEnemyTypes = (
  typesList: ITypeProps[],
  enemyTypesList: ITypeProps[],
  sourceId: number,
  destinationId: number,
) => {
  enemyTypesList.pop()
  return destinationId > 0 ? [...enemyTypesList, typesList[sourceId]] : [typesList[sourceId], ...enemyTypesList]
}

const handleTypeListDrag = (
  result: DropResult,
  typesList: ITypeProps[],
  enemyTypesList: ITypeProps[],
  setTypeList: Dispatch<SetStateAction<ITypeProps[]>>,
  setEnemyTypesList: Dispatch<SetStateAction<ITypeProps[]>>,
  setAttackType: Dispatch<SetStateAction<ITypeProps | undefined>>,
) => {
  const { destination, source } = result

  if (destination) {
    switch (destination.droppableId) {
      case DroppableLists.TYPESLIST:
        if (destination.index !== source.index) {
          const list = reorder(typesList, source.index, destination.index)
          setTypeList([...list])
        }
        break
      case DroppableLists.ENEMYTYPELIST:
        if (!enemyTypesList.find(type => type.id === typesList[source.index].id)) {
          const list =
            enemyTypesList.length < 2
              ? addEnemyTypes(typesList, enemyTypesList, source.index)
              : changeEnemyTypes(typesList, enemyTypesList, source.index, destination.index)
          setEnemyTypesList([...list])
        }
        break
      case DroppableLists.ATTACKTYPE:
        setAttackType(typesList[source.index])
      default:
        break
    }
  }
}

const handleEnemyTypeListDrag = (
  result: DropResult,
  enemyTypesList: ITypeProps[],
  setEnemyTypesList: Dispatch<SetStateAction<ITypeProps[]>>,
) => {
  const { destination, source } = result

  const list =
    destination && destination.droppableId === DroppableLists.ENEMYTYPELIST
      ? reorder(enemyTypesList, source.index, destination.index)
      : removeEnemyType(enemyTypesList, source.index)

  setEnemyTypesList([...list])
}

const handleAttackTypeDrag = (result: DropResult, setAttackType: Dispatch<SetStateAction<ITypeProps | undefined>>) => {
  if (!(result.destination && result.destination.droppableId === DroppableLists.ATTACKTYPE)) {
    setAttackType(undefined)
  }
}

const onDragEndHandler = (
  result: DropResult,
  typesList: ITypeProps[],
  enemyTypesList: ITypeProps[],
  setTypeList: Dispatch<SetStateAction<ITypeProps[]>>,
  setEnemyTypesList: Dispatch<SetStateAction<ITypeProps[]>>,
  setAttackType: Dispatch<SetStateAction<ITypeProps | undefined>>,
) => {
  switch (result.source.droppableId) {
    case DroppableLists.TYPESLIST:
      handleTypeListDrag(result, typesList, enemyTypesList, setTypeList, setEnemyTypesList, setAttackType)
      break
    case DroppableLists.ENEMYTYPELIST:
      handleEnemyTypeListDrag(result, enemyTypesList, setEnemyTypesList)
      break
    case DroppableLists.ATTACKTYPE:
      handleAttackTypeDrag(result, setAttackType)
    default:
      break
  }
}

export default TypesComponent
