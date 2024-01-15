import React from 'react';
// import { api } from './plugins/api';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import { HOST_URL } from './plugins/api';

const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

// const history = useHistory()

// const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
// const Tables = React.lazy(() => import('./views/base/tables/Tables'));

// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
// const Cards = React.lazy(() => import('./views/base/cards/Cards'));
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
// const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

// const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
// const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
// const Navs = React.lazy(() => import('./views/base/navs/Navs'));
// const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
// const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
// const Switches = React.lazy(() => import('./views/base/switches/Switches'));

// const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
// const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
// const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
// const Charts = React.lazy(() => import('./views/charts/Charts'));
// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
// const Users = React.lazy(() => import('./views/users/Users'));
// const User = React.lazy(() => import('./views/users/User'));

//atmaQA
const loginAtma = React.lazy(() => import('./views/atmaQA/loginForm'));
const dashboardAtma = React.lazy(() => import('./views/atmaQA/dashboardAtma'));

//admin
const mahasiswaList = React.lazy(() => import('./views/atmaQA/admin/mahasiswaList'));
const addMahasiswa = React.lazy(() => import('./views/atmaQA/admin/addMahasiswa'));
const mahasiswaDetail = React.lazy(() => import('./views/atmaQA/admin/mahasiswaDetail'));
const editMahasiswa = React.lazy(() => import('./views/atmaQA/admin/editMahasiswa'));

const dosenList = React.lazy(() => import('./views/atmaQA/admin/dosenList'));
const addDosen = React.lazy(() => import('./views/atmaQA/admin/addDosen'));
const dosenDetail = React.lazy(() => import('./views/atmaQA/admin/dosenDetail'));
const editDosen = React.lazy(() => import('./views/atmaQA/admin/editDosen'));

const matkulList = React.lazy(() => import('./views/atmaQA/admin/kuliah/matkulList'));
const addMatkul = React.lazy(() => import('./views/atmaQA/admin/kuliah/addMatkul'));
const editMatkul = React.lazy(() => import('./views/atmaQA/admin/kuliah/editMatkul'));

const kelasList = React.lazy(() => import('./views/atmaQA/admin/kuliah/kelasList'));
const addKelas = React.lazy(() => import('./views/atmaQA/admin/kuliah/addKelas'));
const kelasDetail = React.lazy(() => import('./views/atmaQA/admin/kuliah/kelasDetail'));
const editKelas = React.lazy(() => import('./views/atmaQA/admin/kuliah/editKelas'));

//dosen
const kelasDosenList = React.lazy(() => import('./views/atmaQA/dosen/kelasDosenList'));
const addKelasDosen = React.lazy(() => import('./views/atmaQA/dosen/addKelasDosen'));
const mingguList = React.lazy(() => import('./views/atmaQA/dosen/mingguList'));
// const addWeekClass = React.lazy(() => import('./views/atmaQA/dosen/addMinggu'));
const viewWeekClass = React.lazy(() => import('./views/atmaQA/dosen/pertanyaanMinggu'));
const viewPertanyaanMhsDsn = React.lazy(() => import('./views/atmaQA/dosen/pertanyaanMhsDetailDsn'));
const answerPertanyaanMhs = React.lazy(() => import('./views/atmaQA/dosen/jawabanDosen'));
const addPertanyaanDsn = React.lazy(() => import('./views/atmaQA/dosen/addPertanyaanDsn'));
const listPertanyaanDsn = React.lazy(() => import('./views/atmaQA/dosen/pertanyaanDsnList'));
const ViewPertanyaanDsn = React.lazy(() => import('./views/atmaQA/dosen/viewPertanyaanDsn'));
const ViewJawabanMhs = React.lazy(() => import('./views/atmaQA/dosen/viewJawabanMhs'));
const KoreksiJawaban = React.lazy(() => import('./views/atmaQA/dosen/koreksiJawabanMhs'));
const editKelasDosen = React.lazy(() => import('./views/atmaQA/dosen/editKelasDsn'));
const EditPertanyaanDsnList = React.lazy(() => import('./views/atmaQA/dosen/editPertanyaanDsnList'));
const EditPertanyaanDsn = React.lazy(() => import('./views/atmaQA/dosen/editPertanyaanDsn'));
// const kelasDetail = React.lazy(() => import('./views/atmaQA/admin/kuliah/kelasDetail'));
// const editKelas = React.lazy(() => import('./views/atmaQA/admin/kuliah/editKelas'));

