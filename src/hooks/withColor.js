import React, { useContext, Component } from 'react';
import { Context as ColorContext } from '../context/ColorContext';
const Colored = ({ children }) => {
  const {
    state: { colors },
  } = useContext(ColorContext);

  const coloredElement = React.cloneElement(children, { colors });

  return coloredElement;
};

export default Colored;
