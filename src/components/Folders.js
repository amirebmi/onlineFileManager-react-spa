import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, ButtonGroup, ButtonToolbar, Table } from 'react-bootstrap';

import { AiFillFolder } from "react-icons/ai";

function Folders() {
    let history = useHistory();
    let { id } = useParams();

    const [entries, setEntries] = useState([]);
    const [parentFolder, setParentFolder] = useState("");

    useEffect(async () => {
        let res = await axios.get(`http://localhost:8080/folders/${id}`);
        setEntries(res.data);

        let pFolder = await axios.get(`http://localhost:8080/folders/parentName/${id}`);
        setParentFolder(pFolder.data);



    }, [id]);

    return (
        <>
            <Container>

                <h2>Index of /~{parentFolder}/</h2>
                <Table striped bordered hove>
                    <thead><tr><th>Name</th><th>Type</th></tr></thead>

                    <tbody>
                        {
                            entries.map(entry =>
                            // Folder
                            {
                                if (entry.folder === true) {
                                    return <tr key={entry.id}>
                                        <td>\ <Link to={`/folders/${entry.id}`}>{entry.name}</Link></td>
                                        <td><AiFillFolder/></td>
                                    </tr>
                                    // Files
                                } else {
                                    return <tr key={entry.id}>
                                        <td>{entry.name}</td>
                                        <td>{entry.type}</td>
                                    </tr>;
                                }
                            }
                            )
                        }
                    </tbody>
                </Table>

                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="mr-3" aria-label="First group">


                        <Button variant="secondary"
                            onClick={async () => {
                                let pFolder = await axios.get(`http://localhost:8080/folders/parentId/${id}`)

                                let parentId = pFolder.data.id;
                                if (parentId === null) {
                                    history.push("/")
                                } else {
                                    history.push(`/folders/${parentId}`)
                                }

                            }}
                        >Back</Button>

                        <Link to={`/newfolder/${id}`}><Button>Create Folder</Button></Link>

                        <Button variant="danger"
                            onClick={async () => {
                                // Get the parentFolder before delete its child folder
                                let pFolder = await axios.get(`http://localhost:8080/folders/parentId/${id}`)

                                // Delete the folder
                                await axios.delete(`http://localhost:8080/folders/${id}`)

                                // Navigation process
                                let parentId = pFolder.data.id;
                                if (parentId === null) {
                                    history.push("/")
                                } else {
                                    history.push(`/folders/${parentId}`)
                                }
                            }}
                        > Delete</Button>

                    </ButtonGroup>
                </ButtonToolbar>
            </Container>




        </>
    );
}




export default Folders;