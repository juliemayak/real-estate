import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={MdOutlineNavigateBefore}
        onClick={() => scrollPrev()}
        fontSize="4xl"
        cursor="pointer"
        color="black"
        _hover={{ color: 'green', transform: 'scale(1.25)' }}
        transition="all 0.3s ease-in-out"
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={MdOutlineNavigateNext}
        onClick={() => scrollNext()}
        fontSize="4xl"
        cursor="pointer"
        color="black"
        _hover={{ color: 'green', transform: 'scale(1.25)' }}
        transition="all 0.3s ease-in-out"
      />
    </Flex>
  );
};

function ImageScrollbar({ data }) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{ overflow: 'hidden' }}>
      {data.map((item) => (
        <Box
          // w={910}
          key={item.id}
          itemId={item.id}
          // p="1"
          _hover={{ opacity: '0.8' }}
          transition="all 0.3s ease-in-out"
          width={888}
          height={500}
          position="relative"
          overflow="hidden"
          rounded="xl"
        >
          <Image
            placeholder="blur"
            blurDataURL={item.url}
            src={item.url}
            layout="fill"
            objectFit="cover"
            // width={900}
            // height={500}
            // sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
}

export default ImageScrollbar;
