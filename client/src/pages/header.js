import React from 'react';

class header extends React.Component {
  render() {
    return (
      <header className='main-header'>
        <div className="logo-container">
          <img src="helper.png" alt="로고" className="logo" />
          <h1>Helper</h1>
        </div>
      </header>
    );
  }
}

export default header;