import React from 'react';
import connect from '../connect';


const mapStateToProps = () => {
};

@connect(mapStateToProps)
class App extends React.PureComponent {
  render() {
    return (
      <div>
        Hello world!
      </div>
    );
  }
}

export default App;
