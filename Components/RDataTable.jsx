import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

 
class TruncateWords extends React.Component {
    truncateWords = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
        return truncated + '...';
    };
  
    render() {
        const { text, maxLength } = this.props;
        const truncatedText = this.truncateWords(text, maxLength);
  
        return <span>{truncatedText}</span>;
    }
  }
 const  RDataTable2 = ({ data }) => {
    const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const containerRef = useRef(null)
    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {


        if (searchTerm) {
            const Value = searchTerm
            const filteredResults = data.filter(order => {
                if (order.Custamer_Name.Custamer_Name.toLowerCase().includes(Value.toLowerCase())||(order.Rating.includes(String(Value)))||
                 order.Product_Name.Product_Name.toLowerCase().includes(Value.toLowerCase())||
                  (order.Rating_Lable.toLowerCase().includes(Value))){
                      return order
                }
             
               
            });
            setFilteredData(filteredResults.slice().reverse());
        } else {
            setFilteredData(data.slice().reverse())
        }

    }, [searchTerm, data]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
   
    
    
    


    return (
        <div className="" style={{ overflowX: 'auto',scrollbarWidth:'none' }}>
            <div className='d-flex flex-row justify-content-around'>
                <input type="text" className="col-8 col-md-6 mb-2 ml-auto mr-auto mt-auto mb-auto form-control" placeholder="Search by Id or Name" value={searchTerm} onChange={handleSearchChange} />
                <div className='d-none d-md-block'>
                    <select className="" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select><small className='mt-auto mb-auto'>Select  Pages</small>
                </div>
            </div>
            <div className='d-flex flex-row col-12 mt-2'>
                <div className='d-block d-md-none ml-2'>
                    <select className="" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select><small className='mt-auto mb-auto'>Select  Pages</small>
                </div>
                
            </div>
            
            <div className="container" style={{ overflowX: 'auto',scrollbarWidth:'1px' }} ref={containerRef}>
                <table className="table table-striped mt-2">
                    <thead>
                        <tr>
                            <td><small>Custamer_Name</small></td>
                            <td><small>Product_Name</small></td>
                            <td><small>Rating</small></td>
                            <td><small>Rating Lable</small></td>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((order, index) => (
                            <tr key={index}>
                                 <td><small>{order.Custamer_Name.Custamer_Name}</small></td>
                                 <td><small><TruncateWords text={order.Product_Name.Product_Name} maxLength={20}/></small></td>
                                 <td><small>{order.Rating}</small></td>
                                 <td className='d-xl-none'><small><TruncateWords text={order.Rating_Lable} maxLength={20}/></small></td>
                                 <td className=' d-none d-xl-block'><small><TruncateWords text={order.Rating_Lable} maxLength={50}/></small></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};
export default RDataTable2