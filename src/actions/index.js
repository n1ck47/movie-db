export const discoverMovies  = (movies) => {
    return {
        type: 'discover-movies',
        discover: movies
    }
}

export const trendingMovies  = (movies) => {
    return {
        type: 'trending-movies',
        trending: movies
    }
}
export const searchMovies  = (movies) => {
    return {
        type: 'search-movies',
        searchMovies: movies
    }
}

export const searchTv  = (movies) => {
    return {
        type: 'search-tv',
        searchTv: movies
    }
}

export const loadingMovies = (load) => {
    return {
        type: 'loading-movies',
        loading: load
    }
}
