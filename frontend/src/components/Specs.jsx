import React from 'react'

const Specs = (props) => {
  return (
    <>
        <h1>Specs: </h1>
        {props.specs.type === "Computer" && 
            <div className='product-specs'>
                <p>Processor:</p> {props.specs.processor}
                <p>GraphicsCard:</p> {props.specs.graphicsCard}
                <p>RAM:</p> {props.specs.ram}
                <p>Storage:</p> {props.specs.storage}
                <p>Operating system:</p> {props.specs.operatingSystem}
            </div>
        }
        {props.specs.type === "Keyboard" && 
            <div className='product-specs'>
                <p>Connection:</p> {props.specs.connection}
                <p>Switch Type:</p> {props.specs.switchType}
                <p>Backlight:</p> {props.specs.backlight}
                <p>Layout:</p> {props.specs.layout}
                {props.specs.keyRollover ? <><p>Key Rollover:</p> {props.specs.keyRollover}</> : null}
                {props.specs.wristRest ? <><p>Wrist Rest:</p> {props.specs.wristRest}</> : null}
            </div>
        }
        {props.specs.type === "Mouse" && 
            <div className='product-specs'>
                <p>Connection:</p> {props.specs.connection}
                <p>DPI:</p> {props.specs.dpi}
                <p>Buttons:</p> {props.specs.buttons}
                <p>Lighting:</p> {props.specs.lighting}
                <p>Sensor type:</p> {props.specs.sensorType}
            </div>
        }
    </>
  )
}

export default Specs