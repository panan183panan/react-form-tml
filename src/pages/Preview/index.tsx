import React from 'react'

import Generator from 'fr-generator';

export default function Preview() {

  const defaultValue = {
    type: 'object',
    properties: {
      inputName: {
        title: '简单输入框',
        type: 'number',
      },
    },
  };
  
  return (
    <div style={{ height: '100vh' }}>
      <Generator defaultValue={defaultValue} />
    </div>
  )
}




