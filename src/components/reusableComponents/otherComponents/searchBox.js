import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'

const SearchBox =(props)=>{
    const {search,handleInputChange}=props  
    return(
    <>
    <div className="iq-search-bar ml-auto">
    <Form action="#" className="searchbox">
        <input type="text" 
        value={search} 
        onChange={(e)=>handleInputChange(e)}
        className="text search-input" 
        placeholder="Search Here..."/>
        <Link className="search-link" to="#"><i className="ri-search-line"></i></Link>
    </Form>
    </div>
    </>
    )
}
export default SearchBox
