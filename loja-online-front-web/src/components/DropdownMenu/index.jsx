import React, {useState, useEffect} from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Axios from 'axios';
import ReactLoading from 'react-loading'

import './styles.css';

const DropdownMenu = () => {
    const api = Axios;

    const [isExpended, setIsExpended] = useState(false);
    const [chevronIcon, setChevronIcon] = useState();
    const [categories, setCategories] = useState([{category: String, isSubOf: String }]);
    const [loading, setLoading] = useState();

    useEffect(()=>{
        if (isExpended) {
            setChevronIcon(<FiChevronUp size={25} color='#FDFCFC'/>)

            isLoading(true);

            api.get('https://jsonbox.io/box_1094f351a8ecfcbbeb61')
                .then((response)=>{
                    console.log(response.data)
                    setCategories(response.data);
                    isLoading(false);
                }).catch((error)=>{
                    console.log(error)
                });

        } else {
            setChevronIcon(<FiChevronDown size={25} color='#FDFCFC'/>)
            setCategories([{category: String, isSubOf: String }]);
        };

    }, [isExpended]);

    function handleMenuExpand(){
        if(isExpended){
            setIsExpended(false)
        } else {
            setIsExpended(true)
        }
    }

    function isLoading(loading){
        if(loading){
            setLoading(
                <div className='loading'>
                    <ReactLoading type='spin' height={'20%'} width={'20%'} />
                </div>
            );
        } else {
            setLoading('');
        }
    }

    function loadSubCats(cat){
        return categories.map((category)=>{
            if(category.isSubOf == cat){
                console.log(category.isSubOf +" "+ cat);
                return (
                    <div id={category.category} key={category.category} className="category">
                        {category.category}
                        <div className='sub-cats'>
                            {loadSubCats(category.category)}
                        </div>
                    </div>
                )
            }
        })
        
    }

    return(
        <div id="dropdown-menu">

            <div className="button" onClick={handleMenuExpand}  >
                <div className="menu-title">Departamentos</div>
                <div className="menu-icon" >{chevronIcon}</div>
            </div>

            <div className="categories" style={{visibility: (isExpended) ? "visible" : "hidden"}}>

                {loading}

                { categories.map((category) => {
                    if(category.isSubOf == 'none' || category.isSubOf == 'None'){
                        return (
                            <div id={category.category} key={category.category} className="category">
                                {category.category}
                                <div className='sub-cats'>
                                    {loadSubCats(category.category)}
                                </div>
                            </div>
                        )
                    }
                }) }

            </div>

        </div>
    )
};

export default DropdownMenu;

