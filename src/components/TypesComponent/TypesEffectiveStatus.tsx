import { getEffectivenessName, getTypeEffectiveness } from '@/helpers/typescomponent.helper'
import { effectivenessNames, emptyEffectivenessList } from '@/utils/typescomponent.utils'
import { Stack, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ThemmeContext } from '../Layout/Layout'
import { EffectivenessItem, ITypeProps } from './types/typeslist.types'

const TypesEffectiveStatus = ({
  enemyTypesList,
  typesList,
}: {
  enemyTypesList: ITypeProps[]
  typesList: ITypeProps[]
}) => {
  const theme = useContext(ThemmeContext)
  const [effectivenessList, setEffectivenessList] = useState<EffectivenessItem[]>(emptyEffectivenessList)

  useEffect(() => {
    emptyEffectivenessList.map(effectiveness => (effectiveness.list = []))

    typesList.forEach(attackType => {
      const effectiveness = getTypeEffectiveness(enemyTypesList, attackType)
      const list = emptyEffectivenessList.map(effectiveItem => {
        if (
          effectivenessNames.find(name => name === effectiveItem.id) &&
          getEffectivenessName(effectiveness) === effectiveItem.id
        ) {
          effectiveItem.list.push(attackType)
        }
        return effectiveItem
      })

      setEffectivenessList([...list])
    })
  }, [enemyTypesList])

  return (
    <Stack width={1} alignItems='center' paddingX={1}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        sx={{
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: theme.palette.text.primary,
          textShadow: theme.palette.mode === 'dark' ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
          display: 'inline-block',
        }}
      >
        Eficacias contra el enemigo
      </Typography>
      <Stack
        direction='column'
        width={{ sm: 560, xs: 1 }}
        marginTop={1}
        padding={2}
        marginBottom={3}
        border={`2px solid ${theme?.palette.secondary.main}`}
        borderRadius='24px'
        bgcolor={theme?.palette.background.paper}
        sx={{
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        {effectivenessList &&
          effectivenessList.map(item => (
            <Typography key={item.id} color={theme.palette.text.primary}>
              <span style={{ fontWeight: 700 }}>{item.label.find(label => label.lang === 'es')?.content}</span>
              {item.list.map(content => content.names.find(name => name.language.name === 'es')?.name).join(', ')}
            </Typography>
          ))}
      </Stack>
    </Stack>
  )
}

export default TypesEffectiveStatus
