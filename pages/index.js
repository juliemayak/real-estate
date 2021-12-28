import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button, Divider } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

const Banner = ({ imageUrl, purpose, title1, title2, desc1, desc2, linkName, buttonText }) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Box overflow="hidden" rounded="xl" width={500} height={300} position="relative">
        <Image src={imageUrl} alt="banner" layout="fill" objectFit="cover" />
      </Box>
      <Box p="5">
        <Text color="gray.700" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1} <br /> {title2}
        </Text>
        <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.600">
          {desc1} <br /> {desc2}
        </Text>
        <Button
          fontSize="xl"
          bg="green.700"
          color="white"
          fontWeight="light"
          borderColor="green.900"
          borderWidth="2px"
          boxShadow="md"
          rounded="lg"
          _hover={{ bg: 'gray.200', color: 'green.700' }}
          transition="all 0.3s ease-in-out"
        >
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};
export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Divider />
      <Flex flexWrap="wrap" justifyContent="center" pt={10}>
        {propertiesForRent.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </Flex>
      <Divider />
      <Banner
        purpose="BUY A HOME"
        title1="Find & Own Your"
        title2="Dream Home"
        desc1="Explore from Apartments, builder floors,"
        desc2="villas and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Divider />
      <Flex flexWrap="wrap" justifyContent="center" pt={10}>
        {propertiesForSale.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits
    }
  };
}
