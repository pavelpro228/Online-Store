import React from 'react'
import { MdClose } from 'react-icons/md'
import './styles/ProductFilter.css'

const ModalProductFilter = (props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-product-settings">
        <div style={{ display: 'flex', marginBottom: '40px' }}>
            <p className="settings-title">Фільтр</p>
            <MdClose className="btn-close" onClick={props.handleProductFilter} />
        </div>
        <div className='filter-title'>
          <p>Каталог товарів: </p>
          <div>
            <input type="checkbox" id="scales" name="Computer" />
            <label for="Computer">Комп'ютери</label>
          </div>
          <div>
            <input type="checkbox" id="scales" name="Keyboard" />
            <label for="Keyboard">Клавіатури</label>
          </div>
          <div>
            <input type="checkbox" id="scales" name="Mouse" />
            <label for="Mouse">Комп'ютерні мишки</label>
          </div>
          <p>Виробник: </p>
          <div>
            <input type="checkbox" id="scales" name="Artline" />
            <label for="Artline">Artline</label>
          </div>
          <div>
            <input type="checkbox" id="scales" name="2E GAMING" />
            <label for="2E GAMING">2E GAMING</label>
          </div>
          <div>
            <input type="checkbox" id="scales" name="GamePro" />
            <label for="GamePro">GamePro</label>
          </div>
          <div>
            <input type="checkbox" id="scales" name="Razer" />
            <label for="Razer">Razer</label>
          </div>
          <div>
            <input type="checkbox" id="scales" name="Esperanza" />
            <label for="Esperanza">Esperanza</label>
          </div>
          <div>
            <input type="checkbox" id="scales" name="Logitech" />
            <label for="Logitech">Logitech</label>
          </div>
          <p>Ціна: </p>
          <div style={{display: "flex"}}>
            <p>Від</p>
            <input style={{width: "100px", fontSize: "30px", borderRadius: "10px", outline: "none"}} type="number" min={1} max={1000}/><p>$</p>
            <p>До</p>
            <input style={{width: "100px", fontSize: "30px", borderRadius: "10px", outline: "none"}} type="number" min={1} max={1000}/><p>$</p>
          </div>
        </div>
        <button className='apply-filter-button'>Зробити фільтр</button>
      </div>
    </div>
  )
}

export default ModalProductFilter