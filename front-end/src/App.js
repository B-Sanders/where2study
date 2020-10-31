import { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'rsuite';

const StyledButton = styled(Button)`
  width: 200px;
  height: 100px;
`;

const TestWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [ count, setCount ] = useState(0);
  return (
    <TestWrapper>
      Hello
      <StyledButton appearance="primary" onClick={() => { setCount(count + 1)}}>Click Me</StyledButton>
      <h2>Current count: {count}</h2>
    </TestWrapper>
  );
}

export default App;
