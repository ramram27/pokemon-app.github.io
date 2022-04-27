import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CardBody,
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const Deck = ({ pokemon }) => {
  const [pokemonData, setPokemonData] = useState();
  const [abilitiesModal, setAbilitiesModal] = useState(false);
  const [statModal, setStatModal] = useState(false);
  const [movesModal, setMovesModal] = useState(false);

  const toggleAbilities = () => setAbilitiesModal(!abilitiesModal);
  const toggleMoves = () => setMovesModal(!movesModal);
  const toggleStat = () => setStatModal(!statModal);

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((response) => {
        console.log(response.data);
        setPokemonData(response.data);
      })
      .catch((err) => console.log("Error getting Pokemon's Data", err));
  }, [pokemon.url]);

  if (!pokemonData)
    return (
      <Card>
        <h2 style={{ marginTop: "50%" }}>
          Loading <Spinner color="dark" />
        </h2>
      </Card>
    );

  return (
    <>
      <Card>
        <CardTitle>
          <h4>
            {pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)}
          </h4>
        </CardTitle>

        <CardBody>
          <CardImg
            top
            width="100%"
            height="150"
            src={pokemonData.sprites.front_default}
            alt={`No Image Available`}
          />

          <CardSubtitle>
            <h5>
              Type:{" "}
              {pokemonData.types.map((obj, index) =>
                index < pokemonData.types.length - 1
                  ? `${obj.type.name}, `
                  : obj.type.name
              )}
            </h5>
          </CardSubtitle>

          <div className="info">
            <CardText key="pokeNumber">
              Pokemon Number: {pokemonData.order}
            </CardText>

            <CardText key="size">
              {`Height: ${pokemonData.height}ft., Weigth: ${pokemonData.weight}lbs.`}
            </CardText>

            <CardText key="stats">
              <Button color="link" onClick={toggleStat}>
                View Stats
              </Button>
              <Modal isOpen={statModal} toggle={toggleStat} className="popup">
                <ModalHeader toggle={toggleStat}>
                  {pokemonData.name[0].toUpperCase() +
                    pokemonData.name.slice(1)}{" "}
                  Stats:
                </ModalHeader>
                <ModalBody>
                  {pokemonData.stats.map((obj, index) => (
                    <li key={index}>
                      <strong>{`${obj.stat.name[0].toUpperCase()}${obj.stat.name.slice(
                        1
                      )}:`}</strong>{" "}
                      {` ${obj.base_stat} with ${obj.effort} effort`}
                    </li>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleStat}>
                    Close
                  </Button>{" "}
                </ModalFooter>
              </Modal>
            </CardText>

            <CardText key="moves">
              <Button color="link" onClick={toggleMoves}>
                View Moves
              </Button>
              <Modal isOpen={movesModal} toggle={toggleMoves} className="popup">
                <ModalHeader toggle={toggleMoves}>
                  {pokemonData.name[0].toUpperCase() +
                    pokemonData.name.slice(1)}{" "}
                  Moves:
                </ModalHeader>
                <ModalBody>
                  {pokemonData.moves.map((obj, index) => (
                    <li
                      key={index}
                    >{`${obj.move.name[0].toUpperCase()}${obj.move.name.slice(
                      1
                    )}`}</li>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleMoves}>
                    Close
                  </Button>{" "}
                </ModalFooter>
              </Modal>
            </CardText>

            <CardText key="abilities">
              <Button color="link" onClick={toggleAbilities}>
                View Abilities
              </Button>
              <Modal
                isOpen={abilitiesModal}
                toggle={toggleAbilities}
                className="popup"
              >
                <ModalHeader toggle={toggleAbilities}>
                  {pokemonData.name[0].toUpperCase() +
                    pokemonData.name.slice(1)}{" "}
                  Abilities:
                </ModalHeader>
                <ModalBody>
                  {pokemonData.abilities.map((obj, index) => (
                    <li
                      key={index}
                    >{`${obj.ability.name[0].toUpperCase()}${obj.ability.name.slice(
                      1
                    )}`}</li>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggleAbilities}>
                    Close
                  </Button>{" "}
                </ModalFooter>
              </Modal>
            </CardText>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Deck;
