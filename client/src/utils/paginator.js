import React from 'react'
import { Table,Pagination } from 'react-bootstrap'
import Moment from 'react-moment'
import Loader from './loader'
const PaginatorComponent = ({arts,prev,next,statusChange,editArtsAction,handleShow}) => {
    const gotoPrev=(page)=>{
        prev(page)
    }

    const gotoNext=(page)=>{
        next(page)
    }

    return (
         <>
            { arts && arts.docs ?
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Tittle</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            { arts.docs.map((item)=>(
                                <tr key={item._id}>
                                    <td><Moment to={item.date}></Moment></td>
                                    <td>{item.title}</td>
                                    <td>{item.score}</td>
                                    <td className="action_btn remove_btn"
                                    onClick={()=>handleShow(item._id)}
                                    >
                                        Remove
                                    </td>
                                    <td className="action_btn edit_btn"
                                    onClick={()=>editArtsAction(item._id)}
                                    >
                                        Edit
                                    </td>
                                    <td className="action_btn status_btn"
                                    onClick={()=>statusChange(item.status,item._id)}
                                    >
                                        {item.status}
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </Table>
                    <Pagination>
                        {arts.hasPrevPage ?
                            <>
                                <Pagination.Prev onClick={()=> gotoPrev(arts.prevPage)}/> 
                                <Pagination.Item onClick={()=> gotoPrev(arts.prevPage)}>
                                    {arts.prevPage}
                                </Pagination.Item>
                            </>
                            :null
                        }
                        <Pagination.Item active>{arts.page}</Pagination.Item>
                        {arts.hasNextPage ?
                            <>
                                
                                <Pagination.Item onClick={()=> gotoNext(arts.nextPage)}>
                                    {arts.nextPage}
                                </Pagination.Item>
                                <Pagination.Next onClick={()=> gotoNext(arts.nextPage)}/> 
                            </>
                            :null
                        }
                    </Pagination>
                </>
                :
                <Loader/>
            }
        </>
    )
}

export default PaginatorComponent
