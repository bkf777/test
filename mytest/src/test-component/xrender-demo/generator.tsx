import React from 'react';
import Generator  from 'fr-generator';




const MyGenerator = ({
  widgets = {},
  getValue = (schema:any) => {},
}) => {
  return (
    <div style={{ height: '80vh' }}>
      <Generator  widgets={widgets} onSchemaChange={(schema)=>{
        getValue(schema);
      }} />
    </div>
  );
};

export default MyGenerator;