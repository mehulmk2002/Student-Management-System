import React from "react"; 
import { 
Box, 
Container, 
Row, 
Column, 
FooterLink, 
Heading, 
} from "./FooterStyles"; 

const Footer = () => { 
return ( 
	<Box> 
	<h1 style={{ color: "green", 
				textAlign: "center", 
				marginTop: "-50px" }}> 
		Meet Computer Training Center
	</h1> 
	<Container> 
		<Row> 
		<Column> 
			<Heading>About Us</Heading> 
			<span style={{color:'#fff'}} >We aim to be the most trusted computer training and opportunities provider at the global level</span> 
		</Column> 
	






		<Column> 
			<Heading>Best Course</Heading> 
			<FooterLink >CCC Cource</FooterLink> 
			<FooterLink >Tally Cource</FooterLink> 
			<FooterLink >Basic Cource</FooterLink> 
			<FooterLink >Microsoft Office</FooterLink> 
		</Column> 
		<Column> 
			<Heading>Contact Us</Heading> 
			<FooterLink >mctcdnh@gmail.com</FooterLink> 
			<FooterLink >+91 8200648423</FooterLink> 
			<span style={{color:'#fff'}} >Shop No 14, The Pride, Khanvel, UT of DNH And DD - 396230</span> 
		
		</Column> 
		<Column> 
			<Heading>Social Media</Heading> 
			<FooterLink href="#"> 
			<i className="fab fa-facebook-f"> 
				<span style={{ marginLeft: "10px" }}> 
				Facebook 
				</span> 
			</i> 
			</FooterLink> 
			<FooterLink href="#"> 
			<i className="fab fa-instagram"> 
				<span style={{ marginLeft: "10px" }}> 
				Instagram 
				</span> 
			</i> 
			</FooterLink> 
			<FooterLink href="#"> 
			<i className="fab fa-twitter"> 
				<span style={{ marginLeft: "10px" }}> 
				Twitter 
				</span> 
			</i> 
			</FooterLink> 
			
		</Column> 
		</Row> 
	</Container> 
	</Box> 
); 
}; 
export default Footer; 
