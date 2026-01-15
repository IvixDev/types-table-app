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
  const [search, setSearch] = useState<string>('')

  const filteredTypesList = typesList.filter(type =>
    type.names.some(
      name =>
        name.language.name === 'es' &&
        name.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    ),
  )

  useEffect(() => {
    const effectiveness = getTypeEffectiveness(enemyTypesList, attackType)
    setDamage(effectiveness)
  }, [attackType, enemyTypesList])

  const handleTypeClick = (type: ITypeProps) => {
    // 1. Try to set attack type if empty
    if (!attackType) {
      setAttackType(type)
      return
    }

    // 2. Try to add to enemy types list if it has space and type is not already there
    // (A type CAN be in attackType and enemyTypesList at the same time)
    const isAlreadyInEnemyList = enemyTypesList.some(t => t.id === type.id)
    if (enemyTypesList.length < 2 && !isAlreadyInEnemyList) {
      setEnemyTypesList(prev => [...prev, type])
    }
  }

  const handleRemoveAttackType = () => setAttackType(undefined)
  const handleRemoveEnemyType = (typeToRemove: ITypeProps) => {
    setEnemyTypesList(prev => prev.filter(t => t.id !== typeToRemove.id))
  }

  const onDragEnd = (result: DropResult) => {
    onDragEndHandler(
      result,
      typesList,
      filteredTypesList,
      enemyTypesList,
      setTypeList,
      setEnemyTypesList,
      setAttackType
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack
        width={{ xs: 1, md: 'auto' }}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent='center'
        alignItems={{ xs: 'center', md: 'flex-start' }}
        gap={{ xs: 3, md: 2.5 }}
      >
        <TypesList
          droppableId={DroppableLists.TYPESLIST}
          typesList={filteredTypesList}
          search={search}
          setSearch={setSearch}
          onTypeClick={handleTypeClick}
        />
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          alignItems={{ xs: 'center', lg: 'flex-start' }}
          gap={2.5}
          sx={{
            '@media (min-width: 1400px)': {
              flexDirection: 'row',
            },
            '@media (max-width: 1399px)': {
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        >
          <Stack alignItems='center' direction='column' width={{ sm: 'auto', xs: 1 }} gap={2}>
            <Stack
              direction={{ sm: 'row', xs: 'column' }}
              justifyContent='center'
              alignItems={{ xs: 'center', sm: 'flex-start' }}
              gap={2.5}
              width={1}
            >
              <AttackType
                droppableId={DroppableLists.ATTACKTYPE}
                attackType={attackType}
                onTypeClick={handleRemoveAttackType}
              />
              <EnemyTypesList
                droppableId={DroppableLists.ENEMYTYPELIST}
                typesList={enemyTypesList}
                onTypeClick={handleRemoveEnemyType}
              />
            </Stack>
            <DamageIndicator damage={damage} />
          </Stack>
          <TypesEffectiveStatus enemyTypesList={enemyTypesList} typesList={typesList} />
        </Stack>
      </Stack>
    </DragDropContext>
  )
}

export const TypeItem = (props: ITypeProps & { index: number; listType?: string; onClick?: (type: any) => void }) => {
  const { id, names, color, index, listType, onClick } = props
  const dragId = listType ? `${listType}-${props.name}` : props.name
  const typeName = names.find(name => name.language.name === 'es')?.name

  return (
    <Draggable draggableId={dragId} index={index} key={id}>
      {(provided, snapshot) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => onClick?.(props)}
          sx={{
            color: 'white',
            borderRadius: '30px',
            background: color,
            boxShadow: snapshot.isDragging
              ? '0 10px 20px rgba(0,0,0,0.3)'
              : '0 4px 6px rgba(0,0,0,0.2)',
            textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
            width: 110,
            height: 34,
            minHeight: 34,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'uppercase',
            cursor: snapshot.isDragging ? 'grabbing' : (onClick ? 'pointer' : 'grab'),
            fontWeight: 'bold',
            letterSpacing: '1.2px',
            userSelect: 'none',
            fontSize: '0.8rem',
            ...provided.draggableProps.style,
            transform: snapshot.isDragging
              ? `${provided.draggableProps.style?.transform} scale(1.05)`
              : provided.draggableProps.style?.transform,
            transition: snapshot.isDragging
              ? 'none'
              : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s',
            zIndex: snapshot.isDragging ? 9999 : 'auto',
            '&:hover': {
              transform: !snapshot.isDragging ? 'translateY(-2px)' : undefined,
              boxShadow: !snapshot.isDragging ? '0 6px 8px rgba(0,0,0,0.3)' : undefined,
            },
          }}
        >
          <Typography fontWeight="bold" sx={{ pointerEvents: 'none' }}>{typeName}</Typography>
        </Box>
      )}
    </Draggable>
  )
}

const reorder = (list: ITypeProps[], startIndex: number, endIndex: number): ITypeProps[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const addEnemyTypes = (typeList: ITypeProps[], selectedList: ITypeProps[], index: number): ITypeProps[] => {
  if (selectedList.some(t => t.id === typeList[index].id)) return selectedList
  return [...selectedList, typeList[index]]
}

const removeEnemyType = (enemyTypeList: ITypeProps[], index: number): ITypeProps[] => {
  return enemyTypeList.filter((_, i) => i !== index)
}

const changeEnemyTypes = (
  typesList: ITypeProps[],
  enemyTypesList: ITypeProps[],
  sourceId: number,
  destinationId: number,
): ITypeProps[] => {
  const newList = enemyTypesList.filter((_, i) => i !== (destinationId === 0 ? 0 : enemyTypesList.length - 1))
  return destinationId > 0 ? [...newList, typesList[sourceId]] : [typesList[sourceId], ...newList]
}

const handleTypeListDrag = (
  result: DropResult,
  typesList: ITypeProps[],
  filteredTypesList: ITypeProps[],
  enemyTypesList: ITypeProps[],
  setTypeList: Dispatch<SetStateAction<ITypeProps[]>>,
  setEnemyTypesList: Dispatch<SetStateAction<ITypeProps[]>>,
  setAttackType: Dispatch<SetStateAction<ITypeProps | undefined>>,
) => {
  const { destination, source } = result

  if (destination) {
    // Resolve the actual item from the filtered list (or original if not filtered)
    const draggedItem = filteredTypesList[source.index]
    const sourceIndexInOriginal = typesList.findIndex(t => t.id === draggedItem.id)

    switch (destination.droppableId) {
      case DroppableLists.TYPESLIST:
        if (destination.index !== source.index) {
          const destinationItem = filteredTypesList[destination.index]
          const destinationIndexInOriginal = typesList.findIndex(t => t.id === destinationItem.id)

          const list = reorder(typesList, sourceIndexInOriginal, destinationIndexInOriginal)
          setTypeList(list)
        }
        break
      case DroppableLists.ENEMYTYPELIST:
        if (!enemyTypesList.find(type => type.id === draggedItem.id)) {
          const list =
            enemyTypesList.length < 2
              ? addEnemyTypes(typesList, enemyTypesList, sourceIndexInOriginal)
              : changeEnemyTypes(typesList, enemyTypesList, sourceIndexInOriginal, destination.index)
          setEnemyTypesList(list)
        }
        break
      case DroppableLists.ATTACKTYPE:
        setAttackType(draggedItem)
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

  setEnemyTypesList(list)
}

const handleAttackTypeDrag = (result: DropResult, setAttackType: Dispatch<SetStateAction<ITypeProps | undefined>>) => {
  if (!(result.destination && result.destination.droppableId === DroppableLists.ATTACKTYPE)) {
    setAttackType(undefined)
  }
}

const onDragEndHandler = (
  result: DropResult,
  typesList: ITypeProps[],
  filteredTypesList: ITypeProps[],
  enemyTypesList: ITypeProps[],
  setTypeList: Dispatch<SetStateAction<ITypeProps[]>>,
  setEnemyTypesList: Dispatch<SetStateAction<ITypeProps[]>>,
  setAttackType: Dispatch<SetStateAction<ITypeProps | undefined>>,
) => {
  switch (result.source.droppableId) {
    case DroppableLists.TYPESLIST:
      handleTypeListDrag(
        result,
        typesList,
        filteredTypesList,
        enemyTypesList,
        setTypeList,
        setEnemyTypesList,
        setAttackType
      )
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
