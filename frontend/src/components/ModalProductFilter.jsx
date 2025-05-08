import React from 'react'
import { MdClose } from 'react-icons/md'
import './styles/ProductFilter.css'

const ModalProductFilter = (props) => {
  return (
    <div className="modal-overlay">
      <div>
        <div className="modal-product-settings">
            <div style={{ display: 'flex', marginBottom: '40px' }}>
                <p className="settings-title">Фільтр</p>
                <MdClose className="btn-close" onClick={props.handleProductFilter} />
            </div>
          123
        </div>
      </div>
    </div>
  )
}

export default ModalProductFilter