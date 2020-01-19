/**************************************************
    FILTER COMPONENT IMPORTS
**************************************************/
import React from 'react';
import styled from 'styled-components';
import { showMoney } from '../../../HelperFunctions/showMoney';
import { ProductContext } from '../../../context';

/**************************************************
    FILTER COMPONENT 
**************************************************/
export default function ProductFilter() {

    const { 
        storeProducts,
        filteredProducts, 
        dataIsLoading,  
        search,
        searchPrice,
        minSearchPrice,
        maxSearchPrice,
        searchShipping,
        searchCompany,
        handleChange
    } = React.useContext(ProductContext);

    /**************************************************
        CREATE OPTIONS FOR THE SELECT INPUT 
    **************************************************/

    // Creates set with unique values - no duplicates
    let companies = new Set();

    companies.add('all');

    for ( let product in storeProducts ) {
        companies.add(storeProducts[product]["company"]); 
    }

    // change set to array
    companies = [ ...companies ];

    function showCompanies(companies) {
        return companies.map( (item, index) => (
            <option key={index} value={item} >{item}</option>
        ))
    };

    /**********************************************
        RETURN JSX
    **********************************************/
    return (
        <div className="row my-5">
            { !dataIsLoading && 

                <div className="col-10 mx-auto">
            
                    <FilterWrapper>
                        <div>
                            <label htmlFor="search">Search By Product</label>
                            <input 
                                value={search} 
                                onChange={handleChange}
                                type="text" 
                                name="search" 
                                id="search" 
                                placeholder="Search products"
                                className="filtered-items"
                            />      
                        </div>

                        <div>
                            <label htmlFor="searchCompany">Search By Company</label>
                            <select
                                value={searchCompany} 
                                onChange={handleChange}
                                name="searchCompany" 
                                id="searchCompany" 
                                className="filtered-items"
                            >
                                { showCompanies(companies) }
                            </select>      
                        </div>

                        <div>
                            <label htmlFor="searchPrice"><p className="mb-2">Search By Price: <span>{showMoney.format(searchPrice)}</span></p></label>
                            <input
                                type="range"
                                value={searchPrice}
                                min={minSearchPrice}
                                max={maxSearchPrice}
                                onChange={handleChange}
                                name="searchPrice" 
                                id="searchPrice" 
                                className="filtered-items"
                            /> 
                        </div>

                        <div>
                            <label htmlFor="searchShipping" className="mx-2">Free Shipping</label>
                            <input
                                type="checkbox"
                                checked={searchShipping && true}
                                onChange={handleChange}
                                name="searchShipping" 
                                id="searchShipping" 
                                className="filtered-items"
                            /> 
                        </div>
                    </FilterWrapper>

            
                    { filteredProducts.length > 0
                        ?   <h6 className="text-title text-center">total products: {filteredProducts.length}</h6>
                        :   <h6 className="text-title text-center">Sorry. No products found.</h6>
                    }
                
                </div> 
            }
        </div>
    )
}

/**************************************************
    FILTER COMPONENT JS STYLES
**************************************************/

const FilterWrapper = styled.div`


    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;
    margin: 3rem 0;

    label {
        font-weight: bold;
        text-transform: capitalize;
    }

    .filtered-items {
        display: block;
        background: transparent;
        width: 100%;
        border: none;
        border: 3px solid var(--darkGrey);
        border-radius: 5px;
    }

/**************************************************
    FROM CSS TRICK
**************************************************/

input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent; 
  border-color: transparent;
  color: transparent;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]:focus::-ms-fill-lower {
  background: #3071a9;
}
input[type=range]::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]:focus::-ms-fill-upper {
  background: #367ebd;
}

`; 