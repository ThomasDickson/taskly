import React from 'react'

// components
import { 
    Button, Flex, HStack, Heading, Link, Switch 
} from '@chakra-ui/react'

// icons
import { ExternalLinkIcon } from '@chakra-ui/icons'

// hooks
import { useColorMode } from '@chakra-ui/react'

const Navbar = () => {
    // toggle between light and dark mode
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            p={3}
            borderWidth='0 0 1px 0'
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