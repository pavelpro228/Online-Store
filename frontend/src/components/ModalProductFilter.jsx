import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import './styles/ProductFilter.css'

const ModalProductFilter = (props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCategoryChange = (event) => {
    const { id, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };
  const handleBrandChange = (event) => {
    const { id, checked } = event.target;
    setSelectedBrands((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleApplyFilter = () => {
    console.log('Вибрані категорії:', selectedCategories);
    console.log('Вибрані виробники:', selectedBrands);
  };

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
            <input type="checkbox" id='Computer' onChange={handleCategoryChange}/>
            <label htmlFor="Computer">Комп'ютери</label>
          </div>
          <div>
            <input type="checkbox" id="Keyboard" onChange={handleCategoryChange}/>
            <label htmlFor="Keyboard">Клавіатури</label>
          </div>
          <div>
            <input type="checkbox" id="Mouse" onChange={handleCategoryChange}/>
            <label htmlFor="Mouse">Комп'ютерні мишки</label>
          </div>
          <p>Виробник: </p>
          <div>
            <input type="checkbox" id="Artline" onChange={handleBrandChange}/>
            <label htmlFor="Artline">Artline</label>
          </div>
          <div>
            <input type="checkbox" id="2E GAMING" onChange={handleBrandChange}/>
            <label htmlFor="2E GAMING">2E GAMING</label>
          </div>
          <div>
            <input type="checkbox" id="GamePro" onChange={handleBrandChange}/>
            <label htmlFor="GamePro">GamePro</label>
          </div>
          <div>
            <input type="checkbox" id="Razer" onChange={handleBrandChange}/>
            <label htmlFor="Razer">Razer</label>
          </div>
          <div>
            <input type="checkbox" id="Esperanza" onChange={handleBrandChange}/>
            <label htmlFor="Esperanza">Esperanza</label>
          </div>
          <div>
            <input type="checkbox" id="Logitech" onChange={handleBrandChange}/>
            <label htmlFor="Logitech">Logitech</label>
          </div>
          <p>Ціна: </p>
          <div style={{display: "flex"}}>
            <p>Від</p>
            <input style={{width: "100px", fontSize: "30px", borderRadius: "10px", outline: "none"}} type="number" min={1} max={1000}/><p>$</p>
            <p>До</p>
            <input style={{width: "100px", fontSize: "30px", borderRadius: "10px", outline: "none"}} type="number" min={1} max={1000}/><p>$</p>
          </div>
        </div>
        <button className='apply-filter-button' onClick={() => {
          props.filteredProductsByCategory(selectedCategories)
          props.handleProductFilter()
          
        }}>Зробити фільтр</button>
      </div>
    </div>
  )
}

export default ModalProductFilter