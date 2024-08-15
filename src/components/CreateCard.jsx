import { useState } from "react";
import styled from "styled-components";
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';
const AddCardButton = styled.button`
  padding: 10px 20px;
  background-color: #808d7c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  height: 50px;
  width: 100px;
  margin-top: 43px;

  &:hover {
    background-color: #5f6f65;
  }
`;

const Wrapper = styled.div`
  background-color: #ccd5ae;
  div {
    display: flex;
    justify-content: space-around;
    align-content: baseline;
    margin: 0 auto;
    width: 50pc;
  }
`;

const TextArea = styled.textarea`
  width: 480px;
  margin: 30px auto 20px auto;
  background: #e0e5b6;
  padding: 15px;
  border-radius: 7px;
  box-shadow: 0 1px 5px rgb(138, 137, 137);
  border: none;

  font-size: 1.2em;
  font-family: inherit;
`;

const CreateCard = (props) => {
  
  const { cards, setCards } = props;

  const [text, setText] = useState("");
 
  const addCard = () => {
    const id  = uuidv4() 
    const newId = `card${id}`;

    const oldCard = cards[cards.length - 1];

    let X = oldCard.x + 320;
    let Y = oldCard.y;
    if (oldCard.x > 1000) {
      X = 50;
      Y = oldCard.y + 230;
    }

    setCards([
      ...cards,
      { id: newId, text: text, x: X, y: Y, width: 250, height: 200 },
    ]);

    setText("");
  };

  return (
    <Wrapper>
      <div>
        <TextArea
          onChange={(e) => setText(e.target.value)}
          type="text"
          value={text}
          required
        />
        <AddCardButton onClick={addCard}>Add Card</AddCardButton>
      </div>
    </Wrapper>
  );
};

CreateCard.propTypes = {
  cards: PropTypes.array.isRequired,
  setCards: PropTypes.func.isRequired
}

export default CreateCard;
