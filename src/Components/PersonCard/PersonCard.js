import React from 'react';

import './PersonCard.css'


class PersonCard extends React.Component{
    
    constructor(){
        super();
        this.state = {
            title:  "movie.title",
            poster:    '/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg'
        }
    }

    render(){
        const {cast} = this.props;
        const {original_name,profile_path,character} = cast
        const img = `https://image.tmdb.org/t/p/w500${profile_path}`
        return (
            <>
                <div className='person-card'>
                    <div>
                        <img alt={original_name} src={img} />
                    </div>
                    <div className='person-card-bottom'>
                        <div style={styles.title}>{original_name}</div>
                        <div style={styles.character}>{character}</div>
                    </div>
                </div>
            </>
        )
    }
}

const styles = {
    title : {
        fontWeight: 600,
        marginRight : 2,
        color:'white'
    },
    character:{
        fontSize:13,
        fontWeight:300,
        color:'white'
    }
}

export default PersonCard;