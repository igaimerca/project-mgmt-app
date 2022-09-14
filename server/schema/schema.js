const { projects, clients } = require("../sampleData");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql")
const Client = require("../models/Client")
const Project = require("../models/Project")

// Client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

// Project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        client: { 
            type: ClientType,  
            resolve(parent, args) {
                return Client.findById(parent.clientId)
            }
        },
        description: { type: GraphQLString }, 
        status: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parents, args) {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Client.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parents, args) {
                return Project.find();
            }
        },
        project: {
            type: ProjectType, 
            args: { id: { type: GraphQLID } },
            resolve(parents, args) { 
                return Project.findById(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})