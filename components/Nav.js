import Link from 'next/link';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer
} from '@chakra-ui/react';
import { AiOutlineHome, AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai';
import { BsKey } from 'react-icons/bs';

function Nav() {
  return (
    <Flex p="2" borderBottom="1px" borderColor="green.900">
      <Box fontSize="3xl" color="green.500" fontWeight="semibold">
        <Link href="/" paddingLeft="4">
          Realtor
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<AiOutlineMenu />}
            variant="outlined"
            color="green.600"
          />
          <MenuList>
            <Link href="/" passHref>
              <MenuItem icon={<AiOutlineHome />}>Home</MenuItem>
            </Link>
            <Link href="/search" passHref>
              <MenuItem icon={<AiOutlineSearch />}>Search</MenuItem>
            </Link>
            <Link href="/search?purpose=for-sale" passHref>
              <MenuItem icon={<BsKey />}>Buy Property</MenuItem>
            </Link>
            <Link href="/search?purpose=for-rent" passHref>
              <MenuItem icon={<BsKey />}>Rent Property</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Nav;
