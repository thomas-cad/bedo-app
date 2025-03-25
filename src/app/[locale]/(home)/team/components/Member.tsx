import React from 'react';
import Image from 'next/image';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Membre } from "@/interfaces";

export default function Member({ membre, locale }: { membre: Membre, locale: string }) {
  return (
    <Card 
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '300px' },
        height: '500px', // Hauteur fixe
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
    >
      <CardContent sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '8px !important'
      }}>
        <div className="flex flex-col items-center" style={{ width: '100%' }}>
          <div style={{ 
            position: 'relative',
            width: '100%',
            height: '240px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #0CFF21',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Image 
              src={membre.image} 
              alt={`${membre.first_name}-${membre.last_name}`}
              layout="fill"
              objectFit="cover"
              quality={85}
            />
          </div>
          
          <Typography 
            variant="h6" 
            component="h3" 
            fontWeight="bold" 
            sx={{ 
              pt: 3,
              textAlign: 'center',
              color: 'text.primary'
            }}
          >
            {`${membre.first_name} ${membre.last_name}`}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              textAlign: 'center',
              mb: 1
            }}
          >
            {locale === 'fr' ? membre.role_fr : membre.role_en}
          </Typography>
        </div>

        <Card 
          variant="outlined"
          sx={{
            width: '100%',
            borderRadius: '8px',
            borderColor: 'grey.500', // Grey border for the card
            backgroundColor: 'background.paper',
          }}
        >
          <CardContent sx={{ 
            padding: '8px !important',
            '&:last-child': { paddingBottom: '8px' }
          }}>
            <div style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '4px'
            }}>
              {membre.poles.map((pole) => (
                <Button 
                    key={pole.id}
                    variant="outlined" 
                    size="small" 
                    disabled // Disables all interactions
                    sx={{ 
                    borderRadius: '6px', 
                    minWidth: 0,
                    padding: '2px 8px',
                    fontSize: '0.6rem',
                    lineHeight: 1.2,
                    borderWidth: '1px',
                    borderColor: 'grey.500',
                    color: 'grey.700',
                    pointerEvents: 'none', // Prevents any mouse events
                    '&.Mui-disabled': {
                        borderColor: 'grey.500', // Keep border color when disabled
                        color: 'grey.700' // Keep text color when disabled
                    }
                    }}
                >
                    {locale === 'fr' ? pole.name_fr : pole.name_en}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}