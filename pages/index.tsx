import { Inter } from "next/font/google";
import axios from "axios";
import {useState} from "react";
import {
  Main,
  ResultsSection, ResultsSectionTitle,
  SearchButton,
  SearchContainer,
  SearchField,
  SearchSection,
  SearchSectionTitle
} from "@/pages/layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [topic, setTopic] = useState("");
  const [searchField, setSearchField] = useState("");
  const [topicTrends, setTopicTrends] = useState([]);

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  }

  const handleButtonClick = async () => {
    setTopic(searchField);         // sets the state of topic to the value in the search field
    axios.post('/api/proxy', {
      data: {
        topic: topic,
      },
    }).then(response => {
      console.log(response.data);
      setTopic(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

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
              Your Topic is Trending in:

            </ResultsSectionTitle>
          </ResultsSection>
        </div>
      </Main>
  );
}
