import { DroppableLists } from '@/utils/enums'
import { Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ThemmeContext } from '../Layout/Layout'
import { TypeItem } from './TypesComponent'
import { IListProps } from './types/typeslist.types'

const EnemyTypesList = ({ droppableId, typesList, onTypeClick }: IListProps) => {
  const theme = useContext(ThemmeContext)

  return (
    <Droppable droppableId={droppableId} direction='horizontal'>
      {(provided, snapshot) => (
        <Stack
          alignItems='center'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            noWrap
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: theme.palette.text.primary,
              textShadow: theme.palette.mode === 'dark' ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
              display: 'inline-block',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              marginBottom: '8px'
            }}
          >
            Tipos del enemigo
          </Typography>
          <Stack
            alignItems='center'
            gap={2}
            direction='row'
            height={50}
            minHeight={50}
            width={320}
            border={`2px ${snapshot.isDraggingOver ? 'dashed' : 'solid'} ${theme.palette.secondary.main}`}
            borderRadius='24px'
            overflow='auto'
            sx={{
              '&::-webkit-scrollbar': { display: 'none' },
              backgroundColor: snapshot.isDraggingOver
                ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)')
                : theme.palette.background.paper,
              boxShadow: snapshot.isDraggingOver
                ? '0 8px 24px rgba(0,0,0,0.1)'
                : '0 4px 12px rgba(0,0,0,0.05)',
              padding: '4px 16px',
              transition: 'all 0.2s ease',
            }}
          >
            {typesList.map((type, index) => (
              <TypeItem key={type.id} {...type} index={index} listType={DroppableLists.ENEMYTYPELIST} onClick={onTypeClick} />
            ))}
            {provided.placeholder}
          </Stack>
        </Stack>
      )}
    </Droppable>
  )
}

export default EnemyTypesList
