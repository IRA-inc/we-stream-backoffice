import {Routes,Route,useLocation} from 'react-router-dom'
import {TransitionGroup,CSSTransition} from "react-transition-group";

//main
// import Dashbord from '../views/main/dashbord'
import Dashbord from '../components/dashboard/admin/Admindashbord'
import EventOwnerDashbord from '../components/dashboard/eventOwner/EventOwnerDashboard'
import Rating from '../views/main/rating';
import Comment from '../views/main/comment';
import User from '../views/main/user';
import Pricing from '../views/main/pricing';

//App
import UserProfile from '../views/app/usermanagement/userprofile'
import UserPrivacySetting from '../views/app/usermanagement/userprivacysetting'
import UserAccountSettingList from '../views/app/usermanagement/useraccountsetting'
import UserProfileEdit from '../views/app/usermanagement/userprofileedit'

//Form
import Checkbox from '../views/forms/formcontrols/checkbox'
import Elements from '../views/forms/formcontrols/elements'
import Radio from '../views/forms/formcontrols/radio'
import FromSwitch from '../views/forms/formcontrols/switch'
import Validations from '../views/forms/formcontrols/validations'
import Invoiceview from '../views/pages/invoiceview';


//Extrapages
import Timeline1 from '../views/pages/timeline/timeline1'
import Invoice   from '../views/pages/invoice'
import FAQ       from '../views/pages/faq'
import BlankPage from '../views/pages/blankpage'
import TermsOfUse from '../views/pages/extrapages/termsOfUse'
import PrivacyPolicy from  '../views/pages/extrapages/privacyPolicy'

//Table
import  BasicTable from '../views/table/basictable'
import  DataTable  from '../views/table/datatable'
import  EditTable from '../views/table/edittable'

//ui
import UiAlerts from '../views/ui/UiAlerts'
import UiBadges from '../views/ui/UiBadges'
import UiBreadcrumbs  from '../views/ui/UiBreadcrumbs'
import UiButtons from '../views/ui/UiButtons'
import UiCards from '../views/ui/UiCards'
import UiCarousels from '../views/ui/UiCarousels'
import UiColors from '../views/ui/UiColors'
import UiEmbed from '../views/ui/UiEmbed'
import UiGrids from '../views/ui/UiGrids'
import UiImages from '../views/ui/UiImages'
import UiListGroups from '../views/ui/UiListGroups'
import UiMediaObjects from '../views/ui/UiMediaObjects'
import UiModals from '../views/ui/UiModals'
import UiNotifications from '../views/ui/UiNotifications'
import UiPaginations from '../views/ui/UiPaginations'
import UiPopOvers from '../views/ui/UiPopOvers'
import UiProgressBars from  '../views/ui/UiProgressBars'
import UiTabs from '../views/ui/UiTabs'
import UiTooltips from '../views/ui/UiTooltips'
import UiTypography from '../views/ui/UiTypography'

// icon-heroicon
import Heroicons from '../views/Icons/Heroicons ';
import Dripicons from '../views/Icons/dripicons';
import FontAwsome from '../views/Icons/fontawsome';
import LineAwsome from '../views/Icons/lineawsome';
import Remixicons from '../views/Icons/remixicons';
import Unicons from '../views/Icons/unicons'

//Category
import AddCategory from '../components/category/addCategory';
import CategoryList from '../components/category/category-list';
import EditCategory from '../components/category/EditCategory';

// roles
import AddRoles from '../components/Roles/addRoles'
import RolesList from '../components/Roles/roles-list'
import EditRole from '../components/Roles/EditRoles'

// Users
import AddUser from '../components/users/addUser'
import UserList from '../components/users/userLists'
import EditUser from '../components/users/editUser'

//Event
import AddEvent from '../components/events/addEvent';
import EventList from '../components/events/eventLists';
import EditUserEvent from '../components/events/editUserEvent';
import PeningEventList from '../components/events/pendingEvent';
import AddMyEvent from '../components/events/AddMyEvent';
import MyEventList from '../components/events/MyEvent';
import OwnerEditEvent from '../components/events/editMyEvent';
import OrdersList from '../components/orders/orders';
import AddPayment from '../components/payments/addPayout';
import PayoutList from '../components/payments/payoutPaymentsList';
import EventPaymentList from '../components/payments/eventsPayments';
import MyEventPaymentList from '../components/payments/myEventsPayment';
import MyPaymentList from '../components/payments/myPayments';
import PaymentDetails from '../components/payments/paymentDetails';
import MyPaymentDetails from '../components/payments/myPaymentsDetails';


