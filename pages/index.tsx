import { Inter } from "next/font/google";
import axios from "axios";
import { SetStateAction, useState, useEffect } from "react";  // Import useEffect here
import {
  Main,
  ResultsSection,
  ResultsSectionTitle,
  SearchButton,
  SearchContainer,
  SearchField,
  SearchSection,
  SearchSectionTitle
} from "@/pages/layout";
import TrendGraph from "@/pages/components/TrendGraph";

export default function Home() {

  const [topic, setTopic] = useState("");
  const [searchField, setSearchField] = useState("");
  const [topicTrends, setTopicTrends] = useState([]);

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  }

  const handleButtonClick = async () => {
    setTopic(searchField);         // sets the state of topic to the value in the search field
  }

  // Monitor the `topic` state variable and trigger the axios request whenever it changes.
  useEffect(() => {
    console.log(topic);
    if (topic) {
      axios.post('/api/proxy', {
        topic: topic,
      }).then(response => {
        console.log(response.data);
        // Filter out items with an extracted_value of 0 and then set the state
        const filteredData = response.data.filter(d => d.extracted_value > 0);
        setTopicTrends(filteredData);
      }).catch(error => {
        console.log(error);
      });
    }
  }, [topic]);

  return(
      <Main>
        <div>
          <SearchSection>
            <div>
              <SearchSectionTitle>
                Enter a Topic Here
              </SearchSectionTitle>
            </div>
            <div>
              <SearchContainer>
                <SearchField
                    placeholder="Enter Topic Here"
                    onChange={handleSearchFieldChange}
                />
                <SearchButton
                    onClick={handleButtonClick}
                > Search
                </SearchButton>
              </SearchContainer>
            </div>
          </SearchSection>
        </div>
        <div>
          <ResultsSection>
            <ResultsSectionTitle>
              {topic} is Trending in:
            </ResultsSectionTitle>
            <TrendGraph data={topicTrends} />
          </ResultsSection>
        </div>
      </Main>
  );
}