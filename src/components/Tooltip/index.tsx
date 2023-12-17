import React, { PropsWithChildren } from 'react';

import { Container } from './styles';

type TooltipProps = PropsWithChildren<{
  title: string;
  className?: string;
}>;

const Tooltip: React.FC<TooltipProps> = ({ title, children, className }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