//Movie
import AddMovie from '../views/movie/add-movie';
import MovieList from '../views/movie/movie-list';

//Show
import AddShow from '../views/show/add-show';
import ShowList from '../views/show/show-list';

//form-wizard
import SimpleWizard from '../views/form-wizard/simple-wizard';
import ValidateWizard from '../views/form-wizard/validate-wizard';
import VerticalWizard from '../views/form-wizard/vertical-wizard';

//auth pages
import ConfirmMail  from '../views/auth/confirmmail'
import LockScreen  from '../views/auth/lockscreen'
// import RecoverPassword  from '../components/auth/recoverpassword'
import Login from '../components/auth/login'
import SignUp  from '../components/auth/signup'
import SendResetLink from '../components/auth/send-reset-link'
import ResetPassword from '../components/auth/recover-password'
import UpdatePassword from '../components/auth/update-password'

//ExtarPages
import Maintainance from '../views/pages/maintainance'
import  Error404    from '../views/pages/error/error404'
import  Error500    from '../views/pages/error/error500'
import CommingSoon  from  '../views/pages/commingsoon'

//Layouts
import Layout from '../layouts/layout'
import BlankLayout from '../layouts/blanklayout';
import MessagesList from '../components/messages/messages';
import SendMessage from '../components/messages/respondMessage';



