import React, { useState } from 'react';
import './Tooltip.css'
import { motion } from "framer-motion";

const Tooltip = (props) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => {
      setVisible(visible => !visible);
  };

    const { children } = props;

    return (
      <div onMouseEnter={showTooltip} onMouseLeave={showTooltip}>
        {children}
        {visible && (
            <div className="tooltip">
              <motion.div initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}>
                
                {props.infoText}
              </motion.div>
            </div>
        )} 
      </div>
    );
}

export default Tooltip;