import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { favouritesAtom } from '../store';

const ArtworkCardDetail = ({ objectID }) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  const favouritesClicked = async () => {
    try {
      if (showAdded) {
        await setFavouritesList(await removeFromFavourites(objectID));
      } else {
        await setFavouritesList(await addToFavourites(objectID));
      }
      setShowAdded(!showAdded);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');
        error.status = res.status;
        throw error;
      }
      return res.json();
    }
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    classification,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    objectDate,
    title,
    artistWikidata_URL,
  } = data;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} alt="Artwork Image" />}
      <Card.Body>
        {title && (
          <>
            <Card.Title>{title}</Card.Title>
          </>
        )}
        {objectDate && (
          <>
            <Card.Text>
              <strong>Date:</strong> {objectDate}
            </Card.Text>
          </>
        )}
        {classification && (
          <>
            <Card.Text>
              <strong>Classification:</strong> {classification}
            </Card.Text>
          </>
        )}
        {medium && (
          <>
            <Card.Text>
              <strong>Medium:</strong> {medium}
            </Card.Text>
          </>
        )}
        {artistDisplayName && (
          <>
            <Card.Text>
              <strong>Artist:</strong> {artistDisplayName}{' '}
              {artistWikidata_URL && (
                <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                  wiki
                </a>
              )}
            </Card.Text>
          </>
        )}
        {creditLine && (
          <>
            <Card.Text>
              <strong>Credit Line:</strong> {creditLine}
            </Card.Text>
          </>
        )}
        {dimensions && (
          <>
            <Card.Text>
              <strong>Dimensions:</strong> {dimensions}
            </Card.Text>
          </>
        )}
        <Link href={`/artwork/${objectID}`} passHref>
          <Button as="a" variant="primary">
            View Details (ID: {objectID})
          </Button>
        </Link>
        <Button
          variant={showAdded ? 'primary' : 'outline-primary'}
          onClick={favouritesClicked}
        >
          {showAdded ? '- Remove from Favorites' : '+ Add to Favorites'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
