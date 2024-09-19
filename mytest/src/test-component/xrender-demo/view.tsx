import React, { useState } from 'react';
import { InputNumber } from 'antd';
import FormRender, { useForm } from 'form-render';


export default ({ schema }: any) => {
    const form = useForm();
    console.log(form.getSchema())
    return (
        <FormRender
            form={form}
            schema={schema}
            labelWidth={80}
            maxWidth={300}
        />
    );
};