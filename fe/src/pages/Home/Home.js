import React, { useEffect, useState } from "react";
import Jobcatogaries from "../Home/jobCatogaries";
import JobList from "./JobList/jobList";
import { CompanyService } from "../../services/company";
import { TopicService } from "../../services/topic";

const Home = () => {
	document.title = 'Trang chủ';
	const [companies, setCompanies] = useState([]);
	const [topics, setTopics] = useState([]);
	// const dispatch = useDispatch()
	const getCompanies = async () => {
		const response = await CompanyService.getDataList({page: 1, page_size: 10});
		if(response?.status === 'success') {
			setCompanies(response.data.result);
		} else {
			setCompanies([]);
		}
	}

	const getTopics = async () => {
		const response = await TopicService.getDataList({page: 1, page_size: 10});
		if(response?.status === 'success') {
			setTopics(response.data.result);
		} else {
			setTopics([]);
		}
	}

	useEffect(() => {
		getCompanies();
		getTopics();
	}, []);
  return (
    <React.Fragment>
      
	  {companies?.length > 0 && <Jobcatogaries companies={companies} /> }
      
      {topics?.length > 0 && <JobList topics={topics}/>}
    </React.Fragment>
  );
};

export default Home;
