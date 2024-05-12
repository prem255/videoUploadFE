import React from 'react'
import { Stack,Button } from '@mui/material'

const Sidebar = ({ selectedCategory, setSelectedCategory,cat}) => {
    return (
        <Stack direction="row" sx={{
            overflowY: "auto", height: { sx: 'auto', md: '95%' },
            flexDirection: { md: 'column' }
          }}>
            {cat?cat.map((category,index) => (
              <Button
                key={index} 
                className='category-btn'
                style={{
                  background: category.name === selectedCategory && '#FC1503',
                  color: 'white'
                }}
                onClick={() => setSelectedCategory(category.name)}
              >
                <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8' }}>{category.name}</span>
              </Button>
            )):""}
          </Stack>
    )
}

export default Sidebar