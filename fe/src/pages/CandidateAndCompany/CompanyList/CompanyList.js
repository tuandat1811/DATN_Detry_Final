import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import CompanyDetails from "./CompanyDetails";
import Section from "./Section";
import { CompanyService } from "../../../services/company";
import { useSearchParams } from "react-router-dom";
import NoDataPage from "../../../components/noData";

const CompanyList = () =>
{
	document.title = "Công ty";

	const [ companies, setCompanies ] = useState( [] );
	const [paging, setPaging] = useState({page: 1, page_size: 1, total: 0});
	const [params, setParams] = useState({name: null});
	let [ searchParams, setSearchParams ] = useSearchParams( {} );
	// const dispatch = useDispatch()
	const getCompanies = async (params) =>
	{
		setSearchParams(params)
		const response = await CompanyService.getDataList( {...params, status: 'ACTIVE'} );
		if ( response?.status === 'success' )
		{
			setCompanies( response.data.result );
			setPaging(response.data.meta);
		} else
		{
			setCompanies( [] );
		}
	}

	useEffect(() => {
		getCompanies(
			{page: 1, page_size: paging.page_size}
		);
	}, []);
	//
	return (
		<React.Fragment>
			<Section />
			<section className="section">
				<Container>
					<CompanyDetails 
					companies={companies} 
					getCompanies={getCompanies} 
					paging={paging} 
					setPaging={setPaging}
					params={params}
					setParams={setParams}
					/>
				</Container>
				<NoDataPage total={paging.total || 0}/>
			</section>
		</React.Fragment>
	);
};

export default CompanyList;
