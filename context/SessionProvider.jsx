import {useContext} from 'react';
import {useState} from 'react';
import {createContext} from 'react';

const SessionContext = createContext();

const SessionProvider = props => {
  const [category, setCategory] = useState(null);
  const [entries, setEntries] = useState(null);
  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [diabetes, setDiabetes] = useState('');
  const [reducedVisionRight, setReducedVisionRight] = useState(false);
  const [reducedVisionLeft, setReducedVisionLeft] = useState(false);
  const [reducedVisionBoth, setReducedVisionBoth] = useState(false);
  const [reducedVision, setReducedVision] = useState(false);
  const [reducedVisionEye, setReducedVisionEye] = useState('');
  const [otherComplaints, setOtherComplaints] = useState('');
  const [cataractSurgery, setCataractSurgery] = useState('4');
  const [surgeryEye, setSurgeryEye] = useState('');
  const [ophthalmologist, setOphthalmologist] = useState('No');
  return (
    <SessionContext.Provider
      value={{
        ophthalmologist,
        setOphthalmologist,
        surgeryEye,
        setSurgeryEye,
        reducedVisionEye,
        setReducedVisionEye,
        reducedVision,
        setReducedVision,
        cataractSurgery,
        setCataractSurgery,
        otherComplaints,
        setOtherComplaints,
        reducedVisionBoth,
        setReducedVisionBoth,
        reducedVisionLeft,
        setReducedVisionLeft,
        reducedVisionRight,
        setReducedVisionRight,
        diabetes,
        setDiabetes,
        bloodGroup,
        setBloodGroup,
        email,
        setEmail,
        category,
        setCategory,
        entries,
        setEntries,
        regNo,
        setRegNo,
        name,
        setName,
        age,
        setAge,
        gender,
        setGender,
        occupation,
        setOccupation,
        mobileNumber,
        setMobileNumber,
      }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

export const useSession = () => useContext(SessionContext);
