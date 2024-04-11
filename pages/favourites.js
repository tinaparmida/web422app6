import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';
import { Container, Row, Col } from 'react-bootstrap';

const Favourites = () => {
    // Get a reference to the favouritesList from the favouritesAtom
    const [favouritesList] = useAtom(favouritesAtom);

    // Check if favouritesList is null, if so, return null to prevent rendering the component temporarily
    if (!favouritesList) return null;
  
    return (
      <Container>
        <Row>
          <Col>
            <h1>Favourites</h1>
          </Col>
        </Row>
        {favouritesList.length === 0 ? (
          <Row>
            <Col>
              <p>Nothing Here. Try adding some new artwork to the list.</p>
            </Col>
          </Row>
        ) : (
          <Row>
            {favouritesList.map(objectID => (
              <Col key={objectID} sm={12} md={6} lg={4} xl={3}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    );
  };
  
  export default Favourites;
