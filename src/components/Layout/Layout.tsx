import MoonIcon from '@/assets/icons/MoonIcon'
import SunIcon from '@/assets/icons/SunIcon'
import { darkTheme, lightTheme } from '@/libs/theme/theme'
import { Box, Stack, Switch, Theme } from '@mui/material'
import { ReactNode, createContext, useEffect, useState } from 'react'

export const ThemmeContext = createContext<Theme>(darkTheme)

const Layout = ({ children }: { children: ReactNode }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? darkTheme : lightTheme)
    localStorage.setItem('themeMode', event.target.checked ? 'dark' : 'light')
  }

  const [theme, setTheme] = useState(darkTheme)

  useEffect(() => {
    setTheme(initializeThemeMode())
  }, [])

  const initializeThemeMode = () => {
    if (localStorage.getItem('themeMode')) {
      const isDarkDefault = localStorage.getItem('themeMode') === 'dark'
      localStorage.setItem('themeMode', isDarkDefault ? 'dark' : 'light')

      return isDarkDefault ? darkTheme : lightTheme
    }

    const isDarkDefault = window.matchMedia('(prefers-color-scheme: dark)').matches
    localStorage.setItem('themeMode', isDarkDefault ? 'dark' : 'light')

    return isDarkDefault ? darkTheme : lightTheme
  }

  return (
    <ThemmeContext.Provider value={theme}>
      <Stack
        alignItems='center'
        alignContent='center'
        minHeight='100vh'
        bgcolor={theme.palette.background.default}
        sx={{
          transition: 'background-color 0.3s ease',
          paddingTop: 4,
        }}
      >
        <Stack
          width={{ xs: '95%', sm: 1 }}
          maxWidth={{ xs: '85%', xl: 1200 }}
          direction="row"
          justifyContent="flex-end"
          marginBottom={2}
        >
          <Switch
            icon={
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={32}
                height={32}
                borderRadius="50%"
                bgcolor="common.white"
                sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
              >
                <SunIcon
                  fill={theme.palette.warning.main}
                  width={20}
                  height={20}
                />
              </Box>
            }
            checkedIcon={
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={32}
                height={32}
                borderRadius="50%"
                bgcolor="grey.800"
                sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
              >
                <MoonIcon
                  fill={theme.palette.info.light}
                  width={20}
                  height={20}
                />
              </Box>
            }
            sx={{
              width: 64,
              height: 36,
              padding: 0,
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))',
              '& .MuiSwitch-switchBase': {
                padding: '2px',
                transitionDuration: '300ms',
                '&.Mui-checked': {
                  transform: 'translateX(28px)',
                  color: '#fff',
                  '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#a18a00' : '#94a3b8',
                    opacity: 1,
                    border: 0,
                  },
                },
              },
              '& .MuiSwitch-track': {
                borderRadius: 36 / 2,
                backgroundColor: theme.palette.mode === 'dark' ? '#a18a00' : '#94a3b8',
                opacity: 1,
                border: `1px solid ${theme.palette.mode === 'dark' ? '#857200' : '#cbd5e1'}`,
                transition: theme.transitions.create(['background-color', 'border'], {
                  duration: 500,
                }),
              },
            }}
            checked={theme.palette.mode === 'dark'}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Stack>
        {children}
      </Stack>
    </ThemmeContext.Provider>
  )
}

export default Layout
