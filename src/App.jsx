import Navbar from "./Component/Navbar";
import { GoSearch } from "react-icons/Go";
import { AiFillPlusCircle } from "react-icons/Ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./Component/ContactCard";
import AddAndUpdateContact from "./Component/AddAndUpdateContact";
import useDisclose from "../src/hooks/useDisclose"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./Component/NotFoundContact";


const App = () => {
  const [contact, setcontact] = useState([]);

  const  {onOpen,onclose,isopen} = useDisclose();

  useEffect(() => {
    const getContact = async () => {
      try {
        const contactRef = collection(db, "contact");
       onSnapshot(contactRef,(snapshot)=>{  
       const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setcontact(contactList);
      })
      return contactList;
      } catch (error) {
        console.log(error);
      }
    };
    getContact();
  }, []);
  

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactRef = collection(db, "contact");
    onSnapshot(contactRef,(snapshot)=>{  
    const contactList = snapshot.docs.map((doc) => {
     return {
       id: doc.id,
       ...doc.data(),
     };
   });

   const filteredContacts = contactList.filter((contact)=>
   contact.name.toLowerCase().includes(value.toLowerCase()))


   setcontact(filteredContacts);
   })
   return filterContacts;
   };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4 ">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex items-center flex-grow">
            <GoSearch className=" ml-1 absolute text-3xl text-white" />
            <input
             onChange={filterContacts}
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>

          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contact.length <= 0 ?<NotFoundContact/>: contact.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      {/* <AddAndUpdateContact onclose={onclose} isopen={isopen} /> */}
      <AddAndUpdateContact onClose={onclose} isOpen={isopen} />
      <ToastContainer 
        position="bottom-center"
      />
    </>
  );
};

export default App;

