import { useSelector } from "react-redux"
import { getUserDataSelector } from "../store/selectors"

const useIndificate = (id) => {
    const user = useSelector(getUserDataSelector);
    return id === user?.id;
}

export default useIndificate;