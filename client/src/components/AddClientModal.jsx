import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_CLIENT } from "../mutations/clientMutations";

function AddClientModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();
        if (name === '' || email === '' || phone === '') {
            return alert("Please fill in the fields")
        }
        addClient(name, email, phone)
        setName('')
        setEmail('')
        setPhone('')

    }

    return (
        <>
            <Button className="mb-3" variant="secondary" onClick={handleShow}>
            <FaUser /> Add client
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new client</Modal.Title>
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
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="phone"
                                className="form-control"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSubmit} className="btn btn-secondary" type="submit">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddClientModal;
