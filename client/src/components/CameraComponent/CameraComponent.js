import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, ButtonGroup } from 'react-bootstrap';

import './CameraComponent.css';

function CameraComponent() {
  const FACING_MODE_USER = 'user';
  const FACING_MODE_ENVIRONMENT = 'environment';

  const [toggleCamera, setToggleCamera] = useState(false);
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const [capturedPhoto, setCapturedPhoto] = useState(false);

  const webCamRef = useRef(null);
  const webCamParentDivRef = useRef(null);

  const videoConstraints = {
    facingMode: FACING_MODE_USER,
    width: webCamParentDivRef?.current?.clientWidth || 100,
    height: webCamParentDivRef?.current?.clientWidth || 100,
  };

  const handleSwitch = useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER,
    );
  }, []);

  const handleShutter = useCallback(() => {
    console.log(webCamRef.current);
    const imageSrc = webCamRef.current.getScreenshot();
    setCapturedPhoto(imageSrc);
    setToggleCamera(false);
  }, [webCamRef]);

  return (
    <div className="camera-component">
      <ButtonGroup>
        <Button
          variant={toggleCamera ? 'danger' : 'primary'}
          onClick={() => {
            setToggleCamera(!toggleCamera);
            setCapturedPhoto(null);
          }}
        >
          {toggleCamera ? 'Close Camera' : 'Open Camera'}
        </Button>
        {toggleCamera && (
          <Button variant="secondary" onClick={() => handleSwitch()}>
            {toggleCamera && 'Switch Camera'}
          </Button>
        )}
        {toggleCamera && (
          <Button variant="secondary" onClick={() => handleShutter()}>
            {toggleCamera && 'Capture Photo'}
          </Button>
        )}
      </ButtonGroup>
      <div className="webcam" ref={webCamParentDivRef}>
        {toggleCamera ? (
          <Webcam
            ref={webCamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              ...videoConstraints,
              facingMode,
            }}
          />
        ) : null}
      </div>
      {capturedPhoto && <img alt="" src={capturedPhoto} />}
    </div>
  );
}

export default CameraComponent;
