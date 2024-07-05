import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Profile.css'

const Profile = ({ ProF }) => {
  const [data, setData] = useState([]);
  const [Edit, setEdit] = useState(false)
  const [un, setun] = useState(null)
  const [mn, setmn] = useState(null)
  const [em, setem] = useState(null)
  const [PImg, SetPImg] = useState(false)
  const [img, setimg] = useState(null)
  const [MPop, SetMPop] = useState(false)

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/ProfileDetails/")
      .then((response) => {
        const filteredData = response.data.filter((item) => Number(localStorage.getItem('id')) === item.username.id);
        setData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching profile details:', error);
      });
  }, []);
  const EditFunc = (e) => {
    setun(e.username.username)
    setem(e.username.email)
    setmn(e.Mobile_Number)
    setEdit(true)
  }
  const HandleUsername = (data) => {

    if (String(mn).length > 10 || String(mn).length < 10) {

      SetMPop(true)
      return

    }

    const Data = {
      'pk': Number(localStorage.getItem('id')),
      'username': un.split(' ').join(''),
      'email': em,
    }
    SetMPop(false)
    axios.patch("http://127.0.0.1:8000/UserDetails/", Data).then((d) => {
      const Data = {
        'pk': data.id,
        'Mobile_Number': mn
      }
      axios.patch('http://127.0.0.1:8000/ProfileNumberDetails/', Data).then((d) => {
        localStorage.setItem('username', un)
        UpdateDetails()
        setEdit(false)
      })
    }).catch((e) => {

    })
    if(img){
      HandleProfilePic(data)
    }
  }
  const handleImageChange = async (event) => {

    const files = event.target.files;
    const Arr = [];
    const quality = 0.9;

    for (let i = 0; i < files.length; i++) {
      if (i < 5) {
        const resizedFile = await resizeAndPush(files[i], quality);
        Arr.push(resizedFile);

      }



    }
    setimg(Arr[0])

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
  const HandleProfilePic = (e) => {
    const Data = {
      'pk': e.id,
      "Profile_Pic": img

    }
    axios.patch("http://127.0.0.1:8000/ProfileImageDetails/", Data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((d) => {
      const Data = {
        'pk': e.id,
        "Profile_Pic": d.data.Profile_Pic
      }
      axios.patch("http://127.0.0.1:8000/ProfileDetails/", Data).then((d) => {

        SetPImg(null)
        setimg(null)
        UpdateDetails()
      }).catch((e) => {

      })
    }).catch((e) => {

    })

  }
  const UpdateDetails = () => {
    axios.get("http://127.0.0.1:8000/ProfileDetails/")
      .then((response) => {
        const filteredData = response.data.filter((item) => Number(localStorage.getItem('id')) === item.username.id);
        setData(filteredData);
      })
      .catch((error) => {

      });
  }


  return (
    <div className='col-12 bg-white p-4' style={{height:'500px'}}>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <span className='text-warning h6'>Profile</span>
        <button className='btn btn-primary' onClick={() => {
          ProF()
        }}>Close</button>
      </div>

      {data && data.map((e) => {
        return (
          <>
            <>
              <div className=''>
                 <div className='' id='upper-bg'>
                    
                     {Edit?<>
                       <input className='col-12' type="file" accept='image/*' onChange={handleImageChange} style={{position:'absolute',bottom:'60px'}} />
                      
                     </>:<>
                             <img className='profile-pic'  src="" alt="" sizes="" srcset={e.P_Url} />
                     </>} 
                 </div>
                 <div className='card' style={{border:'none',marginTop:'120px'}}>
                   {Edit ? <><input className='form-control' type='text' value={un} onChange={(e) => {
                       setun(e.target.value)
                  }} />
                    <small className='text-danger'>space is not allowed</small>
                  </> : <> <span className='pw ml-auto mr-auto ptext'><small className=' ' style={{fontWeight:'bold',fontSize:'20px',fontFamily:'initial'}}>{e.username.username}</small></span></>}
                 </div>
                 <div className='card' style={{border:'none',marginTop:'10px'}}>
                 {Edit ? <><input className='form-control' type='email' value={em} onChange={(e) => {
                    setem(e.target.value)
                  }} /></> : <> <span className='ml-auto mr-auto ptext' ><small>{e.username.email}</small></span></>}
                 </div>
                 <div className='card' style={{border:'none',marginTop:'10px'}}>
                 {Edit ? <><input className='form-control' type='number' min={0} value={mn} onChange={(e) => {
                    
                    if(e.target.value.length<=10){
                      setmn(e.target.value)
                    }
                  }} /></> : <> <span className='ml-auto mr-auto ptext'><small>{e.Mobile_Number}</small></span></>}
                 </div>
                 <div className='card' style={{border:'none',marginTop:'10px'}}>
                 {Edit ? <><button className='btn btn-info ml-auto mr-auto ' onClick={() => {
                  HandleUsername(e)

                }}>Save</button></> : <><button className='btn btn-info  ml-auto mr-auto' onClick={() => {
                  EditFunc(e)
                }}>Edit Profile</button></>}
                 </div>
                  {/* {PImg && <><div className='' style={{ textAlign: 'end' }}>
                    <i onClick={() => {
                      SetPImg(false)
                      setimg(null)
                    }} class="fa-solid fa-circle-xmark text-danger mb-2" style={{ fontSize: '18px' }}></i>
                  </div></>} */}
                  {/* {PImg ? <>
                    <input type="file" accept='image/*' onChange={handleImageChange} />
                    {img && <><button onClick={() => {
                      HandleProfilePic(e)
                    }} className='btn btn-warning mt-2'>save</button></>}
                  </> : <> <img className='rounded-circle' src={e.P_Url} alt="" width={'100%'} height={'100%'} />
                    <div onClick={() => {
                      SetPImg(true)
                    }} style={{ position: 'absolute', bottom: '20px', right: '30px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', cursor: 'pointer' }}>
                      <i style={{ fontSize: '20px', color: 'yellow', }} class="fa-solid fa-pen-to-square p-1"></i>
                    </div></>} */}
              
                {/* <div className='profile-field mb-2 d-flex flex-column'>
                  <label className='font-weight-bold'>Username:</label>
                  {Edit ? <><input className='form-control' type='text' value={un} onChange={(e) => {
                    setun(e.target.value)
                  }} />
                    <small className='text-danger'>space is not allowed</small>
                  </> : <> <span className=''><small>{e.username.username}</small></span></>}
                </div> */}
                {/* <div className='profile-field mb-2 d-flex flex-column'>
                  <label className='font-weight-bold'>Email:</label>
           
                  {Edit ? <><input className='form-control' type='email' value={em} onChange={(e) => {
                    setem(e.target.value)
                  }} /></> : <> <span><small>{e.username.email}</small></span></>}
                </div> */}
                {/* <div className='profile-field mb-2 d-flex flex-column'>
                  <label className='font-weight-bold'>Mobile Number:</label>
                 
                  {Edit ? <><input className='form-control' type='number' min={0} value={mn} onChange={(e) => {
                    
                    if(e.target.value.length<=10){
                      setmn(e.target.value)
                    }
                  }} /></> : <> <span><small>{e.Mobile_Number}</small></span></>}
                </div> */}
              </div>
              {/* <div className='ml-auto' >
                {Edit ? <><button className='btn btn-info ' onClick={() => {
                  HandleUsername(e)

                }}>Save</button></> : <><button className='btn btn-info ' onClick={() => {
                  EditFunc(e)
                }}>Edit Profile</button></>}
              </div> */}
            </>
          </>
        )
      })}
      {MPop && <>


        <Modal show={MPop} >
          <Modal.Body>

            <div className="form-group">

              <div className='col-12 d-flex flex-row justify-content-end '>
                <i class="fa-regular fa-circle-xmark text-dark" onClick={() => {
                  SetMPop(false)
                }} style={{ fontSize: '20px', borderRadius: 'px' }}></i>

              </div>
              <span className='text-danger  pw'>Please Enter 10 digits for your number</span>
            </div>



          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { SetMPop(false) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>}

    </div>

  );
};

export default Profile;
