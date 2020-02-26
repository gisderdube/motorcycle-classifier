import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  background-color: rgb(245, 245, 245);
`;

const Image = styled.img`
  width: 250px;
`;

const Result = ({ loading, imageSrc, classification, motorcycles }) => {
  return (
    <Wrapper>
      {imageSrc && <Image src={imageSrc}></Image>}
      {loading && <h4>Loading...</h4>}
      {!imageSrc && !loading && (
        <p>Upload your own image or pick one of the sample images below.</p>
      )}
      {classification && (
        <h3>
          Predicted Motorcycle Model:{" "}
          {motorcycles.find(m => m.label === classification).title}
        </h3>
      )}
    </Wrapper>
  );
};

export default Result;
