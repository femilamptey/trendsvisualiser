import styled from "styled-components";

const Main = styled.main`
    background-color: white;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
`

const SearchSection = styled.div`
    display: flex;
    background-color: #44713B;
    height: 27vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const SearchSectionTitle = styled.h1`
    color: white;
`

const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    color: #EEFFEB;
    align-items: center;
    width: 280px;     // modify as per your needs 
    height: 70px;     // modify as per your needs 
`;

const SearchField = styled.input`
    width: 200px;     // modify as per your needs 
    height: 30px;     // modify as per your needs
    background-color: white;
    color: black;
`;

const SearchButton = styled.button`
  background-color: white;
  color: green;
  padding: 10px; // modify as per your needs
  border: none;
  cursor: pointer;
`;

const ResultsSection = styled.div`
    display: flex;
    height: 73vh;
    width: 100vw;
    justify-content: center;
`

const ResultsSectionTitle = styled.h1`
    color: black;
`

export {Main, SearchSection, ResultsSection, SearchSectionTitle, SearchContainer, SearchField, SearchButton, ResultsSectionTitle};
