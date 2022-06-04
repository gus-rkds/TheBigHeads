import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useRef, useLayoutEffect } from "react";
import styled, { keyframes } from "styled-components";
import Vector from "../Icons/Vector";

const bounce = keyframes`from { transform: translateX(-50%) scale(0.5); }
to {transform: translateX(-50%) scale(1);}`;

const Ball = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.text};
  animation: ${bounce} 0.5s linear infinite alternate;

  @media (max-width: 48em) {
    left: 1rem;
  }
`;

const VectorContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  overflow: hidden;

  svg {
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  @media (max-width: 48em) {
    left: 1rem;
  }
`;

const DrawSvg = () => {
  const ref = useRef(null);
  const ballRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let element = ref.current;

    let svg = document.getElementsByClassName("svg-path")[0];

    const length = svg.getTotalLength();

    // start positioning of svg drawing
    svg.style.strokeDasharray = length;
    // hide svg before scrolling start
    svg.style.strokeDashoffset = length;

    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom bottom",
        onUpdate: (self) => {
          const draw = self.progress * length;
          // also reverse the drawing when scroll goes up
          svg.style.strokeDashoffset = length - draw;
        },
        onToggle: (self) => {
          if (self.isActive) {
            ballRef.current.style.display = "none";
          } else {
            ballRef.current.style.display = "inline-block";
          }
        },
      },
    });
    return () => {
      if (t1) {
        t1.kill();
      }
    };
  }, []);

  return (
    <>
      <Ball ref={ballRef} />
      <VectorContainer ref={ref}>
        <Vector>DrawSvg</Vector>
      </VectorContainer>
    </>
  );
};

export default DrawSvg;
