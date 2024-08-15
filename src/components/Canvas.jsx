import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import PropTypes from 'prop-types';
// React-icons
import { MdOutlineClose } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineReadMore } from "react-icons/md";
import { IoMdResize } from "react-icons/io";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  position: relative;
  border: 1px solid #ccc;
  background-color: #FAEDCE;
`;
const Card = styled.div`
  background-color: #E0E5B6;
  border: 1px solid #ddd;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: #808D7C;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: x-large;

  &:hover {
    background-color: #5F6F65;
  }

`;
const Wrapper = styled.div`
  width: 1380px;
  height: 100vh;
  width: 0 auto;
margin-top: 50px;
margin-left: 100px;
  position: relative;
`;
const MoreText = styled.div`
  background-color: #C9DABF;
  position: fixed;
  top: 20%;
  left: 20%;
  right: 20%;
  width: auto;
  height: auto;
`;

const DesignDiv = styled.div`
padding: 5px 0;
display: flex;
justify-content: space-between;
align-items: center;
  height: 30px;
  width: 100%;
  background-color: #9CA986;
`;
const Text = styled.div`
  margin: 20px;
`;

const Canvas = (props) => {
  const [showMore, setShowMore] = useState(false);
  const [detailCard, setDetailCard] = useState({});
  const { cards, setCards } = props;
  const svgRef = useRef(null);
  const handleReadMore = (id) => {
    setDetailCard(cards.filter((card) => card.id === id));
    setShowMore(true);
  };
  const drawLines = () => {
    const svg = svgRef.current;
    svg.innerHTML = ""; 
    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const startCard = document.getElementById(card.id);
        const endCard = document.getElementById(cards[index + 1].id);
        if (startCard && endCard) {
          const startRect = startCard.getBoundingClientRect();
          const endRect = endCard.getBoundingClientRect();
          const startX = startRect.right - startRect.width / 2;
          const startY = (startRect.top + startRect.height / 2)-190
          const endX = endRect.left + endRect.width / 2;
          const endY = (endRect.top + endRect.height / 2)-190
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line.setAttribute("x1", startX);
          line.setAttribute("y1", startY);
          line.setAttribute("x2", endX);
          line.setAttribute("y2", endY);
          line.setAttribute("stroke", "#9CA986");
          line.setAttribute("stroke-width", "2");
          svg.appendChild(line);
        }
      }
    });
  };
  useEffect(() => {
    drawLines();
  }, [cards]);


  const handleDeleteCard = (id) => {
setCards(cards.filter(card=> card.id !== id ))
setShowMore(false)
  } 

  return (
    <CanvasContainer>
      <svg
        ref={svgRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />
      <Wrapper>
        {cards.map((card) => (
          <Rnd
            key={card.id}
            default={{
              x: card.x,
              y: card.y,
              width: card.width,
              height: card.height,
            }}
            onDragStop={() => drawLines()}
            onResizeStop={() => drawLines()}
            id={card.id}
            resizeHandleStyles={
                <IoMdResize />
            }
          >
            <Card>
            <DesignDiv >  
            <Button onClick={() => handleReadMore(card.id)}><MdOutlineReadMore /></Button>
            </DesignDiv>
              <Text>{card.text.slice(0, 180) + "..."}</Text>
              
            </Card>
          </Rnd>
        ))}
      </Wrapper>
      {showMore && (
        <MoreText>
          <DesignDiv>
          <Button onClick={()=>handleDeleteCard(detailCard[0].id)} ><RiDeleteBin6Fill /></Button>
            <Button onClick={() => setShowMore(false)}><MdOutlineClose /></Button>
          </DesignDiv>
          <Text>{detailCard[0].text}</Text>
        </MoreText>
      )}
    </CanvasContainer>
  );
};

Canvas.propTypes = {
  cards: PropTypes.array.isRequired,
  setCards: PropTypes.func.isRequired
}

export default Canvas;
