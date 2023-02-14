import { Row, Col } from 'react-bootstrap';

import NaviBar from './components/NaviBar/NaviBar';
import BasePage from './components/BasePage/BasePage';
import CameraComponent from './components/CameraComponent/CameraComponent';

import './App.css';

function App() {
  return (
    <div className="App">
      <NaviBar />
      <BasePage>
        <Row>
          <Col sm={6}>
            <CameraComponent />
          </Col>
          <Col sm={6}></Col>
        </Row>
      </BasePage>
    </div>
  );
}

export default App;
