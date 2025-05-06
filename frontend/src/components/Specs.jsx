import React from 'react'

const Specs = (props) => {
  return (
    <>
        <h1>Характеристики: </h1>
        {props.specs.type === "Computer" && 
            <div className='product-specs'>
                <p>Процесор:</p> {props.specs.processor}
                <p>Відеокарта:</p> {props.specs.graphicsCard}
                <p>Оперативна пам'ять:</p> {props.specs.ram}
                <p>Об'єм пам'ті:</p> {props.specs.storage}
                <p>Операційна система:</p> {props.specs.operatingSystem}
            </div>
        }
        {props.specs.type === "Keyboard" && 
            <div className='product-specs'>
                <p>Підключення:</p> {props.specs.connection}
                <p>Тип перемикача:</p> {props.specs.switchType}
                <p>Підсвічування:</p> {props.specs.backlight}
                <p>Мова клавіатури:</p> {props.specs.layout}
                {props.specs.keyRollover ? <><p>Key Rollover:</p> {props.specs.keyRollover}</> : null}
                {props.specs.wristRest ? <><p>Опора для зап'ястя:</p> {props.specs.wristRest}</> : null}
            </div>
        }
        {props.specs.type === "Mouse" && 
            <div className='product-specs'>
                <p>Підключення:</p> {props.specs.connection}
                <p>DPI:</p> {props.specs.dpi}
                <p>Кнопки:</p> {props.specs.buttons}
                <p>Колір підсвічування:</p> {props.specs.lighting}
                <p>Тип датчика:</p> {props.specs.sensorType}
            </div>
        }
    </>
  )
}

export default Specs