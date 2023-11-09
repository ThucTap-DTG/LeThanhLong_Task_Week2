import Student from '../components/student/Student';
import EditAccount from '../components/users/edit-user';
import LoginForm from '../components/users/LoginForm';
import ChangePassword from '../components/users/ChangePassWord';
import Logout from '../components/users/Logout';
import GetSubject from '../components/subject/GetSubject';

const publicRoutes = [
    {path: '/', component: LoginForm, layout: null},
    {path: '/student', component: Student},
    {path: '/edit-user', component: EditAccount},
    {path: '/changepassword', component: ChangePassword},
    {path: '/logout', component: Logout},
    {path: '/getsubject', component: GetSubject}
];
export {publicRoutes}