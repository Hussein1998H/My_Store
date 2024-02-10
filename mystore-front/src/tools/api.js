export const BaseUrl='http://127.0.0.1:8000';

export const EndPoint={
    //Auth
    login:'api/login',
    register:'api/register',
    logout:'api/logout',
    storeDetailes:'api/admin/StoreDetails',
    //User
    profile:'api/profile',
    addUser:'api/admin/store-user',
    allUsers:'api/admin/get-users',
    deleteUser:'api/admin/delete-user',
    updateUser:'api/admin/update-user',
    showUser:'api/admin/show-user',
    userOrder:'api/orders',
    userOrderDetails:'api/order-details',
    //Product
    products:'api/products',
    addProduct:'api/admin/products',
    productDetails:'api/products-details',
    deleteProduct:'api/admin/delete-product',
    updateProduct:'api/admin/update-product',
    cartProduct:'api/cart-contant',
    //Category
    categories:'api/categories',
    getCategory:'api/categories',
    addCategory:'api/admin/StoreCategory',
    categoryDetails:'api/admin/category-details',
    updateCategory:'api/admin/update-category',
    deleteCategory:'api/admin/delete-category',
    //Order
    allOrders:'api/admin/getOrders',
    deleteOrder:'api/admin/delete-Orders',
    orderDetail:'api/order-details',
    createOrder:'api/orders',
}



// import axios from "axios";

// /**
//  * This class is used to call API ....
//  */
// export default class Api {
//     static baseUrl = 'http://my_store.test/api/';

//     /**
//      * call api function
//      * @param {url} api to call ...etc
//      * @param {showPopup} function to show error/response message
//      * @returns Promise
//      */
//     static async fetch({ url, params, showPopup, method, customMessage, body }) {
//         // init params
//         url = this.baseUrl + url
//         // call API
//         let res
//         try {
//             // set params
//             if (params != null)
//                 url = `${url}?${new URLSearchParams(params)}`
        

//             // check method
//             if (method == null || method == 'get'||method=='dalete') {

//                 res=axios.method(url)
//             } else if (method == 'POST') {
//                 res = await fetch(url, {
//                     method: 'POST',
//                     body: JSON.stringify(body),
//                     headers: {
//                         "Accept": "application/json",
//                         "Content-Type": "application/json",

//                     },
//                 })
//                 // log response
//                 console.log(res);
//             }
//         } catch (e) {
//             // log error
//             console.log(e)
//             console.log(await res.text());
//             return null;
//         }

//         if (res == null) {
//             // show error message
//             if (showPopup != null)
//                 showPopup(customMessage ?? 'Something went wrong while retriving data from Server!')
//             return null;
//         }

//         // check the resposne 
//         if (res.ok) {// resposne was success
//             const response = await res.json() // convert object 
//             console.log('response:');
//             console.log(response);
//             if (showPopup != null)
//                 showPopup(response.message) // show response message
//             return response
//         } else {
//             // init error response
//             let response
//             try {
//                 response = await res.json();
//                 console.log(response);
//             } catch (e) {
//                 console.log(e);
//             }

//             // show error message
//             if (showPopup != null) {
//                 let message = customMessage ?? 'Something went wrong while retriving data from Server!'
//                 if (response?.message != null)
//                     message = response.message
//                 showPopup(message)
//             }
//         }
//         return null;
//     }
// }