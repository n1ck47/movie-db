import React from 'react';

import './Navbar.css'

class Navbar extends React.Component{
    

    handleSubmit = (e) =>{
        e.target.action='http://n1ck47.github.io/movie-db/#/search'
    }

    render(){
        return(
            <>
                <div className='nav'>
                    <div className='tabs'>
                        <ul>
                            <li><a href='http://n1ck47.github.io/movie-db/#/movies'>Movies</a></li>
                            <li><a href='http://n1ck47.github.io/movie-db/#/tv'>TV Shows</a></li>
                        </ul>
                    </div>
                    <div style={{marginRight:10}} className='search-box'>
                        <form onSubmit={this.handleSubmit}>
                            <input name='query' type='text' style={styles.search} placeholder='Search'></input>
                            {/* <img style={styles.searchBtn} src='https://www.flaticon.com/svg/vstatic/svg/2657/2657962.svg?token=exp=1616740903~hmac=254eb2cf5956f5ddcc16e9decfd6fc57'/> */}
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

const styles = {
    search:{
        padding:10,
        marginRight:3,
        border: 'None',
        borderRadius: 5,
        width:'250px',
        outline:'none'
    },
    searchBtn:{
        height: 25,
        width: 50,
        padding:3,
        cursor:'pointer'
    }
}

export default Navbar;