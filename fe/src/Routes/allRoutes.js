import React from "react";
import CompanyList from "../pages/CandidateAndCompany/CompanyList/CompanyList";
import CompanyDetails from "../pages/CandidateAndCompany/CompanyDetails/CompanyDetails";


//Contacts

//AuthPages
import SignIn from "../pages/ExtraPages/SignIn";
import SignUp from "../pages/ExtraPages/SignUp";
import SignOut from "../pages/ExtraPages/SignOut";
import ResetPassword from "../pages/ExtraPages/ResetPassword";
import ComingSoon from "../pages/ExtraPages/ComingSoon";
import Error404 from "../pages/ExtraPages/Error404";
import Components from "../pages/ExtraPages/Components/Components";

//profile section(User Profile)
import MyProfile from "../pages/Profile/MyProfile/MyProfile";
import TopicCompany from "../pages/Company/TopicCompany";
import QuestionDetail from "../pages/Question/Question";
import Error403 from "../pages/ExtraPages/403";
import AdminPage from "../pages/Admin/admin";
import UserVipPage from "../pages/UserVip/userVip";

//Home Section
const Layout2 = React.lazy(() => import('../pages/Home/Layout2/Layout2'));

const userRoutes = [
  //profile Section(User Profile)
  { path: "/myprofile", component: <MyProfile /> },

  //Components Section(Extra Pages)
  { path: "/components", component: <Components /> },

  //Candidate and Company Section
  { path: "/companydetails", component: <CompanyDetails /> },

  { path: "/companies", component: <CompanyList /> },

  { path: "/topic-company/:company_id", component: <TopicCompany /> },
  { path: "/topic-question/:topic_id", component: <QuestionDetail /> },

  //Jobs Section

  { path: "/topics", component: <TopicCompany /> },


    // USER VIP
  { path: "/user-vip/:type", component: <UserVipPage/> },
  { path: "/user-vip", component: <UserVipPage/> },

  // ADMIN
  { path: "/admin/:type", component: <AdminPage /> },
  { path: "/admin", component: <AdminPage /> },

  { path: "/", component: <Layout2 /> }
];

const authRoutes = [
  { path: "/error404", component: <Error404 /> },
  { path: "/403", component: <Error403 /> },
  { path: "/comingsoon", component: <ComingSoon /> },
  { path: "/resetpassword", component: <ResetPassword /> },
  { path: "/signout", component: <SignOut /> },
  { path: "/signup", component: <SignUp /> },
  { path: "/signin", component: <SignIn /> }
];
export { userRoutes, authRoutes };
