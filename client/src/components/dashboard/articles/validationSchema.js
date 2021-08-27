//import React from 'react'
import * as Yup from 'yup'
//Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio sint quae, quisquam ut et eius, repellendus natus aliquid odit consectetur sunt dicta incidunt ipsum perspiciatis quod nulla eum harum aperiam.
export const formValues={
    title:'',
    content:'',
    excerpt:"",
    store:'',
    director:'',
    actors:[],
    status:''
}

export const validation = () => (
    Yup.object({
        title:Yup.string()
        .required('Sorry the title is required'),
        content:Yup.string()
        .required('Sorry the content is required')
        .min(50,'That is it ? ...write some more'),
        excerpt:Yup.string()
        .required('Sorry the excerpt is required')
        .max(500,'Sorry its 500 max'),
        store: Yup.number()
        .required('Sorry the score is required')
        .min(0,'0 is the minimum')
        .max(100,'100 is the max'),
        director:Yup.string()
        .required('Sorry the director is required'),
        actors:Yup.array()
        .required('Must have actors')
        .min(3,'Minimum is 3'),
        status:Yup.string()
        .required('Sorry the status is required')
    })
)
// export const validation=()=>{
//     Yup.object({
//         title:Yup.string().required('Sorry This field is required'),
//         // content:Yup.string().required('Sorry this is required').min(50,'Minimum 50'),
//         // excerpt:Yup.string().required('This field is required')
//         // .max(500,'Sorry 500 max'),
//         // store:Yup.number().required('Score is required')
//         // .min(0,'Minimum is 0').max(100,'Between 0 to 100'),
//         // director:Yup.string().required('Required'),
//         // actors:Yup.array().required('Actor field is required')
//         // .min(3,'minimum 3 actors'),
//         // status:Yup.string().required('This field is required')
//     })
// }