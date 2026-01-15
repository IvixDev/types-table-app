import { getDamageColor } from '@/helpers/typescomponent.helper'
import { damageArray } from '@/utils/typescomponent.utils'
import { Divider, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { ThemmeContext } from '../Layout/Layout'

const DamageIndicator = ({ damage }: { damage: number }) => {
  const theme = useContext(ThemmeContext)

  return (
    <Stack
      width={{ sm: 500, xs: 1 }}
      direction='row'
      flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
      justifyContent='center'
      alignItems='center'
      marginY={2}
      paddingX={1}
      gap={1}
    >
      {damageArray.map(damageIndicator => (
        <Typography
          key={damageIndicator}
          display='flex'
          justifyContent='center'
          alignItems='center'
          height={{ xs: 50, sm: 70 }}
          width={{ xs: 60, sm: 80 }}
          sx={{
            flexShrink: 0,
            color: damage === damageIndicator ? theme.palette.common.white : theme.palette.text.primary,
            border: `2px solid ${theme.palette.secondary.main}`,
            borderRadius: '16px',
            background: damage === damageIndicator ? getDamageColor(damageIndicator) : theme.palette.background.paper,
            boxShadow: damage === damageIndicator
              ? '0 4px 6px rgba(0,0,0,0.2)'
              : 'none',
            transition: 'all 0.2s ease',
            textShadow: damage === damageIndicator ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
            fontWeight: 'bold',
            fontFamily: '"Roboto Mono", monospace',
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
          }}
        >
          {`x${damageIndicator}`}
        </Typography>
      ))}
    </Stack>
  )
}

export default DamageIndicator
