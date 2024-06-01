import React from 'react';
import { Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
    return (
        <Flex bg="gray.600" py="4" px="2">
            <Text fontSize="lg" color="white" fontWeight="bold">
                Yapılacaklar Listesi
            </Text>
        </Flex>
    )
}

export default Navbar