import React, { useState } from 'react'
import { Container, Table } from "react-bootstrap"
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Report = () => {
    const location = useLocation();
    const { state } = location;
    const responseData = state?.responseData || {};
    // const [report, setReport] = useState([])
    // setReport(responseData)
    const [downloadHtml,setDownloadHtml]=useState()
    console.log(responseData)

    const handleDownload=(filename)=>{

        axios.get(`http://tdcldizcva002.ebiz.verizon.com:8000/self_serve2/download/${filename}/`)
        .then(response=>{

            console.log(response.config.url)
            setDownloadHtml(response.config.url)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <>
            <Container className='d-flex flex-column justify-content-center align-items-center'>


                <h2>ML Profile Report</h2>
                <Table bordered hover responsive>
                    <thead >
                        <tr>
                            <th className='bg-dark text-white'>Database</th>
                            <th className='bg-dark text-white'>Table Name</th>
                            <th className='bg-dark text-white'>Download HTML File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseData.map((filtered_reports, index) => (

                            <tr key={index}>
                                <td>{filtered_reports.db_name}</td>
                                <td>{filtered_reports.table_name}</td>
                                <td><a onClick={()=>handleDownload(filtered_reports.filename)} href={downloadHtml} download >{filtered_reports.filename}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>


            </Container></>
    )
}
export default Report;
