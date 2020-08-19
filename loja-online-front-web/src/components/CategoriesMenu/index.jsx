import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryPage, setLoading } from '../../services/actions';
import api from '../../services/api';
import Loading from '../Loading';
import './styles.css';

const DropdownMenu = (props) => {
    const [isExpended, setIsExpended] = useState(false);
    const [chevronIcon, setChevronIcon] = useState();
    const [categories, setCategories] = useState([]);
    const [categoriesDOM, setCategoriesDOM] = useState(<Loading color='#fff' size={40} />);
    const currentCategory = useSelector(state => state.categoryPage);
    const [categoryClicked, setcategoryClicked] = useState();

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        setcategoryClicked(currentCategory);

        api.get('/category')
            .then((response) => {
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

    useEffect(() => {
        // console.log(currentCategory);
    }, [currentCategory])

    function handleMenuExpand() {
        if (isExpended) {
            setIsExpended(false)
        } else {
            setIsExpended(true)
        }
    }

    function handleCategoryClick(categoryId, categoryName) {
        // console.log(currentCategory);

        dispatch(setCategoryPage(categoryName));
        setcategoryClicked(categoryName);

        setIsExpended(false);

        if(props.linkTo){
            history.push("/produtos/" + categoryName);
        }

    }

    function renderCategory(categories) {
        if (categories !== undefined) {
            return (categories.map((category) => {
                return (
                    <div
                        id={category.categoryName}
                        key={category.categoryId}
                        className="category"
                    >
                        <div
                            onClick={() => {
                                handleCategoryClick(category.categoryId, category.categoryName  );
                            }}
                            >{category.categoryName}</div>
                        <div className='sub-cats'>
                            {renderCategory(category.subCategories)}
                        </div>
                    </div>
                )
            }))
        }
    }

    return (
        <div id="dropdown-menu">

            <div className="button" onClick={handleMenuExpand}  >
                <div className="menu-title">Departamentos</div>
                <div className="menu-icon" >{chevronIcon}</div>
            </div>

            <div className="categories" style={{ visibility: (isExpended) ? "visible" : "hidden" }}>

                {categoriesDOM}

                {(props.showUncategorized) ? 
                    <div className="category">
                        <div
                            onClick={() => handleCategoryClick(null, null, currentCategory)}
                        >Sem categoria</div>
                    </div> 
                : ""}

            </div>

        </div>
    )
};

export default DropdownMenu;

