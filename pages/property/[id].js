import { useState } from 'react';
import { Button, Collapse } from '@chakra-ui/react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

function PropertyDetails({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos
  }
}) {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Box maxWidth="1000px" margin="auto" p="4">
      {photos && <ImageScrollbar data={photos} />}
      <Box w="full" p="6">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green.600">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price / 4)}
              {rentFrequency && ` / ${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="xl" src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="teal.700"
          fontWeight="semibold"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
        </Flex>
        <Box marginTop="2">
          <Text fontSize="lg" marginBottom="2" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="lg" marginBottom="2" fontWeight="bold">
            Learn details below:
          </Text>
          <Collapse lineHeight="2" color="gray.600" startingHeight={90} in={show}>
            {description}
          </Collapse>
          <Button size="sm" onClick={handleToggle} mt="15px">
            Show {show ? 'Less' : 'More'}
          </Button>
        </Box>
        <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between" mt="10px">
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Type</Text>
            <Text fontWeight="bold">{type}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Purpose</Text>
            <Text fontWeight="bold">{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Furnishing Status</Text>
              <Text fontWeight="bold">{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>

        {amenities.length && (
          <Box>
            <Text fontSize="2xl" fontWeight="black" marginTop="5" marginLeft="1">
              Amenities
            </Text>
            <Flex flexWrap="wrap">
              {amenities.map((item) =>
                item.amenities.map((amenity) => (
                  <Text
                    fontWeight="bold"
                    color="green.500"
                    bg="gray.100"
                    m="1"
                    p="2"
                    borderRadius="5"
                    key={amenity.text}
                  >
                    {amenity.text}
                  </Text>
                ))
              )}
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PropertyDetails;

//params <- coming from the url
export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data
    }
  };
}
