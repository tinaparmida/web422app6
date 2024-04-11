import { Card, ListGroup, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { removeFromHistory } from '../lib/userData'; // Import removeFromHistory function
import styles from '@/styles/History.module.css'; 

const History = () => {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  // Parse the search history and create an array of objects
  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  // Function to navigate to the search results page for a specific history item
  const historyClicked = (e, index) => {
    e.stopPropagation(); // Stop the event from triggering other events
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // Function to remove a history item from the search history
  const removeHistoryClicked = async (e, index) => { // Make removeHistoryClicked asynchronous
    e.stopPropagation(); // Stop the event from triggering other events
    setSearchHistory(await removeFromHistory(searchHistory[index])); // Remove history item using removeFromHistory function
  };

  if (!searchHistory) return null; // Return null if searchHistory is not yet available

  return (
    <div>
      {parsedHistory.length === 0 ? (
        <Card className="my-4">
          <Card.Body>
            <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem} // Apply CSS module style
              onClick={(e) => historyClicked(e, index)} // Navigate to search results page on click
            >
              {Object.keys(historyItem).map((key, i) => (
                <span key={i}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)} // Remove history item on click
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default History;
