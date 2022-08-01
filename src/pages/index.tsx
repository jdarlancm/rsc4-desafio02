import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = 0 }) => {
    const response = await api.get(`/api/images?after=${pageParam}`);
    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: ({ after }) => {
      return after ? after : null;
    },
  });

  const formattedData = useMemo(() => {
    if (data) {
      const pages = data.pages;
      return pages
        .map(item => {
          return item.data;
        })
        .flat();
    }
    return [];
  }, [data]);

  if (isLoading) {
    return (
      <>
        {' '}
        <Loading />
      </>
    );
  }

  if (isError) {
    return (
      <>
        {' '}
        <Error />
      </>
    );
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
      </Box>

      {hasNextPage && (
        <Button
          type="submit"
          size="sm"
          fontSize="sm"
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Carregar Mais
        </Button>
      )}
    </>
  );
}
