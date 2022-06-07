import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { FETCH_CATEGARY_STUDENT_ACTION } from '../../store/StudentManageStore/action';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { Drawer } from 'antd';
import ViewStudentDetail from './ViewStudentDetail/ViewStudentDetail';

const StudentManageIndex = (props) => {
  const [TableData,setTableData] = useState([]) 
  const [page,setPage] = useState(1)
  const [showFullDetailModal,setShowFullDetailModal] = useState(null)
  const [searchDetails,setSearchDetails] = useState({
    className : undefined,
    address : undefined,
    gender:undefined,
    section:undefined,
    PhoneNo:undefined
  })

    useEffect(()=>{
        props.CategaryStudentReducer.FetchStudentLoading = true
        props.CategaryStudentReducer.AllStudent=[]
        props.FETCH_CATEGARY_STUDENT_ACTION({page : page })        
    },[])

    
    const handleSearch = () => {
      props.CategaryStudentReducer.AllStudent=[]
      if(searchDetails.className==="")
      {
        setSearchDetails({...searchDetails,['className']:undefined})
      }
      else if(searchDetails.gender==="")
      {
        setSearchDetails({...searchDetails,['gender']:undefined})
      }
      else if(searchDetails.address==="")
      {
        setSearchDetails({...searchDetails,['address']:undefined})
      }    
      else if(searchDetails.section==="")
      {
        setSearchDetails({...searchDetails,['section']:undefined})
      }
      else if(searchDetails.PhoneNo==="")
      {
        setSearchDetails({...searchDetails,['PhoneNo']:undefined})
      }
      props.FETCH_CATEGARY_STUDENT_ACTION({page : page , details : searchDetails})      
    };

    const resetSearch = (dataIndex) => {
      setSearchDetails({...searchDetails,[dataIndex]:undefined})
      handleSearch()
    }
        
    const getColumnSearchProps = dataIndex => ({        
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input              
              placeholder={`Search ${dataIndex}`}            
              value={searchDetails[dataIndex]}
              onChange={(e) => setSearchDetails({...searchDetails,[dataIndex] : e.target.value})}               
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button  size="small" style={{ width: 90 }}
              onClick={() => resetSearch(dataIndex)}
              >
                Reset
              </Button>             
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
         //   setTimeout(() => searchInput.select(), 100);
          }
        },   
      })

      const [columns,setColumns] = useState([
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',                  
          align:'center',
          ...getColumnSearchProps('name')
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',         
          align:'center', 
          ...getColumnSearchProps('email')
        },
        {
          title: 'Class',
          dataIndex: 'class',
          key: 'class',        
          align:'center',  
          ...getColumnSearchProps('className')
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',        
          align:'center',  
          ...getColumnSearchProps('gender')
        },
        {
          title: 'Section',
          dataIndex: 'section',
          align:'center',
          key: 'section',          
          ...getColumnSearchProps('section')
        },
        {
          title: 'Phone No.',
          dataIndex: 'PhoneNo',
          key: 'PhoneNo',          
          align:'center',
          ...getColumnSearchProps('PhoneNo')
        },        
        {
          title: 'View Profile',
          dataIndex: 'ViewProfile',
          key: 'ViewProfile',
          align:'center',
          render : (item) => <Button onClick={() => setShowFullDetailModal(item)}>View</Button>
        }        
      ])

      useEffect(()=>{
        var data=[]
        props.CategaryStudentReducer.AllStudent.forEach((item,index)=>{
          data.push({
              key: index,
              name : `${item.userId.name}` ,
              email :`${item.userId.email}`,    
              pic : `${item.pic}`,
              gender:`${item.gender}`,          
              section : item.section,
              PhoneNo : item.PhoneNo,
              class : item.className,
              ViewProfile:item
          }) 
        })   
        setTableData(data)        
      },[props.CategaryStudentReducer.AllStudent])
      
      const MemoTable = useMemo(()=>{     
        return (
          <Table 
           size='middle'
           bordered={true}          
           columns={columns} 
           dataSource={TableData} 
           pagination={{ position: ['topRight'] , pageSize:30,  style:{position:'fixed',right:'20px',bottom:'10px',margin:'5px'}}}
           />                                 
        )        
      },[TableData,searchDetails,columns])

      const LoadMore = () => {
        setPage(page + 1)
        props.FETCH_CATEGARY_STUDENT_ACTION({page : page + 1 })        
      }

    return (
      <>
      <div className='userListDataContainer' style={{backgroundColor:'white',height:'85vh'}}>
           {MemoTable}
           <Drawer visible={showFullDetailModal} onClose={() => setShowFullDetailModal(null)} width={window.innerWidth < 786 ? '100%' : '40%'}>
             {
                showFullDetailModal && <ViewStudentDetail data={showFullDetailModal}/>
             }
           </Drawer>             
        </div>
        {
          props.CategaryStudentReducer.hasMoreData && <div>
          <Button onClick={() => LoadMore()}>Load More</Button>            
        </div>                    
        }
      </>
    );
};

const mapStateToProps = (state) => {
  console.log(state)
    return {
        CategaryStudentReducer : state.CategaryStudentReducer
    }
}

const mapDispatchToProps = {
    FETCH_CATEGARY_STUDENT_ACTION : FETCH_CATEGARY_STUDENT_ACTION    
}
export default connect(mapStateToProps,mapDispatchToProps)(StudentManageIndex)

