import { useMutation } from "@apollo/client"
import { FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { DELETE_PROJECT } from "../mutations/projectMutations"
import { GET_PROJECTS } from "../queries/projectQueries"

function DeleteProjectButton({ projectId }) {
    const navigate = useNavigate()
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate("/"),
        refetchQueries: [{ query: GET_PROJECTS }]
        // update(cache, { data: { deleteProject } }) {
        //     const { projects } = cache.readQuery(GET_PROJECTS)
        //     cache.writeQuery({
        //         query: GET_PROJECTS,
        //         data: { projects: projects.filter(project => project.id === deleteProject.id) }
        //     })
        // }
    })

    return (
        <button className="ms-auto btn btn-sm btn-danger" onClick={deleteProject}><FaTrash /> Delete Project</button>
    )
}

export default DeleteProjectButton