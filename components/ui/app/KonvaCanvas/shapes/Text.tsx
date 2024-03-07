import { TextConfig } from 'konva/lib/shapes/Text';
import React from 'react';
import { Text } from 'react-konva';

type TextProps = {
  config: TextConfig;
};

const TextShape = ({ config }: TextProps) => {
  return <Text />;
};

export default TextShape;
