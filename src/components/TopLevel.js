import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Table } from 'react-bootstrap';
import { AiFillFolder, AiOutlineDownload } from "react-icons/ai";

function TopLevel() {

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080").then(res => setEntries(res.data));
    }, []);

    return (
        <>
            <Container>
                <h2>Index /</h2>
                <Table striped bordered hove>
                    <thead><tr><th class="text-center">Name</th><th class="text-center">Type</th><th class="text-center">Download</th></tr></thead>

                    <tbody>
                        {
                            entries.map(entry =>
                            // Folder
                            {
                                if (entry.folder === true) {
                                    return <tr key={entry.id}>
                                        <td>\ <Link to={`/folders/${entry.id}`}>{entry.name}</Link></td>
                                        <td class="text-center"><AiFillFolder /></td>
                                        <td></td>
                                    </tr>
                                    // Files
                                } else {
                                    return <tr key={entry.id}>
                                        <td>{entry.name}</td>
                                        <td class="text-center">{entry.type}</td>
                                        <td class="text-center">
                                        <AiOutlineDownload />
                                        </td>
                                    </tr>;
                                }
                            }
                            )
                        }
                    </tbody>
                </Table>
                <br />

                <Link to={`/newfolder/${0}`}><Button>Create Folder</Button></Link>
            </Container>

        </>
    );
}

export default TopLevel;