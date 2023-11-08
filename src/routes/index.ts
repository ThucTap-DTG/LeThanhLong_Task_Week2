import Student from '../components/student/Student';
import Create from '../components/student/Create';
import Update from '../components/student/Update';
import EditAccount from '../components/student/edit-user';
import LoginForm from '../components/student/LoginForm';
import ChangePassword from '../components/student/ChangePassWord';
import Logout from '../components/student/Logout';
import GetSubject from '../components/subject/GetSubject';

const publicRoutes = [
    {path: '/', component: LoginForm, layout: null},
    {path: '/create', component: Create},
    {path: '/student', component: Student},
    {path: '/update', component: Update},
    {path: '/edit-user', component: EditAccount},
    {path: '/changepassword', component: ChangePassword},
    {path: '/logout', component: Logout},
    {path: '/getsubject', component: GetSubject}
];
export {publicRoutes}