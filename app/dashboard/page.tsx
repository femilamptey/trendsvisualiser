"use client"

import {
    Main,
    ResultsSection,
    ResultsSectionTitle, SearchButton,
    SearchContainer, SearchField,
    SearchSection,
    SearchSectionTitle
} from "@/app/dashboard/layout";
import ReactSearchBox from "@/node_modules/react-search-box";
import React from "react";
import {useState} from "react";
import {TextField} from "@mui/material";
import GoogleTrendsClient from "@/app/lib/GoogleTrendsClient";

const Dashboard = () => {


    const [topic, setTopic] = useState("");
    const [searchField, setSearchField] = useState("");

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    }

    const handleButtonClick = () => {
        setTopic(searchField);         // sets the state of topic to the value in the search field
        const googleTrendsClient = new GoogleTrendsClient("e0830286deeb1cf27970bf595c26c08de582b4e91f43b1bd3a8f3b6b44a13ef1");
        googleTrendsClient.fetchTrendingCountries(topic).then(r => console.log(r));
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

export default Dashboard;