import { DroppableLists } from '@/utils/enums'
import { Stack, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ThemmeContext } from '../Layout/Layout'
import { TypeItem } from './TypesComponent'
import { IListProps } from './types/typeslist.types'

const TypesList = ({ droppableId, typesList }: IListProps) => {
  const [search, setSearch] = useState<string>('')
  const theme = useContext(ThemmeContext)

  return (
    <Droppable droppableId={droppableId} direction='vertical'>
      {provided => (
        <>
          <Stack width={1} gap={1} padding={2} alignItems='center' ref={provided.innerRef} {...provided.droppableProps}>
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
              }}
            >
              Arrastra los tipos
            </Typography>
            <TextField
              className='text'
              variant='outlined'
              placeholder='Buscar'
              onChange={search => setSearch(search.target.value)}
              inputProps={{ style: { padding: '8px 16px' } }}
              InputProps={{
                style: {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.background.paper,
                  width: 220,
                  border: `2px solid ${theme.palette.secondary.main}`,
                  borderRadius: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                },
              }}
            />
            <Stack
              width={220}
              maxHeight={410}
              alignItems='center'
              gap={1}
              paddingY='12px'
              paddingX='8px'
              border={`2px solid ${theme.palette.secondary.main}`}
              borderRadius='24px'
              overflow='auto'
              sx={{
                '&::-webkit-scrollbar': { display: 'none' },
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              {typesList &&
                typesList.length > 0 &&
                typesList.map((type, index) => {
                  if (
                    type.names.some(
                      name =>
                        name.language.name === 'es' &&
                        name.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
                    )
                  ) {
                    return <TypeItem key={type.id} {...type} index={index} listType={DroppableLists.TYPESLIST} />
                  }
                })}
            </Stack>
            {provided.placeholder}
          </Stack>
        </>
      )}
    </Droppable>
  )
}

export default TypesList
