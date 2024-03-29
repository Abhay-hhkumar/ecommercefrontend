import React,{useState,useEffect} from 'react';
import Layout                     from '../../components/Layout/Layout';
import AdminMenu                  from '../../components/Layout/AdminMenu';
import toast                      from 'react-hot-toast';
import axios                      from 'axios';
import { Select }                 from 'antd';
import { useNavigate,useParams }  from 'react-router-dom';
import { REACT_APP_API } from '../../context/helper';
// with the help of "Option" we can create dropdown menu
const {Option}=Select

const UpdateProduct = () => {

  const navigate=useNavigate();
  const params = useParams();
  const [ categories, setCategories]  = useState([]);
  const [ name, setName]              = useState("");
  const [ description, setDescription]= useState("");
  const [ price, setPrice]            = useState("");
  const [ category, setCategory]      = useState("");
  const [ quantity, setQuantity]      = useState("");
  const [ photo,setPhoto]             = useState("");
  const [ shipping, setShipping]      = useState("");
  const [id,setId]=useState("");
  

  // get single product
  const getSingleProduct= async()=>{
    try{
        const {data}= await axios.get(`${REACT_APP_API}/api/v1/product/get-product/${params.slug}`);

        // we set the input field already so that we can edit the previous values
        setName(data?.product.name);       
        setDescription(data?.product.description);      
        setPrice(data?.product.price);
        setQuantity(data?.product.quantity);
        setShipping(data?.product.shipping);
        setCategory(data?.product.category._id);
        setId(data?.product._id)

      }catch(error){ toast.error('Something went wrong in getting Single product') ;}
  }

  useEffect(()=>{ getSingleProduct(); },[]);

  // get all category
  const getAllCategory = async ()=>{
    try{   const {data}= await axios.get(`${REACT_APP_API}/api/v1/category/get-category`);
           if(data?.success){
             setCategories(data?.category);
           }
       }catch(error){  toast.error('Something went wrong in getting category'); }
  }

  useEffect(()=>{
    getAllCategory();
   },[]);

   // update product
   const handleUpdate = async (e)=>{
            e.preventDefault();
            try{
                   // there is default browser property of "formData" (i.e we can get all data present in the form)
                  const productData = new FormData()         
                  productData.append("name", name)
                  productData.append("description", description)
                  productData.append("price", price)
                  productData.append("quantity",quantity)

                  // if we get the "product" then we do productData.append(....)
                  photo && productData.append("photo", photo)
                  productData.append("category",category)

                  const {data}=axios.put(`${REACT_APP_API}/api/v1/product/update-product/${id}`,productData);
                  
                  if(data?.success){  toast.error(data?.message); }
                  else{
                    toast.success("Product Updated successfully");
                    navigate('/dashboard/admin/products');
 
                  }}catch(error){ toast.error("Something went wrong") ;}
            }


   // delete a product
   const handleDelete =async()=>{
    try {
      let answer = window.prompt("Type 'yes' if you sure to delete this product ? ");
      if (!answer) return
    
        const { data } = await axios.delete(`${REACT_APP_API}/api/v1/product/delete-product/${id}` );
        toast.success("Product DEleted Succfully");
        navigate("/dashboard/admin/products");
      
    } catch (error) { toast.error("Something went wrong"); }
   }

  return (
    <Layout title={"Dashboard - create- product"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
      
        <div className="col-md-3">
          <AdminMenu/>
        </div>

        <div className="col-md-9">
       <h3>Update product</h3>
        <div className="m-1 w-75">

           <Select bordered={false} value={category} placeholder="Select a category" size="large" showSearch className="form-select mb-3" onChange={(value)=>{setCategory(value)}}>
              {categories?.map((c)=>(

                <Option key={c?._id} value={c?._id}>  {c?.name} </Option>

               ))}
           </Select>

           <div className='mb-3'>

           {/* // accept='image/*' it means we accept only "image" ....and.... /* means we accept image of any type  */}
            <label className='btn btn-outline-secondary col-md-12'>
               {photo ? photo?.name: "Upload Photo" }
               <input type="file" name="photo" accept='image/*' onChange={(e)=> setPhoto(e.target.files[0])} hidden />
            </label>
           </div>
           <div className='mb-3'>
             {photo ? (
                     <div className='text-center'>

                        <img src={URL.createObjectURL(photo)} alt=" product_photo" height={'200px'}  className='img img-responsive'/>
                      </div>
                  ):(
                <div className='text-center'>

                  {/* // here ${id} is id of product on which we have clicked */}
                  <img src={`${REACT_APP_API}/api/v1/product/product-photo/${id}`} alt=" product_photo" height={'200px'}  className='img img-responsive'/>
                </div>
              )}
           </div>

           <div className="mb-3">
             <input type="text" value={name} className="form-control" placeholder="name" onChange={(e)=> setName(e.target.value)} />
           </div>

           <div className="mb-3">
             <textarea type="text" value={description} className="form-control" placeholder="write a discription" onChange={(e)=> setDescription(e.target.value)} />
           </div>

           <div className="mb-3">
             <input type="number" value={price} className="form-control" placeholder="write a price" onChange={(e)=> setPrice(e.target.value)} />
           </div>

           <div className="mb-3">
             <input type="number" value={quantity} className="form-control" placeholder="write a quantity" onChange={(e)=> setQuantity(e.target.value)} />
           </div>

           <div className="mb-3">
             <Select bordered={false} value={shipping ? "yes": "No"} placeholder = "Select shipping" size="large" showSearch className="form-select mb-3" onChange={(value)=>{ setShipping(value)}}>
               <Option value="0">No</Option>
               <Option value="1">Yes</Option>
             </Select>
           </div>

           <div className="mb-3">
            <button className="btn btn-primary" onClick={handleUpdate}>update product</button>
           </div>

           <div className="mb-3">
            <button className="btn btn-danger" onClick={handleDelete}>delete product</button>
           </div>

        </div>
        </div>

      </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
