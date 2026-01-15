import { Box, Typography } from '@mui/material'
import { ITypeProps } from './types/typeslist.types'

interface ITypePillProps {
    type: ITypeProps
    size?: 'small' | 'medium' | 'large'
    onClick?: (type: ITypeProps) => void
}

const TypePill = ({ type, size = 'medium', onClick }: ITypePillProps) => {
    const { names, color } = type
    const typeName = names.find(n => n.language.name === 'es')?.name

    const sizes = {
        small: {
            width: 95,
            height: 28,
            fontSize: '0.75rem',
        },
        medium: {
            width: 140,
            height: 36,
            fontSize: '0.875rem',
        },
        large: {
            width: 160,
            height: 42,
            fontSize: '1rem',
        }
    }

    const currentSize = sizes[size]

    return (
        <Box
            onClick={() => onClick?.(type)}
            sx={{
                color: 'white',
                borderRadius: '30px',
                background: color,
                boxShadow: '0 4px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.4)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                width: currentSize.width,
                height: currentSize.height,
                minHeight: currentSize.height,
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                textTransform: 'uppercase',
                cursor: onClick ? 'pointer' : 'default',
                fontWeight: 'bold',
                letterSpacing: '1px',
                userSelect: 'none',
                transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s',
                '&:hover': onClick ? {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 8px rgba(0,0,0,0.3)',
                } : {},
            }}
        >
            <Typography
                fontWeight="bold"
                sx={{
                    pointerEvents: 'none',
                    fontSize: currentSize.fontSize
                }}
            >
                {typeName}
            </Typography>
        </Box>
    )
}

export default TypePill
