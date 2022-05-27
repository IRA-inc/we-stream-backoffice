import React, { ReactElement } from 'react';
import { Pagination } from '@mui/material';

const Paginations = (props) => {
	const {onChange,pages,page}=props
	return (
		<>
			<Pagination
				count={pages}
				color="primary"
				page={page}
				variant="outlined"
				shape="rounded"
				onChange={onChange}
				showFirstButton
				showLastButton
			/>
		</>
	);
};

export default Paginations;
