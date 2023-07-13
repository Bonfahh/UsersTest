import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const SearchInput = styled.TextInput`
  width: 90%;
  height: 40px;
  padding-left: 5px;
  border-color: lightgray;
  border-width: 1px;
  border-radius: 8px;
  background-color: gray;
  margin-bottom: 10px;
`;

export const ContentWrap = styled.View`
  flex: 1;
  align-items: center;
`;

export const DeleteButton = styled.TouchableOpacity``;

export const DeleteText = styled.Text`
  font-size: 16px;
  color: blue;
`;