//mahasiswa
const selectClass = React.lazy(() => import('./views/atmaQA/mahasiswa/selectClass'));
const pertanyaanKelasMhs = React.lazy(() => import('./views/atmaQA/mahasiswa/pertanyaanKelasMhs'));
const addPertanyaanMhs = React.lazy(() => import('./views/atmaQA/mahasiswa/addPertanyaanMhs'));
const viewPertanyaanMhs = React.lazy(() => import('./views/atmaQA/mahasiswa/pertanyaanMhsDetail'));
const viewPinned = React.lazy(() => import('./views/atmaQA/mahasiswa/viewPinnedQuestion'));
const editPertanyaan = React.lazy(() => import('./views/atmaQA/mahasiswa/editPertanyaanMhs'));
const enrollHistory = React.lazy(() => import('./views/atmaQA/mahasiswa/enrollHistory'));
const enrollClassWeek = React.lazy(() => import('./views/atmaQA/mahasiswa/enrollClassWeek'));
const jawabanMhs = React.lazy(() => import('./views/atmaQA/mahasiswa/jawabanMhs'));

const cekRoutes = () => {
  if (token) {
    if (role === "admin") {
      return [
        // { path: '/', exact: true, name: 'Home' },
        // { path: '/dashboard', name: 'Dashboard', component: Dashboard },

        { path: '/loginAtma', exact: true, name: 'Login', component: loginAtma },
        { path: '/dashboard-atma', exact: true, name: 'Dashboard Atma', component: dashboardAtma },

        { path: '/mahasiswa/mahasiswa-list', exact: true, name: 'Mahasiswa List', component: mahasiswaList },
        { path: '/mahasiswa/mahasiswa-list/add-mahasiswa', exact: true, name: 'Add Mahasiswa', component: addMahasiswa },
        { path: '/mahasiswa/mahasiswa-list/mahasiswa-detail/:id', exact: true, name: 'Mahasiswa Detail', component: mahasiswaDetail },
        { path: '/mahasiswa/mahasiswa-list/edit-mahasiswa/:id', exact: true, name: 'Edit Mahasiswa', component: editMahasiswa },

        { path: '/dosen/dosen-list', exact: true, name: 'Dosen List', component: dosenList },
        { path: '/dosen/dosen-list/add-dosen', exact: true, name: 'Add Dosen', component: addDosen },
        { path: '/dosen/dosen-list/dosen-detail/:id', exact: true, name: 'Dosen Detail', component: dosenDetail },
        { path: '/dosen/dosen-list/edit-dosen/:id', exact: true, name: 'Edit Dosen', component: editDosen },

        { path: '/lecturer-class/lecturer-class-list', exact: true, name: 'Class List', component: kelasDosenList },
        { path: '/lecturer-class/lecturer-class-list/add-class', exact: true, name: 'Add Class', component: addKelasDosen },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id', exact: true, name: 'Weeks', component: mingguList },
        { path: '/lecturer-class/lecturer-class-list/edit-class/:id', exact: true, name: 'Weeks', component: editKelasDosen },
        // { path: '/lecturer-class/lecturer-class-list/class-detail/:id/open-class', exact: true, name: 'Weeks', component: addWeekClass },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid', exact: true, name: 'Week', component: viewWeekClass },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/question-detail/:questionid', exact: true, name: 'Question Detail', component: viewPertanyaanMhsDsn },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/answer-question/:questionid', exact: true, name: 'Answer Question', component: answerPertanyaanMhs },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/add-question', exact: true, name: 'Add Question', component: addPertanyaanDsn },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/question-list', exact: true, name: 'Question List', component: listPertanyaanDsn },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/view-lecture-question', exact: true, name: 'View Question', component: ViewPertanyaanDsn },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/view-student-answer/:mid', exact: true, name: 'View Answer', component: ViewJawabanMhs },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/answer-correction/:mid', exact: true, name: 'View Answer', component: KoreksiJawaban },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/edit-question', exact: true, name: 'Edit Question', component: EditPertanyaanDsnList },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/edit-question/:dsnquestionid', exact: true, name: 'Edit Question', component: EditPertanyaanDsn },

        { path: '/course/course-list', exact: true, name: 'Course List', component: matkulList },
        { path: '/course/course-list/add-course', exact: true, name: 'Add Course', component: addMatkul },
        { path: '/course/course-list/edit-course/:id', exact: true, name: 'Edit Course', component: editMatkul },

        { path: '/class/class-list', exact: true, name: 'Class List', component: kelasList },
        { path: '/class/class-list/add-class', exact: true, name: 'Add Class', component: addKelas },
        { path: '/class/class-list/class-detail/:id', exact: true, name: 'Class Detail', component: kelasDetail },
        { path: '/class/class-list/edit-class/:id', exact: true, name: 'Edit Class', component: editKelas },

        // { path: '/theme', name: 'Theme', component: Colors, exact: true },
        // { path: '/theme/colors', name: 'Colors', component: Colors },
        // { path: '/theme/typography', name: 'Typography', component: Typography },
        // { path: '/base', name: 'Base', component: Cards, exact: true },
        // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
        // { path: '/base/cards', name: 'Cards', component: Cards },
        // { path: '/base/carousels', name: 'Carousel', component: Carousels },
        // { path: '/base/collapses', name: 'Collapse', component: Collapses },
        // { path: '/base/forms', name: 'Forms', component: BasicForms },
        // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
        // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
        // { path: '/base/navbars', name: 'Navbars', component: Navbars },
        // { path: '/base/navs', name: 'Navs', component: Navs },
        // { path: '/base/paginations', name: 'Paginations', component: Paginations },
        // { path: '/base/popovers', name: 'Popovers', component: Popovers },
        // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
        // { path: '/base/switches', name: 'Switches', component: Switches },
        // { path: '/base/tables', name: 'Tables', component: Tables },
        // { path: '/base/tabs', name: 'Tabs', component: Tabs },
        // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
        // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
        // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
        // { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
        // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
        // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
        // { path: '/charts', name: 'Charts', component: Charts },
        { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
        { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
        // { path: '/icons/flags', name: 'Flags', component: Flags },
        // { path: '/icons/brands', name: 'Brands', component: Brands },
        // { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
        // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
        // { path: '/notifications/badges', name: 'Badges', component: Badges },
        // { path: '/notifications/modals', name: 'Modals', component: Modals },
        // { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
        // { path: '/widgets', name: 'Widgets', component: Widgets },
        // { path: '/users', exact: true, name: 'Users', component: Users },
        // { path: '/users/:id', exact: true, name: 'User Details', component: User },
      ]

    } else if (role === "dosen") {
      return [
        // { path: '/', exact: true, name: 'Home' },
        // { path: '/dashboard', name: 'Dashboard', component: Dashboard },

        { path: '/loginAtma', exact: true, name: 'Login', component: loginAtma },
        { path: '/dashboard-atma', exact: true, name: 'Dashboard Atma', component: dashboardAtma },

        { path: '/lecturer-class/lecturer-class-list', exact: true, name: 'Class List', component: kelasDosenList },
        { path: '/lecturer-class/lecturer-class-list/add-class', exact: true, name: 'Add Class', component: addKelasDosen },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id', exact: true, name: 'Weeks', component: mingguList },
        { path: '/lecturer-class/lecturer-class-list/edit-class/:id', exact: true, name: 'Weeks', component: editKelasDosen },
        // { path: '/lecturer-class/lecturer-class-list/class-detail/:id/open-class', exact: true, name: 'Weeks', component: addWeekClass },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid', exact: true, name: 'Week', component: viewWeekClass },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/question-detail/:questionid', exact: true, name: 'Question Detail', component: viewPertanyaanMhsDsn },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/answer-question/:questionid', exact: true, name: 'Answer Question', component: answerPertanyaanMhs },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/add-question', exact: true, name: 'Add Question', component: addPertanyaanDsn },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/question-list', exact: true, name: 'Question List', component: listPertanyaanDsn },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/edit-question', exact: true, name: 'Edit Question', component: EditPertanyaanDsnList },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/view-lecture-question', exact: true, name: 'View Question', component: ViewPertanyaanDsn },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/view-student-answer/:mid', exact: true, name: 'View Answer', component: ViewJawabanMhs },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/answer-correction/:mid', exact: true, name: 'View Answer', component: KoreksiJawaban },
        { path: '/lecturer-class/lecturer-class-list/class-detail/:id/:weekid/edit-question/:dsnquestionid', exact: true, name: 'Edit Question', component: EditPertanyaanDsn },

      ]

    } else if (role === "mahasiswa") {
      return [
        // { path: '/', exact: true, name: 'Home' },
        // { path: '/dashboard', name: 'Dashboard', component: Dashboard },

        { path: '/loginAtma', exact: true, name: 'Login', component: loginAtma },
        { path: '/dashboard-atma', exact: true, name: 'Dashboard Atma', component: dashboardAtma },

        { path: '/class/class-select', exact: true, name: 'Class Select', component: selectClass },
        { path: '/class/student-class-list/:classid/:weekid', exact: true, name: 'Question List', component: pertanyaanKelasMhs },
        { path: '/class/student-class-list/:classid/:weekid/add-student-question', exact: true, name: 'Add Question', component: addPertanyaanMhs },
        { path: '/class/student-class-list/:classid/:weekid/question-detail/:questionid', exact: true, name: 'Question Detail', component: viewPertanyaanMhs },
        { path: '/class/student-class-list/:classid/:weekid/pinned-question-detail/:questionid', exact: true, name: 'Question Detail', component: viewPinned },
        { path: '/class/student-class-list/:classid/:weekid/edit-question/:questionid', exact: true, name: 'Edit Question', component: editPertanyaan },
        { path: '/class/student-class-list', exact: true, name: 'Class List', component: enrollHistory },
        { path: '/class/student-class-list/:classid', exact: true, name: 'Week List', component: enrollClassWeek },
        { path: '/class/student-class-list/:classid/quiz/:weekid', exact: true, name: 'Answer Question', component: jawabanMhs },
      ]
    } else {
      swal("!", "Action Not Allowed!", "warning");
    }
  } else {
    // history.replace('/loginAtma')
    // window.location.href(`${HOST_URL}:3000/loginAtma`)
    window.location.href(`${HOST_URL}/loginAtma`)
  }
}

const routes = cekRoutes();

export default routes;
