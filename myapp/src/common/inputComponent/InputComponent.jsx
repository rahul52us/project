import React from 'react';
import { Input , Form, Tooltip , Select , InputNumber,DatePicker,Radio} from 'antd';
import './InputComponent.scss'
import {InfoCircleOutlined} from '@ant-design/icons'


const Inputcomponent = ({name , type ,  note , required , hidden , noStyle , rules , initialValue , extra ,  label , tooltip , hint , styles , onChange , options , value , rowSize , ...rest }) => {    	
	
    switch(type)
    {
        case 'email':
            return (
                	<Form.Item label={label} tooltip={tooltip} extra={note} required={required ? true : false} hidden={hidden}>
					<Form.Item name={name} noStyle rules={rules} initialValue={initialValue}>
						<Input {...rest} />
					</Form.Item>
					{hint && (
						<Tooltip placement="right" title={hint}>
							<InfoCircleOutlined className="ml-10" />
						</Tooltip>
					)}
				</Form.Item>
            );                    
            case 'number':
                return (
					<Form.Item label={label} tooltip={tooltip} extra={note} required={required ? true : false} hidden={hidden}>
					<Form.Item name={name} noStyle rules={rules} initialValue={initialValue}>
						<InputNumber {...rest} style={{width:'100%'}}
						suffix={hint && (
							<Tooltip placement="right" title={hint}>
								<InfoCircleOutlined className="ml-10" />
							</Tooltip>
						)}/>
					</Form.Item>					
				</Form.Item>
            );                    
        case 'password':
            return (
				<Form.Item label={label} tooltip={tooltip} extra={note} required={required ? true : false} hidden={hidden}>
				<Form.Item name={name} noStyle rules={rules} initialValue={initialValue}>
					<Input.Password  {...rest} 
					suffix={hint && (
						<Tooltip placement="right" title={hint}>
							<InfoCircleOutlined className="ml-10" />
						</Tooltip>
					)}/>
				</Form.Item>					
			</Form.Item>
            );
		case 'date':
				return (
					<Form.Item label={label} tooltip={tooltip} extra={note} required={required ? true : false} hidden={hidden}>
					<Form.Item name={name} noStyle rules={rules} initialValue={initialValue}>
						<DatePicker {...rest} style={{width:'100%'}}
	                      suffix={hint && (
							<Tooltip placement="right" title={hint}>
								<InfoCircleOutlined className="ml-10" />
							</Tooltip>
						)}/>
					</Form.Item>					
				</Form.Item>
			);
			case 'textarea':
				return (
					<Form.Item label={label} tooltip={tooltip} extra={note} required={required ? true : false} hidden={hidden}>
					<Form.Item name={name} noStyle rules={rules} initialValue={initialValue}>
						<Input.TextArea rows={rowSize ? rowSize : 3} {...rest} suffix={hint && (
						<Tooltip placement="right" title={hint}>
							<InfoCircleOutlined className="ml-10" />
						</Tooltip>
					)}/>
					</Form.Item>					
				</Form.Item>
			);
			case 'telephone':
				return (
			<Form.Item label={label} tooltip={tooltip} extra={note} required={required ? true : false} hidden={hidden}>
					<Form.Item name={name} noStyle rules={rules} initialValue={initialValue}>
						<Input type="telephone" suffix={hint && (
						<Tooltip placement="right" title={hint}>
							<InfoCircleOutlined className="ml-10" />
						</Tooltip>
					)}/>
					</Form.Item>					
				</Form.Item>
				)
			case 'radio':					
					if(options)
					{
						return (
							<Form.Item label={label} tooltip={tooltip} extra={note} required={required ? true : false} hidden={hidden}>				
				            <Form.Item name={name} noStyle rules={rules} initialValue={initialValue}>
						        <Radio.Group style={{width:'100%',justifyContent:'space-between',display:'flex'}}>
							    {options && options.map((item,index)=> <Radio.Button disabled={item.disabled} key={index} value={item.value}>{item.name}</Radio.Button> )}															
						        </Radio.Group>
				               </Form.Item>
                          </Form.Item>
						)
					} else { return null }
			case 'select':
				if (options) {
					return (
						<Form.Item label={label} tooltip={tooltip} extra={note} required={required ? true : false} hidden={hidden} noStyle={noStyle}>
							<Form.Item name={name} noStyle rules={rules} initialValue={initialValue} >
								<Select																	
									showSearch
									optionFilterProp="children"								
									{...rest}
									onChange={onChange}
								>
								{
									options.map((item)=> <Select.Option key={item.name} value={item.value} disabled={item.disabled}>{item.name} </Select.Option>)
								}
								</Select>
							</Form.Item>
							{extra}
							{hint && (
								<Tooltip placement="right" title={tooltip}>
									<InfoCircleOutlined className="ml-10" />
								</Tooltip>
							)}
						</Form.Item>
					)
				}
				return null
        default:
            return (
				<Form.Item label={label} tooltip={tooltip} extra={note} required={required ? true : false} hidden={hidden}>
				<Form.Item name={name} noStyle rules={rules} initialValue={initialValue}>
					<Input {...rest} suffix={hint && (
					<Tooltip placement="right" title={hint}>
						<InfoCircleOutlined className="ml-10" />
					</Tooltip>
				)}/>
				</Form.Item>
			</Form.Item>
            );        
    }    
}

export default Inputcomponent;
