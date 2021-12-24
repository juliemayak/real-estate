import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
// import noresult from '../assets/images/noresult.svg';

function SearchFilters() {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters.map(({ queryName, placeholder, items }) => (
        <Box key={queryName}>
          <Select
            placeholder={placeholder}
            w="fit-content"
            p="2"
            onChange={(e) => searchProperties({ [queryName]: e.target.value })}
          >
            {items?.map(({ name, value }) => (
              <option value={value} key={value}>
                {name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
}

export default SearchFilters;
