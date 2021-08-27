import React,{useEffect,useState} from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { useDispatch,useSelector } from 'react-redux'
import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { getPaginateArticles,articleStatus,removeArticle } from '../../../store/actions/article_action'
import PaginatorComponent from '../../../utils/paginator'

const Articles = (props) => {
    const articles=useSelector(state=>state.articles)
    const notification=useSelector(state=>state.notifications)
    const dispatch=useDispatch()
    const [removeAlert,setRemoveAlert]=useState(false)
    const [toremove,setToremove]=useState(null)
    // console.log(articles.adminArticles)
    let arts=articles.adminArticles
    
    const handleDelete=()=>{
        dispatch(removeArticle(toremove))
        console.log(toremove)
    }

    const editArtsAction=(id)=>{
        props.history.push(`/dashboard/articles/edit/${id}`)
    }

    useEffect(()=>{
        dispatch(getPaginateArticles())
    },[dispatch])
    useEffect(()=>{
        handleClose()
        if(notification&&notification.removeArticle){
            dispatch(getPaginateArticles(arts.page))
        }
    },[dispatch,notification,arts])
    
    const handleClose=()=>setRemoveAlert(false)
    
    const handleShow=(id=null)=>{
        setToremove(id)
        setRemoveAlert(true)  
    }

    const gotoPrevPage=(page)=>{
        dispatch(getPaginateArticles(page))
    }
    const gotoNextPage=(page)=>{
        dispatch(getPaginateArticles(page))
    }

    const handleStatus=(status,id)=>{
        let newStatus=status==='draft'?'public':'draft'
        dispatch(articleStatus(newStatus,id))
        alert(newStatus)
    }

    return (
        <AdminLayout section="Articles">
             <div className="articles_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="mr-2">
                        <LinkContainer to="/dashboard/articles/add">
                            <Button variant="secondary">Add article</Button>
                        </LinkContainer>
                    </ButtonGroup>
                    <form onSubmit={()=> alert('search')}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                placeholder="Example"

                            />
                        </InputGroup>
                    </form>
                </ButtonToolbar>
                <PaginatorComponent 
                    arts={arts}
                    prev={(page)=>gotoPrevPage(page)}
                    next={(page)=>gotoNextPage(page)}
                    statusChange={(status,id)=>handleStatus(status,id)}
                    editArtsAction={(id)=>editArtsAction(id)}
                    handleShow={(id)=>handleShow(id)}
                />
                <Modal show={removeAlert} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        There is no going back
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close this
                        </Button>
                        <Button variant="danger" onClick={()=>handleDelete()}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </AdminLayout>
    )
}

export default Articles
