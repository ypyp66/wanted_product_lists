import styled from 'styled-components';
import Button from 'components/Button/index';

export const RecentListContainer = styled.div`
  max-width: 1080px;
  margin: auto;
`;
export const HeaderContainer = styled.div`
  margin: 24px 24px 0 24px;
`;
export const CustomButton = styled(Button)`
  min-width: 80px;
`;
export const FilterContainer = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;

  button + button {
    margin-left: 20px;
  }

  div {
    display: flex;
    align-items: center;
  }
`;
