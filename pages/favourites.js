import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';
import { Container, Row, Col } from 'react-bootstrap';

const Favourites = () => {
    // Get a reference to the favouritesList from the favouritesAtom
    const [favouritesList] = useAtom(favouritesAtom);
  
    return (
      <Container>
        <Row>
          <Col>
            <h1>Favourites</h1>
          </Col>
        </Row>
        {favouritesList == null ? (
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
  