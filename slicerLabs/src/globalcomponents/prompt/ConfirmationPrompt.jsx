import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const AlertBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.cancel ? 'red' : 'green'};
  color: white;
  border: none;
  cursor: pointer;
`;

const ConfirmationLogoutPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleUnload = (e) => {
    if (showPrompt) {
      e.preventDefault();
      e.returnValue = '';
    }
  }

  const handleHidePrompt = () => {
    setShowPrompt(false);
  }

  const handleOk = () => {
    localStorage.removeItem('cart');
    window.location.reload();
  }

  useEffect(() => {
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    }
  }, [showPrompt]);

  return (
    <>
      {showPrompt && (
        <Container>
          <AlertBox>
            <h3>Warning</h3>
            <p>Leaving this page will remove all items from your cart.</p>
            <div>
              <Button onClick={handleHidePrompt} cancel>Cancel</Button>
              <Button onClick={handleOk} ok>OK</Button>
            </div>
          </AlertBox>
        </Container>
      )}
      <div onClick={() => setShowPrompt(true)}>
        // your page content here
      </div>
    </>
  );
}

export default ConfirmationLogoutPrompt;
