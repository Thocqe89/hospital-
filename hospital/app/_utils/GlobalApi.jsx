import { data } from "autoprefixer";
// import CategoryList from "../(route)/search/_components/CategoryList";

const axios = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api/',
    headers: {
        'Authorization': `Bearer ${API_KEY}`
    }
});

const getEmployee = () => axiosClient.get('employees?populate=*');

const getDoctorlist = () => axiosClient.get('user-1s?populate=*');

const getrole = () => axiosClient.get('role-1s?populate=*');
const getcases = () => axiosClient.get('cases-1s?populate=*');
const getcasesByUserId = (id) => axiosClient.get(`cases-1s?populate=*&filters[patient_1_][id][$eq]=${id}`);
const getPatientByCaseId = (caseId) => axiosClient.get(`cases-1s/${caseId}?populate=patient_1_`);


const getDoctorByCategory = (category) =>
    axiosClient.get
        ('/user-1s?filters[employees][name][$in]=' + category + "&populate=*")

const getDoctorById = (id) => axiosClient.get('/user-1s/' + id + "?populate=*")


const getAppointments = () => axiosClient.get('/appointments?populate=*');

const Patients = (data) => axiosClient.post('/patient-1s', data);

const getPatients = (searchQuery) => axiosClient.get(`patient-1s?populate=*&search=${searchQuery}`);

const getPatiented = () => axiosClient.get('/patient-1s?populate=*');

const getPatienting = (categoryofpatient) =>
    axiosClient.get
        ('/patient-1s?filters[id][name][phone_number][$in]=' + categoryofpatient + "&populate=*")



const getBookinglist = (userEmail) => axiosClient.get(`/appointments?filters[Email][$eq]=${userEmail}&populate=user-1s,image`);
const updateBookingStatus = (id, data) => axiosClient.patch(`/appointments/${id}`, { data });

//const getBookinglist = (userEmail) => axiosClient.get(`/appointments?[filters][Email][$eq]=${userEmail}&populate[user_1s][populate][0]=image`);


const BookAppointment = (data) => axiosClient.post("/appointments/", data);

const getBookedTimeSlots = (doctorId, date) =>
    axiosClient.get(`/appointments?filters[doctor][id][$eq]=${doctorId}&filters[date][$eq]=${date.toISOString().split('T')[0]}&populate=*`);

const getPatientCase = (id) => axiosClient.get(`/cases-1s/${id}`);
const updateCase = (id, data) => axiosClient.put(`/cases-1s/${id}`, data);
const getCaseById = (id) => axiosClient.get(`/cases-1s/${id}`);
const deletecase = (id) => axiosClient.delete(`/cases-1s/${id}`);
const PostNewcasesing = (newcases) => axiosClient.post('/cases-1s', { data: newcases });





const addPatient = (data) => axiosClient.post('/patient-1s', { data });

const addUser = (data) => axiosClient.post('/user-1s/', { data });




// const PostNewcasesing = (newcases) => axiosClient.post('/cases-1s', { newcases });

const updatePatient = (id, data) => axiosClient.put(`/patient-1s/${id}`, data);



const getPatientById = (id) => axiosClient.get(`/patient-1s/${id}?populate=*`);

const deletepatients = (id) => axiosClient.delete(`/patient-1s/${id}`);

const deleteUser = (id) => axiosClient.delete(`/user-1s/${id}`);
const updateUser = (id, data) => axiosClient.put(`/user-1s/${id}`, data);
const saveUser = (userData) => axiosClient.post('/user-1s', userData);
const getUserById = (id) => axiosClient.get(`/user-1s/${id}`);


// const getDoctorByCategory = (category) => {
//   return axiosClient.get(`/user-1s?filtersemployees[name][$in]=${category}`);
//  };
// const getUser1 = () => axiosClient.get('icon-2s?populate=*');
// const getDoctorlist = () => axiosClient.get('user-1s?populate=*');
// const getDoctorByCategory = (category) =>
//   axiosClient.get(`/user-1s?filters[icon-2s.name][$in]=${category}&_populate=*`);



export default {
    getEmployee,
    getDoctorlist,
    getDoctorByCategory,
    getDoctorById,
    BookAppointment,
    getAppointments,
    Patients,
    getPatients,
    addPatient,
    PostNewcasesing,
    getPatienting,
    getPatiented,
    deletepatients,
    getBookedTimeSlots,
    getPatientCase,
    addUser,
    getBookinglist,
    updatePatient,
    getPatientById,
    getrole,
    getcases,
    saveUser,
    getUserById,
    deleteUser,
    updateUser,
    updateBookingStatus,
    getPatientByCaseId,
    updateCase,
    getcasesByUserId,
    getCaseById,
    deletecase
    //getBookinglists
}; 