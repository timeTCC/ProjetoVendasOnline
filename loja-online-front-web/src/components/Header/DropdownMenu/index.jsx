import React, {useState, useEffect, useRef} from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Axios from 'axios';
import ReactLoading from 'react-loading'

import Loading from '../../Loading';

import './styles.css';

const DropdownMenu = () => {
    const api = Axios;

    const [isExpended, setIsExpended] = useState(false);
    const [chevronIcon, setChevronIcon] = useState();
    const [categories, setCategories] = useState([]);
    const [categoriesDOM, setCategoriesDOM] = useState(<Loading color='#fff' size={40} />);

    

    useEffect(()=>{
        api.get('https://jsonbox.io/box_8590a2b9c900cbc98925')
                .then((response)=>{
                    //console.log(response.data)
                    setCategories(response.data);
                }).catch((error)=>{
                    console.log(error)
                });
    },[]);

    useEffect(()=>{
        if(categories.length > 1){
            setCategoriesDOM(renderCategory(categories));
        }
    }, [categories]);

    useEffect(()=>{
        if (isExpended) {
            setChevronIcon(<FiChevronUp size={25} color='#FDFCFC'/>)
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

    function renderCategory(categories){
        if(categories !== undefined){
            return categories.map((category)=>{
                return (
                    <div id={category.categoryName} key={category.categoryName} className="category">
                        {category.categoryName}
                        <div className='sub-cats'>
                            {renderCategory(category.subCategories)}
                        </div>
                    </div>
                )
            })
        }
    }

    return(
        <div id="dropdown-menu">

            <div className="button" onClick={handleMenuExpand}  >
                <div className="menu-title">Departamentos</div>
                <div className="menu-icon" >{chevronIcon}</div>
            </div>

            <div className="categories" style={{visibility: (isExpended) ? "visible" : "hidden"}}>

                {categoriesDOM}

            </div>

        </div>
    )
};

export default DropdownMenu;

