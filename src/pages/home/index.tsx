import { Button } from "antd";
import { Link } from "react-router-dom";
const Home = () => {
	return (
		<>
			<Button>
				<Link to="./login">Login</Link>
			</Button>
			<Button>
				<Link to="./feed">Feed</Link>
			</Button>
		</>
	);
};

export default Home;
