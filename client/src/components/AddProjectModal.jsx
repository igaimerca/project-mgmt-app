import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

function AddProjectModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("new");

    // Get clients
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
        if (name === '' || description === '' || status === '' || clientId === '') {
            return alert("Please fill in the fields")
        }
        addProject(name, description, status, clientId)
        setName('')
        setDescription('')
        setStatus('')

    }

    if(loading) return null;
    if(error) return <p>Something went wrong!</p>
    return (
        <>
            <Button className="mb-3" variant="primary" onClick={handleShow}>
            <FaList /> Add project 
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                type="description"
                                className="form-control"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select name="" id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="new">Not Started</option>
                                <option value="progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Client</label>
                            <select name="" id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                <option value="" disabled>Select Option</option>
                            {data.clients.map(client => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))}
                            </select>
                        </div>
                        <button onClick={handleSubmit} className="btn btn-secondary" type="submit">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddProjectModal;
