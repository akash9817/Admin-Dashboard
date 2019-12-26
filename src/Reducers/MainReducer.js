const initialState = {
    loggedInStatus:localStorage.getItem('userLoggedInStatus') === 'true',
    dashboardData:JSON.parse(localStorage.getItem('dashboardPage')),
    productsData:JSON.parse(localStorage.getItem('productsPage')),
    accountsData:JSON.parse(localStorage.getItem('accountsPage'))

}

const MainReducer = (currentState = initialState, action) => {
    switch(action.type){
        case 'USER_LOGIN':
            localStorage.setItem('userLoggedInStatus', true);
            return {...currentState, loggedInStatus:true}
        case 'USER_LOGOUT':
            localStorage.setItem('userLoggedInStatus', false);
            return {...currentState, loggedInStatus:false}
        case 'ADD_PRODUCT':
            var tempPro = currentState.productsData
            tempPro.products.push(action.val)
            return {...currentState,productsData:tempPro}
        case 'ADD_CATEGORY':
            var tempCat = currentState.productsData
            tempCat.categories.push(action.val)
            return {...currentState,productsData:tempCat}
        case 'UPDATE_PROFILE':
            var data =  JSON.parse(localStorage.getItem('accountsPage'))
            data[action.val[0]] = action.val[1]
            localStorage.setItem('accountsPage',JSON.stringify(data))
            var temp = currentState.accountsData
            temp[action.val[0]] = action.val[1]
            return {...currentState,accountsData:temp}          
         default:   
           return {...currentState}
    }
    
}

export default MainReducer;