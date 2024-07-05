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
 const  DataTable = ({ data }) => {
    const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const containerRef = useRef(null)
    const [scrollStep, setScrollStep] = useState(50)

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {


        if (searchTerm) {
            const Value = searchTerm
            const filteredResults = data.filter(order => {
                if (order.Custamer_Name.Custamer_Name.toLowerCase().includes(Value.toLowerCase()) || String(order.Order_Id.Order_Id).includes(Value)
                    || order.City.toLowerCase().includes(Value) || JSON.parse(order.Adress).State.toLowerCase().includes(Value)
                    || String(order.Order_Id.Product_Name.Price).includes(Value)
                    || String(order.Order_Id.Product_Name.Product_Name.toLocaleLowerCase()).includes(Value.toLocaleLowerCase())
                    || String(new Date(order.Order_Id.Date).toLocaleDateString()).includes(Value)) {
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
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const PaymentStatus = (order) => {
        const Data = {
            'Order_Id': order.Order_Id.Order_Id,
            "Payment_Status": "Compleate"
        }
        axios.patch("http://127.0.0.1:8000/OrderDetails/", Data).then((d) => {

            window.location.reload()
        }).catch((e) => {

        })
    }
    const AdminSide = (order) => {
        const Data = {
            'Order_Id': order.Order_Id.Order_Id,
            "AdminWrite": "the order has not been delivered on the admin side"
        }
        axios.patch("http://127.0.0.1:8000/OrderDetails/", Data).then((d) => {
            window.location.reload()
        }).catch((e) => {

        })
    }
    const DelivaryStatus = (order) => {
        const Data = {
            'Order_Id': order.Order_Id.Order_Id,
            "Delivary": "Yes",
            "Delivary_Date": new Date(),
            "Payment_Status": "Compleate"
        }
        axios.patch("http://127.0.0.1:8000/OrderDetails/", Data).then((d) => {
            window.location.reload()
        }).catch((e) => {

        })
        const data = {
            'Orderid': order.Order_Id.Order_Id,
            "ODate": new Date(order.Order_Id.Date).toLocaleDateString(),
            "DDate": new Date().toLocaleDateString(),
            "Quant": order.Quantity,
            "Email": order.Custamer_Name.Email
        }
        axios.post("http://127.0.0.1:8000/SendingEmailDelivaried/", data).then((d) => {
        }).catch((e) => {
        })
    }
    const handleScroll = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        const scrollStep = 150; // Adjust as needed
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        if (direction === 'right') {
            
            container.scrollTo({
                left: container.scrollLeft + scrollStep,
                behavior: 'smooth',
            });
          
        } else if (direction === 'left') {
            container.scrollTo({
                left: container.scrollLeft - scrollStep,
                behavior: 'smooth',
            });
        }
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
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select><small className='mt-auto mb-auto'>Select  Pages</small>
                </div>
            </div>
            <div className='d-flex flex-row col-12 mt-2'>
                <div className='d-block d-md-none ml-2'>
                    <select className="" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select><small className='mt-auto mb-auto'>Select  Pages</small>
                </div>
                {/* <ul className="pagination ml-auto  ">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                </ul> */}
            </div>
            
            <div className="container" style={{ overflowX: 'auto',scrollbarWidth:'1px' }} ref={containerRef}>
                <table className="table table-striped mt-2">
                    <thead>
                        <tr>
                            <td><small>Order ID</small></td>
                            <td><small>Customer Name</small></td>
                            <td><small>Payment Status</small></td>
                            <td><small>Product Name</small></td>
                            <td><small>Quantity</small></td>
                            <td><small>Selling_Price</small></td>
                            <td><small>Delivery Type</small></td>
                            <td><small>Date</small></td>
                            <td><small>Delivary</small></td>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.slice().reverse().map((order, index) => (
                            <tr key={order.Order_Id.Order_Id}>
                                <td><small>{order.Order_Id.Order_Id}</small></td>
                                <td><small>{order.Custamer_Name.Custamer_Name}</small></td>
                    
                                <td style={{ textWrap: 'nowrap' }}><small>{order.Order_Id.Payment_Status === 'Compleate' ? <><span className='bg-success  p-1' style={{ height: 'max-content', fontWeight: 'bold' }}>Complete</span></> : <><span className='bg-danger btn  p-1' style={{ height: 'max-content', fontWeight: 'bold' }}>{order.Order_Id.Payment_Status}</span><span><i onClick={() => {
                                    PaymentStatus(order)
                                }} class="fa-solid fa-check ml-2 text-dark btn btn-primary p-1"></i></span></>}</small></td>
                                <td style={{ fontSize: '15px', }}><small><TruncateWords text={order.Order_Id.Product_Name.Product_Name} maxLength={20}/></small></td>
                                <td style={{ fontSize: '15px', }}><small>{order.Quantity}</small></td>
                                <td style={{ textWrap: 'nowrap' }}><small>{order.Order_Id.Selling_Price}</small></td>
                                <td style={{ textWrap: 'nowrap' }}><small>{order.Order_Id.Delivary_Type}</small></td>
                                <td style={{ textWrap: 'nowrap' }}><small>{new Date(order.Order_Id.Date).toLocaleDateString()}</small></td>
                                <td style={{ textWrap: 'nowrap' }}><small>{order.Order_Id.Delivary == 'No' ? <><span style={{ borderRadius: '5px' }} className={`  ${order.Order_Id.AdminWrite ? 'p-1' : 'btn    '} p-1 mt-1`} onClick={() => {
                                    if (!order.Order_Id.AdminWrite) {
                                        AdminSide(order)
                                    }
                                }} >{order.Order_Id.AdminWrite ? <></> :<><small><i class="fa-solid fa-xmark text-danger"></i></small></>}</span><i onClick={() => {
                                    DelivaryStatus(order)
                                }} class="fa-solid fa-check ml-2 text-dark btn  p-1"></i></> : <><span className='bg-success btn p-2'>{order.Order_Id.Delivary}</span></>}</small></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};
export default DataTable