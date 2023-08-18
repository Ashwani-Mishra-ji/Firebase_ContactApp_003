import { Field, Formik, Form, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import { doc,addDoc,collection,updateDoc } from "firebase/firestore";
import Model from "./Modal";
import {toast} from "react-toastify"
import * as Yup from "yup";

const constactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mail: Yup.string().email("Invalid E-mail").required("E-mail is required"),
})


const AddAndUpdateContact = ({ isOpen, onClose ,isupdate,contact}) => {

  const addContact = async(contacts) => {
    try{
      const contactRef = collection(db, "contact");
      await addDoc(contactRef, contacts);
      onClose();
      toast.success ("Contact Added successfully")

    } catch (error){
     console.log(error)
   }
  };

  const updateContact = async(contacts,id) => {
    try{
      const contactRef = doc(db, "contact",id);
      await updateDoc(contactRef, contacts);
      onClose();
      toast.success ("Contact updated successfully")

    } catch (error){
     console.log(error)
   }
  };
  
  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik 
        validationSchema={constactSchemaValidation}
        initialValues={
          isupdate
           ? {
          name: contact.name,
          mail: contact.mail,
        }:
        {
          name: "",
          mail: "", 
        }
        }
        onSubmit={(values)=>{
          console.log(values);
          isupdate ?
          updateContact(values,contact.id):
          addContact(values)
        }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">E-mail</label>
              <Field name="mail" className="h-10 border" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="mail"/>
              </div>
            </div>
            <button className="self-end border bg-orange-400 px-3
             py-1.5">
             {isupdate ? "update": "add"} contact</button>
          </Form>
        </Formik>
      </Model>
    </div>
  );
};

export default AddAndUpdateContact;
