import 'animate.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { USER_ROLE } from './constants/enums';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './layout/ProtectedRoute';
import ActivePage from './pages/Active';
import AdminPage from './pages/Admin';
import CandidatePages from './pages/Admin/Candidates';
import ReportsPage from './pages/Admin/Reports';
import AdminRoomsPage from './pages/Admin/Rooms';
import AdminUsersPage from './pages/Admin/Users';
import IndexPage from './pages/Home';
import JudgePage from './pages/Judge';
import JudgeBaremPage from './pages/Judge/Barem';
import JudgeRoomDetail from './pages/Judge/Room/RoomDetail';
import LoginPage from './pages/Login';
import MentorPage from './pages/Mentor';
import MentorBaremPage from './pages/Mentor/Barem';
import SubmissionsPage from './pages/Submissions';
import TeamPage from './pages/Teams';
import './styles/global.css';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="teams" element={<TeamPage />} />
          <Route path="active/token/:token" element={<ActivePage />} />
          <Route path="submissions" element={<SubmissionsPage />} />

          {/* Role Judge */}
          <Route path="judge" element={<ProtectedRoute roleAccess={[USER_ROLE.JUDGE]} />}>
            <Route index element={<JudgePage />} />
            <Route path="room/:roomId/judge/:judgeId" element={<JudgeRoomDetail />} />
            <Route path="room/:roomId/judge/:judgeId/team/:id/candidate/:candidateId" element={<JudgeBaremPage />} />
            <Route path="barem/:candidateId" element={<JudgeBaremPage />} />
          </Route>

          {/* Role Mentor */}
          <Route path="mentor" element={<ProtectedRoute roleAccess={[USER_ROLE.MENTOR]} />}>
            <Route index element={<MentorPage />} />
            <Route path="team/:id" element={<MentorBaremPage />} />
            <Route path="team/:id/candidate/:candidateId" element={<MentorBaremPage />} />
          </Route>

          {/* Role Admin */}
          <Route path="admin" element={<ProtectedRoute roleAccess={[USER_ROLE.ADMIN]} />}>
            <Route index element={<AdminPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="rooms" element={<AdminRoomsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="candidates" element={<CandidatePages />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
