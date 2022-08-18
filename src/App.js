import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';
function App() {
	const { loading, data } = useFetch();
	const [page, setPage] = useState(0);
	const [followers, setFollowers] = useState([]);

	useEffect(() => {
		if (loading) return;
		setFollowers(data[page]);
	}, [loading, page]);

	const handlePage = index => {
		setPage(index);
	};

	return (
		<main>
			<div className="section-title">
				<h1>{loading ? 'Loading...' : 'pagination'}</h1>
				<div className="underline"></div>
				<section className="followers">
					<div className="container">
						{followers.map(follower => {
							return <Follower key={follower.id} {...follower} />;
						})}
					</div>
					{!loading && data.length > 1 && (
						<div className="btn-container">
							<button
								disabled={page === 0}
								className="prev-btn"
								onClick={() => setPage(page - 1)}
							>
								{'<'}
							</button>
							{data.map((_, index) => {
								return (
									<button
										key={index}
										className={`page-btn ${index === page && 'active-btn'}`}
										onClick={() => handlePage(index)}
									>
										{index + 1}
									</button>
								);
							})}
							<button
								disabled={page === data.length - 1}
								className="next-btn"
								onClick={() => setPage(page + 1)}
							>
								{'>'}
							</button>
						</div>
					)}
				</section>
			</div>
		</main>
	);
}

export default App;
