import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Form, FormItem, Picker } from 'react-native-form-component';


const InductionForm = ({ onSubmit }) => {

	const [fullname,setfullname] = useState("");
	const [email, setemail] = useState("");
	const [cnic,setcnic] = useState("");
	const [dob,setdob] = useState("");
	const [contactNumber, setcontactNumber] = useState("");
	const [gender, setgender] = useState("male");
	const [occupation,setoccupation] = useState("");
	const [address,setaddress] = useState("");
	const [emergencyContact,setemergencyContact] = useState("");
	const [relationEmergency,setrelationEmergency] = useState("");
	const [fbLink,setfbLink] = useState("");
	const [isVacinated,setisVacinated] = useState("No");
	const [medicalCondition,setmedicalCondition] = useState("");
	const [heardRHAwhere,setheardRHAwhere] = useState("");
	const [contactsInRha,setcontactsInRha] = useState("");
	const [volunteeredOrganizations,setvolunteeredOrganizations] = useState("");
	const [reasonForApply,setreasonForApply] = useState("");
	const [skills,setskills] = useState("");
	const [pickupTiming,setpickupTiming] = useState("");
	const [questions,setquestions] = useState("");

	const submitPressed = ()=>{
		if(fullname === "" || email === "" ||cnic === "" ||dob === "" ||contactNumber === "" || gender === "" || occupation === "" ||address === "" ||
			emergencyContact === "" || relationEmergency === "" ||fbLink === "" ||medicalCondition === "" ||reasonForApply === "" ||skills === "" ||pickupTiming === "")
		{
			onSubmit(false)
		}
		else{
			onSubmit({
				fullname: fullname,
				email: email,
				cnic: cnic,
				dob: dob,
				contactNumber: contactNumber,
				gender: gender,
				occupation: occupation,
				address: address,
				emergencyContact: emergencyContact,
				relationEmergency: relationEmergency,
				fbLink: fbLink,
				isVacinated: isVacinated,
				medicalCondition: medicalCondition,
				heardRHAwhere: heardRHAwhere,
				contactsInRha: contactsInRha,
				volunteeredOrganizations: volunteeredOrganizations,
				reasonForApply: reasonForApply,
				skills: skills,
				pickupTiming: pickupTiming,
				questions: questions
			});
		}
	}

	return (
		<ScrollView>
			<Form onButtonPress={() => submitPressed()}>
				<FormItem
					label="Fullname"
					isRequired
					value={fullname}
					onChangeText={(fullname) => setfullname(fullname)}
					asterik
					
				/>
				<FormItem
					label="Email"
					isRequired
					value={email}
					onChangeText={(email) => setemail(email)}
					asterik
				/>
				<FormItem
					label="cnic"
					isRequired
					value={cnic}
					onChangeText={(cnic) => setcnic(cnic)}
					asterik
				/>
				<FormItem
					label="Date of Birth"
					isRequired
					value={dob}
					onChangeText={(dob) => setdob(dob)}
					asterik
				/>
				<FormItem
					label="Contact Number"
					isRequired
					value={contactNumber}
					onChangeText={(contactNumber) => setcontactNumber(contactNumber)}
					asterik
				/>
				<Picker
					items={[
					{ label: 'Male', value: 'male' },
					{ label: 'Female', value: 'female' },
					{ label: 'Other', value: 'other' },
					]}
					asterik
					label="Gender"
					selectedValue={gender}
					onSelection={(item) => setgender(item.value)}
				/>
				<FormItem
					label="Occupation"
					isRequired
					value={occupation}
					onChangeText={(occupation) => setoccupation(occupation)}
					underneathText="Student/Job position"
					asterik
				/>
				<FormItem
					label="Address"
					isRequired
					value={address}
					onChangeText={(address) => setaddress(address)}
					asterik
				/>
				<FormItem
					label="Emergency Contact"
					isRequired
					value={emergencyContact}
					onChangeText={(emergencyContact) => setemergencyContact(emergencyContact)}
					asterik
				/>
				<FormItem
					label="Relation to him/her"
					isRequired
					value={relationEmergency}
					onChangeText={(relationEmergency) => setrelationEmergency(relationEmergency)}
					asterik
				/>
				<FormItem
					label="Facebook Link"
					isRequired
					value={fbLink}
					onChangeText={(fbLink) => setfbLink(fbLink)}
					asterik
				/>
				<FormItem
					label="Any Medical Condition"
					isRequired
					value={medicalCondition}
					onChangeText={(medicalCondition) => setmedicalCondition(medicalCondition)}
					asterik
				/>
				<Picker
					items={[
					{ label: 'No', value: 'No' },
					{ label: 'Yes', value: 'Yes' },
					]}
					asterik
					label="Are you vacinated?"
					selectedValue={isVacinated}
					onSelection={(item) => setisVacinated(item.value)}
				/>
				<FormItem
					label="Where did you heard about RHA"
					value={heardRHAwhere}
					onChangeText={(heardRHAwhere) => setheardRHAwhere(heardRHAwhere)}
				/>
				<FormItem
					label="contacts in Rha"
					value={contactsInRha}
					onChangeText={(contactsInRha) => setcontactsInRha(contactsInRha)}
				/>
				<FormItem
					label="Organization where you volunteered before"
					value={volunteeredOrganizations}
					onChangeText={(volunteeredOrganizations) => setvolunteeredOrganizations(volunteeredOrganizations)}
				/>
				<FormItem
					label="Why do you wnat to join RHA?"
					isRequired
					value={reasonForApply}
					onChangeText={(reasonForApply) => setreasonForApply(reasonForApply)}
					asterik
				/>
				<FormItem
					label="Your Skills that would help RHA"
					isRequired
					value={skills}
					onChangeText={(skills) => setskills(skills)}
					asterik
				/>
				<FormItem
					label="Your free timing (for pickups)"
					isRequired
					value={pickupTiming}
					onChangeText={(pickupTiming) => setpickupTiming(pickupTiming)}
					asterik
				/>
				<FormItem
					label="Any Question(s) you wnat to ask?"
					value={questions}
					onChangeText={(questions) => setquestions(questions)}
					textArea
				/>
			</Form>
			
		</ScrollView>
	);
};

export default InductionForm;