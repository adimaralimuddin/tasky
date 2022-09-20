import PageMainClass from "../../components/class/ClassPage";
import { initUserData } from "../../lib/initUser";

export default PageMainClass;

export const getServerSideProps = initUserData;

