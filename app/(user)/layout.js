'use client'
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; 
import { appStore, persistor } from "../../Redux/appStore"
export default function UserLayout({children}){
return(
    <>
    <Provider store={appStore}>
    <PersistGate loading={null}persistor={persistor}>
  <div ><Navbar/></div>
            <div className="flex">
              <div className=" hidden w-2/12 md:block rounded-lg ">
              <Sidebar  />
              </div>
              <div className="flex-1">
                {children}
                </div>
            </div>
            <Footer />
            </PersistGate>
            </Provider>
            </>
)
}