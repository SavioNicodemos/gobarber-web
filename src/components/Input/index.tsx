import React, {
  FocusEvent,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
  value?: string;
  disabled?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  containerStyle = {},
  icon: Icon,
  value,
  error,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = !!value;

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(
    (e: FocusEvent<HTMLInputElement, Element>) => {
      setIsFocused(false);

      onBlur && onBlur(e);
    },
    [onBlur],
  );

  return (
    <Container
      style={containerStyle}
      $isErrored={!!error}
      $isFocused={isFocused}
      $isFilled={isFilled}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={value}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
