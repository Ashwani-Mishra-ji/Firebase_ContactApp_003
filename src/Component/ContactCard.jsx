import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import useDisclose from "../hooks/useDisclose";
import AddAndUpdateContact from "./AddAndUpdateContact";
import {toast} from "react-toastify"




const ContactCard = ({ contact }) => {
  const { onOpen, onclose, isopen } = useDisclose();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contact", id));
      toast.success ("Contact delete successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="  bg-red-400 flex items-center justify-between rounded-lg
    p-2"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-4xl text-yellow-400" />
          <div className="text-white">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.mail}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-orange-00 cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateContact
      contact= {contact}
       isupdate 
       isOpen={isopen}
       onClose={onclose} />
    </>
  );
};

export default ContactCard;
