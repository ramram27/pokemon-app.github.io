import React from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const PagesBtns = styled.div`
  text-align: center;
  margin: 30px 0;

  button {
    width: 100px;
  }
`;

const Pages = ({ pokemonData, setOffset }) => {
  return (
    <PagesBtns className="page_nav">
      <Button
        color="primary"
        onClick={() =>
          pokemonData.previous
            ? setOffset(
                pokemonData.previous.slice(pokemonData.previous.indexOf("?"), 8)
              )
            : null
        }
      >
        Prev
      </Button>{" "}
      <Button
        color="primary"
        onClick={() =>
          pokemonData.next
            ? setOffset(
                pokemonData.next.slice(pokemonData.next.indexOf("?"), 8)
              )
            : null
        }
      >
        Next
      </Button>{" "}
    </PagesBtns>
  );
};

export default Pages;
