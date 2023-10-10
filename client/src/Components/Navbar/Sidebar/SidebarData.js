import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { BsPersonFillCheck,BsBookmarksFill,BsBank2,BsClipboard2Data,BsClock,BsCurrencyRupee,BsFillPeopleFill,BsAlarmFill,BsCheck2All } from "react-icons/bs";
import { FcOpenedFolder } from "react-icons/fc";
import { FaGraduationCap } from "react-icons/fa";
export const SidebarData = [
{
	title: "Dashboard",
	path: "/",
	icon: <AiIcons.AiFillHome />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,
},
{
	title: "Admission Inquiry",
	icon: <BsAlarmFill />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Inquiry",
		path: "/addInquiry",
		icon: <BsCheck2All />,
		cName: "sub-nav",
	},
	{
		title: "View Inquiries",
		path: "/inquiry",
		icon: <BsCheck2All />,
		cName: "sub-nav",
	},
	],
},
{
	title: "Student",
	icon: <BsFillPeopleFill />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Search",
		path: "/searchProfile",
		icon: <BsCheck2All />,
	},
	{
		title: "Add Student",
		path: "/addStudent",
		icon: <BsCheck2All />,
	},
    {
		title: "View All Students",
		path: "/viewStudents",
		icon: <BsCheck2All />,
	},
	],
},
{
	title: "Enrollment",
	icon: <FaGraduationCap />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Enrollment",
		path: "/NewEnrollment",
		icon: <BsCheck2All />,
	},
    {
		title: "View All Enrolled students",
		path: "/enrollment",
		icon: <BsCheck2All />,
	},
	],
},
{
	title: "Add Fee",
	path: "/NewPayment",
	icon: <BsCurrencyRupee />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,
},
{
	title: "TimeTable",
	icon: <BsClock />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	
	{
		title: "Add TimeTable",
		path: "/AddTimeTable",
		icon: <BsCheck2All />,
	},
    {
		title: "View TimeTable",
		path: "/TimeTable",
		icon: <BsCheck2All />,
	},
	],
},
{
	title: "Course",
	icon: <BsClipboard2Data />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Course",
		path: "/AddCourse",
		icon: <BsCheck2All />,
	},
    {
		title: "View Course",
		path: "/Courses",
		icon: <BsCheck2All />,
	},
	],
},
{
	title: "Accounts",
	
	icon: <BsBank2 />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Show",
		path: "/ShowTransactions",
		icon: <BsCheck2All />,
	},
	{
		title: "Add Income/Expense",
		path: "/AddNewTransactions",
		icon: <BsCheck2All />,
	},
   
	],
},{
	title: "Attendance",
	
	icon: <BsPersonFillCheck />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Attendance",
		path: "/inAttendance",
		icon: <BsCheck2All />,
	},
	{
		title: "View Attendance",
		path: "/ShowAttendance",
		icon: <BsCheck2All />,
	},
   
	],
},
{
	title: "Publish Data",
	
	icon: <BsPersonFillCheck />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Add Courses",
		path: "/Add_CoursesPublic",
		icon: <BsCheck2All />,
	},{
		title: "View Courses",
		path: "/showCoursesPublish",
		icon: <BsCheck2All />,
	},
	{
		title: "Add Gallery",
		path: "/addGallery",
		icon: <BsCheck2All />,
	},{
		title: "View Gallery",
		path: "/ShowGallery",
		icon: <BsCheck2All />,
	},
   
	],
},
];
