import {useSelector} from "react-redux";
import {useState} from 'react';

const Notification = () => {
    const notification = useSelector(state => state.ui.notification);
    if (!notification){
        return (<></>);
    }
    const [isShowNotification,setIsShowNotification] = useState(true);
    let statusClasses = 'bg-primary' ;
    if (notification.status=='success' ){
        statusClasses =' bg-green-600 ';
    }else if (notification.status=='error' ){
        statusClasses =' bg-red-600 ';
    }else if (notification.status=='warning'){
        statusClasses =' bg-warning ';
    }

    setTimeout(()=>{
        setIsShowNotification(false);
    },3000);


    return (
        <>
            {isShowNotification &&
                    <div className={`fixed bottom-8 right-8 left-auto z-[999]  h-10  justify-center rounded-md  text-white shadow-md transition ease-in-out ${statusClasses}`}>
                        <p className="items-center px-4 py-2">
                            {notification.message}
                        </p>
                    </div>
            }
        </>
    );
}

export default Notification;