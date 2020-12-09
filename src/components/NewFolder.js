import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Container,Form } from 'react-bootstrap';



function NewFolder() {

    let history = useHistory();
    let { id } = useParams();

    const [name, setFolder] = useState("");
    const [parentFolderId, setParentFolderId] = useState(id);


    const onSubmit = function (e) {
        e.preventDefault();

        if (id === "0") {
            axios.post("http://localhost:8080/folders", {
                name,
            }).then(() => history.push("/"));
        } else {
            axios.post("http://localhost:8080/folders", {
                name,
                parentFolderId,
            }).then(() => history.push(`/folders/${id}`));
        }

    };

    return (
        <>
            <Container>
                
                <h2>Create a New Folder</h2>

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Folder name</Form.Label>

                    <Form.Control type="text" name="name" value={name} onChange={e => setFolder(e.target.value)} placeholder="Enter folder name" />
                        <br />
                        <button variant="primary" className="btn-primary">Create Folder</button>

                    </Form.Group>

                </Form>

            </Container>
        </>
    );

}

export default NewFolder;