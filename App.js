
import React, { useState,useEffect } from 'react'
import "antd/dist/antd.css";
import "./App.css";

import { Form, Checkbox, DatePicker, Input, Select,Button,Drawer,Row,Table, Descriptions} from "antd";



  
export default function App() {
  
  const [visible, setVisible] = useState(false);
  const [visibleL, setVisibleL] = useState(false);
  const [fname,setFname]=useState('');
  const [email,setEmail]=useState("");
  const [add,setAdd]=useState("");
  const [phno,setPhno]=useState("");
  const [gender,setGender]=useState("");
  const [dob,setdob]=useState("");
  const [sortValue,setsortValue]=useState("");
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  
  const [loading, setLoading] = useState(false);

  function hello()
  {
        fetch('http://localhost:3000/form',{
            method:'POST',
            headers:{
              'Content-type':'application/json;charset=UTF-8',
            },
            body: JSON.stringify(this.state),

        })
        .then((response)=>{response.json()
        .then((a)=>{
          alert("form data added successfully")
        })
        })
  }
 


  const fetchRecords = () => {
    setLoading(true);
    fetch('http://localhost:3000/form')
      .then((res) => {
        setDataSource(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      });
  };
  const onSelect =(value)=>{
    setsortValue(value);
  }
  const onChange =(value)=>{
    setsortValue(value);
    if(!value){
      setsortValue('');
    }
  }
  useEffect(()=>{
    getSortData();
  },[]);
  const fetchByName  =()=>{
    fetch('http://localhost:3000/form')
    .then((response)=>{response.json()
    .then((b=>{
         this.setState({list:b})
    }))
    })
    console.log(fname);
    console.log(email);
    console.log(add);
    console.log(phno);
    console.log(gender);
    console.log(dob);
      
  };
 
  const getSortData =async() =>{
    if(sortValue === "name"){
      await fetchByName();
    }else if(sortValue === "add"){
      await fetchByAdd();
    }else{
      await fetchBylist();
    }
  };
  const fetchByAdd =()=>{
    fetch('http://localhost:3000/form')
     
    .then((response)=>{response.json()
    .then((b=>{
         this.setState({list:b})
    }))
    })
  
      
  };

  const columns=[
    {
      title:"name",
      dataIndex:"name"
    },
    {
      title:"email",
      dataIndex:"email"
    },
    {
      title:"Address",
      dataIndex:"Address"
    },
    {
      title:"phoneno",
      dataIndex:"phoneho"
    },
    {
      title:"gender",
      dataIndex:"gender"
    },
    {
      title:"Dob",
      dataIndex:"Dob"
    }
  ]
  useEffect(() => {
    fetchRecords(1);
  }, []);

  
  const fetchBylist =()=>{
    fetch('http://localhost:3000/form')
    .then((response)=>{response.json()
    .then((b=>{
         this.setState({list:b})
    }))
    })

  };

 
  
  return (
    <div style={{
      display: 'block', width: 700, padding: 30
    }}>
      <h4 >Form with validation using antd</h4>
      <>
        <Button type="primary"
           style={{marginLeft:"15px",borderRadius:"20px"}}
          onClick={() => {
            setVisible(true);
          }}>Form Open</Button>

          <Button type="primary"
           style={{marginLeft:"40px",borderRadius:"20px"}}
          onClick={() => {
            setVisibleL(true);
          }}>Action</Button>
        
          <Drawer
          title="Lists"
          placement="bottom"
          closable={false}
          visible={visibleL}
          onClose={() => {
            setVisible(false)
          }}>
             <Form>
             <Form.Item name="list" label="list" >
            <Select placeholder="sorted by" 
             showSearch
             allowClear
              onSelect={onSelect}
              onChange={onChange}
              filterOption={(input,option)=>
              option.toLowerCase().indexOf(input.toLowerCase())>=0
              }
            
            >
              <Select.Option value="name" Selected>Name</Select.Option>
              <Select.Option value="address">Address</Select.Option>
              <Select.Option value="mobile">Mobile</Select.Option>
            </Select>
          </Form.Item></Form>
          <Table  
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
          pageSize: 10,
          total: totalPages,
          onChange: (page) => {
            fetchRecords(page);
          },
        }}>

          </Table>

          </Drawer>
        <Drawer
          title="Fill The Form"
          placement="right"
          closable={false}
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
        >
          <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={(values) => {
            console.log({ values},[]);
          }}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              { min: 4 },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your name"  onChange={e=>setFname(e.target.value)}/>
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              { type: "email", message: "Please enter a valid email" },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your email" onChange={e=>setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="Address"
            label="Address"
            rules={[
              
              { min: 10},
              {max:50},
              
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your Address" onChange={e=>setAdd(e.target.value)}/>
          </Form.Item>

        

          <Form.Item
                  name="pnone number"
                  label="phone number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your valid mobile number",
                    },
                    { min: 10},
                    {max:10},
                    
                  ]}  
                    hasFeedback
          >
            
            
            <Input placeholder="Enter the pnone number" onChange={e=>setPhno(e.target.value)}/>
            </Form.Item>

          <Form.Item name="gender" label="Gender" requiredMark="optional">
            <Select placeholder="Select your gender" onChange={e=>setGender(e.target.value)}>
              <Select.Option value="male" Selected>Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              {
                required: true,
                message: "Please provide your date of birth",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Chose date of birth"
              onChange={e=>setdob(e.target.value)}
            />
          </Form.Item>

      

          <Form.Item
            name="agreement"
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        "To proceed, you need to agree with our terms and conditions"
                      ),
              },
            ]}
          >
            <Checkbox>
              {" "}
              Agree to our <a href="#">Terms and Conditions</a>
            </Checkbox>
          </Form.Item>
            
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit" style={{borderRadius:"20px"}} onClick={()=>hello()}>
              Login  
            </Button>
            
          </Form.Item>

        </Form>
        </Drawer>
      </>
    </div>
  );
}
