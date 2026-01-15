import { getEffectivenessName, getTypeEffectiveness, getDamageColor } from '@/helpers/typescomponent.helper'
import { effectivenessNames, emptyEffectivenessList } from '@/utils/typescomponent.utils'
import { DamageEffectivenessStatus, DamageEffectivenesses } from '@/utils/enums'
import { Stack, Typography, Grid, Box } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ThemmeContext } from '../Layout/Layout'
import { EffectivenessItem, ITypeProps } from './types/typeslist.types'
import TypePill from './TypePill'

const getStatusColor = (status: string) => {
  switch (status) {
    case DamageEffectivenessStatus.SUPEREFFECTIVE:
      return getDamageColor(DamageEffectivenesses.SUPEREFFECTIVE)
    case DamageEffectivenessStatus.EFFECTIVE:
      return getDamageColor(DamageEffectivenesses.EFFECTIVE)
    case DamageEffectivenessStatus.NORMAL:
      return getDamageColor(DamageEffectivenesses.NORMAL)
    case DamageEffectivenessStatus.INNEFECTIVE:
      return getDamageColor(DamageEffectivenesses.INEFFECTIVE)
    case DamageEffectivenessStatus.VERYINEFFECTIVE:
      return getDamageColor(DamageEffectivenesses.VERYINEFFECTIVE)
    case DamageEffectivenessStatus.UNEFFECTIVE:
      return getDamageColor(DamageEffectivenesses.UNEFFECTIVE)
    default:
      return 'transparent'
  }
}

const getStatusMultiplier = (status: string) => {
  switch (status) {
    case DamageEffectivenessStatus.SUPEREFFECTIVE:
      return 'x4'
    case DamageEffectivenessStatus.EFFECTIVE:
      return 'x2'
    case DamageEffectivenessStatus.NORMAL:
      return 'x1'
    case DamageEffectivenessStatus.INNEFECTIVE:
      return 'x1/2'
    case DamageEffectivenessStatus.VERYINEFFECTIVE:
      return 'x1/4'
    case DamageEffectivenessStatus.UNEFFECTIVE:
      return 'x0'
    default:
      return ''
  }
}

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
    // Clear previous lists
    const newList: EffectivenessItem[] = emptyEffectivenessList.map(eff => ({ ...eff, list: [] }))

    typesList.forEach(attackType => {
      const effectivenessValue = getTypeEffectiveness(enemyTypesList, attackType)
      const statusName = getEffectivenessName(effectivenessValue)

      const category = newList.find(item => item.id === statusName)
      if (category) {
        category.list.push(attackType)
      }
    })

    setEffectivenessList(newList)
  }, [enemyTypesList, typesList])

  return (
    <Stack width={{ md: 500, lg: 550, xs: 1 }} alignItems='center' paddingX={1}>
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
        width={1}
        marginTop={1}
        padding={3}
        marginBottom={3}
        border={`2px solid ${theme?.palette.secondary.main}`}
        borderRadius='24px'
        bgcolor={theme?.palette.background.paper}
        gap={3}
        sx={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {effectivenessList &&
          effectivenessList
            .filter(item => item.list.length > 0)
            .map(item => (
              <Box key={item.id} width={1}>
                <Stack direction="row" alignItems="center" gap={1.5} marginBottom={1.5}>
                  <Box
                    sx={{
                      bgcolor: getStatusColor(item.id),
                      color: 'white',
                      padding: '2px 10px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      minWidth: '40px',
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    {getStatusMultiplier(item.id)}
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color={theme.palette.text.primary}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {item.label.find(label => label.lang === 'es')?.content.replace(': ', '')}
                  </Typography>
                </Stack>

                <Grid container spacing={1}>
                  {item.list.map(type => (
                    <Grid item key={type.id}>
                      <TypePill type={type} size="small" />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
        {effectivenessList.every(item => item.list.length === 0) && (
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }} textAlign="center">
            Selecciona al menos un tipo de enemigo para ver las eficacias.
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default TypesEffectiveStatus




