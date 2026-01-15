import { DroppableLists } from '@/utils/enums'
import { Stack, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ThemmeContext } from '../Layout/Layout'
import { TypeItem } from './TypesComponent'
import { IListProps } from './types/typeslist.types'

const TypesList = ({ droppableId, typesList, search = '', setSearch, onTypeClick }: IListProps) => {
  const theme = useContext(ThemmeContext)

  return (
    <Droppable droppableId={droppableId} direction='vertical'>
      {(provided, snapshot) => (
        <>
          <Stack width={{ xs: 1, sm: 'auto' }} gap={1} paddingX={2} paddingTop={0} paddingBottom={2} alignItems='center' ref={provided.innerRef} {...provided.droppableProps}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: theme.palette.text.primary,
                textShadow: theme.palette.mode === 'dark' ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
                paddingBottom: '2px',
                display: 'inline-block',
                marginTop: '-8px' // Move title even higher
              }}
            >
              Arrastra los tipos
            </Typography>
            <TextField
              className='text'
              variant='outlined'
              placeholder='Buscar'
              onChange={e => setSearch && setSearch(e.target.value)}
              inputProps={{ style: { padding: '6px 12px', fontSize: '0.85rem' } }}
              InputProps={{
                style: {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper,
                  width: 140,
                  border: `2px solid ${theme.palette.secondary.main}`,
                  borderRadius: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                },
              }}
            />
            <Stack
              width={140}
              maxHeight={{ xs: 160, sm: 400, md: 450 }}
              alignItems='center'
              gap={1}
              paddingY='12px'
              paddingX='8px'
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
                transition: 'all 0.2s ease',
              }}
            >
              {typesList
                .filter(type =>
                  type.names.some(
                    name =>
                      name.language.name === 'es' &&
                      name.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
                  ),
                )
                .map((type, index) => (
                  <TypeItem key={type.id} {...type} index={index} listType={DroppableLists.TYPESLIST} onClick={onTypeClick} />
                ))}
              {provided.placeholder}
            </Stack>
          </Stack>
        </>
      )}
    </Droppable>
  )
}

export default TypesList
