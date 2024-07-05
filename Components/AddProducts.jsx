import axios from 'axios';
import React, { useRef, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from '../Navbar';
import Sidebar2 from './SideBar2';
import Dsidebar from './Dsidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Add.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
const AddProducts = () => {
  const [processing, setProcessing] = useState(false);
  const [Con1, setCon] = useState(false)
  const [P, SetP] = useState()
  const [I, SetI] = useState()
  const [image, setEditImage] = useState(null)
  const [Succ, setSucc] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [setOut_Of_Task, SetSelectOutOfTask] = useState("true")
  const [selectedCategoryName, setSelectedCategoryName] = useState(null)

  const PRef = useRef(null)
  const Dref = useRef(null)
  const [highlet, setHighlet] = useState(null)
  const [Brand, setBrand] = useState("")
  const [General, SetGeneral] = useState("")
  const [CPop, setCPop] = useState(false)
  const [CNPop, setCNPop] = useState(false)
  const [SizePop, setSizePop] = useState(false)
  const [Color, setColor] = useState("")
  const [Info, SetInfo] = useState(false)
  const PRRef = useRef(null)
  const SRef = useRef(null)
  const DRef = useRef(null)
  const Href = useRef(null)
  const Delref = useRef(null)
  const [Bottom, setBottom] = useState(false)
  const [Id, SETID] = useState(0)
  const [HTop, SetTop] = useState("No")
  const [SDeal, SetSDeal] = useState("No")
  const [DownCondition, SetDownCondtion] = useState(false)
  const [DropDown, SetDropDown] = useState([])
  const [Pro, setPro] = useState(false)
  const navigate = useNavigate()
  const [Loding, SetLoding] = useState(false)
  const [Sizes, SetSizes] = useState([])
  const [FootSizes, SetFootSizes] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
  const [DressSizes, SetDressSizes] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'])
  const [PriceDiff,SetPriceDiff]=useState([])
  const [SizePrice1,SetSizePrice1]=useState(0)
  const [SizePrice2,SetSizePrice2]=useState(0)
  const [SizePrice3,SetSizePrice3]=useState(0)
  const [SizePrice4,SetSizePrice4]=useState(0)
  const [SizePrice5,SetSizePrice5]=useState(0)
  const [SizePrice6,SetSizePrice6]=useState(0)
  const [SizePrice7,SetSizePrice7]=useState(0)
  const [SizePrice8,SetSizePrice8]=useState(0)
  const [SizePrice9,SetSizePrice9]=useState(0)
  const [SizePrice10,SetSizePrice10]=useState(0)

  const ProF = () => {
    setPro(false)
  }
  const BottomClicked = (click) => {
    if (click) {
      setBottom(false)
      return
    }
    setBottom(!Bottom)

  }


  const handleCategoryChange = (event) => {
    if ("Electronic".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      const Data = ["Mobiles", " Laptops", "Cameras", "Audi", "Video", "Telivision", "Electric Devices"]
      console.log(Data)
      SetDownCondtion(true)
      SetDropDown(Data)
    } else if ("Clothing".includes(event.target.value)) {
      SetSizes([])
      setSelectedCategory(event.target.value)
      const Data = ["T-shirts", "Dresses", "Shirts", "Pants", "Jeans", "Skirts", "Jackets", "Sweaters", "Blouses", "Shorts"]
      console.log(Data)
      SetDownCondtion(true)
      SetDropDown(Data)
    }
    else if ("Footware".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      SetSizes([])
      const Data = ["Boots", "Sneakers", "Sandals", "Flats", "Heels", "Athletic Shoes", "Slippers", "Loafers", "Oxfords", "Espadrilles"]
      SetDownCondtion(true)
      SetDropDown(Data)

    } else if ("Accessories".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      const Data = ["Jewelry", "Bags & Purses", "Hats & Caps", "Scarves & Shawls", "Sunglasses", "Watches", "Belts", "Gloves",
        "Hair Accessories", "Wallets & Cardholders", "Socks & Hosiery", "Ties & Bowties", "Umbrellas", "Keychains", "Handkerchiefs", "Eyewear Accessories"]
      SetDownCondtion(true)
      SetDropDown(Data)
    } else if ("Beauty&Person Care".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      const Data = ["Skincare", "Haircare", "Makeup", "Fragrance", "Bath & Body", "Men's Grooming", "Nail Care"
        , "Tools & Accessories", "Personal Care Appliances", "Oral Care", "Shaving & Hair Removal", "Health & Wellness", "Gift Sets"]
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Home&Kitchen".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      const Data = ["Cookware", "Bakeware", "Kitchen Utensils & Gadgets", "Cutlery & Knife Accessories", "Food Storage & Organization",
        "Kitchen Appliances", "Dining & Entertaining", "Home Décor", "Bedding", "Bath", "Furniture", "Home Improvement", "Cleaning Supplies",
        "Laundry", "Heating, Cooling & Air Quality",]
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Furniture".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      const Data = ["Living Room Furniture", "Bedroom Furniture", "Dining Room Furniture", "Home Office Furniture", "Kids' Furniture", "Entryway Furniture", "Outdoor Furniture",
        "Accent Furniture", "Mattresses & Box Springs", "Furniture Sets", "Futons, Frames & Covers", "Kitchen & Dining Room Tables",
        "Chairs", "Sofas & Couches", "Ottomans", "TV Stands & Entertainment Centers", "Bookcases",]
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Books,Movies&Music".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      const Data = ["Books", "Ebooks", "Audiobooks", "Magazines", "Comics & Graphic Novels", "Textbooks", "Movies", "TV Shows", "Music",
        "Vinyl Records", "CDs & DVDs", "Digital Music", "Concert Tickets", "Sheet Music & Songbooks"]
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Sports".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      const Data = ["Athletic Clothing", "Athletic Shoes", "Team Sports", "Exercise & Fitness", "Outdoor Recreation", "Camping & Hiking",
        "Cycling", "Water Sports", "Winter Sports", "Golf", "Tennis & Racquet Sports", "Running", "Yoga", "Hunting & Fishing", "Fan Shop", "Sports Collectibles", "Sports Memorabilia", "Sports Equipment",]
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Health".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      const Data = ["Vitamins & Supplements", "Personal Care", "Health Care", "Fitness & Nutrition", "Medical Supplies & Equipment", "Wellness & Relaxation",
        "Sports Nutrition", "First Aid", "Weight Management", "Health Monitors", "Diet & Nutrition", "Alternative Medicine", "Mobility Aids & Equipment", "Braces, Splints & Supports", "Occupational & Physical Therapy",]
      SetDownCondtion(true)
      SetDropDown(Data)

    }
    else if ("Toys&Games".includes(event.target.value)) {
      setSelectedCategory(event.target.value)
      const Data = ["Dolls & Accessories", "Puzzles", "Building Toys", "Outdoor Play", "Ride-On Toys", "Remote Control & Play Vehicles", "Stuffed Animals & Plush",
        "Arts & Crafts", "Learning & Educational Toys", "Board Games", "Card Games", "Electronic Games", "Party Supplies",
        "Kids' Electronics", "Musical Instruments", "Tricycles, Scooters & Wagons", "Video Games",]
      SetDownCondtion(true)
      SetDropDown(Data)

    }

  };
  const HandleCategory_Name = (event) => {
    const name = DropDown[event.target.value]
    setSelectedCategoryName(name)
  }
  const HandleData = async (e) => {

  const Data2=[] 
 
//  if( selectedCategory=='Clothing'){
//        DressSizes.map((e,index)=>{
//            const condition= Sizes.some((e1)=>{
//                   return e==e1
//             })
//             if(condition){
//                  if(index==0){
//                      const data={
//                       ele:e,
//                       price:SizePrice1
//                      }
//                      Data2.unshift(data)
//                  }else if(index==1){
//                   const data={
//                     ele:e,
//                     price:SizePrice2
//                    }
//                    Data2.unshift(data)
//                  }
//                  else if(index==2){
//                   const data={
//                     ele:e,
//                     price:SizePrice3
//                    }
//                    Data2.unshift(data)
//                  }
//                  else if(index==3){
//                   const data={
//                     ele:e,
//                     price:SizePrice4
//                    }
//                    Data2.unshift(data)
//                  }
//                  else if(index==4){
//                   const data={
//                     ele:e,
//                     price:SizePrice5
//                    }
//                    Data2.unshift(data)
//                  }
//                  else if(index==5){
//                   const data={
//                     ele:e,
//                     price:SizePrice6
//                    }
//                    Data2.unshift(data)
//                  }
//                  else if(index==6){
//                   const data={
//                     ele:e,
//                     price:SizePrice7
//                    }
//                    Data2.unshift(data)
//                  }
//                  else if(index==7){
//                   const data={
//                     ele:e,
//                     price:SizePrice8
//                    }
//                    Data2.unshift(data)
//                  }
//                  else if(index==8){
//                   const data={
//                     ele:e,
//                     price:SizePrice9
//                    }
//                    Data2.unshift(data)
//                  }
//                  else if(index==9){
//                   const data={
//                     ele:e,
//                     price:SizePrice10
//                    }
//                    Data2.unshift(data)
//                  }

//             }
//        })
//  }
//  if(selectedCategory=='Footware'){
    
//   FootSizes.map((e,index)=>{
//     const condition= Sizes.some((e1)=>{
//            return e==e1
//      })
//      if(condition){
//           if(index==0){
//               const data={
//                ele:e,
//                price:SizePrice1
//               }
//               Data2.unshift(data)
//           }else if(index==1){
//            const data={
//              ele:e,
//              price:SizePrice2
//             }
//             Data2.unshift(data)
//           }
//           else if(index==2){
//            const data={
//              ele:e,
//              price:SizePrice3
//             }
//             Data2.unshift(data)
//           }
//           else if(index==3){
//            const data={
//              ele:e,
//              price:SizePrice4
//             }
//             Data2.unshift(data)
//           }
//           else if(index==4){
//            const data={
//              ele:e,
//              price:SizePrice5
//             }
//             Data2.unshift(data)
//           }
//           else if(index==5){
//            const data={
//              ele:e,
//              price:SizePrice6
//             }
//             Data2.unshift(data)
//           }
//           else if(index==6){
//            const data={
//              ele:e,
//              price:SizePrice7
//             }
//             Data2.unshift(data)
//           }
//           else if(index==7){
//            const data={
//              ele:e,
//              price:SizePrice8
//             }
//             Data2.unshift(data)
//           }
//           else if(index==8){
//            const data={
//              ele:e,
//              price:SizePrice9
//             }
//             Data2.unshift(data)
//           }
//           else if(index==9){
//            const data={
//              ele:e,
//              price:SizePrice10
//             }
//             Data2.unshift(data)
//           }

//      }
// })

//  }

    e.preventDefault()
 



    const pname = PRef.current.value
    const des = Dref.current.value ? String(Dref.current.value) : String('<p><br></p>')
    const price = PRRef.current.value
    const stack = SRef.current.value
    const Delivary = Delref.current.value ? Delref.current.value : 0
    const Highlet = highlet ? String(highlet) : String('<p><br></p>')
    const discount = DRef.current.value ? DRef.current.value : 0
    const Out_Of_Task = stack > 0 ? true : false
    if (!selectedCategory) {
      setCPop(true)
      return
    }
    if (!selectedCategoryName) {
      setCNPop(true)
      return
    }
    if (selectedCategory == 'Clothing' || selectedCategory == 'Footware') {
      if (Sizes.length == 0) {
        setSizePop(true)
        return
      }

    }
    console.log(Data2)

    setProcessing(true)
    SetLoding(true)
    const pirceDif=(selectedCategory=='Footware'||selectedCategory=='Clothing')?Data2.join('%'):'No'
    const Data = {

      "username": localStorage.getItem('username'),
      "Product_Name": pname,
      "Category": selectedCategory,
      "Category_Name": selectedCategoryName,
      "Price": price,
      "Stack": stack,
      "Out_Of_Task": Out_Of_Task,
      "Description": des,
      "Discount": discount,
      "Hightlet": Highlet,
      "Brand": Brand,
      "Color": Color,
      "Delivary_Charges": Delivary,
      "Specifications": General ? String(General) : String('<p><br></p>'),
      "Size_Of_Product": Sizes.length > 0 ? String(Sizes.join('#')) : 'No',
      

    }

    await axios.post("http://127.0.0.1:8000/ProductDetails/", Data).then(async response => {

      let Ind = 0


      for (let imge of image) {


        if (Ind === 0) {
          const Data1 = {
            'Product_Name': response.data.id,
            "P_Images": imge,
          }
          await axios.post("http://127.0.0.1:8000/ImageDetails/", Data1, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(async (d) => {

            SETID(d.data.id)
            const Data = {
              "pk": d.data.id,
              "P_Images": d.data.P_Images,
              "Ind": Ind
            }
            await axios.patch("http://127.0.0.1:8000/ImageDetails/", Data).then(async (d) => {

              if (HTop == "Yes") {

                const Data = {
                  "ImageUrl": d.data.id,
                  "username": Number(localStorage.getItem('id')),
                  "Product_Name": d.data.Product_Name
                }
                await axios.post("http://127.0.0.1:8000/TopDealsDetails/", Data).then(async (d) => {

                }).catch((e) => {

                })
              }
              if (SDeal == "Yes") {

                const Data = {
                  "ImageUrl": d.data.id,
                  "username": Number(localStorage.getItem('id')),
                  "Product_Name": d.data.Product_Name
                }


                await axios.post("http://127.0.0.1:8000/SuggestDetails/", Data).then((d) => {

                }).catch((e) => {

                })
              }

            }).catch((e) => {
              console.log('error')
            })
          })

          Ind++



        }

        else {
          const Data1 = {
            "pk": Id,
            "P_Images": imge,
          }
          await axios.patch("http://127.0.0.1:8000/Image2Details/", Data1, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(async (d) => {

            const Data = {
              "pk": d.data.id,
              "P_Images": d.data.P_Images,
              "Ind": Ind
            }
            await axios.patch("http://127.0.0.1:8000/ImageDetails/", Data).then(async (d) => {

            }).catch((e) => {
              console.log('error')
            })
          }).catch((e) => {
            console.log('error')
          })


        }

      }

      window.location.reload()







    }).catch((e) => {
      alert('error')
    })
  }


  const HandleTopDeals = () => {

    const Data = {
      "ImageUrl": I.id,
      "username": Number(localStorage.getItem('id')),
      "Product_Name": P.id
    }
    axios.post("http://127.0.0.1:8000/TopDealsDetails/", Data).then((d) => {

    }).catch((e) => {

    })
  }
  const HandleSuggest = () => {

    const Data = {
      "ImageUrl": I.id,
      "username": Number(localStorage.getItem('id')),
      "Product_Name": P.id
    }


    axios.post("http://127.0.0.1:8000/SuggestDetails/", Data).then((d) => {

    }).catch((e) => {

    })


  }
  const [Show, setShow] = useState(false)
  const ShowSide2 = () => {
    setShow(!Show)
  }







  const handleImageChange = async (event) => {
    const files = event.target.files;
    const Arr = [];
    const quality = 1.2
    for (let i = 0; i < files.length; i++) {
      if (i < 5) {
        const resizedFile = await resizeAndPush(files[i], quality);
        Arr.push(resizedFile);



      }

    }


    setEditImage(Arr)
    async function resizeAndPush(file, quality) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const desiredWidth = 150; // Desired width
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
  const SizeOnChange = (val, index) => {
  
   if(index==0){
     SetSizePrice1(val)
   }
   else if(index==1){
      SetSizePrice2(val)
   }
   else if(index==2){
    SetSizePrice3(val)
 }
 else if(index==3){
  SetSizePrice4(val)
}
else if(index==4){
  SetSizePrice5(val)
}
else if(index==5){
  SetSizePrice6(val)
}
else if(index==6){
  SetSizePrice7(val)
}
else if(index==7){
  SetSizePrice8(val)
}
else if(index==8){
  SetSizePrice9(val)
}
else if(index==9){
  SetSizePrice10(val)
}


  }





  return (
    <>
      {Loding ? <>
        <div class="d-flex flex-column align-items-center col-12 100-vw 100-vh card " style={{ height: '100vh' }}>
          <div class=" mt-auto mb-auto d-flex flex-row" role="status">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </> : <>
        <div>
          <div className=' ' style={{ overflow: 'hidden' }} >
            <Navbar ShowSide2={ShowSide2} BottomClicked={BottomClicked} />
          </div>
          <div className='' style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', overflow: 'hidden' }}>
            <div className='row'>
              <div className=''>
                <div className='mod p-3'>
                  <h6 className=' text-black'>Add Products</h6>
                  <span className=' text-black'>To Add More Products Follow The Below Rules, Carefully To Add Products</span>
                </div>
                <div className='col-12' style={{ background: 'white', overflow: 'hidden' }}>
                  <form onSubmit={HandleData} className='col-12 row shadow-lg '>
                    <div className='col-12 col-md-6 d-flex flex-column'>
                      <label htmlFor="pn">Product Name</label>
                      <input required className='form-control' type="text" ref={PRef} placeholder='Enter Product Name' />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-row'>
                      <div className='col-6 d-flex flex-column'>
                        <label htmlFor="pn">Brand</label>
                        <input required className='form-control' onChange={(e) => { setBrand(e.target.value) }} type="text" placeholder='Enter Brand Name' />
                      </div>
                      <div className='col-6 d-flex flex-column'>
                        <label htmlFor="pn">Color</label>
                        <input required className='form-control' onChange={(e) => { setColor(e.target.value) }} type="text" placeholder='Enter Color Names' />
                      </div>
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column'>
                      <label htmlFor="pc">Category</label>
                      <select required className='form-control' value={selectedCategory} onChange={(e) => {
                        handleCategoryChange(e)
                      }}>
                        <option >---Select Category---</option>
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
                      </select>
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column'>

                      {DownCondition && <>    <label htmlFor="price">Category_Name</label>
                        <select required className='form-control' onChange={HandleCategory_Name}>
                          <option >---Select Category_Name---</option>
                          {DropDown.map((categoryName, index) => (
                            <option key={index} value={index}>
                              {categoryName}
                            </option>
                          ))}
                        </select></>}

                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column'>
                      <label htmlFor="price">Price</label>
                      <input required type='number' min={0} className='form-control' ref={PRRef} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column'>
                      <label htmlFor="price">Stack</label>
                      <input required min={0} className='form-control' type="number" ref={SRef} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column'>
                      <label htmlFor="price">Disount in Pecentage</label>
                      <input className='form-control' min={0} max={99} type="number" ref={DRef} />
                      <div className='col-12  mt-2 d-flex flex-column'>
                        {selectedCategory == 'Clothing' && <>
                          <label htmlFor="">Select Your Clothing Size <span className='text-danger h6'>*</span></label>
                          {/* <div className='d-flex flex-row'>
                            <input type="checkbox" name="" id="" onChange={(e)=>{
                            if(e.target.checked){
                            SizeOnChange('XS','Yes')
                            }
                            else{
                                SizeOnChange('XS','NO')
                            }
                            }} />XS
                            <input type="checkbox" name="" id="" className='ml-3'  onChange={(e)=>{
                            if(e.target.checked){
                            SizeOnChange('S','Yes')
                            }
                            else{
                                SizeOnChange('S','NO')
                            }
                            }}  />S
                            <input type="checkbox" name="" id="" className='ml-3'  onChange={(e)=>{
                            if(e.target.checked){
                            SizeOnChange('M','Yes')
                            }
                            else{
                                SizeOnChange('M','NO')
                            }
                            }} />M
                            <input type="checkbox" name="" id="" className='ml-3'  onChange={(e)=>{
                            if(e.target.checked){
                            SizeOnChange('L','Yes')
                            }
                            else{
                                SizeOnChange('L','NO')
                            }
                            }} />L
                            <input type="checkbox" name="" id="" className='ml-3'  onChange={(e)=>{
                            if(e.target.checked){
                            SizeOnChange('XL','Yes')
                            }
                            else{
                                SizeOnChange('XL','NO')
                            }
                            }} />XL
                            <input type="checkbox" name="" id="" className='ml-3'  onChange={(e)=>{
                            if(e.target.checked){
                            SizeOnChange('XXL','Yes')
                            }
                            else{
                                SizeOnChange('XXL','NO')
                            }
                            }} />XXL
                            <input type="checkbox" name="" id="" className='ml-3'
                             onChange={(e)=>{
                            if(e.target.checked){
                            SizeOnChange('XXXL','Yes')
                            }
                            else{
                                SizeOnChange('XXXL','NO')
                            }
                            }} />XXXL
                          </div> */}
                          <div className='row mb-2' style={{columnGap:'10px',rowGap:'10px'}}>
                            {DressSizes.map((e,index) => {
                              return (
                                <> <div className='d-flex flex-column'>
                                  <div className='d-flex flex-row'>
                                    <input type="checkbox" name="" id="" className='ml-3' onChange={(e2) => {
                                      if (e2.target.checked) {
                                        const filter = [...Sizes, e]
                                        SetSizes(filter)

                                      }
                                      else {
                                        const filter = Sizes.filter((e1) => {
                                          return e1 != e
                                        })

                                        SetSizes(filter)
                                      }
                                    }} />{e}
                                  </div>
                                 
                                </div>
                                </>
                              )
                            })}
                          </div>

                        </>}
                        {selectedCategory == 'Footware' && <>
                         
                        <div className='row mb-2' style={{columnGap:'10px',rowGap:'10px'}}>
                        {FootSizes.map((e,index) => {
                              return (
                                <> <div className='d-flex flex-column'>
                                  <div className='d-flex flex-row'>
                                    <input type="checkbox" name="" id="" className='ml-3' onChange={(e2) => {
                                      if (e2.target.checked) {
                                        const filter = [...Sizes, e]
                                        SetSizes(filter)

                                      }
                                      else {
                                        const filter = Sizes.filter((e1) => {
                                          return e1 != e
                                        })

                                        SetSizes(filter)
                                      }
                                    }} />{e}
                                  </div>
                                
                                </div>
                                </>
                              )
                            })}
                          </div>
                   
                        </>}
                        <label htmlFor="image mt-1">Select images(<small className='text-danger' style={{ fontWeight: 'bolder' }}>Limit Only 5</small>)</label>
                        <input required type="file" className='form-control-file' multiple name="image" id="image" accept='image/*' onChange={handleImageChange} />
                        <label className='mt-3' htmlFor="">Delivary Charge</label>
                        <input type="number" ref={Delref} min={0} className='form-control' />
                        <div className='d-flex flex-row'>
                          <label className='mt-2' >Add in Top Deals</label>
                          <input type='checkbox' value={"Yes"} onChange={(e) => {
                            if (e.target.checked) {
                              e.target.readOnly = true;
                              SetTop("Yes")
                            }
                            else {
                              SetTop("No");
                            }
                          }} className='ml-2' />
                          <label className='mt-2 ml-3' >Add in Suggest</label>
                          <input type='checkbox' value={"Yes"} onChange={(e) => {
                            if (e.target.checked) {
                              e.target.readOnly = true;
                              SetSDeal("Yes")
                            }
                            else {
                              SetSDeal("No");
                            }
                          }} className='ml-2' />

                        </div>

                      </div>
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column' style={{ height: '300px' }}>
                      <label htmlFor="desc">General Specification <i style={{ fontWeight: '25px', color: 'blue' }} onMouseEnter={() => { SetInfo(true) }} onMouseLeave={() => { SetInfo(false) }} class="fa-solid fa-circle-info"></i> {Info && <><small className='shadow-lg p-2 ' style={{ position: 'relative', cursor: 'pointer', color: 'red' }}> to provide detailed content under each heading in the 'General Specifications' section </small></>}

                      </label>
                      <ReactQuill
                        theme="snow"
                        style={{ height: '200px' }}
                        ules={{
                          toolbar: [
                            [{ 'header': ['1', '2', '3', '4', '5', '6', '7'] }, { 'font': [] }],
                            [{ 'size': ['10px', '15px', '20px', '25px'] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'color': ["Black", "White", "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gray", "Brown", "Cyan", "Pink", "Magenta", "Lime", "Teal"] }]
                          ]
                        }}
                        onChange={(e) => { SetGeneral(e) }}
                      />


                    </div>

                    <div className='col-12 col-md-6 d-flex flex-column' style={{ height: '300px' }}>
                      <label htmlFor="desc">Description</label>
                      <ReactQuill
                        theme="snow"
                        style={{ height: '200px' }}
                        ules={{
                          toolbar: [
                            [{ 'header': ['1', '2', '3', '4', '5', '6', '7'] }, { 'font': [] }],
                            [{ 'size': ['10px', '15px', '20px', '25px'] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'color': ["Black", "White", "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gray", "Brown", "Cyan", "Pink", "Magenta", "Lime", "Teal"] }]
                          ]
                        }}
                        ref={Dref}
                      />


                    </div>
                    <div className='col-12 col-md-6 d-flex flex-column' style={{ height: '300px' }}>
                      <label htmlFor="image">Add Highlights</label>

                      <ReactQuill
                        theme="snow"
                        style={{ height: '200px' }}
                        ules={{
                          toolbar: [
                            [{ 'header': ['1', '2', '3', '4', '5', '6', '7'] }, { 'font': [] }],
                            [{ 'size': ['10px', '15px', '20px', '25px'] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'color': ["Black", "White", "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gray", "Brown", "Cyan", "Pink", "Magenta", "Lime", "Teal"] }]
                          ]
                        }}
                        onChange={(e) => {
                          setHighlet(e)

                        }}


                      />
                    </div>
                    <div className='col-6 col-md-2 d-flex flex-column ml-auto mr-auto mt-3'>
                      <input className='btn btn-warning' type="submit" value="Add" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {Succ && <>
            <div className='col-sm-4 col-md-3 p-2 col-lg-2 bg-light p-2' style={{ position: 'absolute', top: '20%', right: '5%', borderRadius: '20px' }}>
              <button onClick={() => {
                HandleTopDeals()

              }} style={{ borderRadius: '10px' }} className='btn btn-primary p-2 col-12'>Add in Top Deals</button><br></br>
              <button style={{ borderRadius: '10px' }} onClick={() => { HandleSuggest() }} className='btn btn-success mt-2 col-12'>Add In Suggest</button>
            </div>

          </>}

          {Show && <>

            <div style={{ position: 'absolute', top: '0px', width: '100%' }}>
              <Sidebar2 ShowSide2={ShowSide2} />
            </div>
          </>}
          {Bottom&& <>
        <Modal show={Bottom} >
          <Modal.Header className=''>
         
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex flex-row justify-content-center'>
            <div className='p-1' onClick={()=>{
            setBottom(false)
            setPro(true)}}>
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
          {Pro && <>
            <div className='col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3' style={{ position: 'absolute', right: '10px', top: '0px' }}>
              <Profile ProF={ProF} />
            </div>
          </>}
          {CPop && <>
            <Modal show={CPop} >
              <Modal.Body>

                <div className="form-group">

                  <div className='col-12 d-flex flex-row justify-content-end '>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                      setCPop(false)
                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                  </div>
                  <span className='text-dark  pw'>Please select the category of product</span>
                </div>



              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => { setCPop(false) }}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>}
          {CNPop && <>


            <Modal show={CNPop} >
              <Modal.Body>

                <div className="form-group">

                  <div className='col-12 d-flex flex-row justify-content-end '>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                      setCNPop(false)
                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                  </div>
                  <span className='text-dark  pw'>please provide the list of category names of  product</span>
                </div>



              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => { setCNPop(false) }}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>}
          {SizePop && <>


            <Modal show={SizePop} >
              <Modal.Body>

                <div className="form-group">

                  <div className='col-12 d-flex flex-row justify-content-end '>
                    <i class="fa-regular fa-circle-xmark text-white bg-danger" onClick={() => {
                      setSizePop(false)
                    }} style={{ fontSize: '20px', borderRadius: '10px' }}></i>

                  </div>
                  <span className='text-danger  pw h6'>Please Select Sizes Of The  Product</span>
                </div>



              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => { setSizePop(false) }}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>}
        </div>
      </>}
    </>
  );
};

export default AddProducts;

// <input type="number" className='form-control' onChange={(e2)=>{
//   SizeOnChange(e2.target.value,index)
// }}  name="" id="" style={{width:'110px',visibility:`${Sizes.includes(e)?'':'hidden'}`}} placeholder='Price Improvement' />