import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategoryPage, setLoading } from '../../../services/actions';
import api from '../../../services/api';
import Loading from '../../Loading';
import './styles.css';

const DropdownMenu = () => {
    const [isExpended, setIsExpended] = useState(false);
    const [chevronIcon, setChevronIcon] = useState();
    const [categories, setCategories] = useState([]);
    const [categoriesDOM, setCategoriesDOM] = useState(<Loading color='#fff' size={40} />);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        api.get('/category')
            .then((response) => {
                //console.log(response.data)
                setCategories(response.data);
            }).catch((error) => {
                console.log(error)
            });
    }, []);

    useEffect(() => {
        if (categories.length > 1) {
            setCategoriesDOM(renderCategory(categories));
        }
    }, [categories]);

    useEffect(() => {
        if (isExpended) {
            setChevronIcon(<FiChevronUp size={25} color='#FDFCFC' />)
        } else {
            setChevronIcon(<FiChevronDown size={25} color='#FDFCFC' />)
            setCategories([{ category: String, isSubOf: String }]);
        };

    }, [isExpended]);

    function handleMenuExpand() {
        if (isExpended) {
            setIsExpended(false)
        } else {
            setIsExpended(true)
        }
    }

    function renderCategory(categories) {
        if (categories !== undefined) {
            return categories.map((category) => {
                return (
                    <div
                        id={category.categoryName}
                        key={category.categoryId}
                        className="category"
                    >
                        <div
                            onClick={() => handleCategoryClick(category.categoryId, category.categoryName)}
                        >{category.categoryName}</div>
                        <div className='sub-cats'>
                            {renderCategory(category.subCategories)}
                        </div>
                    </div>
                )
            })
        }
    }

    function handleCategoryClick(categoryId, categoryName) {
        dispatch(setCategoryPage(categoryName));
        dispatch(setLoading(true));
        history.push("/produtos/" + categoryName);
    }

    return (
        <div id="dropdown-menu">

            <div className="button" onClick={handleMenuExpand}  >
                <div className="menu-title">Departamentos</div>
                <div className="menu-icon" >{chevronIcon}</div>
            </div>

            <div className="categories" style={{ visibility: (isExpended) ? "visible" : "hidden" }}>

                {categoriesDOM}

            </div>

        </div>
    )
};

export default DropdownMenu;

