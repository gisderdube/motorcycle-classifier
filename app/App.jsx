import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import GlobalStyles from "./GlobalStyles";
import Result from "./Result";

const motorcycles = [
  {
    title: "Yamaha XSR 900",
    image: require("./assets/motorcycles/xsr900.jpg"),
    label: "xsr900"
  },
  {
    title: "Ducati Scrambler",
    image: require("./assets/motorcycles/scrambler.jpg"),
    label: "scrambler"
  },
  {
    title: "Kawasaki Z900",
    image: require("./assets/motorcycles/z900.jpg"),
    label: "z900"
  },
  {
    title: "BMW S1000RR",
    image: require("./assets/motorcycles/s1000rr.jpg"),
    label: "s1000rr"
  },
  {
    title: "Honda CBR1000RR-R Fireblade",
    image: require("./assets/motorcycles/fireblade.jpg"),
    label: "fireblade"
  },
  {
    title: "Ducati Panigale V2",
    image: require("./assets/motorcycles/panigale-v2.jpg"),
    label: "panigale-v2"
  }
];

const Container = styled.div`
  padding: 25px calc((100vw - 860px) / 2);

  @media (max-width: 900px) {
    padding: 25px 20px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Image = styled.img`
  height: 150px;
  margin: 15px;
  cursor: ${props => (props.isLoading ? "progress" : "pointer")};
`;

const App = () => {
  const [state, setState] = useState({
    loading: false,
    imageSrc: "",
    classification: ""
  });

  async function uploadFile(file) {
    const imageSrc = URL.createObjectURL(file);

    setState({
      imageSrc,
      loading: true,
      classification: ""
    });

    const formData = new FormData();
    formData.append("file", file);

    const result = await axios.post(
      `${process.env.SERVER_URL || ""}/classify`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    setState({
      loading: false,
      imageSrc,
      classification: result.data.classification
    });
  }

  const inputRef = useRef(null);

  return (
    <Container>
      <GlobalStyles></GlobalStyles>
      <h1>Motorcycle Classifier</h1>
      <p>
        Use this Deep Learning Model to distinguish between different
        motorcycles! The classifier works with the following (motorcycle)
        models:
      </p>
      <ul>
        {motorcycles.map(m => (
          <li key={m.title}>{m.title}</li>
        ))}
      </ul>
      <p>
        In case you don't have images of those motorcycles flying around, feel
        free to google one and place it in here.
      </p>
      <Result {...state} motorcycles={motorcycles}></Result>
      <br />
      <h3>Upload your own:</h3>
      <input
        type="file"
        ref={inputRef}
        accept="image/jpeg"
        disabled={state.loading}
        onChange={() => {
          uploadFile(inputRef.current.files[0]);
        }}
      />
      <br />
      <br />
      <h3>Pick sample image:</h3>

      <ImageWrapper>
        {motorcycles.map(m => (
          <Image
            src={m.image}
            isLoading={state.loading}
            key={m.title}
            alt={m.title}
            onClick={() => {
              if (state.loading) return;
              inputRef.current.value = null;
              setState({
                imageSrc: m.image,
                classification: m.label
              });
            }}
          />
        ))}
      </ImageWrapper>
      <hr />
      <p style={{ textAlign: "center" }}>
        Built by{" "}
        <a href="https://github.com/gisderdube" target="_blank">
          Lukas Gisder-Dubé
        </a>{" "}
        with the help of{" "}
        <a href="https://www.fast.ai/" target="_blank">
          fast.ai
        </a>
      </p>
    </Container>
  );
};

export default App;
