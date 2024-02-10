import { useContext, useEffect, useState } from "react";
import Categories from "./Categories";
import Product from "./Product";
import styles from './home.module.scss'
import { AppContext } from "../../layout/Layout";
import Loading from "../../shared/Loading";
import { BaseUrl, EndPoint } from "../../../tools/api";
import axios from "axios";
// DEMO array
// const products = [
//     {}, {}, {}, {}, {}, {}, {}, {}
// ]
export default function HomePage() {
    // init app state
    const appContext = useContext(AppContext)

    // init categories & other states
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])


    // set fetching categories from API function
    const getCategories = async () => {
        // call API                        
        // const response = await Api.fetch({ url: 'categories' })
        let response=await axios.get(`${BaseUrl}/${EndPoint.categories}`)
        .then(res=>setCategories(res.data.data))

        // check response
        // if (response != null)
        //     setCategories(response.data) // update state with recevied categories
    }

    // set fetching products from API function
    const getProducts = async () => {
        // call API
        let params
        if (appContext.appState.search != null) {
            params = { name: appContext.appState.search }
        }
        if (appContext.appState.category != null) {
            params = { ...params, category: appContext.appState.category }
        }

        const param={
            'category':appContext.appState.category,
            'name':appContext.appState.search
        }
        const response =await axios.get(`${BaseUrl}/${EndPoint.products}?${new URLSearchParams(param)}`)
        .then(response=>setProducts(response.data.data))


        console.log(`${BaseUrl}/${EndPoint.products}?${new URLSearchParams(params)}`);
        // check response
        // if (response != null) {
        //     // const productsRes = []
        //     // if (response.data != null) {
        //     //     for (const keyIndex in response.data) {
        //     //         // object: key - array: index
        //     //         productsRes.push(response.data[keyIndex])
        //     //     }
        //     // }
        //     setProducts(response.data.data) // update state with recevied products  
        //     console.log(response.data)
       // }
    }

    // set effect functionalities
    useEffect(() => {
        // component did mount => get & update categories from back-end        
        if (categories.length == 0) getCategories()
        getProducts()
    }, [appContext])

    return <div className={styles.home}>
        <Categories categories={categories} />
        {
            (products == null || products.length == 0) ?
                <h1>No Product has been found!</h1>
                :
                <div className={styles.products}>
                    {products.map((el, index) => <Product key={el.id} product={el} />)}
                </div>
        }
    </div>
}