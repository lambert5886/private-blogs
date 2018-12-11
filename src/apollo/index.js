import gql from 'graphql-tag';
const queryMenu =  {
    workorder: gql ` {
        getMenus {
            title,
            id,
            menuType,
            childrenList{
            title,
            path
            }
        }
    }

    `
};

const editMenu = gql`
    mutation editMenu($name: String!){
        editMenu(menuType: $name){
            menuType
        }
    }
`;

export default {
    queryMenu,
    editMenu
}