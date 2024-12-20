import React, { useEffect, useRef } from 'react'
import './ListaMensajes.css'
import Mensaje from '../Mensaje/Mensaje'
import useInfiniteScrolling from '../../../Hooks/useInfiniteScrolling'

const ListaMensajes = ({ mensajesChat, hasMore, getPage }) => {
    const { loadMoreRef } = useInfiniteScrolling(getPage, hasMore)

    return (
            <div className='container-list'>
                {mensajesChat.map((mensajeInfo2, index) => <Mensaje mensajeInfo={mensajeInfo2} key={'mensaje' + index}/>)}
                {
                    hasMore //cargando
                        && <div ref={loadMoreRef} className="wrapper">
                            <div className="loader">
                                <div className="loading one"></div>
                                <div className="loading two"></div>
                                <div className="loading three"></div>
                                <div className="loading four"></div>
                            </div>
                        </div>
                }
            </div>
)
}

export default ListaMensajes