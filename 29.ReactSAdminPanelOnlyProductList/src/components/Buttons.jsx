// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button } from '@chakra-ui/react'



function Buttons(props) {
    // eslint-disable-next-line react/prop-types
    const {color, children, discont, onDiscount} = props; 
  return (
    <Button colorScheme={color} onClick={onDiscount}>
        {children}
    </Button>
  )
}

export default Buttons