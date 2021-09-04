import React from 'react';
import { createPortal } from 'react-dom';
import './modal.scss';
import close from '../../assets/close.png';

// We get hold of the div with the id modal that we have created in index.html
const modalRoot = document.getElementById('modal');
class Modal extends React.Component {
  constructor(props) {
    super(props);
    // We create an element div for this modal
    this.element = document.createElement('div');
  }
  // We append the created div to the div#modal
  componentDidMount() {
    modalRoot.appendChild(this.element);
  }
  /**
   * We remove the created div when this Modal Component is unmounted
   * Used to clean up the memory to avoid memory leak
   */
  componentWillUnmount() {
    modalRoot.removeChild(this.element);
  }
  render() {
    const content = this.props.isOpen ? (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          padding: '2rem',
          paddingTop: '2rem',
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
        className='custom-modal'
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '1rem',
          }}
        >
          <div className='d-flex align-items-center justify-content-between'>
            <div
              style={{
                padding: '5px',
                textAlign: 'center',
              }}
            >
              {this.props.title || 'title'}
            </div>
            <div>
              <img onClick={this.props.onClose} src={close} width='30px' style={{cursor:'pointer'}} alt=""/>
            </div>
          </div>
          <hr></hr>
          <div className='custom-modal-content'>{this.props.children}</div>
          {this.props.footer && (
            <React.Fragment>
              <hr></hr>
              <div>{this.props.footer}</div>
            </React.Fragment>
          )}
        </div>
      </div>
    ) : '';

    return createPortal(content, this.element);
  }
}
export default Modal;
