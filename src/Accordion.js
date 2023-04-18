import React from 'react';
import {useState} from 'react';


const Accordion = ({title, content, category}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
      <div className={`accordion-item-${category}`}>
        <div className={`accordion-title-${category}`} onClick={() => setIsActive(!isActive)}>
          <div>{title}</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div className="accordion-content">{content}</div>}
      </div>
    </React.Fragment>
  );
};

export default Accordion;