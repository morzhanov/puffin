import React from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  margin-bottom: 50px;
`;

const App = ({root}) =>
    <Wrapper>
        Pufin
    </Wrapper>;

export default inject('root')(observer(App));
