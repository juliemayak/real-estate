import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg';

function Search({ properties }) {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        fontWeight="bold"
        p="2"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters(!searchFilters)}
        // onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text p="4" fontWeight="bold" fontSize="2xl">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginBottom="5"
          marginTop="5"
        >
          <Image src={noresult} alt="no-result" />
          <Text fontSize="2xl" marginTop="3">
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );
  return {
    props: {
      properties: data?.hits
    }
  };
}
