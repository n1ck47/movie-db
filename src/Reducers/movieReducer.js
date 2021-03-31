const movieReducer = (state={discover:[],trending:[],favorites:[],searchMovies:[],searchTv:[],loading:true},action) => {
    switch(action.type){
        case 'discover-movies':
            return {...state,discover:action.discover};
        case 'trending-movies':
            return {...state,trending:action.trending};  
        case 'search-movies':
            return {...state,searchMovies:action.searchMovies};  
        case 'search-tv':
            return {...state,searchTv:action.searchTv};
        case 'loading-movies':
            return {...state,loading:action.loading};
        default:
            return state;
    }
}

export default movieReducer;