import Student from '../components/Student';
import Create from '../components/Create';
import Update from '../components/Update';
import EditAccount from '../components/edit-user';
import LoginForm from '../components/LoginForm';
import ChangePassword from '../components/ChangePassWord';
import Logout from '../components/Logout';

const publicRoutes = [
    {path: '/', component: LoginForm, layout: null},
    {path: '/create', component: Create},
    {path: '/student', component: Student},
    {path: '/update', component: Update},
    {path: '/edit-user', component: EditAccount},
    {path: '/changepassword', component: ChangePassword},
    {path: '/logout', component: Logout}
];
export {publicRoutes}