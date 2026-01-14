import { DroppableLists } from '@/utils/enums'
import { Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ThemmeContext } from '../Layout/Layout'
import { TypeItem } from './TypesComponent'
import { IAttackTypeProps } from './types/typeslist.types'

const AttackType = ({ droppableId, attackType, onTypeClick }: IAttackTypeProps) => {
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
            Tu tipo de ataque
          </Typography>
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            marginBottom={1}
            overflow='auto'
            width={160}
            height={50}
            minHeight={50}
            border={`2px ${snapshot.isDraggingOver ? 'dashed' : 'solid'} ${theme.palette.secondary.main}`}
            borderRadius='24px'
            sx={{
              '&::-webkit-scrollbar': { display: 'none' },
              backgroundColor: snapshot.isDraggingOver
                ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)')
                : theme.palette.background.paper,
              boxShadow: snapshot.isDraggingOver
                ? '0 8px 24px rgba(0,0,0,0.1)'
                : '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
            }}
          >
            {attackType && (
              <TypeItem key={attackType.id} {...attackType} index={0} listType={DroppableLists.ATTACKTYPE} onClick={onTypeClick} />
            )}
            {provided.placeholder}
          </Stack>
        </Stack>
      )}
    </Droppable>
  )
}

export default AttackType
