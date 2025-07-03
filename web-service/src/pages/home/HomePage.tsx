import GreetInput from "@/features/greet-user/ui/GreetInput";
import UserGreeting from "@/entities/user/ui/UserGreeting";
import { useGreet } from "@/features/greet-user/model/useGreet";

function HomePage() {
	const { name, setName } = useGreet();

	return (
		<div style={{ padding: '2rem' }}>
			<h1>Home Page</h1>
			<GreetInput name={name} onChange={setName} />
			<UserGreeting name={name} />
		</div>
	);
}

export default HomePage;