const Layout1Route = (props) => {

    const {history} = props;

    let location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
            // key={location.key}
            classNames="fade"
            timeout={300}
            >
                <Routes history={history}  location={location}>
                <Route element={<Layout />}>
                    <Route path="/dashboard" exact element={<Dashbord />} />
                    <Route path="/mydashboard" exact element={<EventOwnerDashbord />} />
                    <Route path="/rating" element={<Rating />} />
                    <Route path="/comment" element={<Comment />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/pages-pricing" element={<Pricing />} />

                    {/* Roles */}
                    <Route path="/add-role" element={<AddRoles />} />
                    <Route path="/role-list" element={<RolesList />} />
                    <Route path="/edit-role/:id" element={<EditRole/>} />

                    {/* category */}
                    <Route path="/add-category" element={<AddCategory />} />
                    <Route path="/category-list" element={<CategoryList />} />
                    <Route path="/edit-category/:id" element={<EditCategory/>} />

                    {/* user */}
                    <Route path="/add-user" element={<AddUser />} />
                    <Route path="/user-list" element={<UserList />} />
                    <Route path="/edit-user/:id" element={<EditUser/>} />

                    
                    {/* messafes */}
                    {/* <Route path="/add-user" element={<AddUser />} /> */}
                    <Route path="/messages" element={<MessagesList />} />
                    {/* <Route path="/edit-user/:id" element={<EditUser/>} /> */}

                    {/* user */}
                    <Route path="/add-event" element={<AddEvent />} />
                    <Route path="/event-list" element={<EventList />} />
                    <Route path="/my-events" element={<MyEventList />} />
                    <Route path="/pending-event" element={<PeningEventList />} />
                    <Route path="/add-new-event" element={<AddMyEvent/>} />
                    <Route path="/edit-event/:id" element={<EditUserEvent/>} />
                    <Route path="/edit-myevent/:id" element={<OwnerEditEvent/>} />
                    <Route  path="/my-orders" element={<OrdersList/>}/>
                    <Route  path="/payout-event/:id" element={<AddPayment />}/>
                    <Route  path="/payout-event" element={<PayoutList />}/>
                    <Route  path="/payment-list" element={<EventPaymentList />}/>
                    <Route path="/my-event-payments" element={<MyEventPaymentList />}/>
                    <Route path="/my-payments" element={<MyPaymentList />}/>
                    <Route path="/view-payment/:id" element={<PaymentDetails />}/>
                    <Route path="/view-mypayment/:id" element={<MyPaymentDetails />}/>

                     {/* App */}
                    <Route path="/send-message/:id" element={<SendMessage />}/>

                    {/* App */}
                    <Route path="/user-profile"         element={<UserProfile />} />
                    <Route path="/user-privacy-setting" element={<UserPrivacySetting />} />
                    <Route path="/user-account-setting" element={<UserAccountSettingList />} />
                    <Route path="/user-profile-edit"    element={<UserProfileEdit />} />

                    {/* Form  */}
                    <Route path="/form-chechbox"      element={<Checkbox />} />
                    <Route path="/form-layout"        element={<Elements />} />
                    <Route path="/form-radio"         element={<Radio />} />
                    <Route path="/form-switch"        element={<FromSwitch />} />
                    <Route path="/form-validation"    element={<Validations />} />
                  

                    {/* Icon */}
                    <Route path="/icon-heroicon" element={<Heroicons />}/>
                    <Route path="/icon-dripicons" element={<Dripicons />}/>
                    <Route path="/icon-fontawesome-5" element={<FontAwsome />}/>
                    <Route path="/icon-lineawesome" element={<LineAwsome />}/>
                    <Route path="/icon-remixicon" element={<Remixicons />}/>
                    <Route path="/icon-unicons" element={<Unicons />}/>

                    {/* Extrapages */}
                    <Route path="/pages-timeline"       element={<Timeline1 />} />
                    <Route path="/pages-invoice"    element={<Invoice />} />
                    <Route path="/pages-faq"        element={<FAQ />} />
                    <Route path="/blank-page" element={<BlankPage />} />
                    <Route path="/terms-of-service" element={<TermsOfUse />} />
                    <Route path="/privacy-policy"   element={<PrivacyPolicy />} />
                    <Route path="/invoice-view"     element={<Invoiceview />}/>

                    {/* Table */}
                    <Route path="/tables-basic"    element={<BasicTable />} />
                    <Route path="/data-table"     element={<DataTable />} />
                    <Route path="/table-editable" element={<EditTable />} />

                    {/* Ui */}
                    <Route path="/ui-alerts"         element={<UiAlerts />}/>
                    <Route path="/ui-badges"         element={<UiBadges />}/>
                    <Route path="/ui-breadcrumb"     element={<UiBreadcrumbs />}/>
                    <Route path="/ui-buttons"        element={<UiButtons />}/>
                    <Route path="/ui-cards"          element={<UiCards />}/>
                    <Route path="/ui-carousel"       element={<UiCarousels />}/>
                    <Route path="/ui-colors"         element={<UiColors />}/>
                    <Route path="/ui-embed-video"    element={<UiEmbed />}/>
                    <Route path="/ui-grid"           element={<UiGrids />}/>
                    <Route path="/ui-images"         element={<UiImages />}/>
                    <Route path="/ui-list-group"     element={<UiListGroups />}/>
                    <Route path="/ui-media-object"   element={<UiMediaObjects />}/>
                    <Route path="/ui-modal"          element={<UiModals />}/>
                    <Route path="/ui-notifications"  element={<UiNotifications />}/>
                    <Route path="/ui-pagination"     element={<UiPaginations />}/>
                    <Route path="/ui-popovers"       element={<UiPopOvers />}/>
                    <Route path="/ui-progressbars"   element={<UiProgressBars />}/>
                    <Route path="/ui-tabs"           element={<UiTabs />}/>
                    <Route path="/ui-tooltips"       element={<UiTooltips />}/>
                    <Route path="/ui-typography"     element={<UiTypography />}/>

                    
                    
                    {/* Movie */}
                    <Route path="/add-movie"        element={<AddMovie />}/>
                    <Route path="/movie-list"       element={<MovieList />}/>

                    {/* Show */}
                    <Route path="/add-show"        element={<AddShow />}/>
                    <Route path="/show-list"       element={<ShowList />}/>

                    {/* Form-wizard */}
                    <Route path="/form-wizard"      element={<SimpleWizard />}/>
                    <Route path="/form-wizard-validate"    element={<ValidateWizard />}/>
                    <Route path="/form-wizard-vertical"    element={<VerticalWizard />}/>
                    {/* Change password */}
                    <Route path="/change-password" element={<UpdatePassword />} />
                </Route>

                <Route element={<BlankLayout />}>
                    {/* auth */}

                    <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/reset-link" element={<SendResetLink />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                     <Route path="/auth/pages-confirm-mail" element={<ConfirmMail />} />
                    <Route path="/auth/pages-lock-screen" element={<LockScreen />} />
                    {/* <Route path="/auth/pages-recoverpw" element={<RecoverPassword />} /> */}
                 {/* <Route path="/auth/sign-in" element={<SignIn />} /> */}
                    <Route path="/auth/sign-up" element={<SignUp />} />

                    {/* ExtraPages */}
                    <Route path="/extra-pages/pages-error" element={<Error404 />} />
                    <Route path="/extra-pages/pages-error-500" element={<Error500 />} />
                    <Route path="/extra-pages/pages-comingsoon" element={<CommingSoon />} />
                    <Route path="/extra-pages/pages-maintenance" element={<Maintainance />} />
                </Route>

                </Routes>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Layout1Route