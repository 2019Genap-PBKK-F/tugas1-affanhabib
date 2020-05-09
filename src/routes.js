import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import JexcelView from './components/views/Jexcel.vue'

import UnitView from './components/views/tugas/Unit.vue'
import KategoriUnitView from './components/views/tugas/KategoriUnit.vue'

import CapaianUnitView from './components/views/tugas/CapaianUnit.vue'
import DataDasarView from './components/views/tugas/DataDasar.vue'
import JenisSatkerView from './components/views/tugas/JenisSatker.vue'
import PeriodeView from './components/views/tugas/Periode.vue'
import MasterIndikatorView from './components/views/tugas/MasterIndikator.vue'
import IndikatorPeriodeView from './components/views/tugas/IndikatorPeriode.vue'
import SatuanKerjaView from './components/views/tugas/SatuanKerja.vue'
import IndikatorSatkerView from './components/views/tugas/IndikatorSatuanKerja.vue'
import IndikatorSatkerLogView from './components/views/tugas/IndikatorSatuanKerjaLog.vue'
import AspekView from './components/views/tugas/Aspek.vue'

import AbmasView from './components/views/fp/abmas.vue'
import DosenView from './components/views/fp/dosen.vue'
import PenelitianView from './components/views/fp/penelitian.vue'
import PublikasiView from './components/views/fp/publikasi.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }, {
        path: 'jexcel',
        component: JexcelView,
        name: 'JExcel',
        meta: {description: 'List of Mahasiswa'}
      }, {
        path: 'datadasar',
        component: DataDasarView,
        name: 'DataDasar',
        meta: {description: 'List of Data Dasar'}
      }, {
        path: 'capaianunit',
        component: CapaianUnitView,
        name: 'CapaianUnit',
        meta: {description: 'List of Capaian Unit'}
      }, {
        path: 'unit',
        component: UnitView,
        name: 'Unit',
        meta: {description: 'List of Unit'}
      }, {
        path: 'kategoriunit',
        component: KategoriUnitView,
        name: 'KategoriUnit',
        meta: {description: 'List of Kategori Unit'}
      }, {
        path: 'jenissatker',
        component: JenisSatkerView,
        name: 'JenisSatker',
        meta: {description: 'List of Jenis Satuan Kerja'}
      }, {
        path: 'periode',
        component: PeriodeView,
        name: 'Periode',
        meta: {description: 'List of Periode'}
      }, {
        path: 'masterindikator',
        component: MasterIndikatorView,
        name: 'MasterIndikator',
        meta: {description: 'List of Master Indikator'}
      }, {
        path: 'indikatorperiode',
        component: IndikatorPeriodeView,
        name: 'IndikatorPeriode',
        meta: {description: 'List of Indikator Periode'}
      }, {
        path: 'satuankerja',
        component: SatuanKerjaView,
        name: 'SatuanKerja',
        meta: {description: 'List of Satuan Kerja'}
      }, {
        path: 'indikatorsatker',
        component: IndikatorSatkerView,
        name: 'IndikatorSatker',
        meta: {description: 'List of Indikator Satuan Kerja'}
      }, {
        path: 'indikatorsatkerlog',
        component: IndikatorSatkerLogView,
        name: 'IndikatorSatkerLog',
        meta: {description: 'List of Indikator Satuan Kerja Log'}
      }, {
        path: 'aspek',
        component: AspekView,
        name: 'Aspek',
        meta: {description: 'List of Aspek'}
      }, {
        path: 'abmas',
        component: AbmasView,
        name: 'Abmas',
        meta: {description: 'List of Abmas'}
      }, {
        path: 'dosen',
        component: DosenView,
        name: 'Dosen',
        meta: {description: 'List of Dosen'}
      }, {
        path: 'penelitian',
        component: PenelitianView,
        name: 'Penelitian',
        meta: {description: 'List of Penelitian'}
      }, {
        path: 'publikasi',
        component: PublikasiView,
        name: 'Publikasi',
        meta: {description: 'List of Publikasi'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
