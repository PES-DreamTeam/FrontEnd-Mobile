import { ReportScreenContainer } from "./ReportScreenContainer";
import useReportAplication from '../../hooks/useReportAplication';

const ReportApplicationScreen = ({navigation}) => {
    const {sendReport} = useReportAplication();
    return (
        <>
        <ReportScreenContainer navigation={navigation} sendReport={sendReport}/>
        </>
      );
}
 
export { ReportApplicationScreen };