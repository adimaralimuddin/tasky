import TemplatePage from "../../components/template/TemplatePage";
import { initUserData } from "../../lib/initUser";

export default TemplatePage;

export const getServerSideProps = initUserData;
