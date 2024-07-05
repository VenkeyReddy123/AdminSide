import React, { useEffect, useState } from 'react'
import { Details } from './DasBoard/RiviewDetails'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Category.css'
import Sidebar from './Sidebar'
import Navbar from '../Navbar'
import Sidebar2 from './SideBar2'
import Dsidebar from './Dsidebar'
import ResizedImage from '../ResizedImage'
import ReactQuill from 'react-quill';
import Profile from './Profile'
import { Books_Music, Electrinics } from '../Data.jsx'
import { Clothing } from '../Data.jsx'
import { Footware } from '../Data.jsx'
import { Accesories } from '../Data.jsx'
import { Beauty_PersonCare } from '../Data.jsx'
import { Home_Kitchen } from '../Data.jsx'
import { Furniture } from '../Data.jsx'
import { Sports } from '../Data.jsx'
import { Health } from '../Data.jsx'
import { Toys_Games } from '../Data.jsx'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Update from './Update.jsx'


const Modify = () => {
  const [products, setProducts] = useState([]);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedIndex, setEditedIndex] = useState(null); // Add this state variable
  const [editStack, setEditedStack] = useState('')
  const [editimage, setEditImage] = useState()
  const [editDiscount, setEditedDiscount] = useState()
  const [global, setGlobal] = useState([])
  const [change, setChange] = useState("")
  const [Sugg, setSugg] = useState([])
  const [Pro, setPro] = useState(false)
  const [Des, setDes] = useState("")
  const [Pop, setPop] = useState(false)
  const [Hig, setHigh] = useState("")
  const [Bottom, setBottom] = useState(false)
  const [Del, setDel] = useState(0)
  const [C_N, setC_N] = useState("")
  const [Product, setProduct] = useState([])
  const [Cat, setCat] = useState()
  const [image, setImage] = useState(null)
  const [EImage, setEImage] = useState(false)
  const [ImageUrlList, setImageUrlList] = useState([])
  const [ImageUrl, SetImageUrl] = useState([])
  const [selectedCategoryName, setSelectedCategoryName] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [DownCondition, SetDownCondtion] = useState(false)
  const [DropDown, SetDropDown] = useState([])
  const [Brand, setBrand] = useState("")
  const [Color, setColor] = useState("")
  const [general, SetGeneral] = useState("")
  const [ImageLimit, SetImageLimit] = useState(0)
  const [Info, SetInfo] = useState(false)
  const [Pro1, setPro1] = useState(false)
  const [ShowFilter, SetShowFilter] = useState(false)
  const [COPOP, SetCOPOP] = useState(false)
  const[Size,SetSizes]=useState([])
  const [FootSizes,SetFootSizes]=useState(['1','2','3','4','5','6','7','8','9','10'])
  const [DressSizes,SetDressSizes]=useState(['XS','S','M','L','XL','XXL','XXXL'])
  const [SizesValuesChange,SetSizesValuesChange]=useState([])
  const [FooMinPop,SetFootMinPop]=useState(false)
  const [DressMinPop,SetDressMinPop]=useState(false)
  const ProF = () => {
    setPro1(false)
  }

  const BottomClicked = (click) => {
    if (click) {
      setBottom(false)
      return
    }
    setBottom(!Bottom)

  }


  const handleImageChange = async (event) => {

    const files = event.target.files;
    const Arr = [];
    const quality = 0.9
    for (let i = 0; i < files.length; i++) {
      if (i < ImageLimit) {
        const resizedFile = await resizeAndPush(files[i], quality);
        Arr.push(resizedFile);


      }

    }
    console.log(Arr)


    setEditImage(Arr)
    setEImage(true)
    async function resizeAndPush(file, quality) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const desiredWidth = 200; // Desired width
            const desiredHeight = 200; // Desired height
            canvas.width = desiredWidth;
            canvas.height = desiredHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);

            canvas.toBlob((blob) => {
              const resizedFile = new File([blob], file.name, { type: file.type });
              resolve(resizedFile); // Resolve with resized file
            }, file.type, quality); // Pass quality as the third argument
          };
          img.src = e.target.result;
        };

        if (file) {
          reader.readAsDataURL(file);
        } else {
          reject(new Error('File not provided'));
        }
      });
    }
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/SuggestDetails/").then((d) => {
      const Sugg = d.data

      axios.get("http://127.0.0.1:8000/TopDealsDetails/").then((d) => {
        const Top = d.data
        axios.get("http://127.0.0.1:8000/ProductDispalyView/").then((d) => {
          setdata(d.data)
          const filteredData = d.data.filter((e) => {
            Top.map((p) => {
              if (e.Product_Name.id == p.Product_Name.id) {
                e.Add = true

              }
            })
            Sugg.map((e2) => {
              if (e.Product_Name.id == e2.Product_Name.id) {

                e.Sugg = true

              }
            })
            return e.Product_Name.username === Number(localStorage.getItem('id'));
          });

          setGlobal(filteredData)
          setProducts(filteredData)
        })

      })
    })
  }, [])

  const handleEdit = (e) => {
    setEditedProductName(e.Product_Name.Product_Name);
    setEditedPrice(e.Product_Name.Price);
    setEditedStack(e.Product_Name.Stack)
    setEditedDiscount(e.Product_Name.Discount)
    setDes(e.Product_Name.Description)
    setHigh(e.Product_Name.Hightlet)
    setDel(e.Product_Name.Delivary_Charges)
    setC_N(e.Product_Name.Category_Name)
    setCat(e.Product_Name.Category)
    setBrand(e.Product_Name.Brand)
    setColor(e.Product_Name.Color)
    SetGeneral(e.Product_Name.Specifications)
    setProduct(e)
    SetSizes(e.Product_Name.Size_Of_Product=='No'?[]:e.Product_Name.Size_Of_Product.split('#'))
    SetSizesValuesChange(e.Product_Name.Size_Of_Product=='No'?[]:e.Product_Name.Size_Of_Product.split('#'))
   
    

    if (e.List_Urls) {
      setImageUrlList(e.List_Urls.split(" "))
      SetImageLimit(e.List_Urls.split(" ").length)

    } else {
      setImageUrlList([e.ImageUrl])
      SetImageLimit([e.ImageUrl].length)


    }
    handleCategory(e.Product_Name.Category)
  };

  const handleSave = async () => {
    if(Cat=='FootWare'||Cat=='Clothing'){
     
        if(Size.length==0){
          
          SetFootMinPop(true)
          return
        }
    }

    
    const Data = {
      "pk": Product.Product_Name.id,
      "Product_Name": editedProductName,
      "Stack": editStack,
      "Price": editedPrice,
      "Discount": editDiscount,
      "Description": String(Des),
      "Category": Cat,
      "Category_Name": C_N,
      "Hightlet": String(Hig),
      "Delivary_Charges": Del,
      "Brand": Brand,
      "Color": Color,
      "Specifications": String(general),
      "Size_Of_Product":Size.length>0?String(Size.join('#')):'No'

    }

    await axios.patch("http://127.0.0.1:8000/ProductDetails/", Data).then((d) => {
    }).catch((e) => {

      alert('Please Try Again Later')
    })
    
  };

  const handleCatgerory = (type) => {
    if (type == 'All') {
      setProducts(global)
    }
    else {
     
      const Data = global.filter((e) => {
        return e.Product_Name.Category == type ||
          e.Product_Name.Category_Name == type ||
          e.Product_Name.Product_Name.toLowerCase().includes(type.toLowerCase());
      });

      setProducts(Data);
    }


  }
  const HandleDelete = async (e) => {
    const Data = {
      "pk": e.Product_Name.id
    }
    let Value = null
    await axios.get("http://127.0.0.1:8000/OrderDetails/").then((d) => {
      const Filter = d.data.filter((e) => {
        return e.Product_Name == Data.pk && (e.Delivary == 'No' && e.OrderCancel == 'No')
      })
      Value = Filter.length > 0 ? false : true
    })

    if (Value) {

    } else {
      setPop(!Pop)
      return
    }
    const data = {
      "pk": e.Product_Name.id
    }
    axios.delete("http://127.0.0.1:8000/ProductDetails/", { data })
      .then((response) => {
        window.location.reload(); // Reload the page after successful deletion
      })
      .catch((error) => {

        alert("Please Try Again");
      });
  }
  const navigate=useNavigate()
  const [pw, setpw] = useState('')
  const [rpw, setrpw] = useState('')
  const [un, setun] = useState('')
  const [run, setrun] = useState('')
  const [Con2, setCon2] = useState(false)
  const [Con1, setCon] = useState(false)
  const HandleTopDeals = (Pro, type) => {
    if (type == 'Add') {
      const Data = {
        "ImageUrl": Pro.id,
        "username": Number(localStorage.getItem('id')),
        "Product_Name": Pro.Product_Name.id
      }
      axios.post("http://127.0.0.1:8000/TopDealsDetails/", Data).then((d) => {
        window.location.reload()
      }).catch((e) => {
        window.location.reload();
      })
    } else {

      const data = {
        "id": Pro.id
      }
      axios.delete("http://127.0.0.1:8000/TopDealsDetails/", { data }).then((d) => {

        window.location.reload();
      }).catch((e) => {
        alert('Please Try Again')
      })
    }
  }
  const HandleSuggest = (Pro, type) => {
    if (type == 'Add') {
      const Data = {
        "ImageUrl": Pro.id,
        "username": Number(localStorage.getItem('id')),
        "Product_Name": Pro.Product_Name.id
      }
      console.log(Data)
      axios.post("http://127.0.0.1:8000/SuggestDetails/", Data).then((d) => {
        window.location.reload()
      }).catch((e) => {
        window.location.reload();
      })
    } else {

      const data = {
        "id": Pro.id
      }
      axios.delete("http://127.0.0.1:8000/SuggestDetails/", { data }).then((d) => {

        window.location.reload();
      }).catch((e) => {
        alert('Please Try Again')
      })
    }
  }
  const [Show, setShow] = useState(false)
  const ShowSide2 = () => {
    setShow(!Show)
  }
  const handleCategoryChange = (event) => {
    if ("Electronic".includes(event.target.value)) {
      setCat(event.target.value)
      const Data = Electrinics

      SetDownCondtion(true)
      SetDropDown(Data)
    } else if ("Clothing".includes(event.target.value)) {
      setCat(event.target.value)
      SetSizes(SizesValuesChange)
      const Data = Clothing
      SetDownCondtion(true)
      SetDropDown(Data)
    }
    else if ("Footware".includes(event.target.value)) {
      setCat(event.target.value)
      SetSizes(SizesValuesChange)
      const Data = Footware
      SetDownCondtion(true)
      SetDropDown(Data)

    } else if ("Accessories".includes(event.target.value)) {
      setCat(event.target.value)
      const Data = Accesories
      SetDownCondtion(true)
      SetDropDown(Data)
    } else if ("Beauty&Person Care".includes(event.target.value)) {
      setCat(event.target.value)
      const Data = Beauty_PersonCare
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Home&Kitchen".includes(event.target.value)) {
      setCat(event.target.value)
      const Data = Home_Kitchen
      SetDownCondtion(true)
      SetDropDown(Data)
      setCat(event.target.value)
    }
    else if ("Furniture".includes(event.target.value)) {
      setCat(event.target.value)
      const Data = Furniture
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Books,Movies&Music".includes(event.target.value)) {
      setCat(event.target.value)
      const Data = Books_Music
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Sports".includes(event.target.value)) {
      setCat(event.target.value)
      const Data = Sports
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Health".includes(event.target.value)) {
      setCat(event.target.value)
      const Data = Health
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Toys&Games".includes(event.target.value)) {
      setCat(event.target.value)
      const Data = Toys_Games
      SetDownCondtion(true)
      SetDropDown(Data)

    }

  };
  const handleCategory = (event) => {
    if ("Electronic".includes(event)) {

      const Data = Electrinics
     
      SetDownCondtion(true)
      SetDropDown(Data)
    } else if ("Clothing".includes(event)) {

      const Data = Clothing
   
      SetDownCondtion(true)
      SetDropDown(Data)
    }
    else if ("Footware".includes(event)) {

      const Data = Footware
      SetDownCondtion(true)
      SetDropDown(Data)

    } else if ("Accessories".includes(event)) {

      const Data = Accesories
      SetDownCondtion(true)
      SetDropDown(Data)
    } else if ("Beauty&Person Care".includes(event)) {

      const Data = Beauty_PersonCare
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Home&Kitchen".includes(event)) {

      const Data = Home_Kitchen
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Furniture".includes(event)) {

      const Data = Furniture
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Books,Movies&Music".includes(event)) {

      const Data = Books_Music
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if (("Sports".includes(event))) {

      const Data = Sports
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Health".includes(event)) {

      const Data = Health
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Toys&Games".includes(event)) {

      const Data = Toys_Games
      SetDownCondtion(true)
      SetDropDown(Data)

    }

  };
  const HandleCategory_Name = (event) => {
    const name = DropDown[event.target.value]
    setC_N(name)
  }
  const [HoverList, SetHoverList] = useState([])

  const HandleCategoryHover = (event) => {

    if ("Electronic".includes(event)) {

      const Data = Electrinics

      SetHoverList(Data)

    } else if ("Clothing".includes(event)) {

      const Data = Clothing
      SetHoverList(Data)

    }
    else if ("Footware".includes(event)) {

      const Data = Footware
      SetHoverList(Data)


    } else if ("Accessories".includes(event)) {

      const Data = Accesories
      SetHoverList(Data)

    } else if ("Beauty&Person Care".includes(event)) {

      const Data = Beauty_PersonCare
      SetHoverList(Data)


    }
    else if ("Home&Kitchen".includes(event)) {

      const Data = Home_Kitchen
      SetHoverList(Data)


    }
    else if ("Furniture".includes(event)) {

      const Data = Furniture
      SetHoverList(Data)

    }
    else if ("Books,Movies&Music".includes(event)) {

      const Data = Books_Music
      SetHoverList(Data)


    }
    else if (("Sports".includes(event))) {

      const Data = Sports
      SetHoverList(Data)


    }
    else if ("Health".includes(event)) {

      const Data = Health
      SetHoverList(Data)


    }
    else if ("Toys&Games".includes(event)) {

      const Data = Toys_Games
      SetHoverList(Data)


    }
  }
  // const [HoverList2,SetHoverList2]=useState([])
  const HandleCategoryHover2 = (event) => {


  }
  const HandleHoveChange = (type) => {
    const Data = global.filter((e) => {
      return e.Product_Name.Category_Name == type
    });

    setProducts(Data);
    if (Data.length > 0) {
      SetHoverList([])
    }
  }

  const HandleSave = async () => {
    if(Cat=='FootWare'||Cat=='Clothing'){
     
      if(Size.length==0){
        
        
        return
      }
  }
    if (EImage) {
      let count=1
      for (let image of editimage) {
        const ImgData = {
          "pk": Product.id,
          "P_Images": image
        }
        await axios.patch("http://127.0.0.1:8000/Image3Details/", ImgData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(async (d) => {

          const Data = {
            "pk": d.data.id,
            "P_Images": d.data.P_Images,
            "Ind": 1
          }

          await axios.patch("http://127.0.0.1:8000/ImageDetails/", Data).then((d) => {
            
                 if(editimage.length){
                    window.location.reload() 
                 }
                 count+=1
          }).catch((e) => {
            console.log('error')
          })
        }).catch((e) => {
          console.log('error')
        })




      }

      
      
    }
    else {
      window.location.reload()
    }


  }
  const RemoveImages = (url1) => {
    const FilterImages = ImageUrlList.filter((url2) => {
      return url1 !== url2
    })
    const Url = FilterImages[0]

    const Data = {
      pk: Product.id,
      List_Urls: FilterImages,
      ImageUrl: Url
    };
    setImageUrlList(FilterImages)
    SetImageLimit(5 - FilterImages.length)

    axios.patch('http://127.0.0.1:8000/RemoveImages/', Data).then((d) => {
    }).catch((e) => {
      console.log('error')
    })


  }
  const [data, setdata] = useState([])
  const [Sug, setSug] = useState([])
  const [DataList, SetDataLIst] = useState([])
  const [inval, setinval] = useState('')
  useEffect(() => {
    if (data.length > 0) {
      const List = []
      data.map((e) => {
        List.unshift(e.Product_Name.Product_Name)
      })
      SetDataLIst(List)

    }
  }, [data])
  useEffect(() => {

    if (inval.length >= 2) {

      const Filter = DataList.filter((e) => {
        return String(e).toLowerCase().includes(`${inval}`.toLowerCase());
      });



      const Filter2 = Filter.map((e) => {
        const val = e.toLowerCase()
        return val
      })
      setSug([...new Set(Filter2)]);
    } else {
      setSug([]);
    }
  }, [inval, DataList]);
  const HandleInputValue = (event) => {
    const Value = event.target.value
    if (Value.length > 0) {
      setinval(Value)

    } else {
      setinval('')
    }

  }
  const HandleNaviProduct = (val) => {
    const Filter = data.filter((pro) => {
      if (pro.Product_Name.Product_Name.toLowerCase().includes(String(val.toLowerCase()))) {
        return pro
      }
    })
    if (Filter.length > 0) {
      setProducts(Filter)
      setSug([])
      setinval('')
    }
  }
  const HandleCheckboxChange=(e,value)=>{
        
         if(e.target.checked){
            const filter=[...Size,value]
           
           SetSizes(filter)
           

         }else{
          
            const filter=Size.filter((e)=>{
               return e!==value
            })
          
  
            if(filter.length>0){
              SetSizes(filter)
            }else{
              
                SetFootMinPop(true)
            }
         }
  }
  return (
    <>
      <div className=''>
        <Navbar ShowSide2={ShowSide2} BottomClicked={BottomClicked} />
      </div>
      <div className=' col-12  ' style={{ overflow: 'hidden' }} >
        <div className='d-flex flex-row  p-2  mt-1' style={{ backgroundColor: 'white' }}>
          <div className='  col-md-4 col-lg-3 d-none d-md-block ml-auto'>

            <h6 className='mt-2 '>Filter By You'r Product by Product_Name </h6>

          </div>
          <div className='col-12 col-md-8 p-1 ml-auto' style={{ position: 'relative' }}>
            <input onChange={HandleInputValue} value={inval} type="text" className='form-control web2' placeholder='search by Products Name' />
          </div>

        </div>
      </div>
      <div className=' col-12 d-block d-sm-none d-flex flex-row justify-content-end ' style={{ overflow: 'hidden' }} >
        {!ShowFilter && <> <span className='mr-2 btn btn-primary mt-2' onClick={() => { SetShowFilter(true) }}> filter</span></>}
      </div>
      <div className='d-flex flex-row  ' style={{ overflow: 'hidden' }}>
        <div className=' d-none  d-sm-block    bg-info vh-100' style={{ overflowY: 'auto', overflowX: 'hidden', width: '100%' }}>
          <div className='d-flex flex-column text-white'>
            <span className='btn text-white btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'All'
              handleCatgerory(type)
            }}>All</span>
            <span onMouseEnter={() => { HandleCategoryHover("Electronic") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Electronic'
              handleCatgerory(type)
            }}>Electronics</span>
            <span onMouseEnter={() => { HandleCategoryHover("Clothing") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Clothing'
              handleCatgerory(type)
            }}>Clothing</span>
            <span onMouseEnter={() => { HandleCategoryHover("Footware") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Footware'
              handleCatgerory(type)
            }}>Footware</span>
            <span onMouseEnter={() => { HandleCategoryHover("Accessories") }} className='btn text-white  btn1 ' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Accessories'
              handleCatgerory(type)
            }}>Accessories</span>
            <span onMouseEnter={() => { HandleCategoryHover("Beauty&Person") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Beauty&Person'
              handleCatgerory(type)
            }}>Beauty&Person</span>
            <span onMouseEnter={() => { HandleCategoryHover("Home&Kitchen") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Home&Kitchen'
              handleCatgerory(type)
            }}>Home&Kichen</span>
            <span onMouseEnter={() => { HandleCategoryHover("Furniture") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Furniture'
              handleCatgerory(type)
            }}>Furniture</span>
            <span onMouseEnter={() => { HandleCategoryHover("Books,Movies&Music") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Book,Movies&Music'
              handleCatgerory(type)
            }}>Books,Movies&Musics</span>
            <span onMouseEnter={() => { HandleCategoryHover("Sports") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Sports'
              handleCatgerory(type)
            }}>Sports</span>
            <span onMouseEnter={() => { HandleCategoryHover("Health") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Health'
              handleCatgerory(type)
            }}>Health</span>
            <span onMouseEnter={() => { HandleCategoryHover("Toys&Games") }} className='btn text-white btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Toys&Games'
              handleCatgerory(type)
            }}>Toys&Games</span>
          </div>
        </div>

        <div className=' col-sm-8  col-lg-10 row' style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', height: '100vh' }}>

          {products && products.slice().reverse().map((e, index) => {
            return (
              <div onMouseEnter={() => { SetHoverList([]) }} className='col-sm-12 col-md-6  d-sm-flex flex-sm-column d-flex-row mt-3' key={index}>
                <div className='row'>
                  <div className='col-12 text-center'>
                    < img src={e.ImageUrl} alt="" height={'130px'} />
                  </div>
                  <div className='col-12 text-center'>

                    <span className=''>{e.Product_Name.Product_Name}</span><br></br>
                    <span><i className="fa-solid fa-indian-rupee-sign"></i>{e.Product_Name.Price}</span><br></br>
                    <span>Stack-:<span className='text-info' style={{ fontWeight: 'bold' }}>{e.Product_Name.Stack}</span></span><br></br>
                    <span>Discount-:<span className='text-danger'>{e.Product_Name.Discount}%</span></span><br></br>
                    <span className='text-danger'>Selling Price:-  <span className='text-success'>{Math.trunc(e.Product_Name.Price - (e.Product_Name.Price * (e.Product_Name.Discount / 100)))}<i className="fa-solid fa-indian-rupee-sign ml-1"></i></span></span><br></br>
                  </div>
                  <div className='col-12 text-center'>
                    <span className='btn btn-primary ml-3 mr-3' onClick={() => {
                      setPro(!Pro)
                      handleEdit(e)
                    }}>
                      <i className="fa-solid fa-pen-to-square mr-3"></i>Edit
                    </span>
                    <button className='btn btn-danger' onClick={() => { HandleDelete(e) }}><i className="fa-solid fa-trash mr-2"></i>Delete</button>

                    <div className=' btn d-flex flex-row text-center col-12 mt-3'>
                      {e.Add ? <>
                        <button onClick={() => {
                          HandleTopDeals(e, 'Dele')
                        }} className='mr-auto ml-auto btn-success'>Remove in Top Deals</button></> : <><button onClick={() => {
                          HandleTopDeals(e, 'Add')
                        }} className='ml-auto mr-auto btn-warning'>Add in Top Deals</button></>}
                    </div>
                    <div className=' btn d-flex flex-row text-center col-12 mt-3'>
                      {/* {e.Sugg ? <>
                        <button onClick={() => {
                          HandleSuggest(e, 'Dele')
                        }} className='mr-auto ml-auto btn-primary'>Remove in Suggest</button></> : <><button onClick={() => {
                          HandleSuggest(e, 'Add')
                        }} className='ml-auto mr-auto btn-info'>Add in Suggest</button></>} */}
                    </div>
                  </div>

                </div>
              </div>
            )
          })}                                                                                                                                         

        </div>

        {HoverList.length > 0 && <>
          <div className='d-flex flex-column card' style={{ position: 'absolute', top: '150px', left: '200px', }}>
            {HoverList.map((e) => {
              return (
                <>
                  <span onClick={() => { HandleHoveChange(e) }} style={{ cursor: 'pointer' }} className='p-2'>{e}</span>
                </>
              )
            })}
          </div>
        </>}



        {Pro && <div style={{ position: 'absolute', top: '10px' ,right:'5px', overflow: 'hidden' }} className='col-12 col-lg-12  bg-light mod'>
          <div className='d-flex flex-row justify-content-end mt-3 p-3'>
            <i class="fa-solid fa-xmark  text-dark p-1 btn mt-2 card " onClick={() => {
              setPro(false)
            }} style={{ borderRadius: '5px',cursor:'pointer' }}></i>
            
          </div>
          <form onSubmit={(e)=>{
             e.preventDefault()
             handleSave()
             HandleSave()
          }} className='col-12 row p-2' >
            <div className='col-12 col-md-6 d-flex flex-column'>
              <label htmlFor="">Product_Name</label>
              <input style={{ fontSize: '15px', }} value={editedProductName} className='form-control' onChange={(e) => setEditedProductName(e.target.value)} />
            </div>
            <div className='col-12 col-md-6 d-flex flex-row'>
              <div className='col-6 d-flex flex-column'>
                <label htmlFor="pn">Brand</label>
                <input required className='form-control' value={Brand} onChange={(e) => { setBrand(e.target.value) }} type="text" placeholder='Enter Brand Name' />
              </div>
              <div className='col-6 d-flex flex-column'>
                <label htmlFor="pn">Color</label>
                <input required className='form-control' value={Color} onChange={(e) => { setColor(e.target.value) }} type="text" placeholder='Enter Color Names' />
              </div>
            </div>
            <div className='col-12 col-md-6 d-flex flex-column'>
              <label htmlFor="pc">Category</label>
              <select style={{ overflow: 'hidden' }} required className='form-control' value={Cat} onChange={(e) => {
                handleCategoryChange(e)
              }}>
                <option >
                  -----------------
                </option>
                <option value="Electronic">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Footware">Footware</option>
                <option value="Accessories">Accessories</option>
                <option value="Beauty&Person Care">Beauty&Person Care</option>
                <option value="Home&Kitchen">Home&Kitchen</option>
                <option value="Furniture">Furniture</option>
                <option value="Books,Movies&Music">Books, Movies&Music</option>
                <option value="Sports">Sports</option>
                <option value="Health">Health</option>
                <option value="Toys&Games">Toys&Games</option>
              </select><br></br>
            </div>
            <div className='col-12 col-md-6 d-flex flex-column'>
              <label htmlFor="price">Category Name</label>
              <div style={{ overflow: 'hidden' }} className='form-group'>
                {DownCondition && (
                  <select value={C_N} className='form-control' required onChange={(e) => {
                    setC_N(e.target.value)
                  }}>
                    <option >
                      -----------------
                    </option>
                    {DropDown.map((categoryName, index) => (
                      <option key={index} value={categoryName}>
                        {categoryName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className='col-12 col-md-6 d-flex flex-column'>
              <label htmlFor="">Price</label>
              <input style={{ fontSize: '15px', }} type='number' value={editedPrice} className='form-control' onChange={(e) => setEditedPrice(e.target.value)} />
            </div>
            <div className='col-12 col-md-6 d-flex flex-column'>
              <label htmlFor="">Stack</label>
              <input type='number' style={{ fontSize: '15px', }} value={editStack} className='form-control' onChange={(e) => { setEditedStack(e.target.value) }} />
            </div>
            <div className='col-12 col-md-6 d-flex flex-column mb-5'>
              <label htmlFor="">Discount in Percentage</label>
              <input type='number' min={0} max={99} style={{ fontSize: '15px', }} value={editDiscount} className='form-control' onChange={(e) => { setEditedDiscount(e.target.value) }} />
              <label htmlFor="">Delivary_Charges</label>
              <input onChange={(e) => { setDel(e.target.value) }} style={{ fontSize: '15px', fontWeight: 'bold', }} value={Del} className='form-control' />
              
                 {Cat=='Footware'&&<>
             
                    <div className='row'>
                      <div className='col-12 mt-1' style={{rowGap:'5px'}}>
                         <label htmlFor="">Update Your Product Size</label>
                      </div>
                    {FootSizes.map((e)=>{
                    
                        return(
                          <>
                              <div key={e} className='ml-3'>
                                    <input type="checkbox" checked={Size.includes(e)}  onChange={(eve)=>{HandleCheckboxChange(eve,e)}} /><span className='ml-1'>{e}</span>
                              </div>
                          </>
                        )
                     })}
                    </div>
                 </>}
                 {Cat=='Clothing'&&<>
                  <div className='row' style={{rowGap:'5px'}}>
                      <div className='col-12 mt-1'>
                         <label htmlFor="">Update Your Product Size</label>
                      </div>
                 {DressSizes.map((e)=>{
                     
                       return(
                          <>
                              <div key={e} className='ml-3'>
                                    <input type="checkbox" checked={Size.includes(e)}  onChange={(eve)=>{HandleCheckboxChange(eve,e)}} /><span className='ml-1'>{e}</span>
                              </div>
                          </>
                        )  
                 })}
                 </div>
                 </>}
          
              {ImageUrlList.length < 5 && <> <div className=' mb-4 d-flex flex-column'>
                <label htmlFor="image mt-5 ">Add images <span className='text-danger'>(Limit is {5 - ImageUrlList.length})</span></label>
                <input multiple type="file" className='form-control-file' name="image" id="image" accept='image/*' onChange={(e) => { handleImageChange(e) }} />
              </div>
              </>}
              <div className=' d-flex   row   ' style={{rowGap:'20px',columnGap:'10px'}}>
                {ImageUrlList && ImageUrlList.map((e) => {


                  return (
                    <>
                      <div className=' ml-2' style={{ height: '120px', width: '100px' }}>
                        {ImageUrlList.length == 1 ? <></> : <>
                          <div className='col-12 ml-4 mt-1  d-flex flex-row justify-content-end'>
                            <i onClick={() => { RemoveImages(e) }} class="fa-regular fa-circle-xmark   text-white bg-danger" style={{ borderRadius: '100px', fontSize: '15px', cursor: 'pointer' }} />
                          </div>
                        </>}
                        <img srcSet={e} width={'90%'} height={'90%'} alt="" />
                      </div>
                    </>
                  )

                })}



              </div>

            </div>
            <div className='d-none d-md-block col-md-6 d-md-flex flex-md-column mt-4 ' style={{ height: '300px' }}>
              <label htmlFor="desc">Description</label>
              <ReactQuill
                theme="snow"
                style={{ height: '200px' }}
                modules={{
                  toolbar: [
                    [{ 'header': ['1', '2', '3', '4', '5', '6', '7'] }, { 'font': [] }],
                    [{ 'size': ['10px', '15px', '20px', '25px'] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'color': ["Black", "White", "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gray", "Brown", "Cyan", "Pink", "Magenta", "Lime", "Teal"] }]
                  ]
                }}
                value={Des}
                onChange={(e) => { setDes(e) }}

              />


            </div>
            <div className='col-12 d-block d-md-none d-flex flex-column   mb-5' style={{ height: '300px' }}>
              <label htmlFor="desc">Description</label>
              <ReactQuill
                theme="snow"
                style={{ height: '200px' }}
                modules={{
                  toolbar: [
                    [{ 'header': ['1', '2', '3', '4', '5', '6', '7'] }, { 'font': [] }],
                    [{ 'size': ['10px', '15px', '20px', '25px'] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'color': ["Black", "White", "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gray", "Brown", "Cyan", "Pink", "Magenta", "Lime", "Teal"] }]
                  ]
                }}
                value={Des}
                onChange={(e) => { setDes(e) }}

              />


            </div>
            <div className=' d-none d-md-block col-12 col-md-6 d-md-flex flex-md-column' style={{ height: '350px' }}>
              <label  htmlFor="">Hightlest</label>
              <ReactQuill
                theme="snow"
                style={{ height: '250px' }}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ 'size': ['10px', '15px', '20px', '25px'] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'color': ["Black", "White", "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gray", "Brown", "Cyan", "Pink", "Magenta", "Lime", "Teal"] }]
                  ]
                }}
                value={Hig}
                onChange={(e) => {
                  setHigh(e)
                }}

              />
            </div>
            <div className='col-12 d-block d-md-none d-flex flex-column mt-1 mb-4' style={{ height: '350px' }}>
              <label  htmlFor="">Highlights</label>
              <ReactQuill
                theme="snow"
                style={{ height: '250px' }}
                modules={{
                  toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ 'size': ['10px', '15px', '20px', '25px'] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'color': ["Black", "White", "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gray", "Brown", "Cyan", "Pink", "Magenta", "Lime", "Teal"] }]
                  ]
                }}
                value={Hig}
                onChange={(e) => {
                  setHigh(e)
                }}

              />
            </div>
            <div className='d-none d-md-block col-md-6 d-md-flex flex-md-column' style={{ height: '350px' }}>
              <label htmlFor="desc">General Specification <i style={{ fontWeight: '25px', color: 'blue' }} onMouseEnter={() => { SetInfo(true) }} onMouseLeave={() => { SetInfo(false) }} class="fa-solid fa-circle-info"></i> {Info && <><small className='shadow-lg p-2 ' style={{ position: 'relative', cursor: 'pointer', color: 'red' }}> to provide detailed content under each heading in the 'General Specifications' section </small></>}

              </label>
              <ReactQuill
                theme="snow"
                style={{ height: '250px' }}
                modules={{
                  toolbar: [
                    [{ 'header': ['1', '2', '3', '4', '5', '6', '7'] }, { 'font': [] }],
                    [{ 'size': ['10px', '15px', '20px', '25px'] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'color': ["Black", "White", "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gray", "Brown", "Cyan", "Pink", "Magenta", "Lime", "Teal"] }]
                  ]
                }}
                value={general}
                onChange={(e) => { SetGeneral(e) }}
              />


            </div>
            <div className='col-12 col-md-6 d-flex flex-column d-md-none mt-4' style={{ height: '350px' }}>
              <label htmlFor="desc">General Specification <i style={{ fontWeight: '25px', color: 'blue' }} onMouseEnter={() => { SetInfo(true) }} onMouseLeave={() => { SetInfo(false) }} class="fa-solid fa-circle-info"></i> {Info && <><small className='shadow-lg p-2 ' style={{ position: 'relative', cursor: 'pointer', color: 'red' }}> to provide detailed content under each heading in the 'General Specifications' section </small></>}

              </label>
              <ReactQuill
                theme="snow"
                style={{ height: '250px' }}
                modules={{
                  toolbar: [
                    [{ 'header': ['1', '2', '3', '4', '5', '6', '7'] }, { 'font': [] }],
                    [{ 'size': ['10px', '15px', '20px', '25px'] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'color': ["Black", "White", "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gray", "Brown", "Cyan", "Pink", "Magenta", "Lime", "Teal"] }]
                  ]
                }}
                value={general}
                onChange={(e) => { SetGeneral(e) }}
              />


            </div>
            <div className='col-12 text-center mt-5 mb-2'>
              <input type='submit' value={'Update'} className='btn btn-primary text-center col-6 col-md-4 col-lg-3' onClick={(e) => {
               
               
               
            
              }} />
            </div>
          </form>
        </div>}
      </div>


      {Show && <>
        <div style={{ position: 'absolute', top: '0px', width: '100%', overflow: 'hidden' }}>
          <Sidebar2 ShowSide2={ShowSide2} />
        </div>
      </>}
      <>
      </>
      {Pop && <>
        <Modal show={Pop} >
          <Modal.Header>
            <Modal.Title className='text-danger'>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="form-group">

              <div className='col-12 d-flex flex-row justify-content-end '>
            

              </div>
              <span className='text-dark  pw'>You cannot delete the product if it has not been delivered to the customer. The customer has ordered the product, but it has not yet been delivered</span>
            </div>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setPop(false) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>}
      {Bottom&& <>
        <Modal show={Bottom} >
          <Modal.Header className=''>
         
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex flex-row justify-content-center'>
            <div className='p-1' onClick={()=>{
            setBottom(false)
            
          }}>
            <span className=' btext' style={{ fontSize: '15px',cursor:'pointer' }}><i class="fa-solid fa-user mr-2 mt-auto mb-auto "></i>Profile</span>
          </div>
          <div className='p-1 mb-2 ml-5 '>
          <span className=' btext' onClick={() => {
                                localStorage.removeItem('username')
                                navigate('/Login')
                            }} style={{ fontSize: '15px',cursor:'pointer' }}>  <i class="fa-solid fa-power-off  mr-2 mt-auto mb-auto  "></i>Logout</span>
          </div>
            </div>




          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {  setBottom(!Bottom) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>}
      <div className=' col-12  ' style={{ overflow: 'hidden', position: 'absolute', top: '94px' }} >
        <div className='d-flex flex-row  p-2  mt-1' style={{ backgroundColor: 'white', background: 'rgb(0,0,0,0)' }}>
          <div className='mod  col-md-4 col-lg-3 d-none d-md-block ml-auto' style={{ visibility: 'hidden' }}>

            <h6 className='mt-2'>Filter By You'r Product by Product_Name </h6>

          </div>
          <div className='col-12 col-md-8 p-1 ml-auto' style={{ visibility: `${Sug.length == 0 ? 'hidden' : ''}`, }}>
            <div className='col-12 card d-flex flex-comun' style={{ height: `${Sug.length > 10 ? '250px' : ''}`, overflow: `${Sug.length > 10 ? 'auto' : ''}` }}  >

              {Sug && Sug.map((e) => {
                return <small style={{ cursor: 'pointer' }} onClick={() => {
                  HandleNaviProduct(e)
                }}>{e.split(" ").slice(0, 8).join(' ')}</small>
              })}

            </div>
          </div>

        </div>
      </div>
      {ShowFilter && <>
        <div className=' d-block  d-sm-none    bg-info p-2 col-10' style={{ overflowY: 'auto', overflowX: 'hidden', position: 'absolute', top: '120px', left: '10px' }}>
          <div className='d-flex flex-row justify-content-end mt-2'>
            <span className='ml-auto btn btn-danger' onClick={() => { SetShowFilter(false) }}>Close</span>
          </div>
          <div className='d-flex flex-column text-white'>
            <span className='btn text-white btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'All'
              handleCatgerory(type)
            }}>All</span>
            <span className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Electronic'
              handleCatgerory(type)
            }}>Electronics</span>
            <span className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Clothing'
              handleCatgerory(type)
            }}>Clothing</span>
            <span className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Footware'
              handleCatgerory(type)
            }}>Footware</span>
            <span className='btn text-white  btn1 ' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Accessories'
              handleCatgerory(type)
            }}>Accessories</span>
            <span className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Beauty&Person'
              handleCatgerory(type)
            }}>Beauty&Person</span>
            <span className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Home&Kichen'
              handleCatgerory(type)
            }}>Home&Kichen</span>
            <span onMouseEnter={() => { HandleCategoryHover2("Furniture") }} className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Furniture'
              handleCatgerory(type)
            }}>Furniture</span>
            <span className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Book,Movies&Music'
              handleCatgerory(type)
            }}>Books,Movies&Musics</span>
            <span className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Sports'
              handleCatgerory(type)
            }}>Sports</span>
            <span className='btn text-white  btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Health'
              handleCatgerory(type)
            }}>Health</span>
            <span className='btn text-white btn1' style={{ textAlign: 'start' }} onClick={() => {
              const type = 'Toys&Games'
              handleCatgerory(type)
            }}>Toys&Games</span>
          </div>
        </div>
      </>}
      {FooMinPop && <>
        <Modal show={FooMinPop} >
          <Modal.Header>
            <Modal.Title className='text-danger'>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="form-group">

              <div className='col-12 d-flex flex-row justify-content-end '>
                <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                 SetFootMinPop(false)
                }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

              </div>
              <span className='text-dark  pw'> Please select  size for your product</span>
            </div>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { SetFootMinPop(false) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>}
    </>
  )
}

export default Modify;
//