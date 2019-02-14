import React from 'react';

const Title = ({ titleText, headingSize = 1 }) => {
  const CustomTag = `h${headingSize}`;

  return (
    <div className="form-group">
      <CustomTag>{ titleText }</CustomTag>
    </div>
  );
}

export default Title;
