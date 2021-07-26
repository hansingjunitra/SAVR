import React, { useContext } from 'react'
import { AppContext } from './context'
import { getCustomerConnections } from '../saltedge'

// const {state , dispatch} = useContext(AppContext)
const getConnectionIDListHandler = async (saltEdgeID) => {
    let connectionIDList = []
    await getCustomerConnections(saltEdgeID).then((res) => {
        res.map((connection) => connectionIDList.push(
            {id: connection.id, 
            bank: connection.provider_name}
        ))  
    })
    return connectionIDList;
}

export {
    getConnectionIDListHandler
}