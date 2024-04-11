import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';

const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, 
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
    title,
    objectDate,
    classification,
    medium,
    objectID: artworkObjectID,
  } = data;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={primaryImage || 'https://via.placeholder.com/375x375.png?text=[Not+Available]'}
        alt={title || 'Image not available'}
      />
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || 'N/A'}<br />
          <strong>Classification:</strong> {classification || 'N/A'}<br />
          <strong>Medium:</strong> {medium || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${artworkObjectID}`} >
          <Button variant="primary">
            View Details (ID: {artworkObjectID})
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;

