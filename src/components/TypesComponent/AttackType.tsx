import { DroppableLists } from '@/utils/enums'
import { Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ThemmeContext } from '../Layout/Layout'
import { TypeItem } from './TypesComponent'
import { IAttackTypeProps } from './types/typeslist.types'

const AttackType = ({ droppableId, attackType }: IAttackTypeProps) => {
  const theme = useContext(ThemmeContext)

  return (
    <Droppable droppableId={droppableId} direction='horizontal'>
      {provided => (
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
            border={`2px solid ${theme.palette.secondary.main}`}
            borderRadius='24px'
            sx={{
              '&::-webkit-scrollbar': { display: 'none' },
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            {attackType && (
              <TypeItem key={attackType.id} {...attackType} index={0} listType={DroppableLists.ATTACKTYPE} />
            )}
          </Stack>
          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  )
}

export default AttackType
