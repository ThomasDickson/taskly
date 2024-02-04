import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, HStack, Heading, Link, Switch, useColorMode } from '@chakra-ui/react'
import React from 'react'

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            p={3}
            borderWidth='1px'
            justify='space-between'
            bg='whiteAlpha.50'
        >
            <Heading size='lg' color='purple.500'>taskly.</Heading>
            <HStack>
                <Switch
                    colorScheme="purple"
                    isChecked={colorMode === "dark"}
                    onChange={toggleColorMode}
                />
                <Button 
                    as={Link} 
                    href='http://localhost:8000/docs' 
                    isExternal 
                    rightIcon={<ExternalLinkIcon />}
                >
                    Docs
                </Button>
            </HStack>
            
        </Flex>
    )
}

export default Navbar