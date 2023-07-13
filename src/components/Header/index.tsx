import React from 'react';
import {Button, ButtonText, Container, Row, Title} from './styles';

type HeaderProps = {
  handleSort: () => void;
  handleRestore: () => void;
};

const Header = ({handleSort, handleRestore}: HeaderProps) => {
  return (
    <Container>
      <Row>
        <Button onPress={() => handleSort()}>
          <ButtonText>Sort</ButtonText>
        </Button>
        <Title>Users</Title>
        <Button onPress={() => handleRestore()}>
          <ButtonText>Restore</ButtonText>
        </Button>
      </Row>
    </Container>
  );
};

export default Header;
