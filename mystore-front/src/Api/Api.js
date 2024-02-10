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
    //Product
    products:'api/products',
    addProduct:'api/admin/products',
    productDetails:'api/products-details',
    deleteProduct:'api/admin/delete-product',
    updateProduct:'api/admin/update-product',
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
    updateOrder:'api/admin/update-Order',
}
