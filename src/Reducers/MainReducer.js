const initialState = {
    loggedInStatus:localStorage.getItem('userLoggedInStatus') === 'true',
    productsData: JSON.parse(localStorage.getItem('productsPage')),
    accountsData:JSON.parse(localStorage.getItem('accountsPage')),
    das:JSON.parse(localStorage.getItem('dashboardPage'))
}

const MainReducer = (currentState = initialState, action) => {
    console.log(currentState)
    switch(action.type){
        case 'STARTED':
            var productsData = JSON.parse(localStorage.getItem('productsPage'))
            var accountsData = JSON.parse(localStorage.getItem('accountsPage'))
            return {...currentState,productsData,accountsData}
        case 'USER_LOGIN':
            localStorage.setItem('userLoggedInStatus', true);
            return {...currentState, loggedInStatus:true}
        case 'USER_LOGOUT':
            localStorage.setItem('userLoggedInStatus', false);
            localStorage.clear()
            return {...currentState, loggedInStatus:false}
        case 'ADD_PRODUCT':
            var tempPro = currentState.productsData
            tempPro.products.push(action.val)
            return {...currentState,productsData:tempPro}
        case 'ADD_CATEGORY':
            var tempCat = JSON.parse(JSON.stringify(currentState.productsData))
             tempCat.categories.push(action.val)
            return {...currentState,productsData:{...tempCat}}
         case 'DELETE_PRODUCT':
             var delePro = currentState.productsData
             delePro.products = action.val 
             return {...currentState,productsData:delePro}
         case 'DELETE_CATEGORY':
                var deleCat = currentState.productsData
                deleCat.categories = action.val 
                return {...currentState,productsData:deleCat}            
         default:   
           return {...currentState}
    }
    
}

export default MainReducer;