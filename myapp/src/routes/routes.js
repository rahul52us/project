import Home from "../pages/MainPages/home/Home";
import About from "../pages/MainPages/about/About";
import Contact from "../pages/MainPages/contact/Contact";
import Login from "../pages/UserAuth/login/Login";
import Register from "../pages/UserAuth/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Userlist from "../component/usersList/UserList";
import PdfCreater from "../pages/pdfList/CreatePdf/PdfCreater";
import Videos from "../pages/YouVideos/Videos";
import Blog from "../pages/Blog/Blog";
import MyEditor from "../common/Editor/MyEditor";
import Pdf from "../pages/pdf/Pdf";
import Quiz from "../pages/quiz/Quiz";
import DashQuiz from "../pages/DashQuiz/DashQuiz";
import DashQuizCreater from "../pages/DashQuiz/DashQuizCreater/DashQuizCreater";
import DraftJsComp from "../component/DraftComp/Richtextfield";
import PdfList from "../pages/pdfList/PdfList";
import YouTubeVideosList from "../pages/DashYouTubeVideos/YouTubeVideosList";
import Speech from "../pages/speech/speech";
import Pagenotfound from "../pages/projectPage/PageNotFound";
import Filepaymentpage from "../pages/pdf/FilePaymentPage/FilePaymentPage";
import SingleBlog from "../pages/Blog/singleBlog/SingleBlog";
import BlocksUser from "../component/usersList/BlocksUser/BlocksUser";
import DashChat from "../component/DashChat/DashChat";
import Chat from "../pages/chat/Chat";
import ForgotEmailPassword from "../pages/UserAuth/ForgotEmailPassword/ForgotEmailPassword";
import ResetEmailPassword from "../pages/UserAuth/ForgotEmailPassword/ResetEmailPassword";
import StudentManageIndex from "../pages/StudentManage/StudentManageIndex";

const routes = [
    {
        path : '/',
        name : <Home />
    },
    {
        path : '/about',
        name : <About />
    },
    {
        path : '/contact',
        name : <Contact />
    },
    {
        path : "/dashboard",
        name : <Dashboard/>
    },
    {
        path : '/register',
        name : <Register/>
    },    
    {
        path : '/login',
        name : <Login/>
    },
    {
        path : '/dashboard/usersList',
        name : <Userlist/>
    },        
    {
        path : '/dashboard/users/Blocks',
        name : <BlocksUser />
    },
    {
        path : '/dashboard/pdflist',        
        name : <PdfList />
    },
    {
        path : '/dashboard/createPdf',
        name : <PdfCreater/>
    },
    {
        path : '/videos',
        name : <Videos/>
    },
    {
        path : 'dashboard/editor',
        name : <MyEditor/>
    },    
    {
        path : '/blog',
        name : <Blog />
    },
    {
        path : '/about',
        name : <About />
    },
    {
        path : '/pdf',
        name : <Pdf />
    },
    {
        path : '/quiz',
        name : <Quiz />
    },
    {
        path :'/dashboard/quiz',
        name : <DashQuiz />
    },    
    {
        path : '/dashboard/quiz/:categary/:topic',
        name : < DashQuizCreater />,
    },
    {
        path : '/draftjs',
        name : <DraftJsComp />
    },
    {
        path : '/dashboard/youtubeVideos',
        name : <YouTubeVideosList />
    },
    {
        path : '/speech',
        name : <Speech />
    },
    {
        path : '/*',
        name : <Pagenotfound />
    },
    {
        path : '/chat',
        name : <Chat />
    },
    {
        path : '/paid/file/payment',
        name : <Filepaymentpage />
    },
    {
        path : '/blog/:id',
        name : <SingleBlog />
    },
    {
        path :'/dashboard/chat',
        name : <DashChat />
    },
    {
        path : '/forget-password',
        name : <ForgotEmailPassword />
    },
    {
        path : '/passwordReset/:token/:id',
        name : <ResetEmailPassword />
    },
    {
        path : '/dashboard/student/management',
        name : <StudentManageIndex />
    }
]

export default routes;