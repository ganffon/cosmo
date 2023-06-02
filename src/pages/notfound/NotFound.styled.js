import styled, { keyframes } from "styled-components";

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// export const NotFoundArea = styled("div")`
//   height: 100vh;
//   background-color: rgb(210, 237, 255);
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   animation: ${fadeIn} 1s ease-in;
// `;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(210, 237, 255);
  animation: ${fadeIn} 1s ease-in;
`;

export const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Description = styled.h3`
  font-size: 1.5rem;
  text-align: center;
`;
